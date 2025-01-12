import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <Features />
      <Stats />
    </div>
  );
}