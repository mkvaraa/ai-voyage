import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Tell us your vision',
      desc: "Enter destination, dates, budget, and interests. Be specific — 'vegan food + street art + vintage markets' is exactly what we want.",
    },
    {
      n: '02',
      title: 'AI builds your plan',
      desc: 'Our system generates a full day-by-day itinerary with times, places, and routes — instantly visualized on a map.',
    },
    {
      n: '03',
      title: 'Refine and share',
      desc: "Swap anything you don't love. Adjust the budget. Then share a live link with your group in one click.",
    },
  ];

  return (
    <section id="how" className="py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
            Process
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">How it works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="font-display text-8xl font-bold leading-none mb-6 select-none pointer-events-none text-primary/15">
                {s.n}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-10 -right-4 size-6 text-muted-foreground/30 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
