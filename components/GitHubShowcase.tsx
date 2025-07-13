import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import { PinContainer } from './ui/PinContainer';
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

const LanguageColor: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  HTML: '#e34c26',
  CSS: '#1572b6',
  React: '#61dafb',
  'Next.js': '#000000',
  Vue: '#4fc08d',
  Angular: '#dd0031',
  PHP: '#777bb4',
  Ruby: '#701516',
  Go: '#00add8',
  Rust: '#dea584',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
  Dart: '#00b4ab',
  Shell: '#89e051',
};

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
        </div>
      </section>
    );
  }

  const { user, totalStars, totalForks, languageStats, topRepositories } = stats;

  // Get top 5 languages
  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section className={cn('py-20', className)} aria-labelledby="github-heading">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="github-heading" className="heading text-center mb-16">
          GitHub <span className="text-purple">Activity</span>
        </h2>

        {/* GitHub Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
          
          <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white-200 text-sm">Followers</p>
                <p className="text-white text-2xl font-bold">{user.followers.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 relative">
                <Image
                  src={user.avatar_url}
                  alt={`${user.name || user.login}'s avatar`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Languages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Top Programming Languages
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {topLanguages.map(([language, percentage]) => (
              <div
                key={language}
                className="flex items-center gap-3 bg-black-200 px-4 py-2 rounded-lg border border-white/[0.1]"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: LanguageColor[language] || '#8b949e' }}
                />
                <span className="text-white font-medium">{language}</span>
                <span className="text-white-200 text-sm">{percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Repositories */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-12 text-center">
            Featured Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRepos.map((repo) => (
              <article
                key={repo.id}
                className="group h-full"
                aria-labelledby={`repo-title-${repo.id}`}
              >
                <div className="relative flex flex-col h-full p-6 bg-black-200 rounded-xl border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 hover:shadow-lg hover:shadow-purple/10 hover:-translate-y-1">
                  {/* Repository Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h4
                        id={`repo-title-${repo.id}`}
                        className="text-xl font-bold text-white mb-3 truncate"
                      >
                        {repo.name}
                      </h4>
                      <p className="text-white-200 text-sm leading-relaxed min-h-[3rem]">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                    <FaGithub className="text-white-200 text-xl flex-shrink-0 ml-3" />
                  </div>

                  {/* Repository Stats */}
                  <div className="flex items-center justify-between mb-4 py-3 border-t border-white/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-white-200 text-sm font-medium">
                          {repo.stargazers_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaCodeBranch className="text-blue-400 text-sm" />
                        <span className="text-white-200 text-sm font-medium">
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                    
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: LanguageColor[repo.language] || '#8b949e' }}
                        />
                        <span className="text-white-200 text-sm font-medium">{repo.language}</span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 bg-purple/20 text-purple text-xs font-medium rounded-full border border-purple/30"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-3 py-1.5 bg-white/10 text-white-200 text-xs font-medium rounded-full border border-white/20">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-purple hover:bg-purple/80 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-purple/25"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <FaGithub className="text-sm" />
                      View Code
                    </Link>
                    
                    {repo.homepage && (
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
                        aria-label={`View ${repo.name} live demo`}
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mt-16">
          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-black-200 hover:bg-black-300 text-white rounded-lg border border-white/[0.1] hover:border-white/[0.2] transition-colors"
            aria-label={`View ${user.name || user.login}'s GitHub profile`}
          >
            <FaGithub className="text-xl" />
            <span>View Full GitHub Profile</span>
            <FaExternalLinkAlt className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GitHubShowcase; 