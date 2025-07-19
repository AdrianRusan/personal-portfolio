/**
 * @jest-environment jsdom
 */

import { GET, POST, OPTIONS } from '@/app/api/github/route'
import { NextRequest } from 'next/server'

// Mock the GitHub functions
const mockGetGitHubUser = jest.fn()
const mockGetGitHubRepos = jest.fn()
const mockGetGitHubStats = jest.fn()
const mockGetFeaturedRepos = jest.fn()
const mockGetGitHubRateLimit = jest.fn()
const mockIsGitHubConfigured = jest.fn()

jest.mock('@/lib/github', () => ({
  getGitHubUser: mockGetGitHubUser,
  getGitHubRepos: mockGetGitHubRepos,
  getGitHubStats: mockGetGitHubStats,
  getFeaturedRepos: mockGetFeaturedRepos,
  getGitHubRateLimit: mockGetGitHubRateLimit,
  isGitHubConfigured: mockIsGitHubConfigured
}))

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn()
}))

describe('GitHub API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockIsGitHubConfigured.mockReturnValue(true)
  })

  describe('GET /api/github', () => {
    it('should return user data when type=user', async () => {
      const mockUserData = {
        login: 'testuser',
        name: 'Test User',
        public_repos: 10,
        followers: 5
      }
      mockGetGitHubUser.mockResolvedValueOnce(mockUserData)

      const request = new NextRequest('http://localhost:3000/api/github?type=user')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockUserData)
      expect(data.cached).toBe(false)
      expect(data.timestamp).toBeGreaterThan(0)
      expect(data.processingTime).toBeGreaterThan(0)
    })

    it('should return repos data when type=repos', async () => {
      const mockReposData = [
        { name: 'repo1', stargazers_count: 10 },
        { name: 'repo2', stargazers_count: 5 }
      ]
      mockGetGitHubRepos.mockResolvedValueOnce(mockReposData)

      const request = new NextRequest('http://localhost:3000/api/github?type=repos&per_page=20&sort=updated&direction=desc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockReposData)
      expect(mockGetGitHubRepos).toHaveBeenCalledWith({
        per_page: 20,
        sort: 'updated',
        direction: 'desc',
        type: 'owner'
      })
    })

    it('should return featured repos when type=featured', async () => {
      const mockFeaturedRepos = [
        { name: 'featured-repo', stargazers_count: 100 }
      ]
      mockGetFeaturedRepos.mockResolvedValueOnce(mockFeaturedRepos)

      const request = new NextRequest('http://localhost:3000/api/github?type=featured&count=3')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockFeaturedRepos)
      expect(mockGetFeaturedRepos).toHaveBeenCalledWith(3)
    })

    it('should return stats when type=stats (default)', async () => {
      const mockStats = {
        totalRepos: 15,
        totalStars: 50,
        totalForks: 10
      }
      mockGetGitHubStats.mockResolvedValueOnce(mockStats)

      const request = new NextRequest('http://localhost:3000/api/github')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockStats)
    })

    it('should return rate limit when type=rateLimit', async () => {
      const mockRateLimit = {
        limit: 5000,
        remaining: 4999,
        reset: 1234567890
      }
      mockGetGitHubRateLimit.mockResolvedValueOnce(mockRateLimit)

      const request = new NextRequest('http://localhost:3000/api/github?type=rateLimit')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockRateLimit)
    })

    it('should return 503 when GitHub is not configured', async () => {
      mockIsGitHubConfigured.mockReturnValue(false)

      const request = new NextRequest('http://localhost:3000/api/github?type=user')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toBe('GitHub integration not configured')
    })

    it('should return 400 for invalid type parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/github?type=invalid')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid type parameter')
      expect(data.validTypes).toEqual(['user', 'repos', 'stats', 'featured', 'rateLimit'])
    })

    it('should return 502 when API returns null data', async () => {
      mockGetGitHubUser.mockResolvedValueOnce(null)

      const request = new NextRequest('http://localhost:3000/api/github?type=user')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(502)
      expect(data.error).toBe('Failed to fetch GitHub data')
    })

    it('should handle errors and return 500', async () => {
      mockGetGitHubUser.mockRejectedValueOnce(new Error('API Error'))

      const request = new NextRequest('http://localhost:3000/api/github?type=user')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should cache successful responses', async () => {
      const mockUserData = { login: 'testuser', name: 'Test User' }
      mockGetGitHubUser.mockResolvedValueOnce(mockUserData)

      // First request
      const request1 = new NextRequest('http://localhost:3000/api/github?type=user')
      const response1 = await GET(request1)
      const data1 = await response1.json()

      expect(data1.cached).toBe(false)
      expect(mockGetGitHubUser).toHaveBeenCalledTimes(1)

      // Second request (should be cached)
      const request2 = new NextRequest('http://localhost:3000/api/github?type=user')
      const response2 = await GET(request2)
      const data2 = await response2.json()

      expect(data2.cached).toBe(true)
      expect(data2.data).toEqual(mockUserData)
      expect(mockGetGitHubUser).toHaveBeenCalledTimes(1) // Should not be called again
    })

    it('should bypass cache when force=true', async () => {
      const mockUserData = { login: 'testuser', name: 'Test User' }
      mockGetGitHubUser.mockResolvedValue(mockUserData)

      // First request
      const request1 = new NextRequest('http://localhost:3000/api/github?type=user')
      await GET(request1)

      // Second request with force=true
      const request2 = new NextRequest('http://localhost:3000/api/github?type=user&force=true')
      const response2 = await GET(request2)
      const data2 = await response2.json()

      expect(data2.cached).toBe(false)
      expect(mockGetGitHubUser).toHaveBeenCalledTimes(2)
    })
  })

  describe('POST /api/github', () => {
    it('should clear cache when action=clearCache', async () => {
      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'POST',
        body: JSON.stringify({ action: 'clearCache' })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Cache cleared successfully')
      expect(data.timestamp).toBeGreaterThan(0)
    })

    it('should return cache stats when action=getCacheStats', async () => {
      // First populate cache
      const mockUserData = { login: 'testuser' }
      mockGetGitHubUser.mockResolvedValueOnce(mockUserData)
      
      const getRequest = new NextRequest('http://localhost:3000/api/github?type=user')
      await GET(getRequest)

      // Now get cache stats
      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'POST',
        body: JSON.stringify({ action: 'getCacheStats' })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.totalEntries).toBeGreaterThan(0)
      expect(Array.isArray(data.entries)).toBe(true)
    })

    it('should return 400 for invalid action', async () => {
      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'POST',
        body: JSON.stringify({ action: 'invalidAction' })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid action')
      expect(data.validActions).toEqual(['clearCache', 'getCacheStats'])
    })

    it('should handle POST errors', async () => {
      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'POST',
        body: 'invalid json'
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('OPTIONS /api/github', () => {
    it('should return CORS headers', async () => {
      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'OPTIONS'
      })

      const response = await OPTIONS(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS')
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization')
      expect(response.headers.get('Access-Control-Max-Age')).toBe('86400')
    })
  })

  describe('Error Handling and Logging', () => {
    it('should capture exceptions to Sentry on GET errors', async () => {
      const testError = new Error('GitHub API Error')
      mockGetGitHubUser.mockRejectedValueOnce(testError)

      const Sentry = require('@sentry/nextjs')

      const request = new NextRequest('http://localhost:3000/api/github?type=user')
      await GET(request)

      expect(Sentry.captureException).toHaveBeenCalledWith(
        testError,
        expect.objectContaining({
          tags: {
            api_route: 'github',
            request_url: 'http://localhost:3000/api/github?type=user'
          },
          extra: expect.objectContaining({
            searchParams: { type: 'user' },
            processingTime: expect.any(Number)
          })
        })
      )
    })

    it('should capture exceptions to Sentry on POST errors', async () => {
      const testError = new Error('POST Error')
      
      const Sentry = require('@sentry/nextjs')

      const request = new NextRequest('http://localhost:3000/api/github', {
        method: 'POST',
        body: 'invalid json'
      })
      await POST(request)

      expect(Sentry.captureException).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          tags: {
            api_route: 'github',
            method: 'POST',
            request_url: 'http://localhost:3000/api/github'
          }
        })
      )
    })
  })
})