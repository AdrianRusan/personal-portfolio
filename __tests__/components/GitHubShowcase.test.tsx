import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import GitHubShowcase from '@/components/GitHubShowcase'

// Mock the fetch call
global.fetch = jest.fn()

const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('GitHubShowcase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    mockFetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    )
    
    render(<GitHubShowcase />)
    
    // Check for loading indicators
    const loadingElements = document.querySelectorAll('.animate-pulse')
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it('renders GitHub showcase section heading', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          totalRepos: 10,
          totalStars: 50,
          totalForks: 15
        }
      })
    } as Response)

    render(<GitHubShowcase />)
    
    expect(screen.getByText(/github/i)).toBeInTheDocument()
  })

  it('displays GitHub stats when data loads successfully', async () => {
    const mockStats = {
      totalRepos: 25,
      totalStars: 100,
      totalForks: 30
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: mockStats,
        cached: false
      })
    } as Response)

    render(<GitHubShowcase />)
    
    await waitFor(() => {
      expect(screen.getByText('25')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
    })
  })

  it('handles API error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('API Error'))

    render(<GitHubShowcase />)
    
    await waitFor(() => {
      // Should show error message or fallback UI
      expect(document.querySelector('.error') || 
             screen.queryByText(/error/i) || 
             screen.queryByText(/failed/i)).toBeTruthy()
    }, { timeout: 3000 })
  })

  it('handles empty response gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: null
      })
    } as Response)

    render(<GitHubShowcase />)
    
    await waitFor(() => {
      // Should handle null data without crashing
      expect(document.querySelector('#github') || 
             document.querySelector('[data-testid="github-showcase"]')).toBeInTheDocument()
    })
  })

  it('renders featured repositories when provided', async () => {
    const mockRepos = [
      {
        name: 'awesome-project',
        description: 'An awesome project',
        stargazers_count: 50,
        html_url: 'https://github.com/user/awesome-project'
      }
    ]

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: mockRepos
      })
    } as Response)

    render(<GitHubShowcase />)
    
    await waitFor(() => {
      expect(screen.getByText('awesome-project')).toBeInTheDocument()
      expect(screen.getByText('An awesome project')).toBeInTheDocument()
    })
  })

  it('has proper section structure', () => {
    render(<GitHubShowcase />)
    
    // Check for section element
    const githubSection = document.querySelector('#github') || 
                          document.querySelector('[data-testid="github-showcase"]')
    expect(githubSection).toBeInTheDocument()
  })

  it('renders repository links correctly', async () => {
    const mockRepos = [
      {
        name: 'test-repo',
        html_url: 'https://github.com/user/test-repo',
        stargazers_count: 10
      }
    ]

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: mockRepos
      })
    } as Response)

    render(<GitHubShowcase />)
    
    await waitFor(() => {
      const links = screen.getAllByRole('link')
      const repoLink = links.find(link => 
        link.getAttribute('href')?.includes('github.com/user/test-repo')
      )
      expect(repoLink).toBeInTheDocument()
    })
  })
})