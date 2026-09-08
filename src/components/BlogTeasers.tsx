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
    <section className="w-full bg-transparent py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {FEATURED_BLOGS.map((blog, idx) => (
            <motion.a
              key={blog.link}
              href={blog.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group block rounded-[2rem] bg-white shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#4a5d23] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{blog.hook}</p>
                <span className="font-semibold text-[#4a5d23] flex items-center gap-2">
                  Learn more
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
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            More Articles
          </h4>
          <ul className="space-y-4">
            {MORE_BLOGS.map((blog) => (
              <li key={blog.link}>
                <a
                  href={blog.link}
                  className="text-lg font-medium text-gray-800 hover:text-[#4a5d23] hover:underline underline-offset-4 transition-colors"
                >
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
