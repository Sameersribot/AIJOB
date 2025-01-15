import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
          <p className="text-gray-600 mb-8">
            Have questions about our AI job application service? We're here to help!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6" />
              <span>support@ovalpod.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6" />
              <span>+91 9889076248</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6" />
              <span>C-5 Avas Vikas, Unnao IN 209801</span>
            </div>
          </div>
        </div>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              rows={6}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}