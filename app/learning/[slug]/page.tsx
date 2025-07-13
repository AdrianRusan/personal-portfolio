import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Star, BookOpen, Code, Video, FileText, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import VideoPlayer from '@/components/VideoPlayer';
import ProgressTracker from '@/components/ProgressTracker';

// Static learning content data - same as in the listing page
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
    relatedContent: ['next-js-basics', 'typescript-intro'],
    content: `
      <h2>Introduction to React</h2>
      <p>React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamental concepts that every React developer needs to understand.</p>
      
      <h3>What is React?</h3>
      <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
      
      <h3>Key Concepts</h3>
      <h4>1. Components</h4>
      <p>Components are the building blocks of React applications. They are reusable pieces of code that return JSX to describe what should appear on the screen.</p>
      
      <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="Sara" /&gt;
      &lt;Welcome name="Cahal" /&gt;
      &lt;Welcome name="Edite" /&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h4>2. Props</h4>
      <p>Props (short for properties) are how you pass data from parent components to child components. They are read-only and help make components reusable.</p>
      
      <h4>3. State</h4>
      <p>State is a component's memory. It allows components to remember information and change over time in response to user actions or other events.</p>
      
      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Keep components small and focused</li>
        <li>Use meaningful names for components and props</li>
        <li>Avoid deeply nested component structures</li>
        <li>Use hooks for state management in functional components</li>
        <li>Always provide keys when rendering lists</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>Now that you understand the basics of React, you're ready to dive deeper into more advanced concepts like hooks, context, and performance optimization.</p>
    `
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
    relatedContent: ['react-fundamentals', 'typescript-intro'],
    content: `
      <h2>Getting Started with Next.js</h2>
      <p>Next.js is a React framework that provides additional structure, features, and optimizations for your application. It's built on top of React and provides many powerful features out of the box.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Server-Side Rendering (SSR)</strong> - Pages are rendered on the server</li>
        <li><strong>Static Site Generation (SSG)</strong> - Pre-generate pages at build time</li>
        <li><strong>API Routes</strong> - Build API endpoints within your Next.js app</li>
        <li><strong>File-based Routing</strong> - Pages are created based on file structure</li>
        <li><strong>Built-in CSS Support</strong> - Import CSS files directly</li>
        <li><strong>Image Optimization</strong> - Automatic image optimization</li>
      </ul>
      
      <h3>App Router vs Pages Router</h3>
      <p>Next.js 13 introduced the App Router, which is now the recommended approach for new applications. It provides:</p>
      <ul>
        <li>Server Components by default</li>
        <li>Improved routing with layouts</li>
        <li>Better data fetching patterns</li>
        <li>Enhanced developer experience</li>
      </ul>
      
      <h3>Server Components</h3>
      <p>Server Components are a new React feature that allows components to be rendered on the server. This provides several benefits:</p>
      
      <pre><code>// Server Component (default in App Router)
export default function ServerComponent() {
  // This runs on the server
  const data = await fetch('https://api.example.com/data');
  
  return (
    &lt;div&gt;
      &lt;h1&gt;Server Component&lt;/h1&gt;
      &lt;p&gt;Data: {data}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Client Component (when interactivity is needed)
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</code></pre>
      
      <h3>Data Fetching</h3>
      <p>Next.js provides several methods for fetching data:</p>
      <ul>
        <li><strong>Server Components</strong> - Fetch data directly in components</li>
        <li><strong>Route Handlers</strong> - API routes for server-side logic</li>
        <li><strong>Client-side fetching</strong> - Using useEffect or libraries like SWR</li>
      </ul>
      
      <h3>Deployment</h3>
      <p>Next.js applications can be deployed to various platforms, with Vercel being the most seamless option since it's made by the same team.</p>
    `
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
    relatedContent: ['react-fundamentals', 'next-js-basics'],
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, helping you catch errors early and write more maintainable code.</p>
      
      <h3>Benefits of TypeScript</h3>
      <ul>
        <li><strong>Early Error Detection</strong> - Catch errors at compile time</li>
        <li><strong>Better IDE Support</strong> - Enhanced autocomplete and refactoring</li>
        <li><strong>Improved Code Documentation</strong> - Types serve as documentation</li>
        <li><strong>Enhanced Refactoring</strong> - Safe and confident code changes</li>
        <li><strong>Better Collaboration</strong> - Clear contracts between team members</li>
      </ul>
      
      <h3>Basic Types</h3>
      <pre><code>// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array&lt;string&gt; = ["Alice", "Bob"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};</code></pre>
      
      <h3>Functions</h3>
      <pre><code>// Function with typed parameters and return type
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number =&gt; a + b;

// Optional parameters
function createUser(name: string, age?: number): User {
  return {
    id: Math.random(),
    name,
    email: \`\${name.toLowerCase()}@example.com\`,
    ...(age && { age })
  };
}</code></pre>
      
      <h3>Interfaces vs Types</h3>
      <p>Both interfaces and types can be used to define object shapes, but they have subtle differences:</p>
      
      <pre><code>// Interface
interface Animal {
  name: string;
  age: number;
}

// Type alias
type Pet = {
  name: string;
  owner: string;
};

// Extending interfaces
interface Dog extends Animal {
  breed: string;
}

// Intersection types
type DogPet = Animal & Pet & {
  breed: string;
};</code></pre>
      
      <h3>Generics</h3>
      <p>Generics allow you to create reusable components that work with multiple types:</p>
      
      <pre><code>// Generic function
function identity&lt;T&gt;(arg: T): T {
  return arg;
}

// Generic interface
interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
}

// Usage
const userResponse: ApiResponse&lt;User&gt; = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};</code></pre>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Start with strict mode enabled</li>
        <li>Use interfaces for object shapes</li>
        <li>Prefer type inference when possible</li>
        <li>Use union types for multiple possibilities</li>
        <li>Leverage utility types like Partial, Pick, and Omit</li>
      </ul>
    `
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
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    prerequisites: ['Basic CSS knowledge'],
    relatedContent: ['react-fundamentals'],
    content: `
      <h2>Modern CSS Techniques</h2>
      <p>CSS has evolved significantly over the years. In this video tutorial, we'll explore the latest CSS features that will help you build better, more maintainable layouts.</p>
      
      <h3>What You'll Learn</h3>
      <ul>
        <li>CSS Grid Layout fundamentals</li>
        <li>Flexbox for one-dimensional layouts</li>
        <li>CSS Custom Properties (Variables)</li>
        <li>Container Queries</li>
        <li>CSS Logical Properties</li>
        <li>Modern CSS Functions</li>
      </ul>
      
      <h3>Prerequisites</h3>
      <p>Before watching this video, make sure you have a solid understanding of:</p>
      <ul>
        <li>Basic CSS selectors</li>
        <li>Box model concepts</li>
        <li>Basic layout techniques</li>
      </ul>
      
      <h3>Resources</h3>
      <p>Here are some helpful resources to supplement your learning:</p>
      <ul>
        <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer">CSS Grid Guide</a></li>
        <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer">Flexbox Guide</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank" rel="noopener noreferrer">CSS Custom Properties</a></li>
      </ul>
    `
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
    relatedContent: ['next-js-basics'],
    content: `
      <h2>API Design Principles</h2>
      <p>Designing good APIs is crucial for building maintainable and scalable applications. This tutorial covers the fundamental principles and best practices for API design.</p>
      
      <h3>RESTful API Design</h3>
      <h4>1. Resource-Based URLs</h4>
      <p>URLs should represent resources, not actions:</p>
      <pre><code>// Good
GET /users
GET /users/123
POST /users
PUT /users/123
DELETE /users/123

// Bad
GET /getUsers
GET /getUserById/123
POST /createUser
PUT /updateUser/123
DELETE /deleteUser/123</code></pre>
      
      <h4>2. HTTP Methods</h4>
      <ul>
        <li><strong>GET</strong> - Retrieve data</li>
        <li><strong>POST</strong> - Create new resources</li>
        <li><strong>PUT</strong> - Update entire resources</li>
        <li><strong>PATCH</strong> - Partial updates</li>
        <li><strong>DELETE</strong> - Remove resources</li>
      </ul>
      
      <h4>3. Status Codes</h4>
      <pre><code>// Success
200 OK - Request successful
201 Created - Resource created
204 No Content - Successful deletion

// Client Errors
400 Bad Request - Invalid request
401 Unauthorized - Authentication required
403 Forbidden - Access denied
404 Not Found - Resource not found
409 Conflict - Resource conflict

// Server Errors
500 Internal Server Error - Server error
502 Bad Gateway - Invalid response from upstream
503 Service Unavailable - Server temporarily unavailable</code></pre>
      
      <h3>API Versioning</h3>
      <p>Always version your APIs to maintain backward compatibility:</p>
      <pre><code>// URL versioning
/api/v1/users
/api/v2/users

// Header versioning
Accept: application/vnd.api+json;version=1

// Query parameter versioning
/api/users?version=1</code></pre>
      
      <h3>Error Handling</h3>
      <p>Provide consistent error responses:</p>
      <pre><code>{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}</code></pre>
      
      <h3>Security Best Practices</h3>
      <ul>
        <li>Use HTTPS for all API communications</li>
        <li>Implement proper authentication and authorization</li>
        <li>Validate all input data</li>
        <li>Use rate limiting to prevent abuse</li>
        <li>Don't expose sensitive information in error messages</li>
        <li>Implement proper CORS policies</li>
      </ul>
      
      <h3>GraphQL Considerations</h3>
      <p>When designing GraphQL APIs, consider:</p>
      <ul>
        <li>Schema design and type definitions</li>
        <li>Query complexity and depth limiting</li>
        <li>Proper error handling</li>
        <li>Caching strategies</li>
        <li>Security considerations</li>
      </ul>
    `
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
    relatedContent: ['api-design-principles'],
    content: `
      <h2>Database Optimization Techniques</h2>
      <p>Database performance is crucial for application scalability. This comprehensive resource covers various optimization techniques to improve database performance.</p>
      
      <h3>Query Optimization</h3>
      <h4>1. Index Usage</h4>
      <p>Proper indexing is the most effective way to improve query performance:</p>
      <pre><code>-- Create index on frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_date ON orders(order_date);

-- Composite indexes for multi-column queries
CREATE INDEX idx_user_status_created ON users(status, created_at);

-- Analyze query execution plan
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';</code></pre>
      
      <h4>2. Query Structure</h4>
      <pre><code>-- Avoid SELECT *
SELECT id, name, email FROM users WHERE active = true;

-- Use LIMIT for pagination
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 20;

-- Use EXISTS instead of IN for subqueries
SELECT * FROM users u 
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- Use JOINs instead of subqueries when possible
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;</code></pre>
      
      <h3>Schema Design</h3>
      <h4>Normalization vs Denormalization</h4>
      <p>Balance between normalization and performance:</p>
      <ul>
        <li><strong>Normalize</strong> to reduce data redundancy</li>
        <li><strong>Denormalize</strong> for read-heavy applications</li>
        <li>Consider materialized views for complex aggregations</li>
      </ul>
      
      <h4>Data Types</h4>
      <pre><code>-- Use appropriate data types
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    age SMALLINT,
    balance DECIMAL(10,2)
);</code></pre>
      
      <h3>Connection Management</h3>
      <ul>
        <li>Use connection pooling</li>
        <li>Configure appropriate pool sizes</li>
        <li>Monitor connection usage</li>
        <li>Implement connection timeouts</li>
      </ul>
      
      <h3>Caching Strategies</h3>
      <h4>1. Query Result Caching</h4>
      <pre><code>-- Redis caching example
const getCachedUser = async (userId) => {
  const cacheKey = \`user:\${userId}\`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
};</code></pre>
      
      <h4>2. Application-Level Caching</h4>
      <ul>
        <li>Cache frequently accessed data</li>
        <li>Implement cache invalidation strategies</li>
        <li>Use appropriate TTL values</li>
        <li>Monitor cache hit rates</li>
      </ul>
      
      <h3>Monitoring and Profiling</h3>
      <ul>
        <li>Monitor slow queries</li>
        <li>Track database performance metrics</li>
        <li>Use query profiling tools</li>
        <li>Set up alerts for performance issues</li>
      </ul>
      
      <h3>Scaling Strategies</h3>
      <h4>Vertical Scaling</h4>
      <ul>
        <li>Increase CPU and memory</li>
        <li>Use faster storage (SSD)</li>
        <li>Optimize database configuration</li>
      </ul>
      
      <h4>Horizontal Scaling</h4>
      <ul>
        <li>Read replicas for read-heavy workloads</li>
        <li>Database sharding for write-heavy workloads</li>
        <li>Partitioning large tables</li>
      </ul>
      
      <h3>Tools and Resources</h3>
      <ul>
        <li><strong>PostgreSQL</strong>: pg_stat_statements, EXPLAIN ANALYZE</li>
        <li><strong>MySQL</strong>: Performance Schema, slow query log</li>
        <li><strong>MongoDB</strong>: Profiler, explain() method</li>
        <li><strong>Monitoring</strong>: New Relic, DataDog, Prometheus</li>
      </ul>
    `
  }
];

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

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = learningContent.find(item => item.slug === slug);
  
  if (!content) {
    return {
      title: 'Content Not Found | Learning Center',
      description: 'The requested learning content was not found.'
    };
  }

  return {
    title: `${content.title} | Learning Center`,
    description: content.description,
    keywords: content.tags,
    authors: [{ name: content.author }],
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
      publishedTime: content.publishedAt,
      authors: [content.author],
      tags: content.tags,
    },
  };
}

// Generate static params for all learning content
export async function generateStaticParams() {
  return learningContent.map((content) => ({
    slug: content.slug,
  }));
}

export default async function LearningContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = learningContent.find(item => item.slug === slug);
  
  if (!content) {
    notFound();
  }

  const TypeIcon = typeIcons[content.type];
  const difficultyStyle = difficultyColors[content.difficulty];
  
  // Get related content
  const relatedContent = learningContent.filter(item => 
    content.relatedContent.includes(item.slug)
  );

  return (
    <ProgressTracker contentSlug={content.slug}>
      <div className="min-h-screen bg-black-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/learning"
            className="inline-flex items-center text-white-100 hover:text-purple transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Center
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-xs text-purple font-medium">{content.category}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyStyle}`}>
              {content.difficulty}
            </span>
            <div className="flex items-center text-xs text-white-100">
              <TypeIcon className="h-3 w-3 mr-1" />
              {content.type}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
          <p className="text-xl text-white-100 mb-6">{content.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-white-100">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {content.author}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {content.estimatedTime} min read
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 fill-current text-yellow-500" />
              {content.rating}
            </div>
          </div>
        </div>

        {/* Video Player for video content */}
        {content.type === 'video' && content.videoUrl && (
          <div className="mb-8">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer url={content.videoUrl} />
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {content.prerequisites && content.prerequisites.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Prerequisites</h3>
            <ul className="space-y-2">
              {content.prerequisites.map((prereq, index) => (
                <li key={index} className="text-white-100 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/[0.1] text-white-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Main Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <div 
            className="text-white-100 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/[0.2]">
            <h3 className="text-2xl font-bold text-white mb-6">Related Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedContent.map((related) => {
                const RelatedIcon = typeIcons[related.type];
                const relatedDifficultyStyle = difficultyColors[related.difficulty];
                
                return (
                  <Link
                    key={related.slug}
                    href={`/learning/${related.slug}`}
                    className="group bg-white/[0.05] border border-white/[0.2] rounded-lg p-6 hover:border-purple/50 transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <RelatedIcon className="h-5 w-5 text-purple" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${relatedDifficultyStyle}`}>
                        {related.difficulty}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-white-100 text-sm mb-3 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-white-100">
                        <Clock className="h-3 w-3 mr-1" />
                        {related.estimatedTime}min
                      </div>
                      <div className="flex items-center text-purple group-hover:translate-x-1 transition-transform">
                        <span className="text-sm">Read more</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    </ProgressTracker>
  );
} 