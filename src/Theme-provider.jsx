import React, { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && ["default", "dark", "colorful"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.body.className = `min-h-screen transition-all duration-500 ease-in-out`;

      const html = document.documentElement;
      html.classList.remove("theme-default", "theme-dark", "theme-colorful");

      switch (theme) {
        case "dark":
          html.classList.add(
            "theme-dark",
            "font-serif",
            "bg-gray-900",
            "text-white"
          );
          break;
        case "colorful":
          html.classList.add(
            "theme-colorful",
            "pacifico-regular",
            "bg-gradient-to-br",
            "from-blue-50",
            "via-purple-50",
            "to-pink-50",
            "text-purple-800"
          );
          break;
        default:
          html.classList.add(
            "theme-default",
            "font-sans",
            "bg-gray-50",
            "text-gray-900"
          );
      }
    }
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
