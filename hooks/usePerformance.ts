import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}

export const usePerformance = () => {
  const reportMetric = useCallback((metric: PerformanceMetrics) => {
    // Report to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: Object.keys(metric)[0],
        value: Math.round(Object.values(metric)[0] || 0),
        non_interaction: true,
      });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          reportMetric({ LCP: entry.startTime });
        }
        
        if (entry.entryType === 'first-input') {
          reportMetric({ FID: entry.processingStart - entry.startTime });
        }
        
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          reportMetric({ CLS: entry.value });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Observer not supported
    }

    // Monitor First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric({ FCP: entry.startTime });
        }
      }
    });

    try {
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Monitor Navigation Timing
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navigation = navigationEntries[0];
      const ttfb = navigation.responseStart - navigation.requestStart;
      reportMetric({ TTFB: ttfb });
    }

    return () => {
      observer.disconnect();
      paintObserver.disconnect();
    };
  }, [reportMetric]);
};