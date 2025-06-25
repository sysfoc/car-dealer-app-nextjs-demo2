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
  MdArrowBack,
} from "react-icons/md";
import { FaMoneyCheckAlt, FaTag } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdElectricalServices } from "react-icons/md";

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 12;

  const brandLists = [
    {
      name: "BMW",
      image: "/bmw.avif",
      alt: "bmw cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1916",
      country: "Germany",
      description: "The Ultimate Driving Machine",
    },
    {
      name: "Audi",
      image: "/audi.png",
      alt: "audi cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1909",
      country: "Germany",
      description: "Vorsprung durch Technik",
    },
    {
      name: "BYD",
      image: "/byd.png",
      alt: "byd cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "electric",
      founded: "2003",
      country: "China",
      description: "Build Your Dreams",
    },
    {
      name: "Ford",
      image: "/ford.png",
      alt: "ford cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1903",
      country: "USA",
      description: "Built Ford Tough",
    },
    {
      name: "GWM",
      image: "/gwm.png",
      alt: "gwm cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1984",
      country: "China",
      description: "Great Wall Motors",
    },
    {
      name: "Jaguar",
      image: "/jaguar.png",
      alt: "jaguar cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1922",
      country: "UK",
      description: "Grace, Space, Pace",
    },
    {
      name: "Lexus",
      image: "/lexus.jpg",
      alt: "lexus cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1989",
      country: "Japan",
      description: "Experience Amazing",
    },
    {
      name: "Mercedes",
      image: "/mercedes.jpg",
      alt: "mercedes cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1926",
      country: "Germany",
      description: "The Best or Nothing",
    },
    {
      name: "Porsche",
      image: "/porsche.png",
      alt: "porsche cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1931",
      country: "Germany",
      description: "There is No Substitute",
    },
    {
      name: "Tesla",
      image: "/tesla.png",
      alt: "tesla cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "electric",
      founded: "2003",
      country: "USA",
      description: "Accelerating the World's Transition",
    },
    {
      name: "Toyota",
      image: "/toyota.png",
      alt: "toyota cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1937",
      country: "Japan",
      description: "Let's Go Places",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      alt: "bentley cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "luxury",
      founded: "1919",
      country: "UK",
      description: "Extraordinary Journeys",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      alt: "honda cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1948",
      country: "Japan",
      description: "The Power of Dreams",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      alt: "hyundai cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1967",
      country: "South Korea",
      description: "New Thinking. New Possibilities.",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      alt: "Kia cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1944",
      country: "South Korea",
      description: "Movement that Inspires",
    },
    {
      name: "Volvo",
      image: "/volvo.png",
      alt: "volvo cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1927",
      country: "Sweden",
      description: "For Life",
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

  const filteredBrands = brandLists.filter((brand) => {
    const matchesSearch = brand.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);
  const startIndex = (currentPage - 1) * brandsPerPage;
  const paginatedBrands = filteredBrands.slice(startIndex, startIndex + brandsPerPage);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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

  const getCategoryIcon = (category) => {
  switch (category) {
    case "luxury":
      return <FaMoneyCheckAlt className="text-yellow-500" />;
    case "electric":
      return <MdElectricalServices className="text-blue-500" />;
    case "mainstream":
      return <IoCarSport className="text-red-500" />;
    default:
      return <FaTag className="text-gray-400" />; // or return null, or a default icon
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-850 dark:to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute -bottom-32 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-orange-200/20 to-red-200/20 blur-3xl delay-1000 dark:from-orange-900/10 dark:to-red-900/10"></div>
      </div>

      <div className="relative mt-20">
        {/* Header Section */}
        <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <MdArrowBack className="h-4 w-4" />
                  <span className="text-sm font-medium">Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                    All Brands
                  </h1>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Discover our complete collection of automotive brands
                  </p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                {categories.slice(1).map((category) => (
                  <div key={category.id} className="text-center">
                    <div className="flex justify-center text-2xl">{getCategoryIcon(category.id)}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/95 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/95">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="relative max-w-md flex-1">
                <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <MdFilterList className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Switch to Grid View"
                    className={`rounded-md p-2 transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <MdGridView className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-2 transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <MdViewList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {startIndex + 1}-{Math.min(startIndex + brandsPerPage, filteredBrands.length)} of{" "}
                {filteredBrands.length} brands
                {selectedCategory !== "all" &&
                  ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
              </span>
              {totalPages > 1 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Brands Grid/List */}
          {paginatedBrands.length > 0 ? (
            <div
              className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "space-y-3"
                }
              `}
            >
              {paginatedBrands.map((brand, index) => (
                <Link href={brand.url} key={`${brand.name}-${index}`}>
                  <div
                    className={`
                      group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200/80 bg-white/90 
                      backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 
                      hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600/50
                      ${viewMode === "list" ? "flex items-center p-4" : "p-4"}
                    `}
                    onMouseEnter={() => setHoveredBrand(brand.name)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    {/* Category Badge */}
                    <div
                      className={`absolute right-2 top-2 z-10 ${viewMode === "list" ? "relative right-0 top-0 ml-auto" : ""}`}
                    >
                      <span
                        className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-0.5 text-xs font-medium text-white ${getCategoryColor(brand.category)}`}
                      >
                        {brand.category}
                      </span>
                    </div>

                    <div
                      className={`${viewMode === "list" ? "flex flex-1 items-center gap-4" : "text-center"}`}
                    >
                      {/* Image Container */}
                      <div
                        className={`
                          ${viewMode === "list" ? "h-16 w-16 flex-shrink-0" : "mx-auto mb-3 h-20 w-20"} 
                          relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-2 
                          transition-all duration-300 group-hover:scale-105 dark:from-gray-700 dark:to-gray-600
                        `}
                      >
                        <Image
                          src={brand.image}
                          alt={brand.alt}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Brand Info */}
                      <div className={`${viewMode === "list" ? "flex-1 min-w-0" : ""}`}>
                        <h3
                          className={`${viewMode === "list" ? "text-lg" : "text-lg"} font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400`}
                        >
                          {brand.name}
                        </h3>
                        
                        {viewMode === "grid" && (
                          <div className="mt-1 space-y-0.5">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {brand.description}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{brand.founded}</span>
                              <span>•</span>
                              <span>{brand.country}</span>
                            </div>
                          </div>
                        )}

                        {viewMode === "list" && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {brand.description}
                          </p>
                        )}
                      </div>

                      {viewMode === "list" && (
                        <div className="flex flex-col items-end text-right text-xs text-gray-500 dark:text-gray-400">
                          <span>{brand.founded}</span>
                          <span>{brand.country}</span>
                        </div>
                      )}

                      {/* Hover Arrow */}
                      <div className={`${viewMode === "list" ? "" : "mt-2"} flex items-center justify-center`}>
                        <MdOutlineArrowOutward
                          className={`h-4 w-4 text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                            hoveredBrand === brand.name ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <MdSearch className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
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
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}