import { Search, Sparkles, CheckCircle, BriefcaseIcon, Bot, Zap } from 'lucide-react';

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
    title: "Real-time Alerts",
    description: "Receive instant notifications when new jobs matching your profile are posted, ensuring you're always first in line."
  },
  {
    icon: CheckCircle,
    title: "Interview Preparation",
    description: "Practice with our AI interviewer that provides real-time feedback and personalized coaching for your upcoming interviews."
  },
  {
    icon: BriefcaseIcon,
    title: "Career Tracking",
    description: "Monitor all your applications, interviews, and follow-ups in one centralized dashboard with smart reminders and insights."
  }
];

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-white">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
          Powered by Advanced AI
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our AI technology searches through millions of jobs to find your perfect match and automates the entire application process.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="group p-8 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
          >
            <div className="mb-6 relative">
              <div className="absolute -inset-2 bg-black/5 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
              <feature.icon className="h-12 w-12 relative text-black group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}