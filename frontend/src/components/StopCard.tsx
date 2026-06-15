import { Clock, ExternalLink, MapPin, RefreshCw } from 'lucide-react';

import LoadingSkeleton from '@/components/LoadingSkeleton';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Stop, StopType } from '@/types/route';

const TYPE_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  landmark: 'default',
  attraction: 'default',
  museum: 'secondary',
  food: 'secondary',
  restaurant: 'secondary',
  nature: 'outline',
  shopping: 'outline',
  entertainment: 'secondary',
  transport: 'outline',
  hotel: 'outline',
};

const typeVariant = (type: StopType) => TYPE_VARIANT[type as string] ?? 'secondary';

function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return '—';
  const total = Math.round(minutes);
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  return mins === 0 ? `${hours} hr` : `${hours} hr ${mins} min`;
}

const formatTypeLabel = (type: string) =>
  type.length > 0 ? type[0].toUpperCase() + type.slice(1) : type;

export type StopCardProps = {
  stop: Stop;
  className?: string;
  onReplace?: () => void;
  isReplacing?: boolean;
};

export default function StopCard({ stop, className, onReplace, isReplacing }: StopCardProps) {
  if (stop.type === 'loading' || isReplacing) {
    return <LoadingSkeleton variant="stop" className={className} />;
  }

  const hasBooking = Boolean(stop.booking_url?.trim());

  return (
    <Card className={cn('group relative overflow-hidden', className)}>
      <CardContent className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold leading-tight sm:text-base">{stop.name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant={typeVariant(stop.type)} className="capitalize">
                {formatTypeLabel(stop.type)}
              </Badge>
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden="true" className="size-3.5" />
                {formatDuration(stop.duration_minutes)}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden="true" className="size-3.5" />
                {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
              </span>
            </div>
          </div>
          {onReplace ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReplace}
              disabled={isReplacing}
              className="opacity-100 transition-opacity focus-visible:opacity-100 xl:opacity-0 xl:group-hover:opacity-100"
              aria-label={`Replace ${stop.name}`}
            >
              <RefreshCw aria-hidden="true" className="size-3.5" />
              Replace
            </Button>
          ) : null}
        </div>

        {stop.notes ? (
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{stop.notes}</p>
        ) : null}

        {hasBooking ? (
          <div>
            <Button asChild variant="outline" size="sm">
              <a
                href={stop.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open booking page for ${stop.name} in a new tab`}
              >
                <ExternalLink aria-hidden="true" className="size-3.5" />
                Book / Learn more
              </a>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
