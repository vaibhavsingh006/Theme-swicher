import React from "react";
import { LayoutWrapper } from "../components/Layout-wrapper";
import { useTheme } from "../Theme-provider";

export default function About() {
  // Get current theme from ThemeProvider
  const { theme } = useTheme();

  // === Dynamic class for theme-based styling ===
  const getTitleClasses = () => {
    switch (theme) {
      case "dark":
        return "md:ml-64 ml-0 text-4xl font-bold mb-6 text-white font-serif";
      case "colorful":
        return "text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pacifico-regular ";
      default:
        return "text-3xl font-bold mb-6 text-gray-900 font-sans";
    }
  };

  const getButtonClasses = () => {
    switch (theme) {
      case "dark":
        return " bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-serif transition-colors duration-200";
      case "colorful":
        return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full pacifico-regular  text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200";
      default:
        return "bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-sans transition-colors duration-200";
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-800 border-gray-700 p-6 rounded-lg";
      case "colorful":
        return " pacifico-regular bg-white/80 backdrop-blur-sm border-blue-200 p-8 rounded-2xl shadow-lg";
      default:
        return "bg-white border-gray-200 p-6 rounded-lg shadow-sm";
    }
  };

  const mainClass = theme === "colorful" ? "pacifico-regular" : "";

  return (
    <LayoutWrapper>
      {/* Main content container */}
      <div
        className={` ${
          theme === "dark" ? "relative top-[-90px]" : ""
        } max-w-4xl mx-auto space-y-8`}
      >
        <div className="text-center">
          <h1 className={getTitleClasses()}>About ThemeSwitch Pro</h1>
          <p
            className={`text-lg mb-8 ${
              theme === "dark"
                ? "text-gray-300 md:ml-64 ml-0"
                : theme === "colorful"
                ? "text-gray-700"
                : "text-gray-600"
            } ${mainClass}`}
          >
            Learn more about our innovative approach to dynamic theming and user
            experience design.
          </p>
        </div>

        <div
          className={`border ${
            theme === "dark" ? "md:ml-64 ml-0" : ""
          } ${getCardClasses()}`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "dark"
                ? "text-white font-serif"
                : theme === "colorful"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pacifico-regular  text-3xl"
                : "text-gray-900 font-sans"
            }`}
          >
            Our Mission
          </h2>
          <p
            className={`text-base leading-relaxed mb-6 ${
              theme === "dark"
                ? "text-gray-300"
                : theme === "colorful"
                ? "text-gray-700"
                : "text-gray-600"
            }`}
          >
            At ThemeSwitch Pro, we believe that user experience should be
            personal and adaptable. Our application demonstrates how modern web
            technologies can create seamless, dynamic interfaces that respond to
            user preferences while maintaining professional standards and
            accessibility.
          </p>
          <p
            className={`text-base leading-relaxed mb-6 ${
              theme === "dark"
                ? "text-gray-300"
                : theme === "colorful"
                ? "text-gray-700"
                : "text-gray-600"
            }`}
          >
            We've built this application using cutting-edge React technologies.
            Each theme represents a different design philosophy while
            maintaining consistent functionality across all variations.
          </p>
          <button className={getButtonClasses()}>Learn More</button>
        </div>

        <div
          className={`${
            theme === "dark" ? "md:ml-64 ml-0" : ""
          } grid lg:grid-cols-3 md:grid-cols-2 gap-6`}
        >
          {/* Theme Cards */}
          {[
            {
              title: "Theme 1: Minimalist",
              description:
                "Clean, professional design with focus on content and readability.",
            },
            {
              title: "Theme 2: Dark Mode",
              description:
                "Elegant dark interface with sidebar navigation and serif typography.",
            },
            {
              title: "Theme 3: Colorful",
              description:
                "Vibrant, playful design with gradients and rounded elements.",
            },
          ].map((item, index) => (
            <div key={index} className={`border ${getCardClasses()}`}>
              <h3
                className={`font-bold mb-3 ${
                  theme === "dark"
                    ? "text-white font-serif"
                    : theme === "colorful"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pacifico-regular  text-xl"
                    : "text-gray-900 font-sans"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-300"
                    : theme === "colorful"
                    ? "text-gray-600"
                    : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}
