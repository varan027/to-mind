import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "black");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "black" ? "light" : "black"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost btn-sm text-base-content/70 hover:text-primary hover:bg-base-content/10 transition-colors"
      title="Toggle Theme"
    >
      {theme === "black" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;