import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Theme context provider to manage light/dark/colorful themes
import { ThemeProvider } from "./Theme-provider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LayoutWrapper } from "./components/Layout-wrapper";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Header />
        {/* LayoutWrapper contains the dynamic page content (like `children`) 
            and also handles theme-based layout (like background, sidebar in dark mode etc.) */}
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </LayoutWrapper>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}
