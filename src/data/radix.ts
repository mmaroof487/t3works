import { SYSTEMS_DATA } from './systems';

// Copy for the Radix page and its two audience versions. All three share one layout
// (pages/RadixPage.tsx); only the wording, emphasis and calls to action differ.

/** `#id` scrolls within the page, `/path` is a route */
export interface RadixLink {
  label: string;
  href: string;
}

export type RadixSystem = (typeof SYSTEMS_DATA)[number] & {
  /** what this system teaches (students) or signals (companies) */
  focus?: string;
};

interface Section {
  label: string;
  title: string;
  intro: string;
  /** closing line under the section */
  note?: string;
}

export interface RadixContent {
  hero: {
    eyebrow: string;
    /** one entry per line of the heading */
    title: string[];
    tagline: string;
    body: string;
    primary: RadixLink;
    secondary: RadixLink;
  };
  overview: Section & { pillars: { title: string; subtitle: string; desc: string }[] };
  systems: Section & { focusLabel?: string; items: RadixSystem[] };
  scale: Section & { stats: { val: string; label: string; sub: string }[] };
  tech: Section & { groups: { title: string; tools: string; framing?: string }[] };
  complexity: Section & {
    stages: { sys: string; name: string; perc: number; startPerc: number; tag: string }[];
  };
  outcomes: Section & { items: { title: string; desc: string }[] };
  cta: {
    title: string;
    body: string;
    primary: RadixLink;
    secondary: RadixLink;
    /** the audience's next step, e.g. its application form */
    action?: RadixLink;
    note?: string;
    /** network artwork behind the card instead of the rotating icon */
    art?: boolean;
  };
}

const PILLAR_BADGES = [
  '8 Engineering Systems',
  '100+ Tables',
  'Cloud-Native',
  'Multi-Agent AI',
  'Enterprise-Grade',
];

const TECH_GROUPS = [
  { title: 'AI & Agent Systems', tools: 'LangChain, LangGraph, Gemini, Groq, Pydantic' },
  { title: 'Cloud & DevOps', tools: 'Docker, GitHub Actions, Azure Pipelines, FastAPI' },
  { title: 'Data Infrastructure', tools: 'Supabase, PostgreSQL, Vector Databases' },
  { title: 'Programming', tools: 'Python, SQL, JSON, REST APIs' },
  { title: 'Quality Engineering', tools: 'Pytest, CI/CD Testing, Schema Enforcement' },
  { title: 'Development Tools', tools: 'VS Code, Git, Jupyter, Unix CLI' },
];

const STAGE_NAMES = [
  'Parameter Discovery',
  'Database Normalization',
  'Test Automation',
  'Agentic Research',
  'Agentic Ecosystem',
  'DevOps & Cloud',
  'Vector DB & ML',
  'Enterprise Architecture',
];

// each system adds an even 12.5%: a visual progression, not a measured difficulty
const stages = (tags: string[]) =>
  STAGE_NAMES.map((name, index) => ({
    sys: `System ${String(index + 1).padStart(2, '0')}`,
    name,
    perc: (index + 1) * 12.5,
    startPerc: index * 12.5,
    tag: tags[index],
  }));

const AUDIENCE_STAGE_TAGS = [
  'Foundational Data Architecture',
  'Relational System Design',
  'Validation Engineering',
  'AI Automation',
  'Multi-Agent Orchestration',
  'Production Infrastructure',
  'Semantic Intelligence',
  'Full System Integration',
];

const systems = (copy: { desc: string; focus: string }[]): RadixSystem[] =>
  SYSTEMS_DATA.map((system, index) => ({ ...system, ...copy[index] }));

const techGroups = (framing: string[]) =>
  TECH_GROUPS.map((group, index) => ({ ...group, framing: framing[index] }));

const pillars = (copy: { subtitle: string; desc: string }[]) =>
  copy.map((pillar, index) => ({ title: PILLAR_BADGES[index], ...pillar }));

// ---------------------------------------------------------------------------------------------
// Radix (the original page)
// ---------------------------------------------------------------------------------------------

export const RADIX_GENERAL: RadixContent = {
  hero: {
    eyebrow: 'Engineering the Future of Digital Intelligence Systems',
    title: ['Where Academic Rigour', 'Meets Production Engineering'],
    tagline:
      'Real Product Engineering • System Architecture & Data Design • DevOps & Cloud Infrastructure • AI Systems & Agent Orchestration • Enterprise Platform Design',
    body: 'Students contribute to the design and development of real-world engineering systems spanning product platforms, AI architectures, cloud infrastructure, and enterprise-grade system design — building technology that operates at production scale.',
    primary: { label: 'Explore the 8 Engineering Systems', href: '#projects' },
    secondary: { label: 'Program Architecture', href: '#overview' },
  },
  overview: {
    label: 'Program Architecture',
    title: 'Where Academic Rigour Meets Production Engineering',
    intro:
      'Traditional programs teach theory in isolation. This initiative immerses students in the engineering of complex digital systems — bridging the gap between classroom knowledge and the demands of building technology at scale.',
    pillars: pillars([
      {
        subtitle: 'Real Product Engineering',
        desc: 'Architect and build a production-grade AI-powered intelligence platform — not simulations, but systems designed for real-world deployment.',
      },
      {
        subtitle: 'System Architecture & Data Design',
        desc: 'Decompose complex domains into normalized databases, structured schemas, and scalable multi-layer architectures with 100+ relational tables.',
      },
      {
        subtitle: 'DevOps & Cloud Infrastructure',
        desc: 'Deploy containerized services with CI/CD pipelines, cloud-native infrastructure, observability frameworks, and automated deployment workflows.',
      },
      {
        subtitle: 'AI Systems & Agent Orchestration',
        desc: 'Design multi-agent AI systems using LangChain, LangGraph, vector databases, and orchestrated ML pipelines with schema-enforced validation.',
      },
      {
        subtitle: 'Enterprise Platform Design',
        desc: 'Architect enterprise-grade platforms with security governance, role-based access control, audit trails, and high-availability design patterns.',
      },
    ]),
  },
  systems: {
    label: 'Engineering Systems',
    title: '8 Systems. One Integrated Platform.',
    intro:
      "Each system builds upon the previous — from foundational data architecture to enterprise-grade AI platform engineering. Students don't just learn; they build production-scale technology.",
    items: SYSTEMS_DATA,
  },
  scale: {
    label: 'Engineering Scale',
    title: 'Systems Built at Production Scale',
    intro: 'The scope and complexity of a real engineering organization.',
    stats: [
      {
        val: '8',
        label: 'Engineering Systems',
        sub: 'End-to-end product development lifecycle',
      },
      {
        val: '163',
        label: 'Intelligence Parameters',
        sub: 'Comprehensive company data architecture',
      },
      { val: '100+', label: 'Relational Tables', sub: 'Enterprise-grade normalized database' },
      { val: '2,000+', label: 'Automated Validations', sub: 'Quality-first engineering culture' },
      {
        val: '3+',
        label: 'AI Models Orchestrated',
        sub: 'Multi-model intelligence architecture',
      },
      { val: '7+', label: 'Architecture Layers', sub: 'Full-stack system integration' },
    ],
  },
  tech: {
    label: 'Production-Grade',
    title: 'Technology Ecosystem',
    intro:
      'Industry-standard tools and frameworks used across all 8 engineering systems — the same technologies that power modern software companies.',
    groups: TECH_GROUPS,
  },
  complexity: {
    label: 'Progressive',
    title: 'Technical Complexity',
    intro:
      'A deliberate engineering progression — each system builds on the architecture, skills, and infrastructure of the previous one.',
    stages: stages([
      'Foundational Data Architecture',
      'Relational System Design',
      'Validation Engine',
      'AI Automation',
      'Multi-Agent Orchestration',
      'Production Infrastructure',
      'Semantic Intelligence Layer',
      'Full System Integration',
    ]),
  },
  outcomes: {
    label: 'Engineering Outcomes',
    title: 'What Engineers Walk Away With',
    intro:
      "Students don't receive certificates — they build systems. Every competency is earned through direct engineering contribution.",
    items: [
      {
        title: 'Production Engineering Experience',
        desc: 'Contribute to the development of a real AI-powered intelligence platform — gaining experience comparable to working in a technology company.',
      },
      {
        title: 'Portfolio-Grade Systems',
        desc: 'Build demonstrable engineering artifacts: database architectures, AI agent systems, containerized deployments, and enterprise platform designs.',
      },
      {
        title: 'System Architecture Mastery',
        desc: 'Design multi-layered system architectures with 100+ tables, validation engines, and orchestrated AI workflows from first principles.',
      },
      {
        title: 'Industry Development Workflows',
        desc: 'Operate with Git-based version control, CI/CD pipelines, containerized environments, and production deployment processes.',
      },
      {
        title: 'Cloud & Infrastructure Engineering',
        desc: 'Deploy Docker containers, configure cloud infrastructure, implement monitoring systems, and manage scalable production environments.',
      },
      {
        title: 'Enterprise Engineering Thinking',
        desc: 'Understand scalability patterns, security governance, role-based access control, audit trails, and high-availability system design.',
      },
    ],
  },
  cta: {
    title: 'Begin Engineering Real Digital Systems',
    body: 'Join a flagship engineering initiative where students participate in building production-grade technology systems — from data architecture to enterprise AI platforms.',
    primary: { label: 'Explore Engineering Systems', href: '#projects' },
    secondary: { label: 'Program Architecture', href: '#overview' },
  },
};

// ---------------------------------------------------------------------------------------------
// Radix for Students: what will I learn, build, and become capable of?
// ---------------------------------------------------------------------------------------------

export const RADIX_STUDENT: RadixContent = {
  hero: {
    eyebrow: 'Engineering the Future of Digital Intelligence Systems',
    title: ['Learn by Building the Systems Real Engineers Build'],
    tagline:
      'System Architecture · Data Engineering · AI & Agents · DevOps & Cloud · Enterprise Engineering',
    body: 'Radix takes students beyond isolated courses and tutorials. You learn by contributing to complex engineering systems — starting with data architecture and progressing through automation, AI agents, infrastructure, machine learning, and enterprise platform design. Every stage is built to turn technical knowledge into practical engineering ability.',
    primary: { label: 'Explore the 8 Engineering Systems', href: '#projects' },
    secondary: { label: 'Explore the Program Architecture', href: '#overview' },
  },
  overview: {
    label: 'Program Architecture',
    title: 'A Progressive Path From Fundamentals to Production Engineering',
    intro:
      'Most technical programs teach individual concepts separately. Radix connects those concepts into one progressive engineering journey — allowing students to understand how data, software, AI, infrastructure, testing, and enterprise architecture fit together inside a real system.',
    pillars: pillars([
      {
        subtitle: 'Real Product Engineering',
        desc: 'Build across eight connected engineering systems and understand how individual technical decisions contribute to a larger production-oriented platform.',
      },
      {
        subtitle: 'System Architecture & Data Design',
        desc: 'Learn how complex domains are decomposed into structured schemas, normalized databases, relationships, and scalable application architectures.',
      },
      {
        subtitle: 'DevOps & Cloud Infrastructure',
        desc: 'Learn how software moves from local development to reliable deployment through containers, CI/CD, infrastructure, observability, and automated workflows.',
      },
      {
        subtitle: 'AI Systems & Agent Orchestration',
        desc: 'Build practical AI systems using LLMs, LangChain, LangGraph, vector databases, structured validation, tool calling, and multi-agent workflows.',
      },
      {
        subtitle: 'Enterprise Platform Design',
        desc: 'Understand how production systems are designed for security, access control, auditability, scalability, reliability, and maintainability.',
      },
    ]),
    note: 'You are not learning eight disconnected technologies. You are learning how engineers combine them into one evolving system.',
  },
  systems: {
    label: 'Engineering Systems',
    title: '8 Systems. One Progressive Engineering Journey.',
    intro:
      'Each system introduces a new layer of engineering complexity. You begin with structured data and architecture, then progressively build toward automation, AI agents, infrastructure, machine learning, and complete enterprise systems.',
    focusLabel: 'What you learn',
    items: systems([
      {
        desc: 'Learn how to turn an unstructured business problem into a structured intelligence framework by identifying, categorizing, and defining 163 parameters across business, financial, operational, and governance dimensions.',
        focus: 'Requirements analysis · Domain modeling · Data definition · Structured thinking',
      },
      {
        desc: 'Transform the parameter framework into a normalized relational database and learn how complex systems represent relationships, constraints, dependencies, and data integrity at scale.',
        focus: 'Database design · Normalization · Relational modeling · Data integrity',
      },
      {
        desc: 'Build a metadata-driven validation system that automatically generates thousands of checks, teaching you how quality engineering becomes part of the system rather than an afterthought.',
        focus: 'Testing · Automation · Validation · CI workflows',
      },
      {
        desc: 'Build AI-powered research agents that collect, structure, and validate information using multiple language models — moving from basic LLM usage toward practical AI system design.',
        focus: 'LLMs · Agent workflows · Prompt/system design · Structured AI outputs',
      },
      {
        desc: 'Move from individual AI agents to coordinated agentic systems using state, routing, memory, tool calling, schema validation, and LangGraph-based orchestration.',
        focus: 'Agent architecture · LangGraph · State management · Tool orchestration',
      },
      {
        desc: 'Take the system beyond development by packaging services into deployable infrastructure and learning how containers, CI/CD, release workflows, reliability, and cloud infrastructure work together.',
        focus: 'Docker · CI/CD · Deployment · Infrastructure · Reliability',
      },
      {
        desc: 'Introduce semantic search and machine learning into the platform, learning how embeddings, vector databases, hybrid retrieval, and predictive capabilities extend traditional application architectures.',
        focus: 'Embeddings · Vector databases · Semantic search · ML integration',
      },
      {
        desc: 'Bring the previous systems together into a unified architecture and understand how application, data, AI, security, infrastructure, and operational concerns interact inside an enterprise platform.',
        focus: 'System integration · Security · Scalability · Enterprise architecture',
      },
    ]),
  },
  scale: {
    label: 'Engineering Scale',
    title: 'Understand the Scale of Systems You Are Learning to Build',
    intro:
      'Radix gives students exposure to the scope and interconnectedness of a modern engineering platform — so complexity is experienced through actual systems rather than presented only as theory.',
    stats: [
      {
        val: '8',
        label: 'Engineering Systems',
        sub: 'A complete progression from data foundations to enterprise architecture',
      },
      {
        val: '163',
        label: 'Intelligence Parameters',
        sub: 'Experience modeling a complex real-world domain',
      },
      {
        val: '100+',
        label: 'Relational Tables',
        sub: 'Work with enterprise-scale data relationships',
      },
      {
        val: '1,995+',
        label: 'Automated Validations',
        sub: 'Build quality into the engineering workflow',
      },
      {
        val: '3+',
        label: 'AI Models Orchestrated',
        sub: 'Work across multi-model AI architectures',
      },
      {
        val: '7+',
        label: 'Architecture Layers',
        sub: 'Understand how full-stack systems fit together',
      },
    ],
    note: 'The numbers are not the goal. They represent the increasing complexity of the engineering problems you learn to solve.',
  },
  tech: {
    label: 'Production-Grade Technologies',
    title: 'Learn the Technologies Behind the Systems',
    intro:
      'Students work with a connected technology ecosystem rather than learning tools in isolation. Each technology is introduced in the context of an engineering problem it helps solve.',
    groups: techGroups([
      'Build and orchestrate practical AI systems',
      'Learn deployment and service engineering',
      'Build structured and semantic data layers',
      'Build the core application and data interfaces',
      'Learn how engineering quality is automated',
      'Work with the everyday tools used in engineering workflows',
    ]),
    note: 'The goal is not to collect technologies. The goal is to understand when, why, and how engineers use them together.',
  },
  complexity: {
    label: 'Progressive',
    title: 'Your Engineering Complexity Grows With Every System',
    intro:
      'Radix deliberately increases the complexity of the problems you solve. Each system builds on the architecture, skills, and infrastructure introduced before it.',
    stages: stages(AUDIENCE_STAGE_TAGS),
    note: 'You do not jump directly into advanced AI. You build the architectural foundation that makes advanced systems understandable.',
  },
  outcomes: {
    label: 'Engineering Outcomes',
    title: 'What You Build, Learn, and Walk Away With',
    intro:
      'Radix is designed around demonstrated engineering ability. Students build systems and develop competencies through direct technical work rather than relying only on lectures, certificates, or theoretical exercises.',
    items: [
      {
        title: 'Production Engineering Experience',
        desc: 'Work on a real AI-powered intelligence platform and experience how engineering problems are approached beyond classroom projects.',
      },
      {
        title: 'Portfolio-Grade Systems',
        desc: 'Build demonstrable artifacts including database architectures, AI agents, automated testing systems, deployments, and enterprise platform components.',
      },
      {
        title: 'System Architecture Mastery',
        desc: 'Learn to reason about multi-layer systems, data relationships, validation, AI workflows, infrastructure, and integration.',
      },
      {
        title: 'Industry Development Workflows',
        desc: 'Work with Git, CI/CD, containers, structured development workflows, testing, and deployment processes.',
      },
      {
        title: 'Cloud & Infrastructure Engineering',
        desc: 'Learn how applications are containerized, deployed, monitored, and operated in scalable environments.',
      },
      {
        title: 'Enterprise Engineering Thinking',
        desc: 'Develop an understanding of scalability, security, RBAC, audit trails, reliability, and maintainability.',
      },
    ],
    note: 'The outcome is not a certificate saying you studied engineering. It is evidence that you have built engineering systems.',
  },
  cta: {
    title: 'Start Building the Systems You Want to Be Hired to Build',
    body: 'Join a progressive engineering program where you move from foundational architecture to AI, infrastructure, machine learning, and enterprise systems — building the technical depth needed to contribute to modern engineering teams.',
    primary: { label: 'Explore Engineering Systems', href: '#projects' },
    secondary: { label: 'Explore Program Architecture', href: '#overview' },
    action: { label: 'Apply Now', href: '/apply-now' },
    note: 'Learn the architecture. Build the systems. Develop the engineering depth.',
    art: true,
  },
};

// ---------------------------------------------------------------------------------------------
// Radix for Companies: what engineering capability does this demonstrate, and why does it matter?
// ---------------------------------------------------------------------------------------------

export const RADIX_COMPANY: RadixContent = {
  hero: {
    eyebrow: 'Engineering Talent Built for Digital Intelligence Systems',
    title: ['Where Engineering Talent Meets Production-Grade Systems'],
    tagline:
      'System Architecture · Data Engineering · AI & Agents · DevOps & Cloud · Enterprise Platform Engineering',
    body: 'Radix develops engineers through direct work across complex digital systems — from normalized data architectures and automated validation to multi-agent AI, cloud infrastructure, machine learning, and enterprise platform design. Companies gain visibility into engineers who have worked across the technical layers required to build and operate modern AI-enabled products.',
    primary: { label: 'Explore the Engineering Systems', href: '#projects' },
    secondary: { label: 'Explore Engineering Capability', href: '#overview' },
  },
  overview: {
    label: 'Engineering Capability',
    title: 'A Structured Engineering Path Designed Around Real System Complexity',
    intro:
      'Radix develops engineering capability through a connected progression of technical systems. Instead of evaluating isolated skills, the program exposes engineers to the architecture, data, AI, infrastructure, quality, and enterprise concerns that emerge when building a complete digital platform.',
    pillars: pillars([
      {
        subtitle: 'End-to-End Product Engineering',
        desc: 'Engineers work across an integrated sequence of systems spanning data architecture, automation, AI, infrastructure, machine learning, and enterprise platform design.',
      },
      {
        subtitle: 'System Architecture & Data Design',
        desc: 'Engineers gain exposure to complex relational modeling, schema design, data relationships, validation, and multi-layer system architecture.',
      },
      {
        subtitle: 'DevOps & Cloud Infrastructure',
        desc: 'Engineers work with containerized services, CI/CD, deployment automation, observability, and cloud-oriented infrastructure practices.',
      },
      {
        subtitle: 'AI Systems & Agent Orchestration',
        desc: 'Engineers develop multi-agent systems using orchestration frameworks, structured outputs, tool calling, memory, routing, and validation.',
      },
      {
        subtitle: 'Enterprise Platform Design',
        desc: 'Engineers are exposed to security governance, RBAC, auditability, high availability, scalable architecture, and production-oriented platform design.',
      },
    ]),
    note: 'Radix evaluates and develops engineers through the complexity of real systems, not isolated technology checklists.',
  },
  systems: {
    label: 'Engineering Systems',
    title: '8 Systems. A Demonstrable Engineering Capability.',
    intro:
      'The eight systems expose engineers to the technical layers required to design, build, validate, deploy, and scale modern AI-enabled platforms. The progression provides a stronger view of engineering capability than isolated projects or technology badges.',
    focusLabel: 'Capability signal',
    items: systems([
      {
        desc: 'Engineers translate a complex business domain into a structured intelligence framework spanning business, financial, operational, and governance dimensions.',
        focus:
          'Requirements decomposition · Domain modeling · Structured data thinking · Business-to-system translation',
      },
      {
        desc: 'Engineers transform the domain model into a normalized relational architecture with interconnected tables, constraints, relationships, and enterprise-grade data integrity.',
        focus: 'Relational architecture · Schema design · Data modeling · Integrity management',
      },
      {
        desc: 'A metadata-driven validation architecture automatically generates thousands of checks, demonstrating an engineering approach where quality and correctness are built into the development lifecycle.',
        focus: 'Quality engineering · Automation · Validation architecture · CI integration',
      },
      {
        desc: 'Engineers build AI-driven research workflows that collect, structure, and validate intelligence using multiple large language models and automated orchestration.',
        focus: 'LLM integration · AI automation · Multi-model systems · Research workflows',
      },
      {
        desc: 'Individual agents are connected into a coordinated system with state management, schema validation, routing, tool execution, and multi-layer verification using LangGraph.',
        focus: 'Agent orchestration · State management · Tool systems · AI workflow architecture',
      },
      {
        desc: 'The AI platform is transformed into a deployable production system using containerized services, automated CI/CD, scalable infrastructure, and reliability-oriented deployment practices.',
        focus: 'Deployment engineering · CI/CD · Containers · Infrastructure · Reliability',
      },
      {
        desc: 'Engineers introduce semantic retrieval and machine learning capabilities through vector search, embeddings, hybrid retrieval, and predictive analytics.',
        focus: 'Semantic retrieval · ML integration · Vector infrastructure · Search architecture',
      },
      {
        desc: 'The complete platform is integrated into a unified architecture spanning application, data, AI, security, infrastructure, and operational layers.',
        focus: 'System integration · Enterprise architecture · Security · Scalability',
      },
    ]),
  },
  scale: {
    label: 'Engineering Scale',
    title: 'Engineering Capability Measured by System Complexity',
    intro:
      'The scope of Radix provides a concrete view of the engineering environments candidates have been exposed to — across data, quality, AI, infrastructure, and system architecture.',
    stats: [
      {
        val: '8',
        label: 'Engineering Systems',
        sub: 'End-to-end exposure across the product engineering lifecycle',
      },
      {
        val: '163',
        label: 'Intelligence Parameters',
        sub: 'Complex domain and requirements modeling',
      },
      {
        val: '100+',
        label: 'Relational Tables',
        sub: 'Enterprise-oriented relational data architecture',
      },
      {
        val: '1,995+',
        label: 'Automated Validations',
        sub: 'Automated quality and validation workflows',
      },
      { val: '3+', label: 'AI Models Orchestrated', sub: 'Multi-model AI system exposure' },
      {
        val: '7+',
        label: 'Architecture Layers',
        sub: 'Full-stack architecture across interconnected system layers',
      },
    ],
    note: 'These metrics describe the technical breadth and system complexity engineers have encountered — not simply the number of tools they have used.',
  },
  tech: {
    label: 'Production-Grade Technology Stack',
    title: 'Exposure to the Modern Engineering Ecosystem',
    intro:
      'The technology stack spans AI, agent orchestration, backend services, data infrastructure, testing, CI/CD, and developer tooling — providing companies with visibility into the environments engineers have worked across.',
    groups: techGroups([
      'Modern LLM and agent orchestration capability',
      'Deployment, automation, and service infrastructure',
      'Relational and semantic data infrastructure',
      'Core application and integration technologies',
      'Automated validation and engineering quality',
      'Standard development and engineering workflows',
    ]),
    note: 'The value is the combination of technologies across a working system — not familiarity with individual tools in isolation.',
  },
  complexity: {
    label: 'Progressive Engineering Depth',
    title: 'From Foundational Systems to Enterprise Architecture',
    intro:
      'The progression is designed to expose engineers to increasing technical complexity — moving from data architecture through validation, AI, infrastructure, semantic systems, and full platform integration.',
    stages: stages(AUDIENCE_STAGE_TAGS),
    note: 'The progression gives companies a view of engineering exposure across multiple layers rather than a snapshot of one isolated project.',
  },
  outcomes: {
    label: 'Engineering Outcomes',
    title: 'What Companies Can Expect Engineers to Understand',
    intro:
      'Radix produces evidence of engineering exposure through systems built across multiple technical layers. The objective is to develop engineers who can reason about complete systems rather than operate only within isolated technology silos.',
    items: [
      {
        title: 'Production Engineering Experience',
        desc: 'Exposure to the development of an AI-powered intelligence platform and production-oriented engineering workflows.',
      },
      {
        title: 'Portfolio-Grade Systems',
        desc: 'Demonstrable work across databases, AI agent systems, automated validation, containerized deployments, and enterprise platform architecture.',
      },
      {
        title: 'System Architecture Capability',
        desc: 'Experience reasoning across data models, validation layers, AI workflows, infrastructure, security, and system integration.',
      },
      {
        title: 'Industry Development Workflows',
        desc: 'Familiarity with Git-based development, CI/CD, containers, testing, deployment, and collaborative engineering practices.',
      },
      {
        title: 'Cloud & Infrastructure Engineering',
        desc: 'Exposure to containerization, deployment, monitoring, cloud infrastructure, and scalable production environments.',
      },
      {
        title: 'Enterprise Engineering Thinking',
        desc: 'Understanding of scalability, security governance, RBAC, auditability, reliability, and high-availability design patterns.',
      },
    ],
    note: 'The objective is not to produce engineers who know more tools. It is to develop engineers who can understand and contribute to complex systems.',
  },
  cta: {
    title: 'Build Your Engineering Team With Demonstrable Technical Depth',
    body: 'Engage with an engineering talent pipeline developed through complex systems work across data architecture, AI, infrastructure, machine learning, testing, and enterprise platform design.',
    primary: { label: 'Explore Engineering Capability', href: '#overview' },
    secondary: { label: 'Explore the 8 Engineering Systems', href: '#projects' },
    action: { label: 'Hire AI Talent', href: '/hire/form' },
    note: 'See the systems. Understand the capability. Connect with the engineers.',
    art: true,
  },
};
