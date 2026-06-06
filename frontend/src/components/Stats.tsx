export default function Stats() {
  const stats = [
    { value: '50K+', label: 'Itineraries generated' },
    { value: '127', label: 'Countries covered' },
    { value: '4.9★', label: 'Average rating' },
    { value: '<30s', label: 'Time to your plan' },
  ];
  return (
    <section className="py-14 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="font-display text-4xl font-semibold mb-1 text-primary">{s.value}</div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest leading-tight">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
