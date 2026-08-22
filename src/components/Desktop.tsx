"use client";

import { useEffect, useReducer, useRef, useState, useCallback } from "react";
import { APP_META, DOCK_ORDER, type AppId } from "@/lib/data";
import { THEMES, type ThemeId } from "@/lib/themes";
import { ThemeContext } from "@/lib/ThemeContext";
import { AppIcon } from "./Icons";
import { Finder, Notes, Safari, Photos, Messages, Mail, Resume, Terminal } from "./apps";

const BAR = 30;
const DOCK = 100;

type Win = {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  min: boolean;
  prev?: { x: number; y: number; w: number; h: number } | null;
};

type State = { list: Win[]; zTop: number; active: string };

type Action =
  | { type: "open"; id: AppId; mobile: boolean }
  | { type: "close"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "min"; id: AppId }
  | { type: "max"; id: AppId; mobile: boolean }
  | { type: "move"; id: AppId; x: number; y: number };

function reducer(state: State, a: Action): State {
  const find = (id: AppId) => state.list.find((w) => w.id === id);
  switch (a.type) {
    case "open": {
      const existing = find(a.id);
      const z = state.zTop + 1;
      if (existing) {
        return {
          ...state,
          zTop: z,
          active: a.id,
          list: state.list.map((w) => (w.id === a.id ? { ...w, z, min: false } : w)),
        };
      }
      const meta = APP_META[a.id];
      const n = state.list.length;
      let win: Win;
      if (a.mobile) {
        win = { id: a.id, x: 6, y: BAR + 8, w: window.innerWidth - 12, h: window.innerHeight - BAR - DOCK - 24, z, min: false };
      } else {
        const w = Math.min(meta.w, window.innerWidth - 20);
        const h = Math.min(meta.h, window.innerHeight - BAR - DOCK - 30);
        const x = Math.max(14, Math.min(window.innerWidth - w - 14, window.innerWidth / 2 - w / 2 + (n * 28 - 46)));
        const y = Math.max(BAR + 14, Math.min(window.innerHeight - h - DOCK - 14, window.innerHeight * 0.14 + n * 24));
        win = { id: a.id, x, y, w, h, z, min: false };
      }
      return { ...state, zTop: z, active: a.id, list: [...state.list, win] };
    }
    case "close": {
      const list = state.list.filter((w) => w.id !== a.id);
      const active = list.length ? list[list.length - 1].id : "finder";
      return { ...state, list, active };
    }
    case "focus": {
      const z = state.zTop + 1;
      return { ...state, zTop: z, active: a.id, list: state.list.map((w) => (w.id === a.id ? { ...w, z } : w)) };
    }
    case "min":
      return { ...state, list: state.list.map((w) => (w.id === a.id ? { ...w, min: true } : w)) };
    case "max": {
      return {
        ...state,
        list: state.list.map((w) => {
          if (w.id !== a.id) return w;
          if (w.prev) return { ...w, ...w.prev, prev: null };
          return {
            ...w,
            prev: { x: w.x, y: w.y, w: w.w, h: w.h },
            x: 10,
            y: BAR + 8,
            w: window.innerWidth - 20,
            h: window.innerHeight - BAR - DOCK - 20,
          };
        }),
      };
    }
    case "move":
      return { ...state, list: state.list.map((w) => (w.id === a.id ? { ...w, x: a.x, y: a.y } : w)) };
    default:
      return state;
  }
}

export default function Desktop() {
  const [state, dispatch] = useReducer(reducer, { list: [], zTop: 100, active: "finder" });
  const [booted, setBooted] = useState(false);
  const [mobile, setMobile] = useState(false);

  // Theme & macOS UI States
  const [theme, setThemeState] = useState<ThemeId>("sequoia");
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [aboutMacOpen, setAboutMacOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [sleeping, setSleeping] = useState(false);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem("kshitij_os_theme", id);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kshitij_os_theme") as ThemeId;
      if (saved && THEMES.some((t) => t.id === saved)) {
        setTheme(saved);
      }
    } catch {}
  }, [setTheme]);

  const open = useCallback(
    (id: AppId) => dispatch({ type: "open", id, mobile: window.matchMedia("(max-width:759px)").matches }),
    []
  );

  useEffect(() => {
    const check = () =>
      setMobile(window.matchMedia("(max-width:759px)").matches || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // boot
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      setBooted(true);
      open("finder");
      if (!window.matchMedia("(max-width:759px)").matches) {
        setTimeout(() => open("terminal"), 300);
      }
    }, reduce ? 250 : 2150);
    return () => clearTimeout(t);
  }, [open]);

  const triggerRestart = () => {
    setBooted(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      setBooted(true);
    }, reduce ? 250 : 2150);
  };

  const activeTitle =
    (APP_META[state.active as AppId] && APP_META[state.active as AppId].title.replace(".pdf", "")) ||
    "Finder";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleControlCenter: () => setControlCenterOpen((v) => !v),
        openAboutMac: () => setAboutMacOpen(true),
        triggerLockScreen: () => setLocked(true),
        triggerRestart,
      }}
    >
      <div id="desk">
        <div className="aur a1" />
        <div className="aur a2" />
        <div className="aur a3" />
        <div className="aur a4" />
        <div className="vig" />
        <DesktopIcon top={50} label="Résumé.pdf" glyph="📄" onOpen={() => open("resume")} mobile={mobile} />
        <DesktopIcon top={150} label="Projects" glyph="📁" onOpen={() => open("finder")} mobile={mobile} />
        <DesktopIcon top={250} label="Achievements" glyph="🏆" onOpen={() => open("photos")} mobile={mobile} />
      </div>

      <MenuBar
        active={activeTitle}
        theme={theme}
        setTheme={setTheme}
        controlCenterOpen={controlCenterOpen}
        setControlCenterOpen={setControlCenterOpen}
        openAboutMac={() => setAboutMacOpen(true)}
        triggerLockScreen={() => setLocked(true)}
        triggerRestart={triggerRestart}
        triggerSleep={() => setSleeping(true)}
      />

      {state.list.map((w) =>
        w.min ? null : (
          <WindowFrame key={w.id} win={w} active={state.active === w.id} dispatch={dispatch} mobile={mobile}>
            <AppBody id={w.id} open={open} />
          </WindowFrame>
        )
      )}

      <div className="dockbar">
        {DOCK_ORDER.map((id) => {
          const isOpen = state.list.some((w) => w.id === id);
          return (
            <button key={id} className={"dapp" + (isOpen ? " open" : "")} onClick={() => open(id)}>
              <span className="tip">{APP_META[id].title}</span>
              <AppIcon id={id} />
              <span className="run" />
            </button>
          );
        })}
      </div>

      <div className="hintline">
        drag window title bars · red dot closes ·  Apple menu on top · switch macOS themes in top right 🎨
      </div>

      {/* About This Mac Modal */}
      {aboutMacOpen && <AboutMacModal onClose={() => setAboutMacOpen(false)} />}

      {/* Lock Screen Overlay */}
      {locked && <LockScreenOverlay onUnlock={() => setLocked(false)} />}

      {/* Sleep Mode Overlay */}
      {sleeping && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "#000",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--mono)",
            fontSize: "13px",
          }}
          onClick={() => setSleeping(false)}
        >
          Click anywhere to wake kshitijOS
        </div>
      )}

      {/* Boot Screen */}
      <div id="boot" className={booted ? "hide" : ""} onClick={() => setBooted(true)}>
        <div className="mark">
          <b>k</b>shitijOS
        </div>
        <div className="barwrap">
          <div className="fill" />
        </div>
        <BootMessage />
      </div>
    </ThemeContext.Provider>
  );
}

function DesktopIcon({
  top,
  label,
  glyph,
  onOpen,
  mobile,
}: {
  top: number;
  label: string;
  glyph: string;
  onOpen: () => void;
  mobile: boolean;
}) {
  return (
    <div
      className="dicon"
      style={{ top, right: 26 }}
      onDoubleClick={onOpen}
      onClick={() => mobile && onOpen()}
    >
      <div className="g">{glyph}</div>
      <div className="nm">{label}</div>
    </div>
  );
}

function AppBody({ id, open }: { id: AppId; open: (id: AppId) => void }) {
  switch (id) {
    case "finder":
      return <Finder />;
    case "notes":
      return <Notes />;
    case "safari":
      return <Safari />;
    case "photos":
      return <Photos />;
    case "messages":
      return <Messages />;
    case "mail":
      return <Mail />;
    case "resume":
      return <Resume />;
    case "terminal":
      return <Terminal open={open} />;
    default:
      return null;
  }
}

function WindowFrame({
  win,
  active,
  dispatch,
  mobile,
  children,
}: {
  win: Win;
  active: boolean;
  dispatch: React.Dispatch<Action>;
  mobile: boolean;
  children: React.ReactNode;
}) {
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".lights")) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || mobile) return;
    const nx = drag.current.ox + (e.clientX - drag.current.sx);
    const ny = Math.max(BAR, drag.current.oy + (e.clientY - drag.current.sy));
    dispatch({ type: "move", id: win.id, x: nx, y: ny });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className={"win" + (active ? " focused" : "")}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDown={() => dispatch({ type: "focus", id: win.id })}
    >
      <div
        className="head"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="lights">
          <button className="r" aria-label="Close" onClick={() => dispatch({ type: "close", id: win.id })} />
          <button className="y" aria-label="Minimize" onClick={() => dispatch({ type: "min", id: win.id })} />
          <button className="g" aria-label="Zoom" onClick={() => dispatch({ type: "max", id: win.id, mobile })} />
        </div>
        <div className="title">
          <b>{APP_META[win.id].title}</b>
        </div>
      </div>
      <div className="body">{children}</div>
    </div>
  );
}

function AppleLogoIcon() {
  return (
    <svg className="apple-logo-svg" viewBox="0 0 170 170" width="14" height="14" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.92-14.49-6.15-3.23-2.62-7.14-7.23-11.73-13.84-6.42-9.24-11.6-19.74-15.54-31.5-3.93-11.76-5.9-23.2-5.9-34.32 0-13.84 3.42-25.5 10.26-34.98 6.84-9.48 15.42-14.34 25.74-14.58 4.67 0 9.87 1.2 15.6 3.6 5.73 2.4 9.6 3.69 11.61 3.87 1.83 0 5.8-1.37 11.91-4.11 6.11-2.74 11.45-3.99 16.02-3.75 11.49.6 20.89 4.7 28.2 12.3-10.26 6.23-15.28 15.01-15.06 26.34.22 8.78 3.55 16.14 10 22.08 6.45 5.94 14.17 9.27 23.16 9.99-2.6 7.64-6.09 15.74-10.47 24.33zM119.22 31.95c0-6.72 2.41-13.22 7.23-19.5 4.82-6.28 11.02-10.41 18.6-12.4 1.09 7.02-.92 13.79-6.03 20.31-5.11 6.52-11.39 10.37-18.84 11.55-.16-.32-.47-1.15-.96-2.48z"/>
    </svg>
  );
}

function MenuBar({
  active,
  theme,
  setTheme,
  controlCenterOpen,
  setControlCenterOpen,
  openAboutMac,
  triggerLockScreen,
  triggerRestart,
  triggerSleep,
}: {
  active: string;
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  controlCenterOpen: boolean;
  setControlCenterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAboutMac: () => void;
  triggerLockScreen: () => void;
  triggerRestart: () => void;
  triggerSleep: () => void;
}) {
  const [clock, setClock] = useState("");
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) +
          "  " +
          d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const iv = setInterval(tick, 15000);
    return () => clearInterval(iv);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
        setControlCenterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [setControlCenterOpen]);

  const activeThemeObj = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="menubar" ref={menuRef}>
      <div className="l">
        <button
          className={"apple-btn" + (appleMenuOpen ? " active" : "")}
          title="Apple Menu"
          onClick={() => {
            setAppleMenuOpen((v) => !v);
            setControlCenterOpen(false);
          }}
        >
          <AppleLogoIcon />
        </button>
        <span className="app">{active}</span>
        <span className="mi">File</span>
        <span className="mi">Edit</span>
        <span className="mi">View</span>
        <span className="mi">Window</span>
      </div>

      <div className="r">
        <button
          className={"menu-icon-btn" + (controlCenterOpen ? " active" : "")}
          title="Themes & Appearance"
          onClick={() => {
            setControlCenterOpen((v) => !v);
            setAppleMenuOpen(false);
          }}
        >
          🎨 <span style={{ fontSize: 11 }}>{activeThemeObj.name.split(" ")[0]}</span>
        </button>
        <span>◍ ▮▮▮</span>
        <span>agentic·genai</span>
        <span id="mclock">{clock}</span>
      </div>

      {/* Apple Menu Dropdown */}
      {appleMenuOpen && (
        <div className="apple-menu">
          <button
            className="apple-menu-item"
            onClick={() => {
              openAboutMac();
              setAppleMenuOpen(false);
            }}
          >
            <span> About This Mac</span>
          </button>
          <div className="apple-menu-divider" />
          <button
            className="apple-menu-item"
            onClick={() => {
              setControlCenterOpen(true);
              setAppleMenuOpen(false);
            }}
          >
            <span>🎨 System Appearance / Themes...</span>
          </button>
          <div className="apple-menu-divider" />
          <button
            className="apple-menu-item"
            onClick={() => {
              triggerSleep();
              setAppleMenuOpen(false);
            }}
          >
            <span>🌙 Sleep</span>
          </button>
          <button
            className="apple-menu-item"
            onClick={() => {
              triggerRestart();
              setAppleMenuOpen(false);
            }}
          >
            <span>🔄 Restart kshitijOS...</span>
          </button>
          <button
            className="apple-menu-item"
            onClick={() => {
              triggerLockScreen();
              setAppleMenuOpen(false);
            }}
          >
            <span>🔒 Lock Screen</span>
            <span className="shortcut">⌘Q</span>
          </button>
        </div>
      )}

      {/* Control Center & Theme Gallery Popup */}
      {controlCenterOpen && (
        <div className="control-center-popup">
          <div className="control-center-header">
            <h3>🎨 macOS Themes Gallery</h3>
            <span style={{ fontSize: 11, color: "var(--dim)", fontFamily: "var(--mono)" }}>
              {THEMES.length} Themes
            </span>
          </div>

          <div className="theme-grid">
            {THEMES.map((t) => {
              const isActive = t.id === theme;
              return (
                <div
                  key={t.id}
                  className={"theme-card" + (isActive ? " active" : "")}
                  onClick={() => setTheme(t.id)}
                >
                  <div
                    className="theme-preview-swatch"
                    style={{ background: t.previewGradient }}
                  >
                    {isActive && (
                      <span
                        style={{
                          background: "#fff",
                          color: "#000",
                          fontSize: 9,
                          fontWeight: 700,
                          borderRadius: 99,
                          padding: "1px 6px",
                          fontFamily: "var(--mono)",
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="theme-card-name">
                    {t.name}
                    {isActive && <span className="theme-active-dot" />}
                  </div>
                  <div className="theme-card-desc">{t.description}</div>
                </div>
              );
            })}
          </div>

          <div className="control-toggles">
            <button
              className="control-toggle-btn"
              onClick={() => {
                const idx = THEMES.findIndex((t) => t.id === theme);
                const nextTheme = THEMES[(idx + 1) % THEMES.length].id;
                setTheme(nextTheme);
              }}
            >
              🔄 Cycle Theme
            </button>
            <button className="control-toggle-btn" onClick={openAboutMac}>
               System Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutMacModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="about-mac-window" onClick={(e) => e.stopPropagation()}>
        <div className="about-mac-header">
          <div className="lights">
            <button className="r" aria-label="Close" onClick={onClose} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--dim)" }}>About This Mac</span>
          <div style={{ width: 12 }} />
        </div>
        <div className="about-mac-content">
          <div className="about-mac-logo">
            <AppleLogoIcon />
          </div>
          <div>
            <div className="about-mac-title">kshitijOS Sequoia</div>
            <div className="about-mac-sub">Version 15.2 (2026 Build)</div>
          </div>

          <div className="about-mac-specs">
            <div className="about-mac-spec-row">
              <span className="about-mac-spec-label">Developer</span>
              <span className="about-mac-spec-val">Kshitij Pathak</span>
            </div>
            <div className="about-mac-spec-row">
              <span className="about-mac-spec-label">Current Role</span>
              <span className="about-mac-spec-val">Agentic & GenAI Dev @ KPMG</span>
            </div>
            <div className="about-mac-spec-row">
              <span className="about-mac-spec-label">Education</span>
              <span className="about-mac-spec-val">Manipal University Jaipur</span>
            </div>
            <div className="about-mac-spec-row">
              <span className="about-mac-spec-label">Neural Engine</span>
              <span className="about-mac-spec-val">Apple M3 Max / Agentic AI Core</span>
            </div>
            <div className="about-mac-spec-row">
              <span className="about-mac-spec-label">Memory</span>
              <span className="about-mac-spec-val">64 GB Unified AI Memory</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                background: "var(--blue)",
                color: "#fff",
                border: 0,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontFamily: "var(--mono)",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockScreenOverlay({ onUnlock }: { onUnlock: () => void }) {
  const [pass, setPass] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
      setDateStr(d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
    };
    updateTime();
    const iv = setInterval(updateTime, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock();
  };

  return (
    <div className="lock-screen">
      <div className="lock-screen-wallpaper" />
      <div className="lock-screen-clock">{timeStr}</div>
      <div className="lock-screen-date">{dateStr}</div>

      <div style={{ height: 20 }} />

      <div className="lock-screen-avatar">👨‍💻</div>
      <div className="lock-screen-name">Kshitij Pathak</div>

      <form className="lock-screen-form" onSubmit={handleSubmit}>
        <input
          type="password"
          className="lock-screen-input"
          placeholder="Touch ID or enter password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoFocus
        />
        <button type="submit" className="lock-screen-btn">
          ➔
        </button>
      </form>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "var(--mono)" }}>
        Press Enter or click arrow to unlock
      </div>
    </div>
  );
}

function BootMessage() {
  const [msg, setMsg] = useState("booting…");
  useEffect(() => {
    const steps = ["booting…", "loading agent core…", "mounting themes…", "starting Finder…", "welcome."];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < steps.length) setMsg(steps[i]);
      else clearInterval(iv);
    }, 400);
    return () => clearInterval(iv);
  }, []);
  return <div className="msg">{msg}</div>;
}
