import { MapPin, RefreshCw, Share2 } from 'lucide-react';

export default function ItineraryCard({
  activeDay,
  setActiveDay,
  replacingIdx,
  handleReplace,
  compact,
}: {
  activeDay: number;
  setActiveDay: (i: number) => void;
  replacingIdx: number | null;
  handleReplace: (i: number) => void;
  compact: boolean;
}) {
  const itineraryDays = [
    {
      day: 1,
      label: 'Arrival & Shinjuku',
      date: 'Mon, Sep 14',
      items: [
        {
          time: '14:00',
          activity: 'Check in — Shinjuku Granbell Hotel',
          type: 'hotel',
          duration: '30 min',
        },
        {
          time: '16:30',
          activity: 'Shinjuku Gyoen National Garden',
          type: 'sight',
          duration: '2 hrs',
        },
        {
          time: '19:00',
          activity: 'Dinner · Ichiran Ramen (private booth)',
          type: 'food',
          duration: '1 hr',
        },
        {
          time: '21:00',
          activity: 'Evening walk through Kabukicho',
          type: 'walk',
          duration: '1 hr',
        },
      ],
    },
    {
      day: 2,
      label: 'Harajuku & Shibuya',
      date: 'Tue, Sep 15',
      items: [
        {
          time: '09:00',
          activity: 'Breakfast · % Arabica Omotesando',
          type: 'food',
          duration: '45 min',
        },
        {
          time: '10:30',
          activity: 'Takeshita Street & vintage boutiques',
          type: 'shop',
          duration: '2 hrs',
        },
        {
          time: '13:00',
          activity: 'Lunch · Afuri Ramen, Harajuku',
          type: 'food',
          duration: '1 hr',
        },
        {
          time: '15:00',
          activity: 'Shibuya Crossing & Hachiko statue',
          type: 'sight',
          duration: '1.5 hrs',
        },
      ],
    },
    {
      day: 3,
      label: 'Asakusa & Akihabara',
      date: 'Wed, Sep 16',
      items: [
        {
          time: '08:30',
          activity: 'Morning at Senso-ji Temple',
          type: 'sight',
          duration: '1.5 hrs',
        },
        { time: '11:00', activity: 'Nakamise Shopping Street', type: 'shop', duration: '1 hr' },
        {
          time: '13:30',
          activity: 'Lunch · Daikokuya Tempura (est. 1887)',
          type: 'food',
          duration: '1 hr',
        },
        {
          time: '16:00',
          activity: 'Akihabara electronics district',
          type: 'sight',
          duration: '2 hrs',
        },
      ],
    },
  ];

  const typeConfig: Record<string, { color: string; label: string }> = {
    hotel: { color: 'text-blue-400', label: 'Stay' },
    sight: { color: 'text-amber-400', label: 'See' },
    food: { color: 'text-rose-400', label: 'Eat' },
    shop: { color: 'text-violet-400', label: 'Shop' },
    walk: { color: 'text-emerald-400', label: 'Walk' },
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Destination photo header */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&h=350&fit=crop&auto=format"
          alt="Tokyo cityscape at night"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--card) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-4 right-4 font-mono text-xs px-2.5 py-1 rounded-md font-medium"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          AI-generated
        </div>
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs font-bold mb-1">
              <MapPin className="w-3 h-3" /> Tokyo, Japan
            </div>
            <div className="font-display text-lg font-semibold">3-day Itinerary</div>
          </div>
          <div className="font-mono text-xs text-muted-foreground">Sep 14 – 17</div>
        </div>
      </div>

      {/* Day tabs */}
      <div className="flex border-b border-border">
        {itineraryDays.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex-1 py-3 text-center transition-colors duration-200 ${
              activeDay === i
                ? 'border-b-2 bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={
              activeDay === i ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : {}
            }
          >
            <div className="text-xs font-mono">Day {d.day}</div>
            {!compact && (
              <div className="text-[10px] text-muted-foreground hidden sm:block mt-0.5">
                {d.label}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Activity list */}
      <div className={`p-5 space-y-2.5 ${compact ? 'max-h-60 overflow-y-auto' : ''}`}>
        {itineraryDays[activeDay].items.map((item, i) => (
          <div
            key={`${activeDay}-${i}`}
            className={`flex items-start gap-3 p-3.5 rounded-xl group border border-transparent hover:border-border cursor-default transition-all duration-200 ${
              replacingIdx === i ? 'opacity-25' : 'opacity-100'
            }`}
            style={{ background: 'rgba(255, 255, 255, 0.5)' }}
          >
            <span className="font-mono text-xs text-muted-foreground w-10 shrink-0 mt-0.5">
              {item.time}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{item.activity}</div>
              <div
                className={`text-xs mt-0.5 ${
                  typeConfig[item.type]?.color ?? 'text-muted-foreground'
                }`}
              >
                {typeConfig[item.type]?.label} · {item.duration}
              </div>
            </div>
            <button
              onClick={() => handleReplace(i)}
              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary duration-200"
              title="Replace this item"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${replacingIdx === i ? 'animate-spin' : ''}`} />
              {!compact && <span className="hidden sm:inline text-[11px]">Replace</span>}
            </button>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div className="px-5 py-3.5 border-t border-border flex items-center justify-between text-xs">
        <div className="font-mono text-muted-foreground">
          Budget: <span style={{ color: 'var(--primary)' }}>¥120,000</span> / 3 days
        </div>
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200">
          <Share2 className="w-3.5 h-3.5" />
          Share link
        </button>
      </div>
    </div>
  );
}
