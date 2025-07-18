"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowUpRight, Search, Filter, Grid, List, ArrowLeft, Wallet, Tag, Car, BatteryCharging } from "lucide-react"

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [hoveredBrand, setHoveredBrand] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const brandsPerPage = 12
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
      description: "Accelerating the World Transition",
    },
    {
      name: "Toyota",
      image: "/toyota.png",
      alt: "toyota cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
      category: "mainstream",
      founded: "1937",
      country: "Japan",
      description: "Go Places",
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
  ]
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
  ]
  const filteredBrands = brandLists.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage)
  const startIndex = (currentPage - 1) * brandsPerPage
  const paginatedBrands = filteredBrands.slice(startIndex, startIndex + brandsPerPage)
  useEffect(() => {
    setIsVisible(true)
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])
  const getCategoryColor = (category) => {
    switch (category) {
      case "luxury":
        return "from-amber-600 to-yellow-700" // Stronger gradient
      case "electric":
        return "from-emerald-600 to-teal-700" // Stronger gradient
      case "mainstream":
        return "from-blue-600 to-cyan-700" // Stronger gradient
      default:
        return "from-gray-600 to-slate-700" // Stronger gradient
    }
  }
  const getCategoryIcon = (category) => {
    switch (category) {
      case "luxury":
        return <Wallet className="text-yellow-400" /> // Lucide icon, adjusted color
      case "electric":
        return <BatteryCharging className="text-emerald-400" /> // Lucide icon, adjusted color
      case "mainstream":
        return <Car className="text-blue-400" /> // Lucide icon, adjusted color
      default:
        return <Tag className="text-gray-400" /> // Lucide icon
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {" "}
      {/* Solid background for better contrast */}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-96 w-96 animate-pulse rounded-full bg-blue-200/15 to-purple-200/15 blur-3xl dark:bg-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute -bottom-32 -left-40 h-80 w-80 animate-pulse rounded-full bg-orange-200/15 to-red-200/15 blur-3xl delay-1000 dark:bg-orange-900/10 dark:to-red-900/10"></div>
      </div>
      <div className="relative mt-20">
        {/* Header Section */}
        <div className="border-b border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          {" "}
          {/* Solid background, stronger border, shadow */}
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-gray-700 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {" "}
                  {/* Improved button contrast */}
                  <ArrowLeft className="h-4 w-4" /> {/* Lucide icon */}
                  <span className="text-sm font-medium">Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">All Brands</h1>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {" "}
                    {/* Adjusted text color */}
                    Discover our complete collection of automotive brands
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-4 md:flex">
                {categories.slice(1).map((category) => (
                  <div key={category.id} className="text-center">
                    <div className="flex justify-center text-2xl">{getCategoryIcon(category.id)}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {" "}
                      {/* Adjusted text color */}
                      {category.count}
                    </div>
                    <div className="text-xs capitalize text-gray-600 dark:text-gray-400">
                      {" "}
                      {/* Adjusted text color */}
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Controls Section */}
        <div className="sticky top-0 z-40 border-b border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          {" "}
          {/* Solid background, stronger border, shadow */}
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />{" "}
                {/* Lucide icon */}
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                />{" "}
                {/* Stronger borders, solid background */}
              </div>
              <div className="flex items-center gap-3">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" /> {/* Lucide icon */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    {" "}
                    {/* Stronger borders, solid background */}
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>
                {/* View Toggle */}
                <div className="flex items-center gap-1 rounded-lg bg-gray-200 p-1 dark:bg-gray-700">
                  {" "}
                  {/* Stronger background */}
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Switch to Grid View"
                    className={`rounded-md p-2 transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    }`}
                  >
                    {" "}
                    {/* Adjusted inactive text color */}
                    <Grid className="h-4 w-4" /> {/* Lucide icon */}
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-2 transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    }`}
                  >
                    {" "}
                    {/* Adjusted inactive text color */}
                    <List className="h-4 w-4" /> {/* Lucide icon */}
                  </button>
                </div>
              </div>
            </div>
            {/* Results Info */}
            <div className="mt-3 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
              {" "}
              {/* Adjusted text color */}
              <span>
                Showing {startIndex + 1}-{Math.min(startIndex + brandsPerPage, filteredBrands.length)} of{" "}
                {filteredBrands.length} brands
                {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
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
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" // Increased gap
                    : "space-y-4" // Increased space
                }
              `}
            >
              {paginatedBrands.map((brand, index) => (
                <Link href={brand.url} key={`${brand.name}-${index}`}>
                  <div
                    className={`
                      group relative cursor-pointer overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md
                      transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20
                      dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600
                      ${viewMode === "list" ? "flex items-center p-5" : "p-5"}
                    `}
                    onMouseEnter={() => setHoveredBrand(brand.name)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    {/* Category Badge */}
                    <div
                      className={`absolute right-3 top-3 z-10 ${viewMode === "list" ? "relative right-0 top-0 ml-auto" : ""}`}
                    >
                      <span
                        className={`inline-flex items-center rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white ${getCategoryColor(brand.category)}`}
                      >
                        {" "}
                        {/* Increased padding, font-weight */}
                        {brand.category}
                      </span>
                    </div>
                    <div className={`${viewMode === "list" ? "flex flex-1 items-center gap-4" : "text-center"}`}>
                      {/* Image Container */}
                      <div
                        className={`
                          ${viewMode === "list" ? "h-16 w-16 flex-shrink-0" : "mx-auto mb-4 h-24 w-24"} 
                          relative overflow-hidden rounded-lg bg-gray-100 p-2 
                          transition-all duration-300 group-hover:scale-105 dark:bg-gray-700
                        `}
                      >
                        {" "}
                        {/* Stronger background */}
                        <Image
                          src={brand.image || "/placeholder.svg"}
                          alt={brand.alt}
                          width={96} // Adjusted width for h-24 w-24
                          height={96} // Adjusted height for h-24 w-24
                          className="h-full w-full object-contain"
                        />
                      </div>
                      {/* Brand Info */}
                      <div className={`${viewMode === "list" ? "min-w-0 flex-1" : ""}`}>
                        <h3
                          className={`${viewMode === "list" ? "text-lg" : "text-xl"} font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400`}
                        >
                          {" "}
                          {/* Adjusted font size, font weight */}
                          {brand.name}
                        </h3>
                        {viewMode === "grid" && (
                          <div className="mt-1 space-y-0.5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {" "}
                              {/* Adjusted text color */}
                              {brand.description}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              {" "}
                              {/* Adjusted text color */}
                              <span>{brand.founded}</span>
                              <span>•</span>
                              <span>{brand.country}</span>
                            </div>
                          </div>
                        )}
                        {viewMode === "list" && (
                          <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                            {" "}
                            {/* Adjusted text color */}
                            {brand.description}
                          </p>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <div className="flex flex-col items-end text-right text-xs text-gray-600 dark:text-gray-400">
                          {" "}
                          {/* Adjusted text color */}
                          <span>{brand.founded}</span>
                          <span>{brand.country}</span>
                        </div>
                      )}
                      {/* Hover Arrow */}
                      <div className={`${viewMode === "list" ? "" : "mt-2"} flex items-center justify-center`}>
                        <ArrowUpRight
                          className={`h-5 w-5 text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                            hoveredBrand === brand.name ? "opacity-100" : "opacity-0"
                          }`}
                        />{" "}
                        {/* Lucide icon, adjusted size */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                {" "}
                {/* Stronger background */}
                <Search className="h-10 w-10 text-gray-500" /> {/* Lucide icon */}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">No brands found</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-400">
                {" "}
                {/* Adjusted text color */}
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {" "}
                {/* Stronger borders, solid background, adjusted hover */}
                Previous
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {" "}
                        {/* Stronger background, adjusted hover */}
                        {page}
                      </button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    )
                  }
                  return null
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {" "}
                {/* Stronger borders, solid background, adjusted hover */}
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
