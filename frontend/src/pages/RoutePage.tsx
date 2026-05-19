import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import StopCard from '@/components/StopCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import mockRoute from '@/mocks/route-response.json';
import type { Day, RouteResponse } from '@/types/route';

const route = mockRoute as RouteResponse;

const formatDayDate = (iso: string): string => {
  try {
    return format(parseISO(iso), 'MMMM d');
  } catch {
    return iso;
  }
};

export default function RoutePage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{route.title}</h1>
        <p className="text-sm text-muted-foreground">
          {route.days.length} {route.days.length === 1 ? 'day' : 'days'} · Estimated{' '}
          {route.currency} {route.total_budget_estimate.toLocaleString()}
          {slug ? ` · ${slug}` : null}
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {route.days.map((day) => (
          <DaySection key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
}

function DaySection({ day }: { day: Day }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Day {day.day} — {formatDayDate(day.date)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {day.stops.map((stop) => (
          <StopCard key={stop.id} stop={stop} />
        ))}
      </CardContent>
    </Card>
  );
}
