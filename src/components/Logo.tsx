import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative group-hover:scale-110 transition-transform duration-300"
        >
          {/* Outer circle with gaps */}
          <path
            d="M50 0A50 50 0 0150 100A50 50 0 0150 0M50 10A40 40 0 0150 90A40 40 0 0150 10"
            className="fill-gray-900"
            fillRule="evenodd"
          />
          {/* Three horizontal lines */}
          <rect x="30" y="42" width="40" height="4" className="fill-gray-900" />
          <rect x="30" y="48" width="40" height="4" className="fill-gray-900" />
          <rect x="30" y="54" width="40" height="4" className="fill-gray-900" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-black to-black">
          OVALPOD
        </span>
        <span className="text-xs text-gray-500 font-medium">Job Hunting Agent</span>
      </div>
    </Link>
  );
}