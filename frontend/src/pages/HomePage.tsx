import Features from '@/components/Features';
import GetStarted from '@/components/GetStarted';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <GetStarted />
    </>
  );
}
