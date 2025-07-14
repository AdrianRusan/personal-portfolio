import { NextRequest, NextResponse } from 'next/server';
import { getGitHubRepos, getGitHubUser, getGitHubStats, getFeaturedRepos, isGitHubConfigured, getGitHubRateLimit } from '@/lib/github';
import * as Sentry from '@sentry/nextjs';

// In-memory cache for GitHub data
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry>();

// Cache TTL in milliseconds (1 hour)
const CACHE_TTL = 60 * 60 * 1000;

/**
 * Retrieves data from cache if valid, otherwise returns null
 */
function getCachedData(key: string): any | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

/**
 * Stores data in cache with TTL
 */
function setCachedData(key: string, data: any, ttl: number = CACHE_TTL): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  });
}

/**
 * Clears expired cache entries
 */
function clearExpiredCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
    }
  }
}

/**
 * GET /api/github
 * Fetches GitHub data with caching support
 * 
 * Query parameters:
 * - type: 'user' | 'repos' | 'stats' | 'featured' | 'rateLimit'
 * - count: number (for featured repos)
 * - per_page: number (for repos)
 * - sort: string (for repos)
 * - direction: 'asc' | 'desc' (for repos)
 * - force: boolean (bypass cache)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Clear expired cache entries periodically
    clearExpiredCache();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'stats';
    const force = searchParams.get('force') === 'true';
    
    // Check if GitHub is configured
    if (!isGitHubConfigured()) {
      return NextResponse.json(
        { 
          error: 'GitHub integration not configured',
          message: 'GITHUB_TOKEN and GITHUB_USERNAME environment variables are required'
        },
        { status: 503 }
      );
    }
    
    // Generate cache key based on request parameters
    const cacheKey = `github:${type}:${searchParams.toString()}`;
    
    // Try to get data from cache first (unless force refresh)
    if (!force) {
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        return NextResponse.json({
          data: cachedData,
          cached: true,
          timestamp: Date.now(),
          processingTime: Date.now() - startTime
        });
      }
    }
    
    let data: any;
    
    // Fetch data based on type
    switch (type) {
      case 'user':
        data = await getGitHubUser();
        break;
        
      case 'repos':
        const reposOptions = {
          per_page: parseInt(searchParams.get('per_page') || '30'),
          sort: searchParams.get('sort') as 'created' | 'updated' | 'pushed' | 'full_name' || 'updated',
          direction: searchParams.get('direction') as 'asc' | 'desc' || 'desc',
          type: searchParams.get('repo_type') as 'all' | 'owner' | 'member' || 'owner'
        };
        data = await getGitHubRepos(reposOptions);
        break;
        
      case 'featured':
        const count = parseInt(searchParams.get('count') || '6');
        data = await getFeaturedRepos(count);
        break;
        
      case 'stats':
        data = await getGitHubStats();
        break;
        
      case 'rateLimit':
        data = await getGitHubRateLimit();
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter', validTypes: ['user', 'repos', 'stats', 'featured', 'rateLimit'] },
          { status: 400 }
        );
    }
    
    // Handle null data (API errors)
    if (data === null) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch GitHub data',
          message: 'GitHub API returned null data. Check logs for details.'
        },
        { status: 502 }
      );
    }
    
    // Cache the successful response
    setCachedData(cacheKey, data, CACHE_TTL);
    
    const response = {
      data,
      cached: false,
      timestamp: Date.now(),
      processingTime: Date.now() - startTime,
      cacheKey: process.env.NODE_ENV === 'development' ? cacheKey : undefined
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        api_route: 'github',
        request_url: request.url,
      },
      extra: {
        searchParams: Object.fromEntries(new URL(request.url).searchParams),
        processingTime: Date.now() - startTime,
      },
    });
    
    console.error('GitHub API route error:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? errorMessage : 'An error occurred while fetching GitHub data',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/github
 * Clears cache or performs admin operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    switch (action) {
      case 'clearCache':
        cache.clear();
        return NextResponse.json({ 
          message: 'Cache cleared successfully',
          timestamp: Date.now()
        });
        
      case 'getCacheStats':
        const stats = {
          totalEntries: cache.size,
          entries: Array.from(cache.entries()).map(([key, entry]) => ({
            key,
            timestamp: entry.timestamp,
            ttl: entry.ttl,
            age: Date.now() - entry.timestamp,
            expired: Date.now() - entry.timestamp > entry.ttl
          }))
        };
        return NextResponse.json(stats);
        
      default:
        return NextResponse.json(
          { error: 'Invalid action', validActions: ['clearCache', 'getCacheStats'] },
          { status: 400 }
        );
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    Sentry.captureException(error, {
      tags: {
        api_route: 'github',
        method: 'POST',
        request_url: request.url,
      },
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? errorMessage : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/github
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 