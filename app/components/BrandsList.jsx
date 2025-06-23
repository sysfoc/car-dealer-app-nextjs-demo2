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
    <section className="dark:via-gray-850 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-5 dark:from-gray-900 dark:to-black sm:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-orange-200/30 to-red-200/30 blur-3xl dark:from-orange-900/20 dark:to-red-900/20"></div>
        <div className="absolute -bottom-32 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-teal-200/30 to-cyan-200/30 blur-3xl delay-1000 dark:from-teal-900/20 dark:to-cyan-900/20"></div>
        <div className="delay-2000 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-purple-200/20 to-pink-200/20 blur-3xl dark:from-purple-900/10 dark:to-pink-900/10"></div>
      </div>

      <div
        className={`relative mx-auto max-w-7xl transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 px-4 py-2 text-sm font-medium text-white shadow-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
            Featured Automotive Brands
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Explore our curated collection of world-class automotive brands,
            from luxury icons to innovative electric pioneers.
          </p>

          {/* Controls Section */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80 lg:flex-row">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
              <MdSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-800 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <MdFilterList className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-700 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <div className="from-blue-700 via-purple-700 to-blue-800"></div>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-700 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>

            {/* View All Button */}
            <Link href="/brands">
              <div className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-800 hover:to-blue-700 hover:shadow-xl">
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
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }
        `}
        >
          {filteredBrands.slice(0, visibleCount).map((brand, index) => (
            <Link href={brand.url} key={`${brand.name}-${index}`}>
              <div
                className={`
                  group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 
                  backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-orange-300/50 
                  hover:shadow-2xl hover:shadow-orange-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-orange-600/50
                  ${viewMode === "list" ? "flex items-center p-4" : "p-5"}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(brand.category)} rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                ></div>

                {/* Category Badge */}
                <div
                  className={`absolute right-3 top-3 z-30 ${viewMode === "list" ? "relative right-0 top-0 ml-auto" : ""}`}
                >
                  <span
                    className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium text-white ${getCategoryColor(brand.category)} shadow-lg`}
                  >
                    {brand.category}
                  </span>
                </div>

                <div
                  className={`relative z-10 ${viewMode === "list" ? "flex flex-1 items-center gap-4" : "flex flex-col items-center space-y-3"}`}
                >
                  {/* Image Container */}
                  <div
                    className={`relative ${viewMode === "list" ? "h-12 w-12" : "h-20 w-20"} overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-2 shadow-lg transition-all duration-500 group-hover:scale-110 dark:from-gray-700 dark:to-gray-600`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
                    <Image
                      src={brand.image}
                      alt={brand.alt}
                      width={80}
                      height={80}
                      className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Brand Info */}
                  <div
                    className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
                  >
                    <h3
                      className={`${viewMode === "list" ? "text-lg" : "text-xl"} mb-1 font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400`}
                    >
                      {brand.name}
                    </h3>

                    {viewMode === "grid" && (
                      <div className="space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <p>Founded: {brand.founded}</p>
                        <p>Origin: {brand.country}</p>
                      </div>
                    )}

                    <div
                      className={`${hoveredBrand === brand.name ? "w-8" : "w-0"} h-0.5 bg-gradient-to-r ${getCategoryColor(brand.category)} mx-auto mt-2 rounded-full transition-all duration-500`}
                    ></div>
                  </div>

                  {viewMode === "list" && (
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                      <p>{brand.founded}</p>
                      <p>{brand.country}</p>
                    </div>
                  )}
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getCategoryColor(brand.category)} p-[2px]`}
                  >
                    <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-800"></div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute inset-0 translate-x-[-200%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBrands.length > 8 && (
          <div
            className={`${viewMode === "grid" ? "col-span-full" : "w-full"} mt-6 text-center`}
          >
            <button
              onClick={() => {
                if (visibleCount >= filteredBrands.length) {
                  setVisibleCount(8);
                } else {
                  setVisibleCount((prev) => prev + 6);
                }
              }}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              {visibleCount >= filteredBrands.length ? "See Less" : "See More"}
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <MdSearch className="h-12 w-12 text-gray-400" />
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
              className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white transition-all duration-300 hover:from-orange-600 hover:to-red-600"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom Stats */}
        {/* <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category, index) => (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200/50 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/60"
              >
                <div
                  className={`h-12 w-12 bg-gradient-to-r ${getCategoryColor(category.id)} mx-auto mb-3 flex items-center justify-center rounded-xl`}
                >
                  <span className="text-xl font-bold text-white">
                    {category.count}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Brands
                </p>
              </div>
            ))}
        </div> */}
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
