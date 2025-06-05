import { Bot, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 text-sm">
              Your AI-powered job search assistant, making applications smarter and more efficient.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-coral to-coral/80 rounded-full flex items-center justify-center group cursor-pointer">
                <Bot className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-charcoal">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-charcoal transition-colors duration-300 text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-coral after:to-coral/80 after:transition-transform hover:after:scale-x-100"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-600 hover:text-charcoal transition-colors duration-300 text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-coral after:to-coral/80 after:transition-transform hover:after:scale-x-100"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-charcoal transition-colors duration-300 text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-coral after:to-coral/80 after:transition-transform hover:after:scale-x-100"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-charcoal">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-misty rounded-lg flex items-center justify-center group-hover:bg-coral/10 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-coral" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-charcoal transition-colors duration-300">
                  support@ovalpod.com
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-misty rounded-lg flex items-center justify-center group-hover:bg-coral/10 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-coral" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-charcoal transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-misty rounded-lg flex items-center justify-center group-hover:bg-coral/10 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-coral" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-charcoal transition-colors duration-300">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-charcoal">Get Started</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ready to transform your job search with AI? Join Ovalpod today!
            </p>
            <Link
              to="/signup"
              className="w-full bg-gradient-to-r from-coral to-coral/80 text-white px-6 py-3 rounded-lg hover:from-coral/90 hover:to-coral/70 transition-all duration-300 text-sm font-medium shadow-lg shadow-coral/20 hover:shadow-coral/30 flex items-center justify-center group"
            >
              Sign Up Now
              <Bot className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/80">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Ovalpod. All rights reserved.
            </p>
            <div className="flex space-x-8">
              
<Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
<Link to="/terms" className="hover:text-gray-300 transition-colors">Terms and Conditions</Link>
<Link to="/aboutus" className="hover:text-gray-300 transition-colors">About Us</Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}