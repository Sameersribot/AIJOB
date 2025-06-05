import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Eshant Yadav",
    role: "Chemical Engineer at IIPE",
    company: "IIPE",
    content: "Ovalpod transformed my Internship search journey. The AI-powered matching is incredibly accurate, It took a month and half to land the internship!",
    rating: 5
  },
  {
    name: "Ranvijay Tomar",
    role: "Product Manager",
    company: "Joy compact",
    content: "The automated application process saved me countless hours. The platform's ability to tailor applications for each role is remarkable.",
    rating: 5
  },
  {
    name: "Emily Chang",
    role: "UX Designer",
    company: "Creation Hall",
    content: "Hell yeah, saved a lot of time using ovalpod. I just waited for interview calls to come. Its too good!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of successful job seekers who have transformed their career search with Ovalpod
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-gray-600 absolute -top-4 -left-2 opacity-20" />
                <p className="text-gray-300 leading-relaxed relative z-10 text-center">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-white font-medium">Join 500+ successful job seekers</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}