'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { BookOpen, Code, Video, FileText, Clock, User, Star, ArrowRight } from 'lucide-react';
import { useContentProgress } from '@/components/ProgressTracker';

// Static learning content data - hardcoded as per V1 requirements
const learningContent = [
  {
    slug: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Learn the core concepts of React including components, props, state, and lifecycle methods.',
    type: 'article' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 30,
    tags: ['React', 'JavaScript', 'Frontend'],
    category: 'Frontend Development',
    thumbnail: '/icons/react.svg',
    publishedAt: '2024-01-15',
    author: 'Adrian Rusan',
    rating: 4.8,
    prerequisites: ['Basic JavaScript knowledge'],
    relatedContent: ['next-js-basics', 'typescript-intro']
  },
  {
    slug: 'next-js-basics',
    title: 'Next.js Basics',
    description: 'Understanding Next.js App Router, server components, and modern React patterns.',
    type: 'article' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 45,
    tags: ['Next.js', 'React', 'SSR', 'App Router'],
    category: 'Frontend Development',
    thumbnail: '/icons/nextjs.svg',
    publishedAt: '2024-01-20',
    author: 'Adrian Rusan',
    rating: 4.9,
    prerequisites: ['React Fundamentals'],
    relatedContent: ['react-fundamentals', 'typescript-intro']
  },
  {
    slug: 'typescript-intro',
    title: 'TypeScript Introduction',
    description: 'Getting started with TypeScript for better code quality and developer experience.',
    type: 'article' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 35,
    tags: ['TypeScript', 'JavaScript', 'Types'],
    category: 'Programming Languages',
    thumbnail: '/icons/typescript.svg',
    publishedAt: '2024-01-25',
    author: 'Adrian Rusan',
    rating: 4.7,
    prerequisites: ['Basic JavaScript knowledge'],
    relatedContent: ['react-fundamentals', 'next-js-basics']
  },
  {
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques',
    description: 'Explore advanced CSS features including Grid, Flexbox, and custom properties.',
    type: 'video' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 60,
    tags: ['CSS', 'Grid', 'Flexbox', 'Frontend'],
    category: 'Frontend Development',
    thumbnail: '/icons/css.svg',
    publishedAt: '2024-02-01',
    author: 'Adrian Rusan',
    rating: 4.6,
    videoUrl: 'https://www.youtube.com/watch?v=example',
    prerequisites: ['Basic CSS knowledge'],
    relatedContent: ['react-fundamentals']
  },
  {
    slug: 'api-design-principles',
    title: 'API Design Principles',
    description: 'Best practices for designing RESTful APIs and GraphQL schemas.',
    type: 'tutorial' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 90,
    tags: ['API', 'REST', 'GraphQL', 'Backend'],
    category: 'Backend Development',
    thumbnail: '/icons/api.svg',
    publishedAt: '2024-02-05',
    author: 'Adrian Rusan',
    rating: 4.8,
    prerequisites: ['Basic backend knowledge', 'HTTP fundamentals'],
    relatedContent: ['next-js-basics']
  },
  {
    slug: 'database-optimization',
    title: 'Database Optimization',
    description: 'Techniques for optimizing database queries and improving performance.',
    type: 'resource' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 75,
    tags: ['Database', 'SQL', 'Performance', 'Backend'],
    category: 'Backend Development',
    thumbnail: '/icons/database.svg',
    publishedAt: '2024-02-10',
    author: 'Adrian Rusan',
    rating: 4.9,
    prerequisites: ['SQL knowledge', 'Database fundamentals'],
    relatedContent: ['api-design-principles']
  }
];

const categories = ['All', 'Frontend Development', 'Backend Development', 'Programming Languages'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];
const types = ['All', 'article', 'video', 'tutorial', 'resource'];

// Type icons mapping
const typeIcons = {
  article: FileText,
  video: Video,
  tutorial: Code,
  resource: BookOpen
};

// Difficulty colors mapping
const difficultyColors = {
  beginner: 'text-green-500 bg-green-500/20 border-green-500/30',
  intermediate: 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30',
  advanced: 'text-red-500 bg-red-500/20 border-red-500/30'
};

export default function LearningPage() {
  const contentSlugs = useMemo(() => learningContent.map(item => item.slug), []);
  const { progressData, mounted } = useContentProgress(contentSlugs);

  return (
    <div className="min-h-screen bg-black-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Learning <span className="text-purple">Center</span>
          </h1>
          <p className="text-xl text-white-100 max-w-3xl mx-auto">
            Expand your knowledge with curated tutorials, articles, and resources on modern web development.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.05] border border-white/[0.2] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple">{learningContent.length}</div>
            <div className="text-sm text-white-100">Total Content</div>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.2] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple">{categories.length - 1}</div>
            <div className="text-sm text-white-100">Categories</div>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.2] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple">
              {Math.round(learningContent.reduce((acc, item) => acc + item.estimatedTime, 0) / 60)}h
            </div>
            <div className="text-sm text-white-100">Total Duration</div>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.2] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple">
              {learningContent.filter(item => item.difficulty === 'beginner').length}
            </div>
            <div className="text-sm text-white-100">Beginner Friendly</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/[0.05] border border-white/[0.2] rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select className="w-full bg-black-100 border border-white/[0.2] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Difficulty</label>
              <select className="w-full bg-black-100 border border-white/[0.2] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple">
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'All' ? difficulty : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Type</label>
              <select className="w-full bg-black-100 border border-white/[0.2] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple">
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.map((content) => {
            const TypeIcon = typeIcons[content.type];
            const difficultyStyle = difficultyColors[content.difficulty];
            const progress = mounted ? progressData[content.slug] || 0 : 0;
            
            return (
              <Link
                key={content.slug}
                href={`/learning/${content.slug}`}
                className="group bg-white/[0.05] border border-white/[0.2] rounded-lg overflow-hidden hover:border-purple/50 transition-all duration-300 hover:bg-white/[0.08]"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center">
                  <TypeIcon className="h-16 w-16 text-purple" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyStyle}`}>
                      {content.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {content.estimatedTime}min
                    </span>
                  </div>
                  
                  {/* Progress indicator */}
                  {mounted && progress > 0 && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-green-500/20 border border-green-500/30 px-2 py-1 rounded text-xs font-medium text-green-500">
                        {progress >= 90 ? 'Completed' : `${progress}% read`}
                      </div>
                    </div>
                  )}
                  
                  {/* Progress bar at bottom */}
                  {mounted && progress > 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple font-medium">{content.category}</span>
                    <div className="flex items-center text-xs text-white-100">
                      <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                      {content.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple transition-colors">
                    {content.title}
                  </h3>
                  
                  <p className="text-white-100 text-sm mb-4 line-clamp-3">
                    {content.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/[0.1] text-white-100 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className="text-white-100 text-xs">+{content.tags.length - 3} more</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-white-100">
                      <User className="h-3 w-3 mr-1" />
                      {content.author}
                    </div>
                    <div className="flex items-center text-purple group-hover:translate-x-1 transition-transform">
                      <span className="text-sm">Read more</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple/20 to-blue/20 border border-purple/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-white-100 mb-6">
              Have a specific topic you&apos;d like to learn about? Let me know and I&apos;ll consider creating content for it.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-lg font-medium transition-colors"
            >
              <span>Suggest a Topic</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 