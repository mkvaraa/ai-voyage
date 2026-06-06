import { Clock, Globe, Map, RefreshCw, Share2, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Personalization',
      desc: "Tell us your vibe — 'contemporary art, vintage stores, vegan food' — and watch a full itinerary take shape in seconds.",
    },
    {
      icon: Map,
      title: 'Live Map Visualization',
      desc: 'Every stop appears on an interactive map with optimized routing. No more bouncing between tabs.',
    },
    {
      icon: RefreshCw,
      title: 'One-Click Micro-Editing',
      desc: 'Dislike a suggestion? Click Replace. The AI swaps only that item while keeping the rest of your plan perfectly intact.',
    },
    {
      icon: Clock,
      title: 'Logistics Built In',
      desc: 'Opening hours, transit times, and check-in windows are all calculated automatically. Your schedule is always realistic.',
    },
    {
      icon: Share2,
      title: 'Instant Sharing',
      desc: 'Every itinerary lives at a short, beautiful URL. Share with travel companions in one click.',
    },
    {
      icon: Globe,
      title: '127+ Destinations',
      desc: 'Tokyo to Tallinn. Local gems, cultural context, and off-the-beaten-path discoveries included by default.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-10 lg:px-16 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
            Capabilities
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold max-w-sm">
            Built for how you actually travel
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
