import React from "react";
import { useTheme } from "../Theme-provider";
import { Star } from "lucide-react";

export function ProductCard({ product }) {
  // current theme from ThemeProvider
  const { theme } = useTheme();

  // Dynamic classes
  const getCardClasses = () => {
    const baseClasses =
      "group relative bg-white border rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg";

    switch (theme) {
      case "dark":
        return `${baseClasses} bg-gray-800! border-gray-700 hover:bg-gray-750`;
      case "colorful":
        return `${baseClasses} bg-gradient-to-br from-white to-purple-50 border-purple-200 hover:from-purple-50 hover:to-pink-50`;
      default:
        return `${baseClasses} border-gray-200 hover:bg-gray-50`;
    }
  };

  const getButtonClasses = () => {
    const baseClasses =
      "w-full px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:scale-102 active:scale-95 shadow-md hover:shadow-lg text-white";

    switch (theme) {
      case "dark":
        return `${baseClasses} bg-purple-600 hover:bg-purple-700`;
      case "colorful":
        return `${baseClasses} pacifico-regular  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600`;
      default:
        return `${baseClasses} bg-red-600 hover:bg-red-700`;
    }
  };

  const getTitleClasses = () => {
    const baseClasses =
      "sm:text-xl font-semibold line-clamp-2 min-h-[3rem] leading-tight";
    switch (theme) {
      case "dark":
        return `${baseClasses} text-white`;
      case "colorful":
        return `${baseClasses} pacifico-regular  text-gray-800`;
      default:
        return `${baseClasses} text-gray-900`;
    }
  };

  const getDescriptionClasses = () => {
    const baseClasses = "text-sm sm:text-base leading-relaxed text-gray-600";
    switch (theme) {
      case "dark":
        return `${baseClasses} text-gray-300`;
      case "colorful":
        return `${baseClasses} pacifico-regular  text-gray-600`;
      default:
        return `${baseClasses} text-gray-600`;
    }
  };

  const getPriceClasses = () => {
    const baseClasses = "font-semibold text-lg sm:text-xl";
    switch (theme) {
      case "dark":
        return `${baseClasses} text-white`;
      case "colorful":
        return `${baseClasses} pacifico-regular  text-purple-600`;
      default:
        return `${baseClasses} text-gray-900`;
    }
  };

  return (
    <div className={getCardClasses()}>
      {/* Image Container - Consistent across all themes */}
      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.title}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content Container */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className={`${getTitleClasses()} line-clamp-2 min-h-[3rem]`}>
          {product.title}
        </h3>

        {/* Description */}
        <p className={`${getDescriptionClasses()} line-clamp-3 min-h-[4.5rem]`}>
          {product.description}
        </p>

        {/* Price, rating and Button Container */}
        <div className="flex flex-col items-start sm:justify-between gap-3 pt-2">
          <div className="flex items-center justify-between w-full gap-4">
            <span className={getPriceClasses()}>
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <Star className="inline-block mr-1 text-yellow-400 w-4 h-4" />
              <span className={`pacifico-regular ${getPriceClasses()}`}>
                {product.rating.rate}
              </span>
            </div>
          </div>
          <button className={getButtonClasses()}>Add to Cart</button>
        </div>
      </div>

      {/* Category Badge */}
      <div
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          theme === "dark"
            ? "bg-gray-700 text-gray-300"
            : theme === "colorful"
            ? "bg-white/80 text-purple-600 backdrop-blur-sm"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {product.category}
      </div>
    </div>
  );
}
