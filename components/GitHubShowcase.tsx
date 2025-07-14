import React from 'react';
import Link from 'next/link';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { cn } from '@/lib/utils';

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

interface GitHubShowcaseProps {
  stats: GitHubStats | null;
  featuredRepos: GitHubRepo[];
  className?: string;
}

const GitHubShowcase: React.FC<GitHubShowcaseProps> = ({ 
  stats, 
  featuredRepos, 
  className 
}) => {
  if (!stats) {
    return (
      <section className={cn('py-20', className)} aria-labelledby="github-heading">
        <div className="text-center">
          <h2 id="github-heading" className="heading">
            GitHub <span className="text-purple">Activity</span>
          </h2>
          <p className="text-white-200 mt-4">
            GitHub data is temporarily unavailable. Please check back later.
          </p>
          <div className="mt-8">
            <Link
              href="https://github.com/AdrianRusan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-lg transition-colors"
            >
              <FaGithub className="text-xl" />
              <span>View GitHub Profile</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const { user, totalStars, totalForks } = stats;

  return (
    <section className={cn('py-20', className)} aria-labelledby="github-heading">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="github-heading" className="heading text-center mb-16">
          GitHub <span className="text-purple">Activity</span>
        </h2>

        {/* GitHub Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white-200 text-sm">Total Stars</p>
                <p className="text-white text-2xl font-bold">{totalStars.toLocaleString()}</p>
              </div>
              <FaStar className="text-yellow-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white-200 text-sm">Total Forks</p>
                <p className="text-white text-2xl font-bold">{totalForks.toLocaleString()}</p>
              </div>
              <FaCodeBranch className="text-blue-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white-200 text-sm">Public Repos</p>
                <p className="text-white text-2xl font-bold">{user.public_repos.toLocaleString()}</p>
              </div>
              <FaGithub className="text-white text-2xl" />
            </div>
          </div>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center">
          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-lg transition-colors"
          >
            <FaGithub className="text-xl" />
            <span>View Full GitHub Profile</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GitHubShowcase; 