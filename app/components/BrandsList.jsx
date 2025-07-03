"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  MdOutlineArrowOutward,
  MdSearch,
  MdFilterList,
  MdGridView,
  MdViewList,
} from "react-icons/md";
import { useTranslations } from "next-intl";

const BrandsList = () => {
  const t = useTranslations("HomePage");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const brandLists = [
    {
      name: "BMW",
      image: "/bmw.avif",
      alt: "bmw cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1916",
      country: "Germany",
    },
    {
      name: "Audi",
      image: "/audi.png",
      alt: "audi cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1909",
      country: "Germany",
    },
    {
      name: "BYD",
      image: "/byd.png",
      alt: "byd cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "electric",
      founded: "2003",
      country: "China",
    },
    {
      name: "Ford",
      image: "/ford.png",
      alt: "ford cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1903",
      country: "USA",
    },
    {
      name: "GWM",
      image: "/gwm.png",
      alt: "gwm cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1984",
      country: "China",
    },
    {
      name: "Jaguar",
      image: "/jaguar.png",
      alt: "jaguar cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1922",
      country: "UK",
    },
    {
      name: "Lexus",
      image: "/lexus.jpg",
      alt: "lexus cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1989",
      country: "Japan",
    },
    {
      name: "Mercedes",
      image: "/mercedes.jpg",
      alt: "mercedes cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1926",
      country: "Germany",
    },
    {
      name: "Porsche",
      image: "/porsche.png",
      alt: "porsche cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1931",
      country: "Germany",
    },
    {
      name: "Tesla",
      image: "/tesla.png",
      alt: "tesla cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "electric",
      founded: "2003",
      country: "USA",
    },
    {
      name: "Toyota",
      image: "/toyota.png",
      alt: "toyota cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1937",
      country: "Japan",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      alt: "bentley cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1919",
      country: "UK",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      alt: "honda cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1948",
      country: "Japan",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      alt: "hyundai cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1967",
      country: "South Korea",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      alt: "Kia cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1944",
      country: "South Korea",
    },
    {
      name: "Volvo",
      image: "/volvo.png",
      alt: "volvo cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1927",
      country: "Sweden",
    },
  ];

  const categories = [
    { id: "all", name: "All Brands", count: brandLists.length },
    {
      id: "luxury",
      name: "Luxury",
      count: brandLists.filter((b) => b.category === "luxury").length,
    },
    {
      id: "mainstream",
      name: "Mainstream",
      count: brandLists.filter((b) => b.category === "mainstream").length,
    },
    {
      id: "electric",
      name: "Electric",
      count: brandLists.filter((b) => b.category === "electric").length,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(8);
  const filteredBrands = brandLists.filter((brand) => {
    const matchesSearch = brand.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case "luxury":
        return "from-amber-500 to-yellow-600";
      case "electric":
        return "from-green-500 to-emerald-600";
      case "mainstream":
        return "from-blue-500 to-cyan-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-8">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl dark:from-blue-900/20 dark:to-purple-900/20"></div>
        <div className="absolute -bottom-32 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-orange-100/40 to-red-100/40 blur-3xl delay-1000 dark:from-orange-900/20 dark:to-red-900/20"></div>
      </div>

      <div
        className={`relative mx-auto max-w-7xl transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
            Featured Automotive Brands
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Explore our curated collection of world-class automotive brands,
            from luxury icons to innovative electric pioneers.
          </p>

          {/* Controls Section */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:flex-row">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
              <MdSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-800 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <MdFilterList className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <select
                value={selectedCategory}
                aria-label="Filter by category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 p-1 dark:border-gray-600 dark:bg-gray-700">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Switch to Grid View"
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="Switch to List View"
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                }`}
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>

            {/* View All Button */}
            <Link href="/brands">
              <div className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl">
                <span className="font-medium">
                  {t("viewAll") || "View All"}
                </span>
                <MdOutlineArrowOutward className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Showing {filteredBrands.length} of {brandLists.length} brands
            {selectedCategory !== "all" &&
              ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Brands Grid/List */}
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }
        `}
        >
          {filteredBrands.slice(0, visibleCount).map((brand, index) => (
            <Link href={brand.url} key={`${brand.name}-${index}`}>
              <div
                className={`
                  group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200 bg-white 
                  shadow-md transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-orange-300 
                  hover:shadow-xl hover:shadow-orange-500/20 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-orange-500
                  ${viewMode === "list" ? "flex items-center p-6" : "p-6"}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(brand.category)} rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                ></div>

                {/* Category Badge */}
                <div
                  className={`absolute right-4 top-4 z-30 ${viewMode === "list" ? "relative right-0 top-0 ml-auto" : ""}`}
                >
                  <span
                    className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white ${getCategoryColor(brand.category)} shadow-lg`}
                  >
                    {brand.category}
                  </span>
                </div>

                <div
                  className={`relative z-10 ${viewMode === "list" ? "flex flex-1 items-center gap-6" : "flex flex-col items-center space-y-4"}`}
                >
                  {/* Image Container */}
                  <div
                    className={`relative ${viewMode === "list" ? "h-16 w-16" : "h-24 w-24"} overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md dark:border-gray-600 dark:bg-gray-700`}
                  >
                    <Image
                      src={brand.image}
                      alt={brand.alt}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Brand Info */}
                  <div
                    className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
                  >
                    <h3
                      className={`${viewMode === "list" ? "text-lg" : "text-xl"} mb-2 font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400`}
                    >
                      {brand.name}
                    </h3>

                    {viewMode === "grid" && (
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>Founded: {brand.founded}</p>
                        <p>Origin: {brand.country}</p>
                      </div>
                    )}

                    <div
                      className={`${hoveredBrand === brand.name ? "w-12" : "w-0"} h-1 bg-gradient-to-r ${getCategoryColor(brand.category)} mx-auto mt-3 rounded-full transition-all duration-500`}
                    ></div>
                  </div>

                  {viewMode === "list" && (
                    <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium">{brand.founded}</p>
                      <p>{brand.country}</p>
                    </div>
                  )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute inset-0 translate-x-[-200%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {filteredBrands.length > 8 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                if (visibleCount >= filteredBrands.length) {
                  setVisibleCount(8);
                } else {
                  setVisibleCount((prev) => prev + 6);
                }
              }}
              className="rounded-xl border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {visibleCount >= filteredBrands.length ? "Show Less" : "Load More"}
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
              <MdSearch className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
              No brands found
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-red-600 hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default BrandsList;