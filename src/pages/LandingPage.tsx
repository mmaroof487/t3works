import Hero from '../components/Hero';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <div
        id="cases"
        className="min-h-screen flex items-center justify-center bg-[#f8f9f5] border-t border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800">Cases Section</h2>
      </div>
      <div
        id="service"
        className="min-h-screen flex items-center justify-center bg-gray-100 border-t border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800">Service Section</h2>
      </div>
      <div
        id="blog"
        className="min-h-screen flex items-center justify-center bg-[#f8f9f5] border-t border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800">Blog Section</h2>
      </div>
      <div
        id="about-us"
        className="min-h-screen flex items-center justify-center bg-gray-100 border-t border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800">About Us Section</h2>
      </div>
    </div>
  );
}
