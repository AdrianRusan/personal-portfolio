import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // OpenAI's GPT crawler for training and indexing
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        // Google's extended crawler for AI training
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        // Anthropic's Claude crawler
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        // Perplexity AI crawler
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        // Meta's AI crawler
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        // Bing AI crawler
        userAgent: 'bingbot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.adrian-rusan.com/sitemap.xml',
    host: 'https://www.adrian-rusan.com',
  };
}
