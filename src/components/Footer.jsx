import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { useTheme } from "../Theme-provider"; // Ensure this hook works in plain React too

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Dynamic classes
  const getFooterClasses = () => {
    switch (theme) {
      case "dark":
        return "md:ml-64 ml-0 bg-gray-900 border-gray-700 text-gray-300";
      case "colorful":
        return "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 border-purple-700 text-white";
      default:
        return "bg-white border-gray-200 text-gray-600";
    }
  };

  const getLinkClasses = () => {
    const base =
      "transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg p-2";
    switch (theme) {
      case "dark":
        return `${base} text-gray-400 hover:text-white focus:ring-blue-500`;
      case "colorful":
        return `${base} text-white/80 hover:text-white focus:ring-white/50`;
      default:
        return `${base} text-gray-500 hover:text-gray-700 focus:ring-blue-500`;
    }
  };

  const getLogoClasses = () => {
    switch (theme) {
      case "dark":
        return "text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent";
      case "colorful":
        return "text-xl font-bold text-white drop-shadow-lg";
      default:
        return "text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent";
    }
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      className={`border-t transition-all duration-300 ${getFooterClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <div className={`mb-2 ${getLogoClasses()}`}>ThemeSwitch Pro</div>
            <p
              className={`text-sm ${
                theme === "dark"
                  ? "text-gray-400"
                  : theme === "colorful"
                  ? "text-white/80"
                  : "text-gray-500"
              }`}
            >
              Professional React app with dynamic theming
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-sm">© {currentYear} ThemeSwitch Pro</span>
              <Heart
                className={`w-4 h-4 ${
                  theme === "colorful" ? "text-pink-300" : "text-red-500"
                }`}
                fill="currentColor"
              />
            </div>
            <p
              className={`text-xs mt-1 ${
                theme === "dark"
                  ? "text-gray-500"
                  : theme === "colorful"
                  ? "text-white/60"
                  : "text-gray-400"
              }`}
            >
              Made with React & Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={`${getLinkClasses()}`}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon
                  className={`w-5 h-5 ${
                    theme === "dark"
                      ? "text-purple-400"
                      : theme === "colorful"
                      ? "text-white"
                      : "text-red-500"
                  }`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div
          className={`mt-8 pt-6 border-t text-center ${
            theme === "dark"
              ? "border-gray-700"
              : theme === "colorful"
              ? "border-white/20"
              : "border-gray-200"
          }`}
        >
          <p
            className={`text-xs ${
              theme === "dark"
                ? "text-gray-500"
                : theme === "colorful"
                ? "text-white/60"
                : "text-gray-400"
            }`}
          >
            Built with ❤️ using React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
