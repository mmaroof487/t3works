import { SYSTEMS_DATA } from './systems';
import type { JourneySystem } from '../components/SystemCard';

/** student-facing copy for each system, in the same order as SYSTEMS_DATA */
const STUDENT_COPY: { desc: string; focus: string[] }[] = [
  {
    desc: 'Learn how to turn an unstructured business problem into a structured intelligence framework by identifying, categorizing, and defining 163 parameters across business, financial, operational, and governance dimensions.',
    focus: ['Requirements analysis', 'Domain modeling', 'Data definition', 'Structured thinking'],
  },
  {
    desc: 'Transform the parameter framework into a normalized relational database and learn how complex systems represent relationships, constraints, dependencies, and data integrity at scale.',
    focus: ['Database design', 'Normalization', 'Relational modeling', 'Data integrity'],
  },
  {
    desc: 'Build a metadata-driven validation system that automatically generates thousands of checks, teaching you how quality engineering becomes part of the system rather than an afterthought.',
    focus: ['Testing', 'Automation', 'Validation', 'CI workflows'],
  },
  {
    desc: 'Build AI-powered research agents that collect, structure, and validate information using multiple language models — moving from basic LLM usage toward practical AI system design.',
    focus: ['LLMs', 'Agent workflows', 'Prompt & system design', 'Structured AI outputs'],
  },
  {
    desc: 'Move from individual AI agents to coordinated agentic systems using state, routing, memory, tool calling, schema validation, and LangGraph-based orchestration.',
    focus: ['Agent architecture', 'LangGraph', 'State management', 'Tool orchestration'],
  },
  {
    desc: 'Take the system beyond development by packaging services into deployable infrastructure and learning how containers, CI/CD, release workflows, reliability, and cloud infrastructure work together.',
    focus: ['Docker', 'CI/CD', 'Deployment', 'Infrastructure', 'Reliability'],
  },
  {
    desc: 'Introduce semantic search and machine learning into the platform, learning how embeddings, vector databases, hybrid retrieval, and predictive capabilities extend traditional application architectures.',
    focus: ['Embeddings', 'Vector databases', 'Semantic search', 'ML integration'],
  },
  {
    desc: 'Bring the previous systems together into a unified architecture and understand how application, data, AI, security, infrastructure, and operational concerns interact inside an enterprise platform.',
    focus: ['System integration', 'Security', 'Scalability', 'Enterprise architecture'],
  },
];

export const STUDENT_SYSTEMS: JourneySystem[] = SYSTEMS_DATA.map((system, i) => ({
  num: system.num,
  title: system.title,
  subtitle: system.subtitle,
  img: system.img,
  highlights: system.metrics.split(' | '),
  ...STUDENT_COPY[i],
}));

export const STUDENT_PILLARS = [
  {
    stat: '8 Engineering Systems',
    title: 'Real Product Engineering',
    desc: 'Build across eight connected engineering systems and understand how individual technical decisions contribute to a larger production-oriented platform.',
  },
  {
    stat: '100+ Tables',
    title: 'System Architecture & Data Design',
    desc: 'Learn how complex domains are decomposed into structured schemas, normalized databases, relationships, and scalable application architectures.',
  },
  {
    stat: 'Cloud-Native',
    title: 'DevOps & Cloud Infrastructure',
    desc: 'Learn how software moves from local development to reliable deployment through containers, CI/CD, infrastructure, observability, and automated workflows.',
  },
  {
    stat: 'Multi-Agent AI',
    title: 'AI Systems & Agent Orchestration',
    desc: 'Build practical AI systems using LLMs, LangChain, LangGraph, vector databases, structured validation, tool calling, and multi-agent workflows.',
  },
  {
    stat: 'Enterprise-Grade',
    title: 'Enterprise Platform Design',
    desc: 'Understand how production systems are designed for security, access control, auditability, scalability, reliability, and maintainability.',
  },
];

export const STUDENT_OUTCOMES = [
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
];
