import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-100 dark:bg-slate-800 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export const ProjectSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col space-y-4 p-4 rounded-lg border border-white/[0.1] bg-black-100/50"
  >
    {/* Project image */}
    <Skeleton className="h-48 w-full rounded-xl" />
    
    {/* Project title */}
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    
    {/* Project description */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    
    {/* Technology stack */}
    <div className="flex space-x-2 justify-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-full" />
      ))}
    </div>
    
    {/* Action buttons */}
    <div className="flex space-x-3 pt-4">
      <Skeleton className="h-10 w-24 rounded-md" />
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  </motion.div>
);

export const TestimonialSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-4 p-6 rounded-lg border border-white/[0.1] bg-black-100/50"
  >
    {/* Client info */}
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    
    {/* Rating */}
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
      ))}
    </div>
    
    {/* Testimonial text */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </motion.div>
);

export const ExperienceSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-4 p-4 rounded-lg border border-white/[0.1] bg-black-100/50">
        {/* Company logo */}
        <Skeleton className="h-12 w-12 rounded-lg mx-auto" />
        
        {/* Job title */}
        <Skeleton className="h-5 w-3/4 mx-auto" />
        
        {/* Company name */}
        <Skeleton className="h-4 w-2/3 mx-auto" />
        
        {/* Duration */}
        <Skeleton className="h-3 w-1/2 mx-auto" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton key={j} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

export const HeroSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex h-screen flex-col items-center justify-center space-y-8"
  >
    {/* Tagline */}
    <Skeleton className="h-6 w-64" />
    
    {/* Main title */}
    <div className="space-y-4 text-center">
      <Skeleton className="h-12 w-96 mx-auto" />
      <Skeleton className="h-12 w-80 mx-auto" />
    </div>
    
    {/* Description */}
    <div className="space-y-2 text-center">
      <Skeleton className="h-6 w-80 mx-auto" />
      <Skeleton className="h-6 w-72 mx-auto" />
    </div>
    
    {/* CTA Buttons */}
    <div className="flex space-x-4">
      <Skeleton className="h-12 w-40 rounded-lg" />
      <Skeleton className="h-12 w-40 rounded-lg" />
    </div>
  </motion.div>
);

export const GitHubShowcaseSkeleton = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="py-20" 
    aria-label="GitHub showcase loading"
  >
    <div className="max-w-7xl mx-auto px-4">
      {/* Section title */}
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-black-200/50 rounded-lg p-6 border border-white/[0.1]">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Top Languages */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 bg-black-200/50 px-4 py-2 rounded-lg border border-white/[0.1]">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Repositories */}
      <div>
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-black-200/50 rounded-lg p-6 border border-white/[0.1]">
              {/* Repository header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              
              {/* Description */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Language and stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

// Enhanced loading skeleton for forms
export const FormSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-6 p-6 rounded-lg border border-white/[0.1] bg-black-100/50"
  >
    {/* Form title */}
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-5 w-64 mx-auto" />
    </div>
    
    {/* Form fields */}
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      ))}
    </div>
    
    {/* Submit button */}
    <Skeleton className="h-12 w-full rounded-md" />
  </motion.div>
);

// Enhanced loading skeleton for navigation
export const NavigationSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex items-center justify-center space-x-6 p-4 rounded-lg bg-black-100/50"
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="h-8 w-16 rounded-md" />
    ))}
  </motion.div>
);