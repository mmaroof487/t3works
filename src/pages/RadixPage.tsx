import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Database, 
  Server, 
  Cpu, 
  Lock, 
  Search, 
  Settings, 
  Code2, 
  Layers, 
  CheckCircle2,
  Terminal,
  BrainCircuit,
  Network
} from 'lucide-react';

export default function RadixPage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(state.scrollTo!);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const targetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    } else {
        window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-[#f8f9f5] min-h-screen text-gray-900 font-sans selection:bg-[#4a5d23] selection:text-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#e5e9db] to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#4a5d23]/20 bg-white/50 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm mb-8"
          >
            Engineering the Future of Digital Intelligence Systems
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] text-[#0f0f0f] mb-8"
          >
            Where Academic Rigour <br/> Meets Production Engineering
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-10"
          >
            Real Product Engineering • System Architecture & Data Design • DevOps & Cloud Infrastructure • AI Systems & Agent Orchestration • Enterprise Platform Design
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-gray-500 max-w-2xl leading-relaxed mb-12"
          >
            Students contribute to the design and development of real-world engineering systems spanning product platforms, AI architectures, cloud infrastructure, and enterprise-grade system design — building technology that operates at production scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-[#0f0f0f] px-8 py-4 text-[15px] font-medium text-white hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg w-full sm:w-auto gap-2">
              Explore the 8 Engineering Systems
              <ArrowRight size={18} />
            </a>
            <a href="#overview" className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 px-8 py-4 text-[15px] font-medium text-gray-900 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
              Program Architecture
            </a>
          </motion.div>
        </div>
      </section>

      {/* Program Architecture (Overview) */}
      <section id="overview" className="py-24 px-4 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">Program Architecture</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f0f0f] mb-6">Where Academic Rigour Meets Production Engineering</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Traditional programs teach theory in isolation. This initiative immerses students in the engineering of complex digital systems — bridging the gap between classroom knowledge and the demands of building technology at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 size={24} />,
                title: "8 Engineering Systems",
                subtitle: "Real Product Engineering",
                desc: "Architect and build a production-grade AI-powered intelligence platform — not simulations, but systems designed for real-world deployment."
              },
              {
                icon: <Database size={24} />,
                title: "100+ Tables",
                subtitle: "System Architecture & Data Design",
                desc: "Decompose complex domains into normalized databases, structured schemas, and scalable multi-layer architectures with 100+ relational tables."
              },
              {
                icon: <Server size={24} />,
                title: "Cloud-Native",
                subtitle: "DevOps & Cloud Infrastructure",
                desc: "Deploy containerized services with CI/CD pipelines, cloud-native infrastructure, observability frameworks, and automated deployment workflows."
              },
              {
                icon: <BrainCircuit size={24} />,
                title: "Multi-Agent AI",
                subtitle: "AI Systems & Agent Orchestration",
                desc: "Design multi-agent AI systems using LangChain, LangGraph, vector databases, and orchestrated ML pipelines with schema-enforced validation."
              },
              {
                icon: <Lock size={24} />,
                title: "Enterprise-Grade",
                subtitle: "Enterprise Platform Design",
                desc: "Architect enterprise-grade platforms with security governance, role-based access control, audit trails, and high-availability design patterns."
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-[#8ba05f]/20 flex items-center justify-center text-[#4a5d23] mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0f0f0f] mb-2">{pillar.title}</h3>
                <p className="text-sm font-medium text-[#8ba05f] mb-4">{pillar.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Engineering Systems */}
      <section id="projects" className="py-24 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">Engineering Systems</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f0f0f] mb-6">8 Systems. One Integrated Platform.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Each system builds upon the previous — from foundational data architecture to enterprise-grade AI platform engineering. Students don't just learn; they build production-scale technology.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                num: "01",
                title: "Parameter Discovery",
                subtitle: "From 66 to 163 Parameters",
                desc: "Define the intelligence framework by identifying and structuring 163 company parameters across business, financial, operational, and governance dimensions.",
                tags: ["Data Modeling", "Research", "Excel", "Business Analysis"],
                metrics: "66 Initial Parameters | 163 Final Parameters | 15+ Categories | 10+ Data Types"
              },
              {
                num: "02",
                title: "Database Normalization",
                subtitle: "Distributing Across 100+ Tables",
                desc: "Transform the parameter framework into a normalized relational database architecture with 100+ interconnected tables following enterprise-grade design principles.",
                tags: ["Supabase", "SQL", "Database Design", "ERD"],
                metrics: "100+ Tables | 3NF Normalization | 500+ Foreign Keys | 100% Relational Integrity"
              },
              {
                num: "03",
                title: "Test Automation",
                subtitle: "2,000+ Auto-Generated Tests",
                desc: "Build a metadata-driven testing architecture that automatically generates thousands of validation checks to ensure data quality across the entire parameter system.",
                tags: ["Python", "Pytest", "Automation", "Quality Assurance"],
                metrics: "2,000+ Automated Tests | 99.8% Code Coverage | 0 Data Anomalies | Instant CI Validation"
              },
              {
                num: "04",
                title: "Agentic Research",
                subtitle: "Multi-Model AI Research Automation",
                desc: "Build AI-driven research agents that automatically collect, structure, and validate company intelligence data using multiple large language models.",
                tags: ["LangChain", "Gemini", "Groq", "OpenRouter"],
                metrics: "4 AI Models Integrated | 85% Automation Rate | 10x Research Velocity | Multi-Agent Orchestration"
              },
              {
                num: "05",
                title: "Complete Agentic Ecosystem",
                subtitle: "Orchestrated Multi-Agent Intelligence",
                desc: "Transform isolated AI agents into a coordinated ecosystem with schema validation, orchestration workflows, and multi-layer verification using LangGraph.",
                tags: ["LangGraph", "Pydantic", "LangChain", "Pytest"],
                metrics: "Multi-Agent Graphs | Stateful Memory | Autonomous Tool Calling | Dynamic Routing"
              },
              {
                num: "06",
                title: "DevOps & Cloud Infrastructure",
                subtitle: "Production-Ready Deployment",
                desc: "Transform the AI system into a deployable production platform using containerized services, CI/CD pipelines, and scalable cloud infrastructure.",
                tags: ["Docker", "FastAPI", "CI/CD", "Cloud"],
                metrics: "Containerized Deployment | Automated CI/CD | Zero-Downtime Releases | High Availability"
              },
              {
                num: "07",
                title: "Vector Databases & ML",
                subtitle: "Semantic Intelligence Layer",
                desc: "Introduce vector intelligence and machine learning capabilities enabling semantic search, similarity analysis, and predictive analytics across the intelligence platform.",
                tags: ["Vector DB", "Embeddings", "ML", "Python"],
                metrics: "Vector Search Engine | Sub-50ms Latency | Hybrid Search | Embedding Pipelines"
              },
              {
                num: "08",
                title: "Enterprise System Architecture",
                subtitle: "Production-Grade Platform Design",
                desc: "Design and implement the final enterprise architecture integrating all layers into a unified, secure, scalable, and auditable AI intelligence platform.",
                tags: ["Enterprise", "Security", "Scalability", "Governance"],
                metrics: "Full Stack Integration | RBAC Security | Production UI | Scalable Microservices Architecture"
              }
            ].map((sys, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#8ba05f] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0f0f0f] text-white font-bold text-xl">
                    S{sys.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0f0f0f] mb-1">{sys.title}</h3>
                    <p className="text-[#667744] font-medium mb-4">{sys.subtitle}</p>
                    <p className="text-gray-600 mb-6">{sys.desc}</p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-700 font-mono border border-gray-100">
                      {sys.metrics}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {sys.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Scale */}
      <section className="py-20 bg-[#0f0f0f] text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8ba05f] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#8ba05f] font-semibold tracking-wider uppercase text-sm mb-4 block">Engineering Scale</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Systems Built at Production Scale</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">The scope and complexity of a real engineering organization.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { val: "8", label: "Engineering Systems", sub: "End-to-end product development lifecycle" },
              { val: "163", label: "Intelligence Parameters", sub: "Comprehensive company data architecture" },
              { val: "100+", label: "Relational Tables", sub: "Enterprise-grade normalized database" },
              { val: "2,000+", label: "Automated Validations", sub: "Quality-first engineering culture" },
              { val: "3+", label: "AI Models Orchestrated", sub: "Multi-model intelligence architecture" },
              { val: "7+", label: "Architecture Layers", sub: "Full-stack system integration" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.val}</span>
                <span className="text-base md:text-lg font-semibold text-[#c4cdbe] mb-2 text-center">{stat.label}</span>
                <span className="text-xs text-gray-500 text-center">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Ecosystem & Complexity */}
      <section id="tech" className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Tech Stack */}
            <div>
              <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">Production-Grade</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] mb-6">Technology Ecosystem</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Industry-standard tools and frameworks used across all 8 engineering systems — the same technologies that power modern software companies.
              </p>

              <div className="space-y-6">
                {[
                  { title: "AI & Agent Systems", tools: "LangChain, LangGraph, Google Gemini, Groq, OpenRouter, Pydantic" },
                  { title: "Cloud & DevOps", tools: "Docker, GitHub Actions, Azure Pipelines, Cloud Deployment, FastAPI" },
                  { title: "Data Infrastructure", tools: "Supabase, PostgreSQL, Vector Databases, Relational Schemas" },
                  { title: "Programming & APIs", tools: "Python, SQL, JSON, REST APIs" },
                  { title: "Testing & Quality Engineering", tools: "Pytest, Automated Validation, Schema Enforcement, CI/CD Testing" },
                  { title: "Development Tools", tools: "VS Code, Git, Excel, Jupyter" }
                ].map((cat, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <h4 className="font-bold text-gray-900 mb-2">{cat.title}</h4>
                    <p className="text-gray-600 text-sm">{cat.tools}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Complexity */}
            <div>
              <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">Progressive</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] mb-6">Technical Complexity</h2>
              <p className="text-gray-600 mb-10 text-lg">
                A deliberate engineering progression — each system builds on the architecture, skills, and infrastructure of the previous one.
              </p>

              <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                {[
                  { sys: "System 01", name: "Parameter Discovery", perc: "12.5%", tag: "Foundational Data Architecture" },
                  { sys: "System 02", name: "Database Normalization", perc: "25%", tag: "Relational System Design" },
                  { sys: "System 03", name: "Test Automation", perc: "37.5%", tag: "Validation Engine" },
                  { sys: "System 04", name: "Agentic Research", perc: "50%", tag: "AI Automation" },
                  { sys: "System 05", name: "Agentic Ecosystem", perc: "62.5%", tag: "Multi-Agent Orchestration" },
                  { sys: "System 06", name: "DevOps & Cloud", perc: "75%", tag: "Production Infrastructure" },
                  { sys: "System 07", name: "Vector DB & ML", perc: "87.5%", tag: "Semantic Intelligence Layer" },
                  { sys: "System 08", name: "Enterprise Architecture", perc: "100%", tag: "Full System Integration" }
                ].map((stage, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#8ba05f]" />
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-900">{stage.sys}: {stage.name}</span>
                      <span className="text-sm font-bold text-[#4a5d23]">{stage.perc}</span>
                    </div>
                    <span className="text-sm text-gray-500">{stage.tag}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Engineering Outcomes */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">Engineering Outcomes</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f0f0f] mb-6">What Engineers Walk Away With</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Students don't receive certificates — they build systems. Every competency is earned through direct engineering contribution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Production Engineering Experience",
                desc: "Contribute to the development of a real AI-powered intelligence platform — gaining experience comparable to working in a technology company."
              },
              {
                title: "Portfolio-Grade Systems",
                desc: "Build demonstrable engineering artifacts: database architectures, AI agent systems, containerized deployments, and enterprise platform designs."
              },
              {
                title: "System Architecture Mastery",
                desc: "Design multi-layered system architectures with 100+ tables, validation engines, and orchestrated AI workflows from first principles."
              },
              {
                title: "Industry Development Workflows",
                desc: "Operate with Git-based version control, CI/CD pipelines, containerized environments, and production deployment processes."
              },
              {
                title: "Cloud & Infrastructure Engineering",
                desc: "Deploy Docker containers, configure cloud infrastructure, implement monitoring systems, and manage scalable production environments."
              },
              {
                title: "Enterprise Engineering Thinking",
                desc: "Understand scalability patterns, security governance, role-based access control, audit trails, and high-availability system design."
              }
            ].map((outcome, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col gap-4 hover:border-[#8ba05f] transition-colors">
                <CheckCircle2 size={28} className="text-[#8ba05f]" />
                <h3 className="text-xl font-bold text-[#0f0f0f]">{outcome.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-[#4a5d23] rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
             <Network size={300} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Begin Engineering Real Digital Systems</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              Join a flagship engineering initiative where students participate in building production-grade technology systems — from data architecture to enterprise AI platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0f0f0f] hover:bg-gray-100 transition-all w-full sm:w-auto shadow-lg">
                Explore Engineering Systems
              </a>
              <a href="#overview" className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white/30 px-8 py-4 text-[15px] font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto">
                Program Architecture
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
