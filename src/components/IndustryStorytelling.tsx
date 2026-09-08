import { motion } from 'framer-motion';

export default function IndustryStorytelling() {
  return (
    <section className="w-full bg-[#14150f] py-16 md:py-24 text-white overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center mb-20"
        >
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl mb-6">
            Reshaping the future.
          </h2>
          <p className="text-xl text-white/90 mb-6 font-medium">
            Our customers look for expertise that will accelerate their journey and reshape their
            future.
          </p>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            From building the best digital health systems, to reimagining how people travel, to
            making sure your food is safe, we help our clients build a better world with the best
            technologies on the planet.
          </p>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-infinite-scroll items-center gap-16 py-8">
            {/* Repeat the logos to create the infinite scroll illusion */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  GlobalBank
                </div>
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  AeroSpaceX
                </div>
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  HealthPlus
                </div>
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  TechCorp
                </div>
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  InnovateAI
                </div>
                <div className="text-2xl font-bold text-white/20 uppercase tracking-widest">
                  FinServe
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
