// Static data for the site - projects, essays, education, etc.

export const PROJECTS = [
  {
    id: 'chasyr',
    name: 'Chasyr',
    tag: 'AI Invoice Recovery',
    desc: 'AI voice-agent platform for Australian SMBs. Voice agents negotiate payment plans, smart SMS/email handles follow-up, end-to-end case workflow with Xero integration and ACCC-compliant escalation.',
    stack: ['Next.js', 'TypeScript', 'Voice AI', 'Supabase', 'Xero API'],
    status: 'beta',
    statusLabel: 'Early access · 200+ waitlist',
    href: 'https://stage.chasyr.com',
    role: 'Architect + Full-stack',
    year: '2025',
    feature: true,
    logo: 'Ch',
  },
  {
    id: 'adjudication',
    name: 'Adjudication.io',
    tag: 'AI Dispute Resolution',
    desc: 'AI case-win probability checker against Australian construction-payment legal benchmarks; expert marketplace connecting contractors with adjudicators, lawyers, and witnesses.',
    stack: ['Next.js', 'TypeScript', 'AI/ML', 'Supabase'],
    status: 'live',
    statusLabel: 'Live',
    href: 'https://adjudication.io',
    role: 'Architect',
    year: '2024',
    logo: 'Ad',
  },
  {
    id: 'cadence',
    name: 'Cadence',
    tag: 'LinkedIn Outreach Intelligence',
    desc: "Ingests your company's product context, analyses your LinkedIn network, and generates a Reach Score for each connection - so outreach teams prioritise highest-probability prospects.",
    stack: ['Next.js', 'LLM', 'LinkedIn API', 'Supabase'],
    status: 'building',
    statusLabel: 'In active dev',
    href: 'https://runoncadence.com',
    role: 'Solo build',
    year: '2025',
    logo: 'Ca',
  },
  {
    id: 'floty',
    name: 'Floty',
    tag: 'Fleet Management SaaS',
    desc: 'End-to-end fleet management: job management, cost analysis, route optimisation, and workflow automation. Mapbox + PostGIS for routing.',
    stack: ['Next.js', 'Drizzle ORM', 'Lambda', 'PostGIS', 'Mapbox'],
    status: 'live',
    statusLabel: 'Shipped',
    href: 'https://floty.ai',
    role: 'Architect',
    year: '2024',
    logo: 'Fl',
  },
];

export const NOW_ITEMS = [
  { tag: 'SHIPPING', text: 'Chasyr voice agents closing real $$', accent: 'live' },
  { tag: 'ADVISORY', text: 'AI for special-needs ed @ Punjab Gov', accent: 'gov' },
  { tag: 'BUILDING', text: 'Cadence - solo, on weekends', accent: 'build' },
  { tag: 'WRITING',  text: 'Essays on AI-first engineering teams', accent: 'write' },
];

export const ESSAYS = [
  {
    date: '2026-04-22',
    title: "AI doesn't replace engineers - it removes the knowledge ceiling",
    sub: 'Two years of embedding AI tools across engineering teams. What actually changed.',
    cat: 'Technical',
    read: '8 min',
  },
  {
    date: '2026-04-08',
    title: "How I architected Chasyr's voice agents to stay ACCC-compliant",
    sub: 'Compliance as a first-class constraint, not an afterthought. State-machine + audit log + human escalation.',
    cat: 'Technical',
    read: '12 min',
  },
  {
    date: '2026-03-30',
    title: 'On building from Lahore for the world',
    sub: "What I've learned shipping international SaaS products from Pakistan: trust, timezones, and the long game.",
    cat: 'Personal',
    read: '6 min',
  },
  {
    date: '2026-03-12',
    title: 'Sabr in software - patience as engineering discipline',
    sub: 'The Islamic concept of sabr, and what it taught me about debugging, hiring, and the long compounding of small bets.',
    cat: 'Religious',
    read: '5 min',
  },
  {
    date: '2026-02-20',
    title: "RAG pipelines I'd never ship to prod (and the ones I would)",
    sub: 'Three years of vector DB war stories. Chunking strategies, embedding drift, and the lie of cosine similarity.',
    cat: 'Technical',
    read: '14 min',
  },
  {
    date: '2026-02-05',
    title: 'On the discipline of five daily prayers, as an engineer',
    sub: 'Five context switches a day, on purpose. Notes on rhythm, intent, and what no IDE can give you.',
    cat: 'Religious',
    read: '4 min',
  },
  {
    date: '2026-01-18',
    title: "A 7-person team can outship a 70-person team - here's the geometry",
    sub: 'How I structure AI-first engineering pods. Custom prompts, agent-driven CI, and the math of removed handoffs.',
    cat: 'Technical',
    read: '10 min',
  },
  {
    date: '2025-12-22',
    title: "I almost quit engineering in 2019. Here's what brought me back.",
    sub: "A year of feeling stuck. A government contract that wasn't supposed to matter. And a quiet rebuild.",
    cat: 'Personal',
    read: '7 min',
  },
];

export const TIERS = [
  {
    name: 'Architecture Audit',
    price: '$1,500',
    unit: '/ engagement',
    desc: 'A focused diagnostic of your stack, infra, and AI readiness. Written report, no fluff.',
    feats: [
      '2-week engagement, async + 2 calls',
      'Full architecture & infra review',
      'AI integration opportunity map',
      'Prioritised, costed roadmap',
    ],
    cta: 'Book audit',
  },
  {
    name: 'Embedded AI Lead',
    price: '$4,500',
    unit: '/ month',
    desc: "I work alongside your team as fractional AI lead. Set direction, ship the hard parts.",
    feats: [
      '15-20 hrs/week, 3-month minimum',
      'Architect AI features end-to-end',
      "Pair with your engineers, level them up",
      'Pre-sales support for AI deals',
      'Slack + weekly leadership sync',
    ],
    cta: 'Apply for slot',
    featured: true,
    badge: '2 of 3 slots filled',
  },
  {
    name: 'Strategy Call',
    price: '$150',
    unit: '/ 60 min',
    desc: 'One call. Bring your hardest architecture or AI-adoption question. Leave with a plan.',
    feats: [
      '60-min video call',
      "Pre-read of your context",
      'Recorded with action items',
      'One week of follow-up email',
    ],
    cta: 'Book a call',
  },
];

export const EDU = {
  Tutorials: [
    {
      title: "Building production voice agents that don't embarrass you",
      desc: 'A walkthrough of the state machine, audio pipeline, and fallback design I use for Chasyr.',
      meta: ['Series · 4 parts', 'Updated Apr 2026'],
    },
    {
      title: "A pragmatist's guide to RAG (with code)",
      desc: "When RAG actually beats fine-tuning, when it doesn't, and how to tell which one you need.",
      meta: ['Tutorial', 'Updated Mar 2026'],
    },
    {
      title: "AI-first PR review, codified",
      desc: "The exact prompts and CI workflows my team runs on every PR. Copy-paste, MIT licensed.",
      meta: ['Tutorial · Open source', 'github.com/isheraz/ai-pr'],
    },
    {
      title: 'Next.js × Supabase × Stripe - a deployable starter',
      desc: "The boilerplate I clone for every new SaaS bet. Auth, billing, RLS, AI hooks pre-wired.",
      meta: ['Starter kit', 'github.com/isheraz/saas-kit'],
    },
  ],
  Talks: [
    {
      title: 'AI-First Engineering Teams - Lahore Devs Meetup',
      desc: 'How I restructured a 7-person team around AI tooling. Velocity numbers, cultural pitfalls, what worked.',
      meta: ['Talk · 32 min', 'November 2025'],
    },
    {
      title: 'From Pre-sales to Production: Solutions Architect, decoded',
      desc: 'A guest lecture at COMSATS on how mid-career engineers can move into architecture roles.',
      meta: ['Lecture', 'COMSATS · Sep 2025'],
    },
    {
      title: 'Voice Agents in Regulated Markets',
      desc: 'Panel at AusFinTech 2026 - the legal, technical, and ethical scaffolding for AI that talks to customers.',
      meta: ['Panel', 'AusFinTech · 2026'],
    },
  ],
  Resources: [
    {
      title: 'Books that changed how I architect systems',
      desc: 'A handful of titles - short list, opinionated commentary, no affiliate nonsense.',
      meta: ['Curated list', '12 books'],
    },
    {
      title: 'Tools I actually use, daily',
      desc: 'My exact dev stack - IDE, terminal, AI agents, productivity hacks. Updated quarterly.',
      meta: ['Stack', 'Updated Q2 2026'],
    },
    {
      title: 'AI-engineering reading list',
      desc: 'Papers, blog posts, and talks I send every engineer I mentor on getting up to speed with AI.',
      meta: ['Reading list', '40+ links'],
    },
    {
      title: 'Resources for engineers from Pakistan',
      desc: 'Remote-friendly companies, visa sponsors, OSS scholarships - things I wish I had a decade ago.',
      meta: ['Career guide', 'Free'],
    },
  ],
};

export const EDU_ALL = [
  ...EDU.Tutorials.map(item => ({ ...item, category: 'Tutorials' })),
  ...EDU.Talks.map(item => ({ ...item, category: 'Talks' })),
  ...EDU.Resources.map(item => ({ ...item, category: 'Resources' })),
];

export const EDU_BODIES = [
  // 0 - Building production voice agents
  [
    { type: 'lede', text: 'A voice agent that handles negotiations with real humans is not the same as a chatbot. Here\'s the architecture that keeps Chasyr production-ready.' },
    { type: 'h2', text: 'The state machine' },
    { type: 'p', text: 'Every call follows a finite state machine. Greeting → identity check → reason disclosure → negotiation → outcome → compliance close. The LLM generates natural language; the state machine gates which states are reachable. This single constraint eliminates 80% of failure modes.' },
    { type: 'h2', text: 'Audio pipeline' },
    { type: 'p', text: 'Real-time audio requires careful buffering. We use Deepgram for transcription, pipe to Claude for reasoning, and use Elevenlabs for voice synthesis. Latency matters more than fidelity.' },
    { type: 'h2', text: 'Fallback design' },
    { type: 'p', text: 'When the LLM gets confused, we escalate. No recovery attempts, no retry loops. A warm transfer to a human is cheaper than a bad negotiation.' },
  ],
  // 1 - A pragmatist's guide to RAG
  [
    { type: 'lede', text: 'RAG is not a silver bullet. Here\'s when it works, when it doesn\'t, and how to know which problem you\'re actually solving.' },
    { type: 'p', text: 'The hype around RAG is that it lets you ground LLMs in fresh data. In practice, RAG is a retrieval problem disguised as an AI problem. Most failures are at the retrieval stage, not the generation stage.' },
    { type: 'h2', text: 'When RAG wins' },
    { type: 'p', text: 'You have a corpus of documents and need the LLM to cite them accurately. RAG shines here. The retrieval step finds relevant context; the LLM synthesizes. You get citations for free.' },
    { type: 'h2', text: 'When fine-tuning wins' },
    { type: 'p', text: 'You need the model to learn a new way of reasoning or style of output. Fine-tuning is the right tool. RAG won\'t teach the model anything; it only provides context.' },
    { type: 'p', text: 'The hard part is knowing which bucket your problem fits into. Hint: if you\'re uncertain, start with RAG. It\'s easier to debug.' },
  ],
  // 2 - AI-first PR review, codified
  [
    { type: 'lede', text: 'Every PR on my team gets reviewed by Claude before a human sees it. Here\'s the exact prompt and CI setup.' },
    { type: 'p', text: 'AI code review isn\'t about finding bugs—static analysis does that better. It\'s about pedagogical review: explaining trade-offs, questioning assumptions, and raising standards without slowing the team down.' },
    { type: 'h2', text: 'The prompt structure' },
    { type: 'p', text: 'We give Claude the full PR diff plus the codebase context. We ask it to review for readability, maintainability, and whether the change leaves the codebase in a better state. We ignore style—linters handle that.' },
    { type: 'h2', text: 'CI integration' },
    { type: 'p', text: 'The review runs as a GitHub check. It doesn\'t block merges; it educates. Engineers read the comment, decide if it\'s valid, and move forward. After a month, code quality visibly improves.' },
  ],
  // 3 - Next.js × Supabase × Stripe starter
  [
    { type: 'lede', text: 'Every SaaS I build starts from this template. Auth, billing, database, and AI hooks pre-wired. Here\'s what\'s included and why.' },
    { type: 'h2', text: 'Authentication' },
    { type: 'p', text: 'Supabase Auth with NextAuth.js. Social providers (GitHub, Google) out of the box. Magic links for emails that don\'t support social.' },
    { type: 'h2', text: 'Database & RLS' },
    { type: 'p', text: 'PostgreSQL with row-level security. Every query is scoped to the authenticated user. Database enforces security, not application code.' },
    { type: 'h2', text: 'Billing' },
    { type: 'p', text: 'Stripe integration with webhook handlers for subscription events. Usage-based billing setup is ready to go.' },
    { type: 'p', text: 'Clone, replace the secrets, and deploy. You\'ll have a production-ready SaaS in an afternoon.' },
  ],
  // 4 - AI-First Engineering Teams talk
  [
    { type: 'lede', text: 'A 7-person team shipping what a 16-person team shipped in 2022. Here\'s how.' },
    { type: 'h2', text: 'Multiplication, not replacement' },
    { type: 'p', text: 'AI doesn\'t replace engineers. It multiplies them. Juniors become mediors in months. Mediors become seniors in weeks. The leverage is asymmetric.' },
    { type: 'h2', text: 'What actually changed' },
    { type: 'p', text: 'We stopped hiring for knowledge and started hiring for judgment. We stopped writing boilerplate and started writing architecture. Our velocity numbers went 3x; our hiring numbers stayed flat.' },
    { type: 'h2', text: 'The cultural shift' },
    { type: 'p', text: 'This talk walks through the exact changes we made to processes, onboarding, code review, and team structure.' },
  ],
  // 5 - From Pre-sales to Production talk
  [
    { type: 'lede', text: 'How to move from pre-sales engineering into an architecture role without taking a step backward.' },
    { type: 'p', text: 'Pre-sales teaches you to understand customers, translate business problems into technical ones, and communicate across disciplines. Those skills are foundational for architecture.' },
    { type: 'h2', text: 'What transfers, what doesn\'t' },
    { type: 'p', text: 'Customer empathy transfers. Speed of understanding transfers. Imposter syndrome also transfers—but it\'s unfounded. You know how to learn quickly. Architecture is just learning on a larger scale.' },
    { type: 'h2', text: 'The career narrative' },
    { type: 'p', text: 'We walked through three engineer stories: one who moved too fast and burned out, one who moved too slow and got left behind, and one who got the pace right.' },
  ],
  // 6 - Voice Agents in Regulated Markets
  [
    { type: 'lede', text: 'Building AI agents that call humans requires more than good prompts. Here\'s the legal, technical, and ethical scaffolding.' },
    { type: 'h2', text: 'Compliance from day one' },
    { type: 'p', text: 'Regulations like ACCC in Australia, FTC rules in the US, and GDPR in Europe all apply. They weren\'t written for AI agents, which makes them ambiguous. But the spirit is clear: disclose, get consent, provide an out.' },
    { type: 'h2', text: 'Technical scaffolding' },
    { type: 'p', text: 'State machines again. Recording and retention windows. Human escalation as a feature. All of this is in the code, not in the prompts.' },
    { type: 'h2', text: 'Ethical design' },
    { type: 'p', text: 'The agent should never deceive. The customer should know they\'re talking to an AI. Manipulation is technically possible but ethically indefensible.' },
  ],
  // 7 - Books that changed architecture
  [
    { type: 'lede', text: 'A short, opinionated list of books that shaped how I think about systems.' },
    { type: 'p', text: 'Most architecture books are verbose and outdated. Here are the ones that are neither.' },
    { type: 'h2', text: 'The list' },
    { type: 'ul', items: [
      'Domain-Driven Design — Eric Evans. Learn to think in systems.',
      'Designing Data-Intensive Applications — Martin Kleppmann. Read the chapters on consistency and consensus.',
      'The Art of Unix Programming — Eric Raymond. Old but timeless.',
      'Building Microservices — Sam Newman. The chapter on testing is worth the book alone.',
    ] },
    { type: 'p', text: 'These are the ones I recommend to engineers I mentor. Read them in order.' },
  ],
  // 8 - Tools I actually use
  [
    { type: 'lede', text: 'My exact dev stack. Updated quarterly.' },
    { type: 'h2', text: 'Editor' },
    { type: 'p', text: 'VS Code with Copilot. The debugger integration alone is worth it.' },
    { type: 'h2', text: 'Terminal' },
    { type: 'p', text: 'Fish shell. Better history, better completion, better syntax highlighting than Bash.' },
    { type: 'h2', text: 'Productivity' },
    { type: 'p', text: 'Linear for task tracking. Slack for async communication. Figma for design. Arc browser for tab management.' },
    { type: 'h2', text: 'The rest' },
    { type: 'p', text: 'PostgreSQL. Redis for caching. Stripe for payments. Supabase for the database backend. AWS for compute.' },
  ],
  // 9 - AI-engineering reading list
  [
    { type: 'lede', text: 'Papers, blog posts, and talks every AI-focused engineer should read.' },
    { type: 'h2', text: 'Foundation' },
    { type: 'p', text: 'Start with Attention Is All You Need if you want the theory. Skip it if you don\'t. Either way, read Kaplan et al. on scaling laws.' },
    { type: 'h2', text: 'Practice' },
    { type: 'p', text: 'The LLM Prompt Engineering guide from OpenAI. Anthropic\'s prompt best practices. Papers on RAG, fine-tuning, and in-context learning.' },
    { type: 'h2', text: 'Edge cases' },
    { type: 'p', text: 'Read about jailbreaks not to use them, but to understand the threat model. Read about hallucinations. Read about safety.' },
    { type: 'p', text: 'Then build something. Reading without building is theater.' },
  ],
  // 10 - Resources for engineers from Pakistan
  [
    { type: 'lede', text: 'Remote work, visa sponsorship, OSS opportunities, and the things I wish someone had told me ten years ago.' },
    { type: 'h2', text: 'Getting remote work' },
    { type: 'p', text: 'Companies: Toptal, Gun.io, Arc.dev. You\'re competing globally, so your GitHub matters more than your resume.' },
    { type: 'h2', text: 'Visa sponsorship' },
    { type: 'p', text: 'Canada, UK, and Germany are engineer-friendly for visa sponsorship. Australia is harder. US requires an employer who wants to fight immigration.' },
    { type: 'h2', text: 'OSS scholarships' },
    { type: 'p', text: 'GitHub Sponsors. Patreon. These are real income for maintainers in Pakistan. Build something useful.' },
    { type: 'h2', text: 'The long game' },
    { type: 'p', text: 'Build in public. Write. Share your work. The Pakistan engineer tax on trust is real, but it compounds in reverse. Reputation is capital.' },
  ],
];

function buildGhData(seed = 7) {
  const weeks = 53;
  const data = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let w = 0; w < weeks; w++) {
    const week = [];
    const burst = rand() < 0.3 ? 1.4 : rand() < 0.1 ? 0.3 : 1;
    for (let d = 0; d < 7; d++) {
      const isWeekend = d === 0 || d === 6;
      const r = rand() * burst * (isWeekend ? 0.6 : 1);
      let level = 0;
      if (r > 0.92) level = 4;
      else if (r > 0.72) level = 3;
      else if (r > 0.42) level = 2;
      else if (r > 0.18) level = 1;
      week.push(level);
    }
    data.push(week);
  }
  return data;
}

export const GH_DATA = buildGhData();

export const ESSAY_BODIES = [
  // 0 - AI doesn't replace engineers
  [
    { type: 'lede', text: "For two years I've been embedding AI tools across engineering teams - not just personally, but at scale. Custom prompts. Agent-driven CI. LLM-powered code review. The results aren't what most people predicted." },
    { type: 'p', text: 'The lazy take is that AI replaces engineers. The honest answer, after thousands of merged PRs across @sociable-tech and @pitb-iep, is that AI removes the knowledge ceiling. There was always a gap between knowing what to build and being able to build it precisely. That gap is collapsing.' },
    { type: 'h2', text: 'What changed, concretely' },
    { type: 'p', text: "A junior engineer on my team shipped a Postgres migration with row-level security on her third week. Five years ago that would have been a senior task. Not because she suddenly knew RLS - because the tool let her ask the right questions in the right order, and her judgment about whether the answer made sense was the actual skill." },
    { type: 'p', text: 'Across a 7-person team, we shipped what a 16-person team shipped in 2022. Same domain, same compliance, same client expectations. The geometry of work changed; the discipline did not.' },
    { type: 'pull', text: '"AI doesn\'t replace the engineer. It removes the knowledge ceiling - and that makes craftsmanship more important, not less."' },
    { type: 'h2', text: "What didn't change" },
    { type: 'p', text: 'Taste. Architecture. The ability to say no. The willingness to refactor instead of bolting on. None of these get easier when generation is cheap. If anything, the cost of bad calls compounds faster because you can ship them faster.' },
    { type: 'p', text: 'Good code is still an art form. AI just gives every artist a better brush.' },
  ],
  // 1 - Chasyr ACCC-compliant
  [
    { type: 'lede', text: "Building a voice agent that calls Australian small businesses about overdue invoices means living inside ACCC compliance. Here's how I architected for it from day one." },
    { type: 'p', text: "Most voice-agent stacks treat compliance as a wrapper - a profanity filter, a recording-disclosure prompt, a kill switch. That's wrong. Compliance is a first-class architectural constraint, the same way idempotency is for payments." },
    { type: 'h2', text: 'The state machine' },
    { type: 'p', text: 'Every Chasyr call is a finite state machine with auditable transitions. Greeting → identity verification → reason → negotiation → outcome → disclosure → close. The LLM picks the words; the state machine picks what state we can move to. The model never gets to invent a new state. That single constraint kills 80% of compliance risk.' },
    { type: 'h2', text: 'Human escalation as a feature, not a fallback' },
    { type: 'p', text: 'If the caller asks anything outside the trained surface - a complaint, a dispute, a hardship claim - we transfer. Cheerfully, immediately, no negotiation. Engineers wanted to handle more in-agent. The product called it correctly: the cost of one bad call is greater than the cost of a hundred warm transfers.' },
    { type: 'pull', text: '"The model picks the words. The state machine picks what state we can move to."' },
    { type: 'p', text: "There's more - audit log structure, retention windows, consent capture mechanics. I'll cover them in part two." },
  ],
  // 2 - Building from Lahore
  [
    { type: 'lede', text: "I've shipped international SaaS from Lahore for a decade. The lessons are not what people on Twitter say they are." },
    { type: 'p', text: 'The first myth is timezone. People assume Pakistan-to-Australia is the easy match. It is. But timezone is a tax on attention, not on output. The output question is trust.' },
    { type: 'h2', text: 'Trust is the long compounding bet' },
    { type: 'p', text: "Every contract I have today is downstream of work I did two years ago for a client who is no longer with me. The Pakistani engineer's problem isn't skill - it's the cold-start penalty on trust. You can either pay that off in years, or you can buy your way out with a referral network. There is no third option." },
    { type: 'h2', text: "What I'd tell my younger self" },
    { type: 'p', text: 'Pick fewer clients. Charge more. Write publicly. Be unfashionably honest about deadlines. The market for credibility from a city like Lahore is thin enough that any signal travels far.' },
  ],
  // 3 - Sabr
  [
    { type: 'lede', text: "In Islam, sabr is often translated as \"patience\" - but it's closer to \"discipline through difficulty.\" It maps onto software work better than any productivity book I've read." },
    { type: 'p', text: "A bug that resists three days of debugging is a sabr exercise. A hire that doesn't pan out, a launch that lands soft, a quarter that misses - sabr. Not stoic numbness. Active, deliberate patience." },
    { type: 'pull', text: '"Sabr is not the absence of struggle. It is the discipline to stay in it without being deformed by it."' },
    { type: 'h2', text: 'The compounding of small bets' },
    { type: 'p', text: "Every venture I've started has needed two years to feel like anything. Chasyr is in early access at 200+ on the waitlist; that line on the chart is the visible part of work that was invisible for 18 months. Sabr is what protects you from the temptation to pivot off something that just hasn't finished baking." },
    { type: 'p', text: "The Quran pairs sabr with shukr - gratitude. They aren't opposites. Patience without gratitude is grinding. Gratitude without patience is naive. The combination is the closest thing I've found to a working engineering temperament." },
  ],
  // 4 - RAG pipelines
  [
    { type: 'lede', text: 'Three years of vector DB war stories. What I\'d ship today, and what I\'d burn down on sight.' },
    { type: 'p', text: 'Cosine similarity is a lie agreed upon. It works, mostly, until your corpus drifts - and then it fails silently, with confidence. That alone disqualifies it from any system where a wrong answer has a cost.' },
    { type: 'h2', text: 'Chunking is policy, not optimisation' },
    { type: 'p', text: 'Decide what a chunk MEANS to your retrieval target. A legal clause? A code function? A line of dialogue? Pick the semantic unit first, the byte size second. Every team I\'ve seen get RAG wrong picked byte size first.' },
    { type: 'h2', text: 'When I\'d still ship RAG' },
    { type: 'p', text: 'Domains where the corpus updates daily and the cost of a wrong answer is bounded. Customer support, internal docs, recommendation. Domains where the corpus is sacred - medical, legal, financial - demand a different architecture. I\'ll write that up next.' },
  ],
  // 5 - Five prayers
  [
    { type: 'lede', text: 'Five context switches a day, on purpose. Notes from an engineer praying through deadlines.' },
    { type: 'p', text: "I pray five times a day. I don't do it because it makes me a better engineer - I do it because I'm a Muslim. But living inside that rhythm has taught me things about focus that no productivity stack ever did." },
    { type: 'pull', text: '"Five forced disengagements. Five chances to re-anchor. The work after is never the same as the work before."' },
    { type: 'p', text: 'The IDE will not give you a stop signal. The market will not. Your team will not. You need an external clock, and prayer is the most reliable one I\'ve found.' },
  ],
  // 6 - 7-person team
  [
    { type: 'lede', text: "A 7-person AI-first team can outship a 70-person team. The geometry isn't magic - it's removed handoffs." },
    { type: 'p', text: "Every traditional engineering org pays a hidden tax: the cost of moving work between specialists. PM writes spec. Designer mocks. Frontend takes mock. Backend takes spec. QA tests both. PM closes. That's six handoffs for one feature. Each handoff loses context and adds latency." },
    { type: 'h2', text: 'What AI removes' },
    { type: 'p', text: "When a single engineer can specify, design, build, and test - with AI doing the parts they're weak on - the handoff count drops to zero. The bottleneck moves to taste and decision-making, which is exactly where you want it." },
    { type: 'h2', text: "What it doesn't" },
    { type: 'p', text: "You still need a clear product line. A flat seven-person team without a strong PM voice will ship seven things in seven directions. The role doesn't go away; it gets concentrated." },
  ],
  // 7 - Almost quit
  [
    { type: 'lede', text: 'In 2019 I almost left engineering. I want to write about what brought me back, because someone reading this might be in the same place.' },
    { type: 'p', text: "I was at a TV streaming company, fixing bugs nobody noticed, on a stack nobody loved. I had stopped reading code outside work. I had stopped writing. I had a daughter and a mortgage and a feeling that the next ten years would be a copy of the previous one." },
    { type: 'h2', text: 'The unlikely turn' },
    { type: 'p', text: 'A government contract - the kind everyone tells you to avoid - dropped onto my desk in late 2018. CMS work for the Punjab Information Technology Board. Boring on paper. But the constraints were so brutal, and the users so real, that I started caring again. Five thousand digital resources. Forty percent more access to educational content. People I\'d never meet, learning from something I helped ship.' },
    { type: 'pull', text: '"What brought me back wasn\'t a better stack. It was a colder reminder of who the work was for."' },
    { type: 'p', text: "I'm writing this seven years later, having shipped at scale, having built ventures, having advised governments. The thread back to that contract is unbroken. If you're in a place that feels stuck, the move is not to chase a shinier stack. It's to find a user." },
  ],
];
