import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
            Land Your Dream Job with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our AI agent helps you find and apply to the perfect jobs, automatically matching your skills with millions of opportunities worldwide.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-black text-black px-8 py-4 rounded-lg hover:bg-black hover:text-white transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}