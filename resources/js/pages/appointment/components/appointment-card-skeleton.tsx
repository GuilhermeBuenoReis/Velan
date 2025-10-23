import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AppointmentCardSkeleton() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="p-3">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-3 w-3/4 mb-2" />
        <Skeleton className="h-5 w-16" />
      </CardContent>
    </Card>
  );
}
