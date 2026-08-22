export type ThemeId =
  | "sequoia"
  | "sonoma"
  | "ventura"
  | "monterey"
  | "light"
  | "retro"
  | "obsidian";

export type Theme = {
  id: ThemeId;
  name: string;
  category: "dark" | "light" | "retro";
  previewGradient: string;
  accentColor: string;
  description: string;
};

export const THEMES: Theme[] = [
  {
    id: "sequoia",
    name: "macOS Sequoia",
    category: "dark",
    previewGradient: "linear-gradient(135deg, #141033 0%, #0b1740 50%, #12c9b0 100%)",
    accentColor: "#5fe3c3",
    description: "Deep obsidian indigo with vibrant aurora mesh",
  },
  {
    id: "sonoma",
    name: "Sonoma Sunset",
    category: "dark",
    previewGradient: "linear-gradient(135deg, #2d0b1e 0%, #681d2c 40%, #d95338 80%, #f5b544 100%)",
    accentColor: "#ffaa5e",
    description: "Rich dusk crimson, amber glow, and terracotta sunset",
  },
  {
    id: "ventura",
    name: "Ventura Dynamic",
    category: "dark",
    previewGradient: "linear-gradient(135deg, #18092b 0%, #4a154b 40%, #d946ef 80%, #fbbf24 100%)",
    accentColor: "#d946ef",
    description: "Fluid colorful wave with bright magenta & golden hues",
  },
  {
    id: "monterey",
    name: "Monterey Cyber",
    category: "dark",
    previewGradient: "linear-gradient(135deg, #090919 0%, #1c0a35 40%, #6c11c9 80%, #00d2ff 100%)",
    accentColor: "#00f2fe",
    description: "Electric cyberpunk indigo & cosmic cyan neon glow",
  },
  {
    id: "light",
    name: "Studio Light",
    category: "light",
    previewGradient: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #90e0ef 100%)",
    accentColor: "#00b4d8",
    description: "Crisp frosted white glass UI with bright ambient day tones",
  },
  {
    id: "retro",
    name: "Classic System 7",
    category: "retro",
    previewGradient: "linear-gradient(135deg, #666 0%, #888 50%, #ccc 100%)",
    accentColor: "#000000",
    description: "Vintage 1991 Macintosh platinum monochrome aesthetic",
  },
  {
    id: "obsidian",
    name: "Deep Obsidian",
    category: "dark",
    previewGradient: "linear-gradient(135deg, #030407 0%, #090c13 50%, #182030 100%)",
    accentColor: "#38bdf8",
    description: "Stealth dark theme with subtle icy blue particle aura",
  },
];
