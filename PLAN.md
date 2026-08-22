# Kshitij Pathak — Portfolio Plan & Ideation

**Owner:** Kshitij Pathak — Agentic & GenAI Developer @ KPMG · Ex-Intern @ KPMG · Student, Manipal University Jaipur
**Goal:** Land a job / internship (audience = recruiters + engineering hiring managers)
**Vibe:** Bold & experimental · **Build:** self-coded, with help

---

## 1. The core insight (from the two references)

Both reference sites reject the generic template and instead build an **interface metaphor** — a little world only that person would make.

- **ishaangoel.in** = a pixel-perfect **macOS Notes app**. The Notes sidebar is the navigation; each "note" is a section (about / experience / hackathons / how I think / hit me up); the dock icons are the real outbound links; contact happens in a fake iMessage window. Disarming, personal, memorable.
- **deluxsalon.in** = a **place you enter** — a cinematic 2000s Indian barbershop scene *is* the interface, with live presence ("1130 online"), ambient toggles ("Baarish? OFF"), and playful culturally-rooted micro-interactions.

**Lesson for you:** the concept should *be proof of your skill*, not just decoration. You build agents. So your portfolio should **be an agent.**

---

## 2. Concept directions

### ⭐ Concept A — "The Agent" (RECOMMENDED)

The homepage is a **chat / command interface**. Visitors type or click suggested prompts and an on-page agent answers *about you* — with **visible tool-call cards** rendering as it works.

```
┌─────────────────────────────────────────────┐
│  kshitij.dev · ask my agent anything          │
│                                               │
│  › What has Kshitij built?                    │
│    ┌ 🔧 get_projects() ──────────────┐        │
│    │  3 results · agentic-AI, GenAI   │        │
│    └──────────────────────────────────┘        │
│    He's shipped 3 agentic systems at KPMG...  │
│                                               │
│  Suggested:  [ Is he a fit for an AI eng role?]│
│              [ Show his KPMG work ]            │
│              [ Download résumé ]               │
└─────────────────────────────────────────────┘
```

**Why it wins for you:**
- Concept = demonstration. A recruiter sees *what you do* in the first gesture — you don't just claim "agentic AI developer," you hand them one.
- On-message for the exact roles you're targeting.
- The tool-call cards (`get_projects()`, `get_experience()`, `open_resume()`) are the "wow" — they show you understand agent UX, streaming, and tool orchestration.
- **Skimmer-safe:** a persistent nav / "just show me everything" mode means non-chatty recruiters still get a clean scannable page. This is critical — never force a recruiter to chat.

**Two ways to power the agent (build the cheap one first):**
1. **Deterministic mock (v1, $0, instant):** intents are matched client-side to canned answers + tool cards. No API key, no latency, works offline, no abuse risk. Ship this first.
2. **Real LLM (v2):** a serverless route calls Claude with your bio as context + real tool definitions. Model choice below. Add rate-limiting + a hard system prompt so it only talks about you.

### Concept B — "Agent Workbench / IDE"
The site looks like VS Code or an agent dev console. File-tree sidebar = nav (`about.md`, `projects/`, `agents/`), a terminal panel accepts commands, projects open as syntax-highlighted READMEs. Very dev-credible, lower novelty risk than a full OS.

### Concept C — "OS for one"
A desktop-OS metaphor (à la Ishaan) but themed as *your* AI workstation — windows, dock, menu bar, with the flagship "app" being an agent console. Highest novelty, highest effort, higher risk of style-over-substance for recruiters.

**Recommendation:** Build **A**. It's the tightest fit for "agentic dev who wants a job," and it degrades gracefully to a normal site.

---

## 3. Recommended tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Industry standard, great hiring signal, easy Vercel deploy |
| Styling | **Tailwind CSS** | Fast, consistent; pairs with a small design-token set |
| Motion | **Framer Motion** | Streaming text, tool-card reveals, micro-interactions |
| Agent (v2) | **Vercel AI SDK** + Claude | First-class streaming + tool-call UI; job-relevant |
| Model (v2) | **`claude-haiku-4-5`** ($1/$5 per MTok) or **`claude-sonnet-5`** ($3/$15) | Haiku = cheap + fast for a résumé bot; Sonnet if you want richer answers |
| Hosting | **Vercel** | Free tier, serverless functions, instant deploys, custom domain |
| Analytics | Vercel Analytics or Plausible | See which recruiters engage with what |

Keep the agent's **API key server-side only** (Next.js route handler / edge function). Never ship it to the browser.

---

## 4. Content architecture (the "notes"/intents)

Design each of these as **both** a chat intent *and* a nav section:

1. **`whoami`** — 2-3 line intro. Agentic & GenAI dev @ KPMG, student @ MUJ. Warm, first-person, low-ego.
2. **`experience`** — KPMG (current + internship). What you built, the stack, the impact. Quantify where you can.
3. **`projects`** — your agentic/GenAI builds. Each: problem → what you built → stack → outcome → links (repo/demo). This is the recruiter's #1 target.
4. **`skills`** — LLMs, agent frameworks, RAG, Python/TS, cloud. Group, don't list-dump.
5. **`how_i_build`** — short POV on agentic AI / how you approach problems. Signals seniority.
6. **`resume`** — one-click PDF download. Non-negotiable.
7. **`contact`** — email, LinkedIn, GitHub, X. Make it one tap.

**Writing voice:** confident, specific, lowercase-friendly, no buzzword soup. Recruiters skim — lead every section with the outcome.

---

## 5. Signature interactions (the polish that gets you remembered)

- **Streaming answers** — text types in token-by-token (real or simulated).
- **Tool-call cards** — `get_projects()`, `get_experience()`, `open_resume()` animate in above the answer.
- **Suggested prompts** as chips — so a recruiter never faces a blank box.
- **"Show everything" toggle** — collapses the chat into a classic scrollable résumé site.
- **Command palette (⌘K)** — jump to any section; reinforces the dev-tool identity.
- **Keyboard-first + fully responsive** — recruiters open portfolios on phones; test mobile early.
- **Fast first paint** — the hero + one suggested answer should render instantly, before any agent logic loads.

---

## 6. Build roadmap (phased)

**Phase 0 — Content (do this first, it's the bottleneck)**
- Write all 7 sections as plain markdown/JSON. Gather project links, résumé PDF, metrics.

**Phase 1 — Static shell**
- Next.js + Tailwind. Hero, layout, "Show everything" scrollable version. Deploy to Vercel. *You now have a real, shippable portfolio.*

**Phase 2 — Deterministic agent (v1)**
- Chat UI, suggested-prompt chips, intent→answer matching, tool-call cards, streaming animation. $0, no API. **This alone is a strong, distinctive portfolio.**

**Phase 3 — Real LLM (v2, optional upgrade)**
- Vercel AI SDK + Claude route handler, real tool definitions over your content, rate-limiting, tight system prompt. Fall back to deterministic answers if the API is down or rate-limited.

**Phase 4 — Polish**
- ⌘K palette, analytics, custom domain, OG/social preview image, accessibility & mobile pass, Lighthouse check.

---

## 7. Guardrails / gotchas

- **Recruiters won't always chat.** The skimmable fallback is mandatory, not optional.
- **Ship Phase 1–2 before touching an LLM.** A live deterministic site beats a half-built AI one.
- **Protect the v2 endpoint** — rate-limit, cap tokens, constrain the system prompt to "only discuss Kshitij," or it becomes a free Claude proxy someone will abuse.
- **Performance is a hiring signal.** Keep it fast; lazy-load the heavy agent code.
- **Accessibility** — keyboard nav, alt text, contrast. Hiring managers notice.

---

## 8. Immediate next steps

1. Confirm concept **A** (or pick B/C).
2. Draft the 7 content sections (I can help structure/write these).
3. Scaffold the Next.js app and ship the static shell to Vercel.
4. Layer in the deterministic agent.

> Decision to make: model for v2 — **Haiku 4.5** (cheapest/fastest, ideal for a résumé bot) vs **Sonnet 5** (richer answers). Recommend starting Haiku.
