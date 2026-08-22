"use client";

import { useEffect, useRef, useState } from "react";
import { LINK, PHOTOS, type AppId } from "@/lib/data";
import { useTheme } from "@/lib/ThemeContext";
import { THEMES, type ThemeId } from "@/lib/themes";
import {
  AboutView,
  ExperienceView,
  ProjectsView,
  ResumeView,
  SkillsView,
} from "./content";

type OpenFn = (id: AppId) => void;

/* ── Finder ── */
const FINDER_VIEWS: { id: string; icon: string; label: string; node: React.ReactNode }[] = [
  { id: "projects", icon: "📁", label: "Projects", node: <ProjectsView /> },
  { id: "experience", icon: "💼", label: "Experience", node: <ExperienceView /> },
  { id: "skills", icon: "⚡", label: "Skills", node: <SkillsView /> },
  { id: "resume", icon: "📄", label: "Résumé", node: <ResumeView /> },
  { id: "about", icon: "📝", label: "About", node: <AboutView /> },
];

export function Finder() {
  const [view, setView] = useState(FINDER_VIEWS[0]);
  return (
    <div className="finder">
      <div className="fsidebar">
        <div className="grp">Favorites</div>
        {FINDER_VIEWS.map((v) => (
          <div
            key={v.id}
            className={"fitem" + (v.id === view.id ? " on" : "")}
            onClick={() => setView(v)}
          >
            <span className="fi">{v.icon}</span>
            {v.label}
          </div>
        ))}
      </div>
      <div className="fmain">
        <div className="fbar">
          <b>Kshitij</b> › {view.label}
        </div>
        <div className="pad">{view.node}</div>
      </div>
    </div>
  );
}

/* ── Notes ── */
export function Notes() {
  return (
    <div className="noteshell">
      <div className="ntop">📌 pinned · about me</div>
      <div className="nbody">
        <h2>about me</h2>
        <div className="date">Agentic &amp; GenAI Developer · KPMG</div>
        <p>
          hi, i&apos;m <b>Kshitij</b>. i build AI that actually does things — agents, RAG, and
          GenAI pipelines. right now i&apos;m building an{" "}
          <b>AI-powered regulatory compliance bot</b> at KPMG, while finishing my degree at
          Manipal University Jaipur.
        </p>
        <p>
          i care about reliability over demos, and i like the spot where AI, web dev, and design
          overlap.
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#8a8467" }}>interests</p>
        <div className="chiprow">
          <span>artificial intelligence</span>
          <span>web development</span>
          <span>data analytics</span>
          <span>design &amp; UX</span>
        </div>
      </div>
    </div>
  );
}

/* ── Safari ── */
export function Safari() {
  return (
    <div className="safari">
      <div className="schrome">
        <div className="stabs">
          <div className="stab on">kshitij.dev</div>
          <div className="stab" onClick={() => window.open(LINK.github, "_blank", "noopener")}>
            GitHub ↗
          </div>
          <div className="stab" onClick={() => window.open(LINK.linkedin, "_blank", "noopener")}>
            LinkedIn ↗
          </div>
        </div>
        <div className="saddr">
          <span className="lock">🔒</span> kshitij-pathak.dev
        </div>
      </div>
      <div className="spage">
        <div className="hero">
          <div className="n">Kshitij Pathak</div>
          <div className="role">agentic &amp; genai developer · kpmg</div>
          <p>
            I build AI that does things — agents, RAG, and GenAI pipelines. Currently shipping an
            AI-powered regulatory compliance bot.
          </p>
        </div>
        <div className="links" style={{ justifyContent: "center", marginBottom: 20 }}>
          <a className="pri" href={LINK.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={LINK.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={`mailto:${LINK.email}`}>Email</a>
        </div>
        <div className="pad" style={{ paddingTop: 0 }}>
          <div className="k">stack</div>
          <SkillsView />
        </div>
      </div>
    </div>
  );
}

/* ── Photos ── */
export function Photos() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="fbar">Achievements · {PHOTOS.length} items</div>
      <div className="pgrid">
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="ph"
            style={{ background: `linear-gradient(160deg,${p.h1},${p.h2})` }}
            onClick={() => setActive(i)}
          >
            <span className="smp">sample</span>
            <span className="glyph">{p.glyph}</span>
            <span className="cap">{p.cap}</span>
          </div>
        ))}
      </div>
      {active !== null && (
        <div className="plight">
          <span className="close" onClick={() => setActive(null)}>
            ✕
          </span>
          <div
            className="big"
            style={{
              background: `linear-gradient(160deg,${PHOTOS[active].h1},${PHOTOS[active].h2})`,
            }}
          >
            {PHOTOS[active].glyph}
          </div>
          <div className="cap">{PHOTOS[active].cap}</div>
          <div className="note">sample tile — replace with your real achievement photo</div>
        </div>
      )}
    </>
  );
}

/* ── Messages ── */
export function Messages() {
  return (
    <>
      <div className="thread">
        <div className="stamp">iMessage · today</div>
        <div className="bub them">hey — kshitijOS is very cool. how do I reach you?</div>
        <div className="bub me">fastest is email — {LINK.email}</div>
        <div className="bub me">résumé &amp; links are right below 👇</div>
        <div className="stamp"> </div>
      </div>
      <div className="pad" style={{ paddingTop: 0 }}>
        <div className="links">
          <a className="pri" href="/Kshitij_Pathak_Resume.pdf" download>
            Résumé ↓
          </a>
          <a href={`mailto:${LINK.email}`}>Email</a>
          <a href={LINK.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={LINK.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}

/* ── Mail ── */
export function Mail() {
  return (
    <div className="mail">
      <div className="mh">New Message</div>
      <div className="mfield">
        <span className="lb">To:</span>
        <span className="vl">{LINK.email}</span>
      </div>
      <div className="mfield">
        <span className="lb">Subject:</span>
        <span className="vl">Let&apos;s talk</span>
      </div>
      <div className="mbody">Hi Kshitij, I came across kshitijOS and…</div>
      <div className="mfoot">
        <div className="links">
          <a className="pri" href={`mailto:${LINK.email}?subject=Let's%20talk`}>
            Open in Mail ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Résumé ── */
export function Resume() {
  return (
    <div className="pad">
      <ResumeView />
    </div>
  );
}

/* ── Terminal ── */
type Line = { html: string };

export function Terminal({ open }: { open: OpenFn }) {
  const { theme, setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([
    { html: '<span class="d">kshitijOS 15.0 — agent shell</span>' },
    { html: '<span class="d">the portfolio is an agent. ask it something.</span>' },
    { html: '<span class="d">type </span><span class="ok">help</span><span class="d"> to list commands.</span>' },
    { html: "" },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const print = (html: string) => setLines((l) => [...l, { html }]);

  const run = (raw: string) => {
    print('<span class="p">kshitij@lab ~ %</span> ' + escapeHtml(raw));
    const parts = raw.toLowerCase().trim().split(/\s+/);
    const c = parts[0];
    const openMsg = (id: AppId, msg: string) => {
      print(msg);
      open(id);
    };
    if (c === "help")
      print(
        '<span class="u">commands</span>: whoami · projects · experience · skills · resume · photos · contact · theme [name] · ls · open &lt;app&gt; · clear'
      );
    else if (c === "theme" || c === "themes") {
      if (!parts[1]) {
        const list = THEMES.map((t) => (t.id === theme ? `<b class="ok">[${t.id}]</b>` : t.id)).join(" · ");
        print(`<span class="u">themes</span>: ${list}<br/><span class="d">usage: theme &lt;name&gt; (e.g. theme sonoma)</span>`);
      } else {
        const match = THEMES.find((t) => t.id === parts[1] || t.name.toLowerCase().includes(parts[1]));
        if (match) {
          setTheme(match.id);
          print(`<span class="ok">✓ switched theme to ${match.name}</span>`);
        } else {
          print(`<span class="warn">unknown theme '${parts[1]}'</span>. choose from: ${THEMES.map((t) => t.id).join(", ")}`);
        }
      }
    }
    else if (c === "whoami")
      print("Kshitij Pathak — agentic &amp; genai developer @ KPMG, student @ Manipal University Jaipur.");
    else if (c === "ls")
      print('<span class="u">finder  notes  safari  photos  messages  mail  terminal</span>  <span class="d">(apps)</span>');
    else if (c === "projects") openMsg("finder", "flagship: AI-powered regulatory compliance bot — opening…");
    else if (c === "experience") openMsg("finder", "KPMG — opening Finder ▸ Experience…");
    else if (c === "skills") openMsg("safari", "AI/ML, Python/JS, React/Node — opening Safari…");
    else if (c === "resume") openMsg("resume", "opening résumé…");
    else if (c === "photos") openMsg("photos", "opening Photos ▸ achievements…");
    else if (c === "contact") openMsg("messages", `email: <span class="ok">${LINK.email}</span> — opening Messages…`);
    else if (c === "clear") setLines([]);
    else if (c === "sudo" && parts.includes("hire"))
      print(`<span class="ok">✓ excellent decision.</span> reach out: ${LINK.email}`);
    else if (c === "open" && parts[1]) {
      const known: AppId[] = ["finder", "notes", "safari", "photos", "messages", "mail", "terminal", "resume"];
      if (known.includes(parts[1] as AppId)) openMsg(parts[1] as AppId, "opening " + parts[1] + "…");
      else print('<span class="warn">no such app: ' + escapeHtml(parts[1]) + "</span>");
    } else if (c) print('<span class="warn">command not found: ' + escapeHtml(c) + '</span> — try <span class="ok">help</span>');
  };

  return (
    <div className="term" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => (
        <div className="ln" key={i} dangerouslySetInnerHTML={{ __html: l.html }} />
      ))}
      <div className="term-input">
        <span className="p">kshitij@lab ~ %</span>
        <input
          ref={inputRef}
          value={value}
          spellCheck={false}
          autoComplete="off"
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(value);
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
