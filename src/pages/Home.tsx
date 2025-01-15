import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      <div className="space-y-20">
        <Hero />
        <Features />
        <Stats />
      </div>
      
      {/* Legal links */}
      <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex justify-end space-x-4 text-xs text-gray-500">
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
        </div>
      </div>
    </div>
    </div>
  );
}