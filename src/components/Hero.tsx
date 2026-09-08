export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Build the future with <span className="text-blue-600">T3Works</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          A production-ready foundation for your next big idea. Start shipping faster with a modern,
          scalable, and elegantly crafted architecture.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Start building
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
