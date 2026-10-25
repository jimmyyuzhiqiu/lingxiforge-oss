import { defineStore } from "pinia";

export type ThemeMode = "light" | "dark";

const THEME_KEY = "theme-glass";
const LEGACY_KEY = "theme";

const readPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  const saved =
    localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_KEY);
  if (saved === "dark" || saved === "light") {
    localStorage.setItem(THEME_KEY, saved);
    return saved;
  }
  const attr = document.documentElement.getAttribute("theme");
  if (attr === "dark" || attr === "light") return attr;
  return "light";
};

const applyThemeToDom = (mode: ThemeMode) => {
  document.documentElement.setAttribute("theme", mode);
  document.body?.setAttribute("theme", mode);
  localStorage.setItem(THEME_KEY, mode);
  localStorage.removeItem(LEGACY_KEY);
};

export const useThemeStore = defineStore("theme", {
  state: () => ({
    mode: "light" as ThemeMode,
  }),
  actions: {
    init() {
      this.mode = readPreferredTheme();
      applyThemeToDom(this.mode);
    },
    set(mode: ThemeMode) {
      this.mode = mode;
      applyThemeToDom(mode);
    },
    toggle() {
      this.set(this.mode === "dark" ? "light" : "dark");
    },
  },
});
