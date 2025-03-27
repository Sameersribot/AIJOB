import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Stats />
      
      {/* Call to Action */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
              <p className="text-gray-400 text-xl">Join thousands of successful job seekers today.</p>
            </div>
            <Link
              to="/pricing"
              className="group bg-white text-black px-8 py-4 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
            >
              <Bot className="h-5 w-5" />
              <span>Start Now</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      {/* Legal links */}
       <div className="bg-black pt-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
         <div className="flex justify-end space-x-4 text-xs text-gray-500">
           <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
           <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms and Conditions</Link>
           <Link to="/aboutus" className="hover:text-gray-300 transition-colors">About Us</Link>
         </div>
       </div>
     </div>
    </div>
  );
}