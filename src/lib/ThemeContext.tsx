"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES, type ThemeId } from "./themes";

type ThemeContextType = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  toggleControlCenter: () => void;
  openAboutMac: () => void;
  triggerLockScreen: () => void;
  triggerRestart: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "sequoia",
  setTheme: () => {},
  toggleControlCenter: () => {},
  openAboutMac: () => {},
  triggerLockScreen: () => {},
  triggerRestart: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext };
