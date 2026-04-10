interface SkeletonCardProps {
  viewMode: 'grid' | 'list';
}

export function SkeletonCard({ viewMode }: SkeletonCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-card shadow-sm">
        <div className="h-16 w-16 relative bg-black/10 dark:bg-white/10 rounded-lg shrink-0 animate-pulse" />
        <div className="flex flex-col flex-1 space-y-3">
          <div className="h-3 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          <div className="h-5 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full rounded-2xl border border-black/10 dark:border-white/10 bg-card overflow-hidden shadow-sm glass">
      <div className="h-40 w-full relative bg-black/5 dark:bg-white/5 flex flex-col items-end pt-3 pr-3 animate-pulse">
        <div className="h-5 w-12 bg-black/10 dark:bg-white/10 rounded-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col items-center justify-center border-t border-black/5 dark:border-white/5 bg-background/50">
        <div className="h-[28px] w-28 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

