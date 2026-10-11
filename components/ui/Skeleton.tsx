import { cn } from "@/lib/utils";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-100 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
};

export const ProjectSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-48 w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="flex space-x-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-8 rounded-full" />
      ))}
    </div>
  </div>
);


export const ExperienceSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="flex h-screen flex-col items-center justify-center space-y-6">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-12 w-96" />
    <Skeleton className="h-6 w-80" />
    <Skeleton className="h-12 w-40 rounded-full" />
  </div>
);