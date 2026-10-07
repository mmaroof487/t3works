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

const LINK_CLASS = 'text-[0.9375rem] text-gray-600 transition-colors hover:text-[#4a5d23]';
const HEADING_CLASS = 'mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-900';
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

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative flex min-h-[100dvh] w-full flex-col overflow-x-clip pb-28 pt-12 lg:pb-4 lg:pt-[7.25rem]"
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

      <div className="relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-4 sm:px-6 lg:px-14">
        {/* Vision card: copy on the left, illustration clipped inside its right half */}
        <div
          className={`relative mb-5 flex flex-1 flex-col overflow-hidden lg:flex-row ${CARD_CLASS}`}
        >
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:w-1/2 lg:px-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[#4a5d23]/40" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
                Our vision
              </span>
              <span className="h-px w-14 bg-[#4a5d23]/40" aria-hidden="true" />
            </div>
            <h2 className="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
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
            className="pointer-events-none relative mt-4 w-full mix-blend-darken lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[64%] lg:max-w-none"
            style={ART_FADE}
          />
        </div>

        {/* Link columns */}
        <div
          className={`relative grid gap-x-8 gap-y-10 p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 xl:grid-cols-[1.45fr_1.2fr_1.2fr_0.95fr_1.5fr] xl:gap-x-0 lg:px-10 lg:py-6 ${CARD_CLASS}`}
        >
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-4 xl:col-span-1 xl:border-r xl:border-black/[0.07] xl:pr-10">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#fbfbf9] text-[#2f3b16] transition-colors hover:bg-[#4a5d23] hover:text-white"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="xl:pl-14">
              <h3 className={HEADING_CLASS}>{group.heading}</h3>
              <ul className="space-y-2">
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
        <div className="relative flex flex-col items-center justify-between gap-4 px-2 pt-4 sm:flex-row lg:px-10">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} T3Works. All rights reserved.
          </p>
          <div
            aria-hidden="true"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
          >
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
