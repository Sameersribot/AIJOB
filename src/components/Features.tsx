import { Search, Sparkles, CheckCircle, BriefcaseIcon, Bot, Zap } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "Our AI analyzes millions of job postings in real-time to find positions that perfectly match your skills, experience, and career goals."
  },
  {
    icon: Bot,
    title: "Automated Applications",
    description: "Save hours of time with our AI that automatically fills out job applications, tailoring each submission to the specific role and company."
  },
  {
    icon: Sparkles,
    title: "Application Optimization",
    description: "Get personalized resumes and cover letters optimized for each position, increasing your chances of getting noticed by recruiters."
  },
  {
    icon: Zap,
    title: "Real-time Search",
    description: "Searches and Applies instantly when new jobs matching your profile are posted, ensuring you're always first in line."
  },
  {
    icon: CheckCircle,
    title: "Company Analysis",
    description: "Our AI analyzes your profile and compares it with the values & mission of companies to apply for the best matches."
  },
  {
    icon: BriefcaseIcon,
    title: "Career Tracking",
    description: "Monitor all your applications, interviews, and follow-ups in one centralized dashboard with smart reminders and insights."
  }
];

export default function Features() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
          How Ovalpod Works
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our AI technology streamlines your entire Job Apply process
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="group relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            <div className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="mb-6">
                <div className="inline-block p-3 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-gray-900" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 bg-black text-white rounded-3xl p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">See Ovalpod in Action</h3>
            <p className="text-gray-300 text-lg mb-8">
              Watch how our AI transforms your job search process, making it faster and more effective than ever before.
            </p>
            <button
              onClick={() => setIsPlaying(true)}
              className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bot className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden border-4 border-gray-700">
              {isPlaying ? (
                <iframe  
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/4OUyYq4E4-U?autoplay=1"
                  title="Ovalpod Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
