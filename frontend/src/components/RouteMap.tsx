import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useMemo, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, { Marker, type MapRef } from 'react-map-gl';

import type { Day, Stop } from '@/types/route';

const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

if (token) {
  mapboxgl.accessToken = token;
}

interface RouteMapProps {
  days: Day[];
}

const ROME_LAT = 41.9;
const ROME_LNG = 12.5;

const pinClassForType = (type: Stop['type']): string => {
  switch (type) {
    case 'restaurant':
    case 'food':
      return 'bg-orange-500 ring-orange-200';
    case 'hotel':
      return 'bg-green-500 ring-green-200';
    case 'attraction':
    default:
      return 'bg-blue-500 ring-blue-200';
  }
};

export default function RouteMap({ days }: RouteMapProps) {
  const mapRef = useRef<MapRef | null>(null);

  const stops = useMemo<Stop[]>(() => days.flatMap((day) => day.stops), [days]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || stops.length === 0) return;

    if (stops.length === 1) {
      map.easeTo({ center: [stops[0].lng, stops[0].lat], zoom: 13, duration: 600 });
      return;
    }

    const bounds = new mapboxgl.LngLatBounds();
    stops.forEach((stop) => bounds.extend([stop.lng, stop.lat]));

    map.fitBounds(bounds, { padding: 48, duration: 600, maxZoom: 15 });
  }, [stops]);

  if (!token) {
    return (
      <div
        style={{ width: '100%', height: 500 }}
        className="flex items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground"
      >
        Map unavailable: VITE_MAPBOX_TOKEN is not set.
      </div>
    );
  }

  const initial = stops[0];

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{
        latitude: initial?.lat ?? ROME_LAT,
        longitude: initial?.lng ?? ROME_LNG,
        zoom: 12,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {stops.map((stop) => (
        <Marker key={stop.id} latitude={stop.lat} longitude={stop.lng} anchor="bottom">
          <div
            title={stop.name}
            className={`h-4 w-4 rounded-full ring-2 ring-offset-1 ring-offset-white shadow ${pinClassForType(
              stop.type
            )}`}
          />
        </Marker>
      ))}
    </Map>
  );
}
