import { Play } from 'lucide-react';

export default function DemoVideo() {
  return (
    <div id="demo-video" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See Ovalpod in Action</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch how our AI assistant transforms your job search process, from finding the perfect match to submitting tailored applications.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Container with 16:9 aspect ratio */}
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/g5m9LsFcZpk?autoplay=0&controls=1&rel=0&modestbranding=1"
              title="JobAI Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Key Features Below Video */}
          <div className="bg-gradient-to-b from-black/90 to-black mt-8 p-12 rounded-b-2xl">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
                <p className="text-gray-400 text-sm">
                  Watch AI analyze job requirements and match them with your skills
                </p>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Auto Applications</h3>
                <p className="text-gray-400 text-sm">
                  See how our AI fills out applications with tailored responses
                </p>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-gray-400 text-sm">
                  Learn how to track and manage all your applications in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}