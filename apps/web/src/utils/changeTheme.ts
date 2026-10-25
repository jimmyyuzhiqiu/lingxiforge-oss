export const changeTheme = () => {
  const html = document.documentElement;
  const THEME_KEY = "theme-glass";
  const LEGACY_KEY = "theme";
  const stored =
    localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_KEY);
  const currentTheme =
    stored || html.getAttribute("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("theme", newTheme);
  document.body?.setAttribute("theme", newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  localStorage.removeItem(LEGACY_KEY);
};
