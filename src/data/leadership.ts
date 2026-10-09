// Content for the leadership page. The case studies, testimonials and outcomes are selected
// engagements from the collective professional experience of the Talencia Global leadership team,
// covering both current and prior engagements. Figures are as stated in the source material.

export interface Metric {
  value: string;
  label: string;
}

export interface Leader {
  id: string;
  initials: string;
  name: string;
  title: string;
  bio: string[];
  /** portrait under /public; the initials tile stands in when there is none */
  photo?: string;
  company: string;
  email: string;
  linkedin: string;
  /** the longer story shown in the profile modal, one paragraph per entry */
  about: string[];
}

// PLACEHOLDER: every email, linkedin and about below is dummy copy until the real details arrive.
export const LEADERS: Leader[] = [
  {
    id: 'somashekhar',
    initials: 'S',
    name: 'Somashekhar',
    title: 'The Capital & Ecosystem Architect',
    bio: [
      'Architect of G2G and B2B Collaborations (CECA).',
      'Managed S$150M Technology Growth Fund.',
      'Mentorship/growth support for Over 50 Startups.',
    ],
    photo: '/images/leadership/somashekhar.webp',
    company: 'Talencia Global',
    email: 'somashekhar@example.com',
    linkedin: 'https://www.linkedin.com/in/example-somashekhar',
    about: [
      'Somashekhar has spent his career at the point where capital, policy and technology meet. He helped architect government-to-government and business-to-business collaborations under CECA, building the bridges that let companies and institutions work across borders.',
      'He went on to manage a S$150M Technology Growth Fund, backing technology ventures from early promise through to scale, and has mentored and supported the growth of more than 50 startups along the way.',
      'At T3 AI Works he shapes the capital and ecosystem strategy, connecting universities, industry and investors so that engineering talent has somewhere meaningful to go.',
    ],
  },
  {
    id: 'subramanian-sivakumar',
    initials: 'SS',
    name: 'Subramanian Sivakumar',
    title: 'The Talent Pipeline Architect',
    bio: [
      'Creator of the "0.3%" elite talent identification funnel.',
      'Scaled a $2 Billion Healthcare Claims platform.',
      'Spearheaded $2.8 Billion in IP Value Created.',
    ],
    company: 'Talencia Global',
    email: 'subramanian.sivakumar@example.com',
    linkedin: 'https://www.linkedin.com/in/example-subramanian-sivakumar',
    about: [
      'Subramanian Sivakumar has built his career around one question: how do you find exceptional engineers early and make them productive fast? His answer is the "0.3%" elite talent identification funnel, a selection model that surfaces the few candidates ready for demanding engineering work.',
      'He has paired that with deep platform experience, scaling a $2 Billion healthcare claims platform and spearheading work credited with $2.8 Billion in IP value created.',
      'At T3 AI Works he leads the talent pipeline, turning campus potential into deployment-ready engineering teams.',
    ],
  },
  {
    id: 'gv-babu',
    initials: 'GV',
    name: 'GV Babu',
    title: 'The Applied Tech & Infrastructure Architect',
    bio: [
      'Enterprise, BFSI & Edutech infrastructure expert.',
      "Built Asia's largest IT park training facility for 5,000 students.",
      'Industrial 4.0 & Robotics foundation for ISRO.',
    ],
    company: 'Talencia Global',
    email: 'gv.babu@example.com',
    linkedin: 'https://www.linkedin.com/in/example-gv-babu',
    about: [
      'GV Babu is an infrastructure builder across enterprise, BFSI and edutech. His work has consistently been about putting real, working technology environments in front of the people who need to learn on them.',
      "He built Asia's largest IT park training facility, serving 5,000 students, and laid an Industrial 4.0 and robotics foundation for ISRO.",
      'At T3 AI Works he leads applied technology and infrastructure, making sure the labs, platforms and tooling match what industry actually runs.',
    ],
  },
  {
    id: 'syed-tajuddeen',
    initials: 'ST',
    name: 'Syed Tajuddeen',
    title: 'The Strategic Engineering & Global Network Architect',
    bio: [
      '"32+ Years" of composite Engineering & Management leadership.',
      'Turnkey global infrastructure consultancy.',
      'Vast professional associate network.',
    ],
    company: 'Talencia Global',
    email: 'syed.tajuddeen@example.com',
    linkedin: 'https://www.linkedin.com/in/example-syed-tajuddeen',
    about: [
      'Syed Tajuddeen brings more than 32 years of composite engineering and management leadership, spanning the full arc from design through delivery.',
      'His turnkey global infrastructure consultancy has taken projects from concept to handover, and over the decades he has built a vast network of professional associates across disciplines and geographies.',
      'At T3 AI Works he leads strategic engineering and the global network, opening doors for the talent and the partners the programme brings together.',
    ],
  },
];

export interface CaseStudy {
  id: string;
  number: string;
  /** who the work was for, as far as the source names them */
  client: string;
  title: string;
  tag: string;
  summary: string[];
  topics?: string[];
  /** talent funnel, widest stage first */
  funnel?: Metric[];
  impact: Metric[];
  breakdown?: { title: string; items: Metric[] };
  closing?: string;
  note?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'campus-engineers',
    number: '01',
    client: 'Three Global IT Majors',
    title: '3,000 Campus Engineers',
    tag: 'Campus to deployment',
    summary: [
      'A large-scale Accelerated Project-Based Learning & Deployment Framework was implemented for approximately 3,000 campus hires across three global IT majors.',
      'Instead of the conventional model of completing training before beginning project work, engineers were placed into an iterative, project-based learning environment from Day 1, combining classroom learning with product backlogs, engineering sprints and live project environments.',
    ],
    impact: [
      { value: '98%+', label: 'Deployed within four weeks of training' },
      { value: '100+', label: 'Programs delivered' },
      { value: '65', label: 'Concurrent programs at peak' },
      { value: '0', label: 'Days of execution overrun' },
    ],
    closing:
      'Business stakeholders found the trained fresh engineers comparable to professionals with 2–3 years of industry experience.',
  },
  {
    id: 'design-experts',
    number: '02',
    client: 'Global Technology Company',
    title: '1,000 Experienced Engineers Transformed into Design Experts',
    tag: 'Capability transformation',
    summary: [
      'A large-scale capability transformation program moved experienced software developers beyond implementation into software design and architecture.',
      'The initiative used hands-on engineering with real-world complexity.',
    ],
    topics: ['Architecture Best Practices', 'Design Patterns', 'Refactoring', '.NET', 'C#', 'UML'],
    impact: [
      { value: '1,000', label: 'Engineers in the 3–10 year experience band' },
      { value: '25+', label: 'Programs over three years' },
      { value: '>4.2/5', label: 'Average feedback across programs' },
      { value: '5/5', label: 'Achieved by one program' },
    ],
    closing: 'Several real production and on-the-job problems were solved during the workshops.',
    note: 'The client is not named in the source material.',
  },
  {
    id: 'eurofins',
    number: '03',
    client: 'Eurofins',
    title: 'Blended Hiring Model for High-Quality Engineering Talent',
    tag: 'Talent discovery & deployment',
    summary: [
      'A talent discovery and deployment model was designed for a global leader in food-testing technology.',
      'Candidates underwent client-specific foundational training followed by an intensive sponsored three-month program. Hiring was split between 24-month Contract-to-Hire and direct hiring.',
    ],
    funnel: [
      { value: '~3,000', label: 'Assessed' },
      { value: '130', label: 'Shortlisted' },
      { value: '50', label: 'Selected' },
      { value: '50', label: 'Onboarded' },
    ],
    impact: [
      { value: '100%', label: 'Conversion' },
      { value: '4 weeks', label: 'Time within which every trainee was deployed' },
      { value: '100%', label: 'Positions filled on time' },
      { value: '0', label: 'Post-offer no-shows' },
    ],
    closing: 'Several became top performers, including an Employee of the Year.',
  },
  {
    id: 'clinical-research',
    number: '04',
    client: 'Global Clinical Research Leader',
    title: 'Ready-to-Deploy Talent',
    tag: 'High-selectivity talent model',
    summary: [
      'A high-selectivity talent model was created to discover, train and deploy engineers for a leading clinical research organization.',
    ],
    funnel: [
      { value: '~5,000', label: 'Assessed' },
      { value: '150', label: 'Shortlisted' },
      { value: '120', label: 'Selected' },
      { value: '100', label: 'Deployed' },
    ],
    impact: [
      { value: '95%', label: 'Conversion against an 80% target' },
      { value: '4 weeks', label: 'To deployment, versus approximately six months previously' },
      { value: '50%+', label: 'Effective cost savings' },
      { value: '100%', label: 'Positions filled within agreed timelines' },
      { value: '0', label: 'Post-offer no-shows' },
    ],
    note: 'The client is not named in the source material.',
  },
  {
    id: 'us-healthcare',
    number: '05',
    client: 'US Healthcare',
    title: 'Large-Scale Digital Healthcare Ecosystem',
    tag: 'Enterprise platform engineering',
    summary: [
      'Members of the leadership team were involved in designing and implementing what has been described as one of the largest digital ecosystems for US healthcare.',
    ],
    impact: [{ value: '90%', label: 'Of the 125-member technology team were campus graduates' }],
    breakdown: {
      title: 'Platform scale',
      // most telling first
      items: [
        { value: '3.8M+', label: 'Members' },
        { value: '$2B', label: 'Hospitalization costs' },
        { value: '692', label: 'Health plans' },
        { value: '1.7M+', label: 'Claims' },
        { value: '258K', label: 'Providers' },
        { value: '32', label: 'States' },
        { value: '12', label: 'Applications' },
        { value: '949K+', label: 'Hospitalization records' },
        { value: '$204M+', label: 'OPD claims' },
        { value: '4.5M+', label: 'Pharmacy records' },
        { value: '$58M+', label: 'Pharmacy' },
        { value: '3', label: 'Major clearing houses' },
      ],
    },
    closing:
      'The team composition demonstrated the ability to build enterprise-scale platforms using exceptionally young engineering teams.',
    note: 'The healthcare client is not identified in the source material.',
  },
  {
    id: 'innovation-accelerator',
    number: '06',
    client: 'Innovation Accelerator',
    title: 'Genesis, Blockworld & Nautica',
    tag: 'Innovation programs',
    summary: [
      'Leadership experience also included building innovation programs around POCs, prototypes, MVPs, research and patent cases, emerging technologies and futuristic solutions.',
    ],
    impact: [
      { value: '~$2.953B', label: 'Aggregate average valuation, as reported' },
      { value: '~$5.439B', label: 'Stated peak aggregate valuation' },
    ],
    breakdown: {
      title: 'Average valuation',
      items: [
        { value: '$728M', label: 'Genesis' },
        { value: '$1.783B', label: 'Blockworld' },
        { value: '$442M', label: 'Nautica' },
      ],
    },
  },
];

export interface ClientTestimonial {
  id: string;
  company: string;
  person: string;
  role: string;
  quote: string;
  context: string;
  facts?: string[];
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'fiserv',
    company: 'Fiserv',
    person: 'Anil Sarapalli',
    role: 'Former General Manager',
    quote:
      'Can the trainees apply the learning in the first week of joining regular work and deliver independently? In my experience, this is the only program that delivers on this objective.',
    context:
      'The engagement focused on creating engineers capable of becoming productive rapidly and delivering independently after deployment.',
  },
  {
    id: 'amadeus',
    company: 'Amadeus',
    person: 'Subramanian Ganesan',
    role: 'APAC R&D Head',
    quote: 'The engineers have been exceeding all expectations of the delivery managers.',
    context:
      'Fresh engineers trained over the engagement included talent from IITs, NITs and Tier-1 institutions.',
    facts: ['13+ years', '1,000+ fresh engineers trained'],
  },
  {
    id: 'philips',
    company: 'Philips Innovation Campus',
    person: 'Pragya Shrimali',
    role: 'Head of HR',
    quote:
      'Our association with you is longstanding and it has been an enriching journey together.',
    context:
      'A long-standing relationship that includes rapid upskilling of senior engineers into Designers and Architects.',
    facts: ['Since 2006'],
  },
  {
    id: 'eurofins',
    company: 'Eurofins India',
    person: 'Harish Ravi',
    role: 'Managing Director',
    quote:
      'Over the last six years, we have onboarded several hundred engineers through this program. I vouch for their commitment and customer obsession.',
    context: 'A relationship of more than nine years training fresh engineers for Eurofins.',
    facts: ['9+ years', '600+ fresh engineers trained'],
  },
  {
    id: 'cunningham',
    company: 'Cunningham Collective, USA',
    person: 'Andy Cunningham',
    role: 'CEO',
    quote:
      'I am thoroughly impressed with the skill level of the engineers. Their commitment and ability to come up with solutions quickly is among the best I have seen.',
    context:
      'Andy Cunningham worked with Steve Jobs on the launch of the original Apple Macintosh.',
  },
];

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  story: string;
  /** stated salary premium, in percent */
  premium: string;
  extra?: string;
  outcome: string;
  company: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'shashwath-das',
    name: 'Shashwath Das',
    role: 'Full Stack Python Developer',
    story:
      'A Mechanical Engineering graduate with no prior IT experience who transitioned into software engineering through a project-based internship model.',
    premium: '250',
    extra: '+ equity',
    outcome: 'Placed with',
    company: '1Pharmacy',
  },
  {
    id: 'balakrishna-k',
    name: 'Balakrishna K',
    role: 'Full Stack .NET Developer',
    story: 'The program helped build technical capability, confidence and interview readiness.',
    premium: '220',
    outcome: 'Placed with',
    company: 'Eurofins',
  },
  {
    id: 'monisha-t',
    name: 'Monisha T',
    role: 'Salesforce Consultant',
    story:
      'The acceleration journey combined technical development, mentoring and interview preparation.',
    premium: '150',
    outcome: 'Deployed with',
    company: 'Deloitte',
  },
];

export interface StudentTestimonial {
  id: string;
  name: string;
  programme: string;
  outcome: string;
  pullQuote: string;
  body: string[];
  skills?: string[];
  closing?: string;
}

export const STEP_TESTIMONIALS: StudentTestimonial[] = [
  {
    id: 'vishruth',
    name: 'Vishruth',
    programme: 'Final Year CSE',
    outcome: 'Placed at MUFG',
    pullQuote:
      'STEP gives you the structure and direction to prepare effectively. Starting early and taking initiative beyond the sessions makes the journey even more valuable and prepares you better for placements.',
    body: [
      'The SRM Talent Empowerment Program (STEP) provides the structure and direction needed to prepare systematically for placements. Starting early makes a significant difference – rather than moving between development, DSA and other topics without a clear plan, STEP provides a progressive journey through structured sessions, assessments, projects and hackathons.',
      'The weekend hackathons were particularly valuable. Building a working project with a team within tight timelines helped me understand how different concepts come together, while developing practical skills in problem-solving, task planning, collaboration and execution under pressure.',
      'Another important part of my journey has been working on TalHelix, a mentored real-world product that maps student skills to industry requirements. It has given me an opportunity to apply my learning to an actual product – from understanding the problem and developing features to seeing how the complete solution comes together.',
      'The 10 hours of STEP sessions every week provide a strong foundation, but the greatest value comes from continuously applying that learning – through projects, tools, tasks and hackathons beyond the scheduled sessions.',
    ],
  },
  {
    id: 'yugam-bhavin-shah',
    name: 'Yugam Bhavin Shah',
    programme: 'CTECH',
    outcome: 'Decision Analytics Associate at ZS Associates',
    pullQuote:
      'STEP was not merely placement preparation; it was a transformative experience that equipped me with the technical skills, confidence and professional mindset to successfully begin my career.',
    body: [
      'The STEP program, delivered by Talencia Global through the SRM Career Centre, played a crucial role in my placement journey. It went beyond technical preparation, building the discipline, accountability and professional mindset expected in the workplace.',
      'The project I developed during STEP became a major talking point across my placement interviews, where I was extensively questioned about my work. The program provided strong hands-on exposure to Data Engineering, Advanced SQL, Query Optimization, Data Analytics, ETL, Data Visualization, Power BI and Alteryx Designer. These skills strengthened both my practical capabilities and my resume and helped me become industry-ready.',
      'The combination of hands-on projects, industry-relevant technologies, peer reviews and proctored assessments created an environment of continuous learning, collaboration and self-evaluation.',
    ],
    skills: [
      'Data Engineering',
      'Advanced SQL',
      'Query Optimization',
      'Data Analytics',
      'ETL',
      'Data Visualization',
      'Power BI',
      'Alteryx Designer',
    ],
    closing:
      'I am grateful to SRM Career Centre, Talencia Global, the faculty and my peers for being part of this journey.',
  },
];
