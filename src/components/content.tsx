"use client";

import { PROJECTS, EXPERIENCE, SKILLS, LINK } from "@/lib/data";

function ResumeLink({ children }: { children: React.ReactNode }) {
  // Links to /public/Kshitij_Pathak_Resume.pdf — add that file to enable download.
  return (
    <a className="pri" href="/Kshitij_Pathak_Resume.pdf" download>
      {children}
    </a>
  );
}

export function ProjectsView() {
  return (
    <div className="cards two">
      {PROJECTS.map((p) => (
        <div className="c" key={p.title}>
          {p.badge && <span className="badge">{p.badge}</span>}
          <h4 dangerouslySetInnerHTML={{ __html: p.title }} />
          <p dangerouslySetInnerHTML={{ __html: p.desc }} />
          {p.tags && p.tags.length > 0 && (
            <div className="tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}
          {p.link && (
            <div style={{ marginTop: 8 }}>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                {p.link.replace("https://", "")} ↗
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ExperienceView() {
  return (
    <div className="timeline">
      {EXPERIENCE.map((j) => (
        <div className="tl" key={j.role}>
          <div className="stem">
            <div className="dot" />
            <div className="rail" />
          </div>
          <div>
            <div className="role" dangerouslySetInnerHTML={{ __html: j.role }} />
            <div className="meta">{j.meta}</div>
            <p>{j.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsView() {
  return (
    <div className="cards two">
      {SKILLS.map((s) => (
        <div className="c" key={s.title}>
          <h4>{s.title}</h4>
          <p>{s.items}</p>
        </div>
      ))}
    </div>
  );
}

export function AboutView() {
  return (
    <>
      <div className="k">whoami</div>
      <h2>Kshitij Pathak</h2>
      <p>
        <strong>Agentic &amp; GenAI developer at KPMG</strong>, currently studying at{" "}
        <strong>Manipal University Jaipur</strong>. I build AI systems that actually{" "}
        <strong>do</strong> things — right now an{" "}
        <strong>AI-powered regulatory compliance bot</strong> that reads regulatory text and
        checks documents against it.
      </p>
      <p>
        I care about getting AI reliable, not just demo-able — and I like living where AI, web,
        and good design meet.
      </p>
    </>
  );
}

export function ResumeView() {
  return (
    <>
      <div className="paper">
        <h3>Kshitij Pathak</h3>
        <div className="role">Agentic &amp; GenAI Developer</div>
        <div className="sec">Experience</div>
        <ul>
          <li>
            Agentic &amp; GenAI Developer, KPMG — production agents &amp; GenAI, incl. a
            regulatory compliance bot
          </li>
          <li>Intern, KPMG — GenAI prototyping</li>
        </ul>
        <div className="sec">Education</div>
        <ul>
          <li>B.Tech, Manipal University Jaipur</li>
        </ul>
        <div className="sec">Skills</div>
        <ul>
          <li>
            Agents, RAG, LLM tooling (LangChain, PyTorch, Hugging Face) · Python, JavaScript, SQL ·
            React / Node
          </li>
        </ul>
      </div>
      <div className="links" style={{ marginTop: 16 }}>
        <ResumeLink>Download PDF ↓</ResumeLink>
        <a href={LINK.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={LINK.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </>
  );
}
