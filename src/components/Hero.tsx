import { Link } from 'react-router-dom';
import { Bot, Sparkles, CheckCircle, ArrowRight, Award, Target, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const demoText = [
  "Analyzing job requirements...",
  "Matching your skills...",
  "Optimizing resume...",
  "Customizing cover letter...",
  "Submitting application..."
];

const benefits = [
  "AI-powered job matching",
  "Automated applications",
  "Smart resume optimization",
  "Real-time tracking"
];

const achievements = [
  {
    icon: Award,
    title: "Acquire",
    description: "Acquire relevant skills"
  },
  {
    icon: Target,
    title: "Practice",
    description: "Practice those skills"
  },
  {
    icon: Bot,
    title: "Automate",
    description: "Automate your Job hunting process"
  }
];
export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % demoText.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-video');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center md:text-left space-y-6 md:space-y-8">
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 rounded-full blur-2xl transform animate-pulse"></div>
                <Bot className="h-16 md:h-20 w-16 md:w-20 text-black relative animate-bounce" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -right-2 top-0 animate-spin" />
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                Ovalpod AI              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 leading-tight py-3">
              Your AI Agent for Job Hunting
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Let our AI agent handle your entire job search process - from finding the perfect match to submitting tailored applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
              <Link
                to="/pricing"
                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 font-bold text-white transition-all duration-200 bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <span className="relative text-white group-hover:text-white flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
              
              <button
                onClick={scrollToDemo}
                className="relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 font-bold transition-all duration-200 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                See How It Works
              </button>
            </div>

            <div className="space-y-4 pt-8 text-left">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm bg-black text-green-400 p-4 rounded-lg h-24 md:h-32 flex items-center justify-center">
              <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-gray-500">&gt;</span> {demoText[currentTextIndex]}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
                <div className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">2x</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Success Rate</div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
                <div className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">10K+</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Jobs Searched</div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
                <div className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">500+</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Happy Users</div>
              </div>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.title} className="bg-white/80 backdrop-blur rounded-xl p-4 md:p-6 text-center group hover:bg-black hover:text-white transition-all duration-300">
                    <Icon className="h-6 md:h-8 w-6 md:w-8 mx-auto mb-2 md:mb-3 group-hover:text-white transition-colors" />
                    <h3 className="font-semibold mb-1 text-xs md:text-sm">{achievement.title}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-300 hidden md:block">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}