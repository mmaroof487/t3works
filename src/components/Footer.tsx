import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const SOCIALS = [
  {
    id: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
      </svg>
    ),
  },
  {
    id: 'X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'YouTube',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];

// `to`: "#id" scrolls to a landing-page section, "/path" is a route, anything else is a plain href
const LINK_GROUPS = [
  {
    heading: 'For students',
    links: [
      { label: 'How It Works', to: '#pipeline' },
      { label: 'Student Journey', to: '#student-journey' },
      { label: 'Apply Now', to: '/apply' },
      { label: 'Success Stories', to: '#trusted' },
      { label: 'FAQs', to: '#' },
    ],
  },
  {
    heading: 'For companies',
    links: [
      { label: 'Talent Solutions', to: '#clients' },
      { label: 'How It Works', to: '#pipeline' },
      { label: 'PoC Engagement', to: '/hire' },
      { label: 'Hire AI Talent', to: '/hire' },
      { label: 'FAQs', to: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '#ecosystem' },
      { label: 'Leadership', to: '/leadership' },
      { label: 'Careers', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Contact', to: 'mailto:hello@t3works.com' },
    ],
  },
];

// the link's size comes from its list, which differs between the mobile and desktop layouts
const LINK_CLASS = 'text-gray-600 transition-colors hover:text-[#4a5d23]';
const HEADING_CLASS = 'mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-900';
const MOBILE_HEADING_CLASS =
  'mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-900 md:mb-3';
const MOBILE_RULE_CLASS = 'mt-4 border-t border-black/[0.07] pt-4';
const SOCIAL_CLASS =
  'flex items-center justify-center rounded-xl border bg-[#fbfbf9] text-[#2f3b16] transition-colors hover:bg-[#4a5d23] hover:text-white';
const CARD_CLASS = 'rounded-[1.75rem] border border-black/[0.07] bg-[#fbfbf9]';
const NETWORK = '/images/Minimalist%20Sage%20Network%20UI%20UX.webp';

// keep only the dense middle band of the network, so it straddles the seam with the section above
const NETWORK_FADE = {
  maskImage: 'linear-gradient(to bottom, transparent 22%, #000 32%, #000 66%, transparent 82%)',
};

// fade the illustration out towards the copy on its left and the top of its card
const ART_FADE = {
  maskImage:
    'linear-gradient(to right, transparent, #000 16%), linear-gradient(to bottom, transparent, #000 22%)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
};

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  if (to.startsWith('#') && to.length > 1) {
    // the landing page scrolls to `scrollTo` on arrival, from this or any other page
    return (
      <Link to="/" state={{ scrollTo: to }} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  if (to.startsWith('/')) {
    return (
      <Link to={to} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} className={LINK_CLASS}>
      {children}
    </a>
  );
}

const [STUDENT_LINKS, COMPANY_LINKS, ABOUT_LINKS] = LINK_GROUPS;

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative flex w-full flex-col overflow-x-clip pb-[calc(8rem+env(safe-area-inset-bottom))] pt-10 md:pb-[calc(12rem+env(safe-area-inset-bottom))] lg:min-h-[100dvh] lg:pb-4 lg:pt-[7.25rem]"
    >
      {/* network art: mirrored into the top-left corner, where it fills the gap under the section
          above, and faintly along the right edge. Darken blend drops the image's paper colour. */}
      <img
        src={NETWORK}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden w-[26rem] max-w-none -translate-x-[4%] -translate-y-[34%] -scale-x-100 mix-blend-darken lg:block"
        style={NETWORK_FADE}
      />
      <img
        src={NETWORK}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[70%] max-w-none translate-x-[45%] opacity-70 mix-blend-darken lg:block"
      />

      {/* Below lg: the vision headline and every footer column share one card, which sits just
          above the bottom nav bar. Phones stack it; tablets (md) spread it across the full width,
          with the brand beside the headline and the link groups in four columns. */}
      <div className="relative px-4 sm:px-6 lg:hidden">
        <div className={`mx-auto max-w-[34rem] p-5 sm:p-7 md:max-w-none md:p-9 ${CARD_CLASS}`}>
          <div className="md:flex md:items-start md:justify-between md:gap-8">
            <div>
              {/* sized off the viewport so the first line never wraps on a narrow phone */}
              <h2 className="mb-2 text-[clamp(1.25rem,7.8vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-gray-900 md:mb-4 md:text-5xl">
                Not more engineers.
                <br />
                <span className="text-[#2f3b16]">More</span>{' '}
                <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
                  engineering.
                </span>
              </h2>
              <p className="text-[0.8125rem] leading-relaxed text-gray-600 sm:text-sm md:max-w-[30rem] md:text-balance md:text-base">
                We connect ambitious students with forward-thinking enterprises to build real-world
                engineering talent for a better tomorrow.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between md:mt-1 md:shrink-0 md:flex-col md:items-end md:gap-4">
              <img
                src="/images/t3works_whitebg.webp"
                alt="T3 AI Works"
                className="h-10 w-auto rounded-xl border border-black/[0.07] object-contain md:h-12"
              />
              <div className="flex items-center gap-2.5 md:gap-3">
                {SOCIALS.map((social) => (
                  <button
                    key={social.id}
                    aria-label={social.id}
                    className={`h-10 w-10 border-[#4a5d23]/50 md:h-11 md:w-11 ${SOCIAL_CLASS}`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:mt-8 md:grid md:grid-cols-[1fr_1fr_0.8fr_1.5fr] md:gap-x-6 md:border-t md:border-black/[0.07] md:pt-8">
            {/* on tablets its two navs become columns of the grid above */}
            <div
              className={`grid grid-cols-[auto_auto] justify-between gap-x-4 min-[360px]:grid-cols-2 min-[360px]:gap-x-6 md:contents ${MOBILE_RULE_CLASS}`}
            >
              {[STUDENT_LINKS, COMPANY_LINKS].map((group) => (
                <nav key={group.heading} aria-label={group.heading}>
                  <h3 className={MOBILE_HEADING_CLASS}>{group.heading}</h3>
                  <ul className="space-y-1.5 text-[0.8125rem] md:space-y-2 md:text-sm">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink to={link.to}>{link.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <nav
              aria-label={ABOUT_LINKS.heading}
              className={`md:mt-0 md:border-t-0 md:pt-0 ${MOBILE_RULE_CLASS}`}
            >
              <h3 className={MOBILE_HEADING_CLASS}>{ABOUT_LINKS.heading}</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.8125rem] min-[360px]:justify-between md:flex-col md:flex-nowrap md:justify-start md:gap-y-2 md:text-sm">
                {ABOUT_LINKS.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={`md:mt-0 md:border-t-0 md:pt-0 ${MOBILE_RULE_CLASS}`}>
              <h3 className={MOBILE_HEADING_CLASS}>Contact</h3>
              <ul className="space-y-1.5 text-[0.8125rem] text-gray-600 md:space-y-2.5 md:text-sm">
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2f3b16]" aria-hidden="true" />
                  <a
                    href="mailto:hello@t3works.com"
                    className="transition-colors hover:text-[#4a5d23]"
                  >
                    hello@t3works.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2f3b16]" aria-hidden="true" />
                  <div className="space-y-1 md:space-y-2">
                    <p>
                      <span className="font-semibold text-gray-900">HQ:</span> Bengaluru, Karnataka,
                      India
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">US Office:</span> Sheridan,
                      Wyoming, United States
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* tablets: copyright on the left and the policy links on the right, as on desktop */}
          <div className="mt-5 flex flex-col items-center gap-1.5 text-center md:mt-8 md:flex-row-reverse md:justify-between md:border-t md:border-black/[0.07] md:pt-5">
            <div className="flex items-center gap-2.5 text-xs text-gray-700 md:gap-4 md:text-sm md:text-gray-500">
              <a href="#" className="transition-colors hover:text-[#4a5d23]">
                Privacy Policy
              </a>
              <span className="h-3.5 w-px bg-gray-400" aria-hidden="true" />
              <a href="#" className="transition-colors hover:text-[#4a5d23]">
                Terms & Conditions
              </a>
            </div>
            <p className="text-balance text-[0.6875rem] text-gray-500 md:text-sm">
              Copyright &copy; {new Date().getFullYear()} T3Works. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* lg and up: vision card, link columns and bottom bar */}
      <div className="relative mx-auto hidden w-full max-w-[100rem] flex-1 flex-col px-14 lg:flex">
        {/* Vision card: copy on the left, illustration clipped inside its right half */}
        <div className={`relative mb-5 flex flex-1 overflow-hidden ${CARD_CLASS}`}>
          <div className="relative z-10 flex w-1/2 flex-col justify-center px-12 py-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[#4a5d23]/40" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
                Our vision
              </span>
              <span className="h-px w-14 bg-[#4a5d23]/40" aria-hidden="true" />
            </div>
            <h2 className="mb-5 text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-gray-900">
              Not more engineers.
              <br />
              <span className="text-[#2f3b16]">More</span>{' '}
              <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
                engineering.
              </span>
            </h2>
            <p className="max-w-[28rem] text-lg leading-relaxed text-gray-600">
              We connect ambitious students with forward-thinking enterprises to build real-world
              engineering talent for a better tomorrow.
            </p>
            <div className="mt-7 flex items-center" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4a5d23]" />
              <span className="h-px w-28 bg-[#4a5d23]/50" />
            </div>
          </div>

          {/* its paper is lighter than the page, so a darken blend leaves only the artwork */}
          <img
            src="/images/Campus%20Mentoring%20Network%20Redesign.webp"
            alt="Students meeting enterprise mentors on campus"
            className="pointer-events-none absolute bottom-0 right-0 w-[64%] max-w-none mix-blend-darken"
            style={ART_FADE}
          />
        </div>

        {/* Link columns */}
        <div
          className={`relative grid grid-cols-4 gap-x-8 gap-y-10 px-10 py-6 xl:grid-cols-[1.45fr_1.2fr_1.2fr_0.95fr_1.5fr] xl:gap-x-0 ${CARD_CLASS}`}
        >
          <div className="col-span-4 flex flex-col items-start xl:col-span-1 xl:border-r xl:border-black/[0.07] xl:pr-10">
            <img
              src="/images/t3works_whitebg.webp"
              alt="T3 AI Works"
              className="mb-4 h-12 w-auto rounded-xl border border-black/[0.07] object-contain"
            />
            <p className="mb-4 max-w-[19rem] text-sm leading-relaxed text-gray-600">
              T3 AI Works is a merit-gated talent transformation engine connecting AI-ready
              engineers with enterprise opportunities worldwide.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <button
                  key={social.id}
                  aria-label={social.id}
                  className={`h-11 w-11 border-black/10 ${SOCIAL_CLASS}`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="xl:pl-14">
              <h3 className={HEADING_CLASS}>{group.heading}</h3>
              <ul className="space-y-2 text-[0.9375rem]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="xl:border-l xl:border-black/[0.07] xl:pl-10">
            <h3 className={HEADING_CLASS}>Contact</h3>
            <ul className="space-y-3 text-[0.9375rem] text-gray-600">
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#2f3b16]" aria-hidden="true" />
                <a
                  href="mailto:hello@t3works.com"
                  className="transition-colors hover:text-[#4a5d23]"
                >
                  hello@t3works.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2f3b16]"
                  fill="currentColor"
                  stroke="#fbfbf9"
                  aria-hidden="true"
                />
                <div className="space-y-2.5">
                  <p>
                    <span className="font-semibold text-gray-900">HQ:</span> Bengaluru, Karnataka
                    <br />
                    India
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">US Office:</span> Sheridan,
                    Wyoming
                    <br />
                    United States
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative flex items-center justify-between gap-4 px-10 pt-4">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} T3Works. All rights reserved.
          </p>
          <div aria-hidden="true" className="absolute left-1/2 flex -translate-x-1/2 items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4a5d23]/20" />
            <span className="h-px w-20 bg-[#4a5d23]/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a5d23]" />
            <span className="h-px w-20 bg-[#4a5d23]/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#4a5d23]/20" />
          </div>
          <div className="flex items-center gap-5 text-sm text-gray-500">
            <a href="#" className="transition-colors hover:text-[#4a5d23]">
              Privacy Policy
            </a>
            <span className="h-3.5 w-px bg-gray-400" aria-hidden="true" />
            <a href="#" className="transition-colors hover:text-[#4a5d23]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
