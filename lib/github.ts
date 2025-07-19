import { Octokit } from '@octokit/rest';
import * as Sentry from '@sentry/nextjs';

// GitHub API configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'AdrianRusan';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Initialize Octokit client
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'adrian-rusan-portfolio',
});

// Types for GitHub data
export interface GitHubRepo {
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
  pushed_at: string;
  topics: string[];
  visibility: string;
  size: number;
  open_issues_count: number;
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languageStats: Record<string, number>;
  topRepositories: GitHubRepo[];
}

/**
 * Fetches GitHub repositories for the configured user
 * @param options - Options for filtering repositories
 * @returns Promise<GitHubRepo[]>
 */
export async function getGitHubRepos(options: {
  type?: 'all' | 'owner' | 'member';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
} = {}): Promise<GitHubRepo[]> {
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GitHub token not configured, using public API with rate limits');
    }

    const {
      type = 'owner',
      sort = 'updated',
      direction = 'desc',
      per_page = 100,
      page = 1
    } = options;

    const response = await octokit.rest.repos.listForUser({
      username: GITHUB_USERNAME,
      type,
      sort,
      direction,
      per_page,
      page,
    });

    // Filter out forks and archived repositories, and sort by stars
    const filteredRepos = response.data
      .filter((repo: any) => !repo.fork && !repo.archived && !repo.disabled)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);

    return filteredRepos as GitHubRepo[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error to Sentry with context
    Sentry.captureException(error, {
      tags: {
        function: 'getGitHubRepos',
        github_username: GITHUB_USERNAME,
      },
      extra: {
        options,
        hasToken: !!GITHUB_TOKEN,
      },
    });

    console.error('Error fetching GitHub repositories:', errorMessage);
    
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetches GitHub user profile information
 * @returns Promise<GitHubUser | null>
 */
export async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await octokit.rest.users.getByUsername({
      username: GITHUB_USERNAME,
    });

    return response.data as GitHubUser;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    Sentry.captureException(error, {
      tags: {
        function: 'getGitHubUser',
        github_username: GITHUB_USERNAME,
      },
      extra: {
        hasToken: !!GITHUB_TOKEN,
      },
    });

    console.error('Error fetching GitHub user:', errorMessage);
    return null;
  }
}

/**
 * Fetches comprehensive GitHub statistics
 * @returns Promise<GitHubStats | null>
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const [user, repos] = await Promise.all([
      getGitHubUser(),
      getGitHubRepos({ per_page: 100 })
    ]);

    if (!user) {
      return null;
    }

    // Calculate statistics from repositories
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Calculate language statistics
    const languageStats: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    // Get top repositories (by stars)
    const topRepositories = repos
      .filter(repo => repo.stargazers_count > 0)
      .slice(0, 6);

    return {
      user,
      totalStars,
      totalForks,
      totalCommits: 0, // Would need additional API calls to get commit count
      languageStats,
      topRepositories,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    Sentry.captureException(error, {
      tags: {
        function: 'getGitHubStats',
        github_username: GITHUB_USERNAME,
      },
      extra: {
        hasToken: !!GITHUB_TOKEN,
      },
    });

    console.error('Error fetching GitHub stats:', errorMessage);
    return null;
  }
}

/**
 * Fetches featured repositories based on stars and recent activity
 * @param count - Number of repositories to return
 * @returns Promise<GitHubRepo[]>
 */
export async function getFeaturedRepos(count: number = 6): Promise<GitHubRepo[]> {
  try {
    const repos = await getGitHubRepos({ per_page: 50 });
    
    // Score repositories based on stars, forks, and recent activity
    const scoredRepos = repos.map(repo => {
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Scoring algorithm: stars + forks + recency bonus
      const recencyBonus = Math.max(0, 100 - daysSinceUpdate);
      const score = repo.stargazers_count * 3 + repo.forks_count * 2 + recencyBonus;
      
      return { ...repo, score };
    });

    // Sort by score and return top repositories
    return scoredRepos
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    Sentry.captureException(error, {
      tags: {
        function: 'getFeaturedRepos',
        github_username: GITHUB_USERNAME,
      },
      extra: {
        count,
        hasToken: !!GITHUB_TOKEN,
      },
    });

    console.error('Error fetching featured repositories:', errorMessage);
    return [];
  }
}

/**
 * Validates GitHub API configuration
 * @returns boolean indicating if GitHub API is properly configured
 */
export function isGitHubConfigured(): boolean {
  return !!(GITHUB_TOKEN && GITHUB_USERNAME);
}

/**
 * Gets GitHub API rate limit information
 * @returns Promise with rate limit data
 */
export async function getGitHubRateLimit() {
  try {
    const response = await octokit.rest.rateLimit.get();
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub rate limit:', error);
    return null;
  }
} 