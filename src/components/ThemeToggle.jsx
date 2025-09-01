import { useEffect } from "react";
import { usePersistentState } from "../hooks/usePersistentState.js";

export default function ThemeToggle() {
  const [theme, setTheme] = usePersistentState("theme", "system");

  useEffect(() => {
    const rootClassList = document.body.classList;
    rootClassList.remove("theme-dark", "theme-light");
    if (theme === "dark") rootClassList.add("theme-dark");
    else if (theme === "light") rootClassList.add("theme-light");
    // system -> rely on prefers-color-scheme
  }, [theme]);

  function cycle() {
    setTheme(prev =>
      prev === "system" ? "light"
        : prev === "light" ? "dark"
        : "system"
    );
  }

  const label =
    theme === "system" ? "System Theme"
      : theme === "light" ? "Light Theme"
      : "Dark Theme";

  const icon =
    theme === "system" ? "🖥️"
      : theme === "light" ? "🌞"
      : "🌙";

  return (
    <button
      type="button"
      className="btn theme-toggle outline"
      aria-label={`Toggle theme (current: ${label})`}
      title={label + " (click to change)"}
      onClick={cycle}
    >
      {icon}
      <span className="hide-on-narrow">{label}</span>
    </button>
  );
}