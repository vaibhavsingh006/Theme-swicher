// src/pages/contact.jsx
import React from "react";
import { LayoutWrapper } from "../components/Layout-wrapper";
import { useTheme } from "../Theme-provider";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  // Get current theme from ThemeProvider
  const { theme } = useTheme();

  // === Dynamic class  for theme-based styling ===

  const getTitleClasses = () => {
    const baseClasses = "text-4xl font-bold mb-6";
    switch (theme) {
      case "dark":
        return `${baseClasses} text-white font-serif`;
      case "colorful":
        return `${baseClasses} bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pacifico-regular `;
      default:
        return `${baseClasses} text-gray-900 font-sans`;
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "text-white transition-colors duration-200 w-full";

    switch (theme) {
      case "dark":
        return ` ${baseClasses} bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-serif`;
      case "colorful":
        return `${baseClasses} pacifico-regular bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full pacifico-regular  text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`;
      default:
        return `${baseClasses} bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-sans`;
    }
  };

  const getInputClasses = () => {
    const baseClasses =
      "w-full px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent";

    switch (theme) {
      case "dark":
        return ` ${baseClasses} bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-purple-500 font-serif`;
      case "colorful":
        return `${baseClasses} bg-white/80 pacifico-regular backdrop-blur-sm border border-red-200 rounded-2xl text-gray-700 placeholder-gray-500 focus:ring-red-400 pacifico-regular `;
      default:
        return `${baseClasses} bg-white border border-gray-300 rounded-md text-gray-700 placeholder-gray-500 focus:ring-red-500 font-sans`;
    }
  };

  const getCardClasses = () => {
    const baseClasses = "p-6 rounded-lg";

    switch (theme) {
      case "dark":
        return ` ${baseClasses} bg-gray-800 border-gray-700`;
      case "colorful":
        return `p-8 rounded-2xl pacifico-regular bg-white/80 backdrop-blur-sm border-red-200 shadow-lg`;
      default:
        return `${baseClasses} bg-white border-gray-200 shadow-sm`;
    }
  };

  const mainClass = theme === "colorful" ? "pacifico-regular" : "";

  return (
    <LayoutWrapper>
      <div
        className={`${
          theme === "dark" ? "md:ml-64 ml-0 relative top-[-90px]" : ""
        }  max-w-4xl mx-auto space-y-8`}
      >
        <div className="text-center">
          <h1 className={getTitleClasses()}>Contact Us</h1>
          <p
            className={`text-lg mb-8 ${
              theme === "dark"
                ? "text-gray-300"
                : theme === "colorful"
                ? "text-gray-700"
                : "text-gray-600"
            } ${mainClass}`}
          >
            Get in touch with our team. We'd love to hear from you and discuss
            your project needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2  gap-8">
          {/* Contact Form */}
          <div className={`border ${getCardClasses()}`}>
            <h2
              className={`text-2xl font-bold mb-6 ${
                theme === "dark"
                  ? "text-white font-serif"
                  : theme === "colorful"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pacifico-regular  text-3xl"
                  : "text-gray-900 font-sans"
              }`}
            >
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  className={getInputClasses()}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className={getInputClasses()}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className={getInputClasses()}
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" className={getButtonClasses()}>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info + Hours */}
          <div className="space-y-6">
            <div className={`border ${getCardClasses()}`}>
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark"
                    ? "text-white font-serif"
                    : theme === "colorful"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent pacifico-regular  text-3xl"
                    : "text-gray-900 font-sans"
                }`}
              >
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail
                    className={`w-5 h-5 ${
                      theme === "dark"
                        ? "text-purple-400"
                        : theme === "colorful"
                        ? "text-pink-600"
                        : "text-red-600"
                    }`}
                  />
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    hello@themeswitchpro.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone
                    className={`w-5 h-5 ${
                      theme === "dark"
                        ? "text-purple-400"
                        : theme === "colorful"
                        ? "text-pink-600"
                        : "text-red-600"
                    }`}
                  />
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin
                    className={`w-5 h-5 ${
                      theme === "dark"
                        ? "text-purple-400"
                        : theme === "colorful"
                        ? "text-pink-600"
                        : "text-red-600"
                    }`}
                  />
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    123 Design Street, Creative City, CC 12345
                  </span>
                </div>
              </div>
            </div>

            <div className={`border ${getCardClasses()}`}>
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark"
                    ? "text-white font-serif"
                    : theme === "colorful"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent pacifico-regular  text-2xl"
                    : "text-gray-900 font-sans"
                }`}
              >
                Office Hours
              </h3>
              <div
                className={`space-y-2 text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
