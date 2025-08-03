import React from "react";
import { useTheme } from "../Theme-provider";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }) {
  // theme
  const { theme } = useTheme();

  // Dynamic classes
  const getLayoutClasses = () => {
    const baseClasses =
      "min-h-screen pt-16 sm:pt-18 transition-all duration-500";
    switch (theme) {
      case "dark":
        return `${baseClasses} bg-gray-900 text-white`;
      case "colorful":
        return `${baseClasses} bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-900`;
    }
  };

  const getContainerClasses = () => {
    const baseClasses =
      "px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 transition-all duration-300";
    if (theme === "dark") {
      return `${baseClasses}`; // Reserve space for sidebar in dark
    }
    return `max-w-7xl mx-auto ${baseClasses}`; // Default & colorful centered layout
  };

  return (
    <div className={getLayoutClasses()}>
      {/* Sidebar for dark theme */}
      {theme === "dark" && <Sidebar />}
      <div className={getContainerClasses()}>{children}</div>
    </div>
  );
}
