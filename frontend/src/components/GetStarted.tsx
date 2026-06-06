import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function GetStarted() {
  return (
    <section className="pt-20 pb-0 px-6 md:px-10 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(233,168,77,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-xl mx-auto text-center relative">
        <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
          Get started free
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight">
          Your next trip
          <br />
          starts here.
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Join 50,000+ travelers who've stopped juggling tabs and started going places.
        </p>

        <Link
          to="/plan"
          className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
        >
          Start planning
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Link>

        <p className="text-xs text-muted-foreground font-mono mt-4">
          Free forever · No credit card required
        </p>
      </div>
    </section>
  );
}
