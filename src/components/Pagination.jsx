import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTheme } from "../Theme-provider";

const Pagination = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const { theme } = useTheme();
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    // If total pages are less than or equal to 5, show all pages
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }

    return pages;
  };

  // Dynamic classes based on theme

  const getButtonClasses = (isActive = false, isDisabled = false) => {
    const base =
      "relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

    if (isDisabled) {
      return theme === "dark"
        ? `${base} bg-gray-800 text-gray-500 border border-gray-700`
        : theme === "colorful"
        ? `${base} pacifico-regular bg-gray-100 text-gray-400 border border-gray-200`
        : `${base} bg-gray-100 text-gray-400 border border-gray-200`;
    }

    if (isActive) {
      return theme === "dark"
        ? `${base} bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-500 transform scale-105`
        : theme === "colorful"
        ? `${base} pacifico-regular bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-transparent hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 transform scale-105`
        : `${base} bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-500 transform scale-105`;
    }

    return theme === "dark"
      ? `${base} bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-gray-500 hover:scale-105`
      : theme === "colorful"
      ? `${base} pacifico-regular bg-white/80 text-gray-700 border border-purple-200 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-500 hover:scale-105 backdrop-blur-sm`
      : `${base} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-500 hover:scale-105`;
  };

  const mainClass = theme === "colorful" ? "pacifico-regular" : "";

  // If total pages is 1 or less, don't render pagination
  if (totalPages <= 1) return null;

  return (
    <nav
      className={`${
        theme === "dark" ? "md:ml-64 ml-0 flex-col-reverse" : ""
      }  flex flex-col-reverse items-center justify-center p-4 lg:flex-row sm:space-x-2`}
    >
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${getButtonClasses(
            false,
            currentPage === 1
          )} rounded-l-lg px-2 sm:px-3`}
        >
          <ChevronsLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">First</span>
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${getButtonClasses(
            false,
            currentPage === 1
          )} px-2 sm:px-3`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="hidden xs:flex items-center space-x-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-2 text-sm text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`${getButtonClasses(
                  currentPage === page
                )} rounded-lg min-w-[2.5rem] h-10`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile page info */}
        <div className={`${mainClass} xs:hidden flex items-center px-3 py-2`}>
          <span
            className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {currentPage} / {totalPages}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${getButtonClasses(
            false,
            currentPage === totalPages
          )} px-2 sm:px-3`}
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${getButtonClasses(
            false,
            currentPage === totalPages
          )} rounded-r-lg px-2 sm:px-3`}
        >
          <span className="hidden sm:inline mr-1">Last</span>
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div
        className={`${mainClass} ${
          theme === "dark" ? "mb-4 lg:mb-0" : ""
        } mb-4 lg:mb-0 hidden sm:block ml-4`}
      >
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Showing{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * pageSize + 1, totalCount)}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{" "}
          of <span className="font-medium">{totalCount}</span> results
        </p>
      </div>
    </nav>
  );
};

export default Pagination;
