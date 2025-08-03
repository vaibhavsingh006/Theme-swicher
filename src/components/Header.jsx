import React, { useEffect, useState } from "react";
import { useTheme } from "../Theme-provider";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".theme-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const themeOptions = [
    { value: "default", label: "Minimalist" },
    { value: "dark", label: "Dark Mode" },
    { value: "colorful", label: "Colorful" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Dynamic classes
  const getHeaderClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900/95 backdrop-blur-md text-white border-gray-700 shadow-lg";
      case "colorful":
        return "bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-xl backdrop-blur-md pacifico-regular ";
      default:
        return "bg-white/95 backdrop-blur-md text-gray-900 border-gray-200 shadow-sm";
    }
  };

  const getLinkClasses = (href) => {
    const isActive = location.pathname === href;
    const baseClasses =
      "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105";

    switch (theme) {
      case "dark":
        return `${baseClasses} ${
          isActive
            ? "bg-purple-600 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`;
      case "colorful":
        return `${baseClasses} pacifico-regular  ${
          isActive
            ? "bg-white/25 text-white shadow-lg backdrop-blur-sm"
            : "text-white/90 hover:bg-white/15 hover:text-white"
        }`;
      default:
        return `${baseClasses} ${
          isActive
            ? "bg-red-100 text-red-700 shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;
    }
  };
  const getLogoClasses = () => {
    switch (theme) {
      case "dark":
        return "text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent";
      case "colorful":
        return "pacifico-regular  text-xl sm:text-2xl font-bold text-white drop-shadow-lg";
      default:
        return "text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${getHeaderClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`transition-transform duration-200 hover:scale-105 ${getLogoClasses()}`}
            >
              <span className="hidden sm:inline">ThemeSwitch Pro</span>
              <span className="sm:hidden">TSP</span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden in dark theme */}
          {theme !== "dark" && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={getLinkClasses(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Theme Selector & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Theme Dropdown */}
            <div className="relative theme-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : theme === "colorful"
                    ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span className="hidden sm:inline">Theme</span>
                <span className="sm:hidden">🎨</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-40 sm:w-48 rounded-xl shadow-xl z-50 border backdrop-blur-md ${
                    theme === "dark"
                      ? "bg-gray-800/95 border-gray-700"
                      : "bg-white/95 border-gray-200"
                  }`}
                >
                  <div className="py-2">
                    {themeOptions.map((option) => {
                      const isSelected = theme === option.value;

                      let baseClasses =
                        "block w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-[1.02]";
                      let dynamicClasses = "";

                      if (theme === "dark") {
                        dynamicClasses = isSelected
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white";
                      } else if (theme === "colorful") {
                        dynamicClasses = isSelected
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-700 hover:bg-gray-100";
                      } else {
                        dynamicClasses = isSelected
                          ? "bg-red-100 text-red-700"
                          : "text-gray-700 hover:bg-gray-100";
                      }

                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(option.value);
                            setIsDropdownOpen(false);
                          }}
                          className={`${baseClasses} ${dynamicClasses}`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button - Hidden in dark theme */}
            {theme !== "dark" && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  theme === "dark"
                    ? "hover:bg-gray-800"
                    : theme === "colorful"
                    ? "hover:bg-white/20"
                    : "hover:bg-gray-100"
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {theme !== "dark" && (
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block ${getLinkClasses(link.href)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
