import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../Theme-provider";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Mail, Menu, X } from "lucide-react";

export function Sidebar() {
  // Get current theme from ThemeProvider
  const { theme } = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close sidebar when clicking outside of sidebar or toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileOpen]);

  // dynamic classes
  const getLinkClasses = (href) => {
    const isActive = pathname === href;
    return `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
      isActive
        ? "bg-purple-700 text-white shadow-lg transform scale-105"
        : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
    }`;
  };

  // Only render sidebar if theme is dark
  if (theme !== "dark") return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-20 left-4 z-50 p-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700 z-40 shadow-xl">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Navigation</h2>
            <div className="w-12 h-1 bg-purple-700 rounded" />
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={getLinkClasses(item.href)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`mobile-sidebar md:hidden fixed left-0 top-0 h-full w-80 bg-gray-800 z-50 transform transition-transform duration-300 shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                ThemeSwitch Pro
              </h2>
              <p className="text-sm text-gray-400">Dark Theme</p>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={getLinkClasses(item.href)}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
