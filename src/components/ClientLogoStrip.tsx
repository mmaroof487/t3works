export default function ClientLogoStrip() {
  return (
    <section className="w-full bg-transparent py-8 md:py-12 overflow-hidden border-t border-gray-200">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Logo Strip */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-infinite-scroll-slow items-center gap-24 py-4">
            {/* Repeat the logos to create the infinite scroll illusion */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-24">
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest grayscale hover:grayscale-0 hover:text-gray-900 transition-all">
                  ClientOne
                </div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest grayscale hover:grayscale-0 hover:text-gray-900 transition-all">
                  PartnerTwo
                </div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest grayscale hover:grayscale-0 hover:text-gray-900 transition-all">
                  GlobalCorp
                </div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest grayscale hover:grayscale-0 hover:text-gray-900 transition-all">
                  TechInnovate
                </div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest grayscale hover:grayscale-0 hover:text-gray-900 transition-all">
                  EnterpriseCo
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
