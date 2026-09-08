import { motion } from 'framer-motion';

const FEATURED_BLOGS = [
  {
    title: 'Building teams for Innovation Engineering',
    hook: 'In the fast-paced and dynamic landscape of business, innovation has become the cornerstone of success.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=400',
    link: '/blog1',
  },
  {
    title: 'Bringing consistency in hiring through Talent DNA and Profiling',
    hook: 'In the intricate tapestry of organizational success, nothing plays a more pivotal role than high-performance teams.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600&h=400',
    link: '/blog2',
  },
];

const MORE_BLOGS = [
  { title: 'Building high performance teams with Hire-Train-Deploy Programs', link: '/blog3' },
  {
    title: 'The Strategic Advantage of Building teams with High-Aptitude Junior Engineers',
    link: '/blog4',
  },
  { title: 'Embracing the Future: Why Remote Workforce is Here to Stay', link: '/blog5' },
];

export default function BlogTeasers() {
  return (
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Blogs
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Featured Blog */}
          <motion.a
            href={FEATURED_BLOGS[0].link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 group block rounded-[2.5rem] bg-white shadow-sm border border-gray-100/50 overflow-hidden relative min-h-[450px] md:min-h-[550px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={FEATURED_BLOGS[0].image}
                alt={FEATURED_BLOGS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="inline-flex items-center rounded-full bg-[#4a5d23]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm mb-4 w-fit">
                Featured Article
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-gray-200 transition-colors">
                {FEATURED_BLOGS[0].title}
              </h3>
              <p className="text-gray-200 mb-6 max-w-2xl text-lg">{FEATURED_BLOGS[0].hook}</p>
              <span className="font-semibold text-[#ffea75] flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </motion.a>

          {/* Right Column: Secondary Featured & List */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.a
              href={FEATURED_BLOGS[1].link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group block rounded-[2rem] bg-white shadow-sm border border-gray-100/50 overflow-hidden relative h-[250px] md:h-[300px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={FEATURED_BLOGS[1].image}
                  alt={FEATURED_BLOGS[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-gray-200 transition-colors">
                  {FEATURED_BLOGS[1].title}
                </h3>
                <span className="text-sm font-semibold text-[#ffea75] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 rounded-[2rem] bg-[#f8f9fa] border border-gray-100 p-8 flex flex-col"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4a5d23]" />
                More Insights
              </h4>
              <ul className="space-y-6 flex-1">
                {MORE_BLOGS.map((blog) => (
                  <li
                    key={blog.link}
                    className="border-b border-gray-200/60 pb-4 last:border-0 last:pb-0"
                  >
                    <a href={blog.link} className="group block">
                      <h5 className="text-base font-semibold text-gray-900 group-hover:text-[#4a5d23] transition-colors leading-snug">
                        {blog.title}
                      </h5>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
