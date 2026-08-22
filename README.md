# kshitijOS

An interactive **desktop-OS portfolio** for Kshitij Pathak — Agentic & GenAI
Developer at KPMG. It boots up, then presents a macOS-style desktop with a menu
bar, a dock of apps, and draggable/stackable windows. Built with **Next.js
(App Router) + TypeScript**.

## Apps

| App | What's inside |
|-----|---------------|
| **Finder** | Projects · Experience · Skills · Résumé · About (sidebar navigation) |
| **Notes** | Personal "about me" note + interests |
| **Safari** | A mini browser page + real links to GitHub / LinkedIn |
| **Photos** | Achievements gallery with a lightbox *(placeholder tiles — add real photos)* |
| **Messages** | iMessage-style contact |
| **Mail** | Opens a `mailto:` compose |
| **Terminal** | A working agent CLI — type `help`, `projects`, `open safari`, `sudo hire kshitij` |

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## Customize

- **Your content** lives in [`src/lib/data.ts`](src/lib/data.ts) — name, role,
  projects, experience, skills, links, and the Photos/achievements tiles.
- **macOS icons**: drop a PNG icon pack into [`public/icons/`](public/icons)
  (see that folder's README). Built-in SVG icons are used until you do.
- **Résumé PDF**: add `public/Kshitij_Pathak_Resume.pdf` to enable the download
  buttons.
- **Achievement photos**: replace the placeholder tiles in `PHOTOS` (in
  `data.ts`) with real images (put files in `public/` and reference them).

## Deploy

Push to GitHub and import the repo at **vercel.com** — zero config. Or:

```bash
npm i -g vercel && vercel
```

## Structure

```
src/
  app/            layout, page, globals.css
  lib/data.ts     ← all your content
  components/
    Desktop.tsx   window manager + menu bar + dock + boot
    apps.tsx      Finder, Notes, Safari, Photos, Messages, Mail, Terminal
    content.tsx   reusable Projects/Experience/Skills/About/Résumé views
    Icons.tsx     macOS icon loader (PNG + SVG fallback)
public/icons/     drop a macOS icon pack here
```
