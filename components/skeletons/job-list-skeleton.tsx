export default function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-muted/40 animate-pulse rounded-md border p-4">
          <div className="bg-muted mb-2 h-4 w-1/3 rounded"></div>
          <div className="bg-muted mb-1 h-3 w-1/4 rounded"></div>
          <div className="bg-muted h-3 w-2/3 rounded"></div>
        </div>
      ))}
    </div>
  );
}
