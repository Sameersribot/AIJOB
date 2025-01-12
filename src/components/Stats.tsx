export default function Stats() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-16 text-center">
          <div className="group">
            <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">1M+</div>
            <div className="text-gray-300 text-lg">Jobs Analyzed Daily</div>
          </div>
          <div className="group">
            <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">95%</div>
            <div className="text-gray-300 text-lg">Application Success Rate</div>
          </div>
          <div className="group">
            <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">50K+</div>
            <div className="text-gray-300 text-lg">Happy Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}