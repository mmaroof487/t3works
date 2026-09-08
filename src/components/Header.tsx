import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
            T3<span className="text-blue-600">Works</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Pricing
          </a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-900 hover:text-blue-600">Log in</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
