import { Quote } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../../data/leadership';
import { cn } from '../../lib/cn';
import { Reveal, SectionHeading } from './primitives';

// "Anil Sarapalli" -> "AS"
function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return (
    words[0].charAt(0) + (words.length > 1 ? words[words.length - 1].charAt(0) : '')
  ).toUpperCase();
}

// the companies' side of the site is coded gold
export default function ClientTestimonials() {
  return (
    <section id="client-voices" className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="gold"
          eyebrow="Client testimonials"
          title={
            <>
              What clients said
              <br />
              once the <span className="text-[#a3854a]">engineers arrived.</span>
            </>
          }
        />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {CLIENT_TESTIMONIALS.map((testimonial, index) => {
            const featured = index === 0;
            return (
              <li
                key={testimonial.id}
                className={featured ? 'md:col-span-2 lg:col-span-4' : 'lg:col-span-2'}
              >
                <Reveal delay={(index % 3) * 0.1} className="h-full">
                  <figure
                    className={cn(
                      'flex h-full flex-col rounded-[1.75rem] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 lg:p-10',
                      featured
                        ? 'bg-[#232621] text-white shadow-2xl'
                        : 'border border-black/5 bg-[#fbfbf9] shadow-sm'
                    )}
                  >
                    <Quote
                      aria-hidden="true"
                      className="h-8 w-8 shrink-0 fill-[#c9b27a]/25 text-[#c9b27a]"
                    />
                    <blockquote
                      className={cn(
                        'mt-6 font-medium tracking-tight',
                        featured
                          ? 'text-2xl leading-snug md:text-3xl lg:text-[2.125rem] lg:leading-[1.25]'
                          : 'text-xl leading-snug text-gray-900'
                      )}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <div className="mt-6 flex-1">
                      <p
                        className={cn(
                          'text-[0.9375rem] leading-relaxed',
                          featured ? 'max-w-2xl text-white/65' : 'text-gray-600'
                        )}
                      >
                        {testimonial.context}
                      </p>
                      {testimonial.facts && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {testimonial.facts.map((fact) => (
                            <li
                              key={fact}
                              className="rounded-full bg-[#c9b27a]/25 px-3 py-1 text-xs font-semibold text-gray-900"
                            >
                              {fact}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <figcaption
                      className={cn(
                        'mt-8 flex items-center gap-4 border-t pt-6',
                        featured ? 'border-white/10' : 'border-black/[0.07]'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold tracking-wide text-[#232621]',
                          featured ? 'bg-[#c9b27a]' : 'bg-[#c9b27a]/30'
                        )}
                      >
                        {initials(testimonial.person)}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block font-semibold',
                            featured ? 'text-white' : 'text-gray-900'
                          )}
                        >
                          {testimonial.person}
                        </span>
                        <span
                          className={cn(
                            'block text-sm',
                            featured ? 'text-white/55' : 'text-gray-600'
                          )}
                        >
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
