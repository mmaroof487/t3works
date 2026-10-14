import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

// `logo` is a file in /images/clients; a client without one is set as a text wordmark instead
const CLIENT_LOGOS: { name: string; logo?: string }[] = [
  { name: 'GE HealthCare', logo: 'ge-healthcare.svg' },
  { name: 'Siemens Healthineers', logo: 'siemens-healthineers.svg' },
  { name: 'Philips', logo: 'philips.svg' },
  { name: 'Oracle', logo: 'oracle.svg' },
  { name: 'Cisco', logo: 'cisco.svg' },
  { name: 'Amadeus', logo: 'amadeus.svg' },
  { name: 'IQVIA', logo: 'iqvia.svg' },
  { name: 'Eurofins', logo: 'eurofins.svg' },
  { name: 'Tesco', logo: 'tesco.svg' },
  { name: 'Wipfli' },
  { name: 'ATMECS' },
];

function ClientMark({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span className="text-xl md:text-2xl font-semibold tracking-tight text-[#232621]">
        {name}
      </span>
    );
  }

  return (
    <img
      src={`/images/clients/${logo}`}
      alt={name}
      loading="lazy"
      className="h-9 md:h-10 w-auto max-w-[8.5rem] md:max-w-[9.5rem] object-contain"
      onError={() => {
        setFailed(true);
      }}
    />
  );
}

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-24 bg-[#232621] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8 relative z-10 mb-12 md:mb-16">
        <div className="flex flex-col items-center text-center max-w-[52rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <Star className="w-4 h-4 text-[#ffea75] fill-[#ffea75]" />
            <span className="text-sm font-medium text-white">Proven Track Record</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 lg:whitespace-nowrap"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70"
          >
            We've partnered with reputed organizations to deliver exceptional engineering talent and
            AI solutions.
          </motion.p>
        </div>
      </div>

      {/* One light sheet rather than a moving strip: brand colours need a light ground to read, and
          every client stays in view. Cells grow, so the last row fills whatever the column count. */}
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-px overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#d6d6cb]"
        >
          {CLIENT_LOGOS.map((client) => (
            <li
              key={client.name}
              className="flex h-24 md:h-32 grow basis-[calc(50%-1px)] sm:basis-[calc(33.333%-1px)] lg:basis-[calc(25%-1px)] xl:basis-[calc(16.666%-1px)] items-center justify-center bg-[#fafaf7] px-4"
            >
              <ClientMark {...client} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
