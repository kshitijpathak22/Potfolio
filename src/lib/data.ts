export const LINK = {
  email: "kshitijpathak0212@gmail.com",
  linkedin: "https://www.linkedin.com/in/kshitij-pathak22/",
  github: "https://github.com/kshitijpathak22",
};

export const PROFILE = {
  name: "Kshitij Pathak",
  role: "Agentic & GenAI Developer",
  company: "KPMG",
  edu: "Manipal University Jaipur",
};

export type Project = {
  title: string;
  desc: string;
  tags?: string[];
  badge?: string;
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered Regulatory Compliance Bot",
    desc: "An agentic system that interprets regulatory text and checks documents & processes for compliance.",
    tags: ["python", "langchain", "nlp", "agents"],
    badge: "in progress",
  },
  {
    title: "kshitijOS",
    desc: "The interactive desktop portfolio you're using right now — boot screen, dock, draggable windows.",
    tags: ["next.js", "react", "ui"],
  },
  {
    title: "Web-scraping & data tools",
    desc: "Pipelines with BeautifulSoup, Scrapy & Selenium, surfaced through Streamlit dashboards.",
    tags: ["python", "scraping", "streamlit"],
  },
  {
    title: "More on GitHub",
    desc: "Everything else lives on my GitHub.",
    link: LINK.github,
  },
];

export type Job = { role: string; meta: string; desc: string };

export const EXPERIENCE: Job[] = [
  {
    role: "Agentic & GenAI Developer — KPMG",
    meta: "present",
    desc: "Building production agentic & GenAI systems, including an AI-powered regulatory compliance bot.",
  },
  {
    role: "Intern — KPMG",
    meta: "prior",
    desc: "Prototyped GenAI features and helped ship them into the team's workflow.",
  },
  {
    role: "B.Tech — Manipal University Jaipur",
    meta: "current",
    desc: "Computer-science foundations alongside real AI-engineering work.",
  },
];

export type SkillGroup = { title: string; items: string };

export const SKILLS: SkillGroup[] = [
  { title: "AI / ML", items: "TensorFlow, PyTorch, Hugging Face Transformers, LangChain, NLP, Deep Learning." },
  { title: "Languages", items: "Python, JavaScript, C, HTML, CSS." },
  { title: "Web", items: "React, Redux, Node.js, Express.js, Tailwind, Bootstrap." },
  { title: "Data & Scraping", items: "BeautifulSoup, Scrapy, Selenium, Streamlit." },
  { title: "Database & Tools", items: "MySQL, Postman." },
];

export const INTERESTS = [
  "artificial intelligence",
  "web development",
  "data analytics",
  "design & UX",
];

export type Photo = { cap: string; glyph: string; h1: string; h2: string };

// Placeholder "achievement" tiles — drop real photos into /public/achievements
// and swap these for <img> entries, or update the captions/glyphs.
export const PHOTOS: Photo[] = [
  { cap: "KPMG · GenAI work", glyph: "🏢", h1: "#3b4d8a", h2: "#26326b" },
  { cap: "Compliance Bot demo", glyph: "🤖", h1: "#1f8a7a", h2: "#146b5c" },
  { cap: "Hackathon", glyph: "🏆", h1: "#c98a2b", h2: "#8a5a14" },
  { cap: "Certification", glyph: "📜", h1: "#7a4bd0", h2: "#5a2fa8" },
  { cap: "Team / event", glyph: "👥", h1: "#2b6fb0", h2: "#1c4c85" },
  { cap: "A build I'm proud of", glyph: "⚡", h1: "#b0364f", h2: "#7a1f33" },
];

export type AppId =
  | "finder"
  | "notes"
  | "safari"
  | "photos"
  | "messages"
  | "mail"
  | "terminal"
  | "resume";

export const APP_META: Record<AppId, { title: string; w: number; h: number }> = {
  finder: { title: "Finder", w: 640, h: 440 },
  notes: { title: "Notes", w: 440, h: 380 },
  safari: { title: "Safari", w: 620, h: 460 },
  photos: { title: "Photos", w: 560, h: 440 },
  messages: { title: "Messages", w: 440, h: 420 },
  mail: { title: "Mail", w: 480, h: 380 },
  terminal: { title: "Terminal", w: 560, h: 360 },
  resume: { title: "Résumé.pdf", w: 480, h: 460 },
};

export const DOCK_ORDER: AppId[] = [
  "finder",
  "notes",
  "safari",
  "photos",
  "messages",
  "mail",
  "terminal",
];
