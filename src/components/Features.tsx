import { Search, Sparkles, CheckCircle, BriefcaseIcon, Bot, Zap, FileText, MapPin, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "Our AI analyzes millions of job postings in real-time to find positions that perfectly match your skills and goals.",
    demoSteps: [
      { text: "Analyzing skills...", icon: FileText },
      { text: "Scanning job market...", icon: Search },
      { text: "Finding matches...", icon: CheckCircle },
    ]
  },
  {
    icon: Bot,
    title: "AI Application Assistant",
    description: "Watch our AI automatically fill out job applications, tailoring each submission to the specific role.",
    demoSteps: [
      { text: "Scanning profile...", icon: Search },
      { text: "Filling Up form...", icon: FileText },
      { text: "Submitting application...", icon: CheckCircle },
    ]
  },
  {
    icon: Sparkles,
    title: "Resume Optimization",
    description: "Get personalized resumes and cover letters optimized for each position using Ultra plan.",
    demoSteps: [
      { text: "Analyzing job requirements...", icon: Search },
      { text: "Optimizing keywords...", icon: Sparkles },
      { text: "Enhancing content...", icon: CheckCircle },
    ]
  }
];

const steps = [
  {
    icon: FileText,
    title: "Complete Your Profile",
    description: "Simply complete your profile and our AI will analyze your skills and experience."
  },
  {
    icon: MapPin,
    title: "Set Your Preferences",
    description: "Tell us about your dream job, preferred locations."
  },
  {
    icon: Bot,
    title: "AI Takes Over",
    description: "Our AI starts searching and applying to matching positions on your behalf."
  },
  {
    icon: BriefcaseIcon,
    title: "Track Progress",
    description: "Monitor applications and get real-time updates on your job search progress."
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % features[activeFeature].demoSteps.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeFeature]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
            Experience the Future of Job Search
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform revolutionizes how you find and apply for jobs, making the process effortless and more successful.
          </p>
        </div>

        {/* Interactive Feature Demo */}
        <div className="mb-16 md:mb-32">
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`relative p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-pointer
                  ${activeFeature === index ? 'bg-black text-white scale-105' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="mb-4 md:mb-6 relative">
                  <div className={`absolute inset-0 bg-black/5 rounded-full blur-lg transition-opacity duration-300
                    ${activeFeature === index ? 'opacity-100' : 'opacity-0'}`}></div>
                  <feature.icon 
  className={`h-10 w-10 md:h-12 md:w-12 relative ${activeFeature === index ? 'text-white animate-bounce' : 'text-black'}`} 
/>

                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{feature.title}</h3>
                <p className={`text-sm md:text-base leading-relaxed ${activeFeature === index ? 'text-gray-300' : 'text-gray-600'}`}>
  {feature.description}
</p>


                {/* Feature Demo Animation */}
                <div className={`mt-4 md:mt-6 p-3 md:p-4 rounded-lg ${activeFeature === index ? 'bg-white/10' : 'bg-white'}`}>
                <div className="flex items-center space-x-2 md:space-x-3">
                    {features[index].demoSteps.map((step, stepIndex) => {
                      const StepIcon = step.icon;
                      const isCurrent = activeFeature === index && demoStep === stepIndex;
                      return (
                        <div key={stepIndex} className="flex-1">
                          <div className={`flex items-center justify-center transition-all duration-300
                            ${isCurrent ? 'scale-110' : 'scale-100'}`}>
                            <StepIcon className={`h-5 w-5 md:h-6 md:w-6 transition-colors duration-300
                              ${isCurrent ? 'text-green-400' : activeFeature === index ? 'text-gray-400' : 'text-gray-400'}`}
                            />
                          </div>
                          {isCurrent && (
                            <div className={`text-xs mt-2 text-center transition-opacity duration-300
                              ${isAnimating ? 'opacity-0' : 'opacity-100'}
                              ${activeFeature === index ? 'text-gray-300' : 'text-gray-600'}`}>
                              {step.text}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">How It Works</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and let our AI handle your job search
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200">
                  <div className="absolute top-0 left-0 w-0 h-full bg-black transform -translate-y-1/2 group-hover:w-full transition-all duration-500"></div>
                </div>
              )}
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4 text-center">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}