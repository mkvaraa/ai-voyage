import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export type LoadingSkeletonVariant = 'route' | 'stop' | 'map';

export type LoadingSkeletonProps = {
  variant?: LoadingSkeletonVariant;
  className?: string;
};

export default function LoadingSkeleton({ variant = 'route', className }: LoadingSkeletonProps) {
  if (variant === 'stop') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading stop"
        className={cn('w-full', className)}
      >
        <StopCardSkeleton />
        <span className="sr-only">Loading stop...</span>
      </div>
    );
  }

  if (variant === 'map') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading map"
        className={cn('w-full', className)}
      >
        <Skeleton className="h-full min-h-[500px] w-full rounded-none" />
        <span className="sr-only">Loading map...</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading route"
      className={cn('flex w-full flex-col gap-4', className)}
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {Array.from({ length: 3 }).map((_, dayIdx) => (
        <Card key={dayIdx}>
          <CardHeader>
            <Skeleton className="h-5 w-1/2" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((__, stopIdx) => (
              <StopCardSkeleton key={stopIdx} />
            ))}
          </CardContent>
        </Card>
      ))}

      <span className="sr-only">Loading route...</span>
    </div>
  );
}

function StopCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-2/3" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </CardContent>
    </Card>
  );
}
