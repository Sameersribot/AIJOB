import { Link } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="flex items-center space-x-2">
              <Bot className="h-12 w-12 text-black" />
              <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 leading-tight">
              Land Your Dream Job with Ovalpod
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our AI agent helps you find and apply to the perfect jobs, automatically matching your skills with millions of opportunities worldwide.
            </p>
            <div className="flex gap-4">
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
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-pulse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2 mt-2"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1 h-12 bg-gray-50 rounded-lg p-3 border">
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}