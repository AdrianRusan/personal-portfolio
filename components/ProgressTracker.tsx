'use client';

import { useEffect, useState, useMemo } from 'react';

interface ProgressTrackerProps {
  contentSlug: string;
  children: React.ReactNode;
}

export default function ProgressTracker({ contentSlug, children }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load existing progress from localStorage
    const savedProgress = localStorage.getItem(`learning-progress-${contentSlug}`);
    if (savedProgress) {
      setProgress(parseInt(savedProgress, 10));
    }
  }, [contentSlug]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Only update if progress has increased
      if (scrollPercent > progress) {
        setProgress(scrollPercent);
        localStorage.setItem(`learning-progress-${contentSlug}`, scrollPercent.toString());
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [contentSlug, progress, mounted]);

  return (
    <div>
      {/* Progress bar */}
      {mounted && (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/[0.1] z-50">
          <div 
            className="h-full bg-gradient-to-r from-purple to-blue transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
      
      {children}
    </div>
  );
}

// Hook to get progress for multiple content items
export function useContentProgress(contentSlugs: string[]) {
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const progress: Record<string, number> = {};
      
      contentSlugs.forEach((slug: string) => {
        const savedProgress = localStorage.getItem(`learning-progress-${slug}`);
        progress[slug] = savedProgress ? parseInt(savedProgress, 10) : 0;
      });
      
      setProgressData(progress);
    }
  }, [contentSlugs.length]); // Only depend on the length, not the array itself

  return { progressData, mounted };
} 