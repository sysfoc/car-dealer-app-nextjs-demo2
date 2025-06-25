"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaCar,
  FaCarAlt,
  FaShuttleVan,
  FaCarSide,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { IoCarSport, IoCar } from "react-icons/io5";
import { BsCarFrontFill } from "react-icons/bs";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdElectricCar, MdCarCrash } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";
import { GiSurferVan } from "react-icons/gi";

const BrowseCars = () => {
  const allItems = [
    { category: "Automatic Cars", icon: <FaCar />, count: 245, popular: true },
    { category: "Family Cars", icon: <FaCarAlt />, count: 189, popular: true },
    {
      category: "Sports Cars",
      icon: <IoCarSport />,
      count: 78,
      popular: false,
    },
    {
      category: "Electric Cars",
      icon: <MdElectricCar />,
      count: 156,
      popular: true,
    },
    {
      category: "5 Seaters",
      icon: <FaShuttleVan />,
      count: 234,
      popular: false,
    },
    { category: "Small Cars", icon: <FaCarSide />, count: 167, popular: false },
    {
      category: "Classic Cars",
      icon: <FaShuttleVan />,
      count: 45,
      popular: false,
    },
    { category: "AWD/4WD", icon: <GiSurferVan />, count: 123, popular: false },
    { category: "SUV", icon: <TbCarSuv />, count: 198, popular: true },
    { category: "Commercial", icon: <FaCarRear />, count: 89, popular: false },
    { category: "5 Doors", icon: <FaCar />, count: 201, popular: false },
    { category: "Low Priced Cars", icon: <IoCar />, count: 178, popular: true },
    {
      category: "Low Mileage Cars",
      icon: <BsCarFrontFill />,
      count: 134,
      popular: false,
    },
    {
      category: "Hybrid Cars",
      icon: <LiaCarSideSolid />,
      count: 92,
      popular: false,
    },
    { category: "Diesel Cars", icon: <FaCar />, count: 145, popular: false },
    { category: "7 Seaters", icon: <GiSurferVan />, count: 87, popular: false },
    {
      category: "Modified Cars",
      icon: <MdCarCrash />,
      count: 34,
      popular: false,
    },
    { category: "Vintage Models", icon: <IoCar />, count: 23, popular: false },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(6); // shows 2 rows of 3 items each

  // Filter options
  const filterOptions = [
    { value: "all", label: "All Categories" },
    { value: "popular", label: "Popular" },
    { value: "electric", label: "Electric & Hybrid" },
    { value: "luxury", label: "Luxury & Sports" },
  ];

  // Search and filter logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = allItems;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      // Apply category filter
      switch (selectedFilter) {
        case "popular":
          filtered = filtered.filter((item) => item.popular);
          break;
        case "electric":
          filtered = filtered.filter(
            (item) =>
              item.category.toLowerCase().includes("electric") ||
              item.category.toLowerCase().includes("hybrid"),
          );
          break;
        case "luxury":
          filtered = filtered.filter(
            (item) =>
              item.category.toLowerCase().includes("sports") ||
              item.category.toLowerCase().includes("classic") ||
              item.category.toLowerCase().includes("vintage"),
          );
          break;
        default:
          break;
      }

      setFilteredItems(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFilter]);

  const clearSearch = () => {
    setSearchTerm("");
    searchRef.current?.focus();
  };

  const CategoryCard = ({ item, index }) => (
    <div
      className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-blue-300/60 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-blue-600/60"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>

      {/* Popular badge */}
      {item.popular && (
        <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
      )}

      <div className="relative z-10 flex items-center space-x-3">
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 transition-transform duration-300 group-hover:scale-110 dark:from-blue-900/50 dark:to-purple-900/50">
          <div className="text-xl text-blue-600 transition-colors duration-300 group-hover:text-purple-600 dark:text-blue-400 dark:group-hover:text-purple-400">
            {item.icon}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {item.category}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {item.count} available
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative mx-4 my-6 overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50/50 to-slate-100/30 px-6 py-8 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-100/20 blur-3xl dark:bg-purple-900/10"></div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-blue-100 dark:to-purple-100 md:text-3xl">
            Browse Cars by Category
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-600 dark:text-gray-400">
            Find your perfect vehicle from our curated collection
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 bg-white/70 py-2.5 pl-10 pr-10 text-sm placeholder-gray-500 backdrop-blur-sm transition-all duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800/70 dark:placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaTimes className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:bg-white dark:border-gray-700 dark:bg-gray-800/70 dark:hover:bg-gray-800"
            >
              <FaFilter className="h-4 w-4" />
              <span>
                {
                  filterOptions.find((opt) => opt.value === selectedFilter)
                    ?.label
                }
              </span>
              <FaChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {showFilters && (
              <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedFilter(option.value);
                      setShowFilters(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedFilter === option.value
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count and loading */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span>Searching...</span>
              </span>
            ) : (
              `${filteredItems.length} categories found`
            )}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems
              .slice(0, visibleCount)
              .map((item, index) => (
                <CategoryCard
                  key={`${item.category}-${index}`}
                  item={item}
                  index={index}
                />
              ))
          ) : !isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <FaSearch className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                No categories found
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>

        {filteredItems.length > 6 && (
          <div
            className={`${viewMode === "grid" ? "col-span-full" : "w-full"} mt-6 text-center`}
          >
            <button
              onClick={() => {
                if (visibleCount >= filteredItems.length) {
                  setVisibleCount(6);
                } else {
                  setVisibleCount((prev) => prev + 6);
                }
              }}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              {visibleCount >= filteredItems.length ? "See Less" : "See More"}
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {filteredItems.length > 0 && (
          <div className="mt-8 border-t border-gray-200/50 pt-6 dark:border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {filteredItems.reduce((sum, item) => sum + item.count, 0)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Total Cars
                </div>
              </div>
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {filteredItems.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Categories
                </div>
              </div>
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {filteredItems.filter((item) => item.popular).length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Popular
                </div>
              </div>
              <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {Math.max(...filteredItems.map((item) => item.count))}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Most Stock
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseCars;
