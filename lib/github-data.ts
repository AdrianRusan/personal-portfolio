import { unstable_cache } from 'next/cache';
import * as Sentry from '@sentry/nextjs';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languageStats: Record<string, number>;
  topRepositories: GitHubRepo[];
}

interface GitHubShowcaseData {
  stats: GitHubStats | null;
  featuredRepos: GitHubRepo[];
  lastUpdated: string;
}

/**
 * Fetches GitHub data directly from GitHub API (not via internal API route)
 * This function is used for server-side data fetching with ISR
 */
async function fetchGitHubDataDirectly(): Promise<GitHubShowcaseData> {
  try {
    // Import GitHub functions directly to avoid circular HTTP requests
    const { getGitHubStats, getFeaturedRepos } = await import('./github');
    
    // Fetch stats and featured repos in parallel
    const [stats, featuredRepos] = await Promise.all([
      getGitHubStats(),
      getFeaturedRepos(6),
    ]);

    return {
      stats,
      featuredRepos,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        function: 'fetchGitHubDataDirectly',
        context: 'server-side-data-fetching',
      },
      extra: {
        errorMessage,
      },
    });

    console.error('Error fetching GitHub data for ISR:', errorMessage);
    
    // Return fallback data structure
    return {
      stats: null,
      featuredRepos: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Cached version of GitHub data fetching for ISR
 * Revalidates every 6 hours (21600 seconds)
 */
export const getCachedGitHubData = unstable_cache(
  async (): Promise<GitHubShowcaseData> => {
    return await fetchGitHubDataDirectly();
  },
  ['github-showcase-data'],
  {
    revalidate: 21600, // 6 hours in seconds
    tags: ['github-data'],
  }
);

/**
 * Fallback GitHub data for when API is unavailable
 */
export const getFallbackGitHubData = (): GitHubShowcaseData => ({
  stats: null,
  featuredRepos: [],
  lastUpdated: new Date().toISOString(),
});

/**
 * Main function to get GitHub data with fallback
 * This is the function that should be called from page components
 */
export async function getGitHubShowcaseData(): Promise<GitHubShowcaseData> {
  try {
    const data = await getCachedGitHubData();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        function: 'getGitHubShowcaseData',
        context: 'page-data-fetching',
      },
      extra: {
        errorMessage,
      },
    });

    console.error('Error getting cached GitHub data:', errorMessage);
    
    // Return fallback data
    return getFallbackGitHubData();
  }
}

/**
 * Export types for use in components
 */
export type { GitHubRepo, GitHubUser, GitHubStats, GitHubShowcaseData }; 