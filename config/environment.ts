const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

export const config = {
  // Environment flags
  isDevelopment,
  isProduction,
  isTest,

  // Site configuration
  site: {
    name: 'Adrian Rusan | Full-Stack Engineer',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.adrian-rusan.com',
    description: 'Explore the portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience in web development.',
    email: 'contact@adrian-rusan.com',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    vercelAnalytics: isProduction,
    sentryDsn: process.env.SENTRY_DSN,
  },

  // Performance
  performance: {
    enableServiceWorker: isProduction,
    enableImageOptimization: true,
    bundleAnalyzer: process.env.ANALYZE === 'true',
  },

  // Feature flags
  features: {
    blog: false, // Enable when blog is implemented
    contactForm: true,
    testimonials: true,
    darkMode: true,
    calendly: true,
  },

  // Social media links
  social: {
    github: 'https://github.com/AdrianRusan',
    linkedin: 'https://www.linkedin.com/in/adrian-rusan/',
    twitter: undefined,
  },

  // Content
  content: {
    resumeUrl: '#', // Placeholder - replace with actual resume URL
    maxProjects: 10,
    maxTestimonials: 5,
  },

  // Calendly integration
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/adrian-rusan',
    prefill: {
      name: '',
      email: '',
    },
    utm: {
      utmCampaign: 'portfolio',
      utmSource: 'website',
      utmMedium: 'embedded_widget',
    },
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
] as const;

export const validateEnvironment = () => {
  if (isProduction) {
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }
  }
};

// Runtime environment check
if (typeof window === 'undefined') {
  validateEnvironment();
}