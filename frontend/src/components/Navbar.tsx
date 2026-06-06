import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl justify-between items-center gap-2 px-4">
        <NavLink to="/" end>
          <span className="mr-4 bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            AI-Voyage
          </span>
        </NavLink>
        <NavLink
          to="/plan"
          className={({ isActive }) =>
            `group inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
            }`
          }
        >
          Plan your trip
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </NavLink>
      </div>
    </nav>
  );
}
