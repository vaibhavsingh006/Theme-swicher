import React from "react";
import { LayoutWrapper } from "../components/Layout-wrapper";
import { ProductCard } from "../components/Product-card";
import { useTheme } from "../Theme-provider";
import { useEffect, useState, useRef } from "react";
import { SearchBar } from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { X } from "lucide-react";
import { Footer } from "../components/Footer";

export default function Home() {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchResetTrigger = useRef(0);

  const pageSize = 4; // Show 4 products per page
  const totalProducts = 20; // Total products available

  // Filter products based on user input
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset pagination to page 1 when search query changes
  useEffect(() => {
    searchResetTrigger.current += 1;
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch product data once when component mounts
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Slice filtered data to show current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  // Called when user clicks on a pagination button
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top when page changes
    window.scrollTo({ top: "240", behavior: "smooth" });
    console.log(`Page changed to: ${page}`);
  };

  // === Dynamic class helpers for theme-based styling ===

  const getTitleClasses = () => {
    const baseClasses =
      "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6";
    switch (theme) {
      case "dark":
        return `md:ml-64 ml-0 ${baseClasses} text-white text-center font-serif`;
      case "colorful":
        return `${baseClasses} lg:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center pacifico-regular `;
      default:
        return `${baseClasses} text-gray-900 text-center font-sans`;
    }
  };

  const getSubtitleClasses = () => {
    switch (theme) {
      case "dark":
        return "md:ml-64 ml-0 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-300 text-center leading-relaxed font-serif";
      case "colorful":
        return "text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-700 text-center leading-relaxed pacifico-regular ";
      default:
        return "text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-600 text-center leading-relaxed font-sans";
    }
  };

  const getButtonClasses = () => {
    const baseClasses =
      "inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";

    switch (theme) {
      case "dark":
        return `md:ml-64 ml-0 ${baseClasses} bg-purple-600 hover:bg-purple-700 text-white font-serif`;
      case "colorful":
        return `${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white pacifico-regular `;
      default:
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white font-sans`;
    }
  };

  const getSectionTitleClasses = () => {
    switch (theme) {
      case "dark":
        return "md:ml-64 ml-0 text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white font-serif";
      case "colorful":
        return "text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-purple-600 pacifico-regular ";
      default:
        return "text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 font-sans";
    }
  };

  const mainClass = theme === "colorful" ? "pacifico-regular" : "";

  return (
    <>
      <LayoutWrapper className={``}>
        <div
          className={`space-y-12 sm:space-y-16 ${
            theme === "dark" ? "relative top-[-90px]" : ""
          }`}
        >
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className={getTitleClasses()}>Welcome to ThemeSwitch Pro</h1>
            <p className={getSubtitleClasses()}>
              Experience the power of dynamic theming with our professional
              React application. Switch between themes and see how the entire
              layout, typography, and styling transforms seamlessly.
            </p>
            <button className={getButtonClasses()}>Get Started</button>
          </div>

          {/* Products Section */}
          <div>
            <h2 className={getSectionTitleClasses()}>Featured Products</h2>
            {/* Search Bar */}
            <div
              className={`${
                theme === "dark" ? "md:ml-64 ml-0" : ""
              } mb-6 sm:mb-8`}
            >
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* === Loading Skeleton (when fetching) === */}
            {loading ? (
              <div
                className={`${
                  theme === "dark"
                    ? "xl:grid-cols-3 md:ml-64 ml-0"
                    : "xl:grid-cols-4"
                } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8`}
              >
                {Array.from({ length: pageSize }).map((_, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-4 sm:p-6 animate-pulse ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : theme === "colorful"
                        ? "bg-white/80 border-purple-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* fake box */}
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                        <div className="h-10 bg-gray-300 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                {/* Product Cards */}
                <div
                  className={` ${
                    theme === "dark" ? "md:ml-64 ml-0" : ""
                  } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
                    theme === "dark" ? "xl:grid-cols-3" : "xl:grid-cols-4"
                  } gap-4 sm:gap-6 lg:gap-8`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Pagination component */}
                <Pagination
                  totalCount={filteredProducts.length}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </>
            ) : (
              // Show message if no products matched search
              <div className="text-center py-12">
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No products found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </LayoutWrapper>
    </>
  );
}
