import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export interface TripRequest {
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  interests: string[];
  budget?: string;
}

export interface RouteResponse {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  stops: Array<{
    city: string;
    country: string;
    days: number;
    highlights: string[];
  }>;
  summary: string;
}

export function useGenerateRoute() {
  return useMutation({
    mutationFn: (body: TripRequest) =>
      api.post<RouteResponse>('/api/route', body).then((res) => res.data),
  });
}
