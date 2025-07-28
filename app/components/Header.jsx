"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import {
  FaSearch,
  FaTimes,
  FaTags,
  FaCalculator,
  FaHandshake,
  FaCar,
  FaCreditCard,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const colorMap = {
  black: "#000000",
  blue: "#3b82f6",
  gray: "#6b7280",
  white: "#ffffff",
  silver: "#c0c0c0",
  red: "#ef4444",
  green: "#22c55e",
};

// Helper function to determine if a color is light
const isLightColor = (colorId) => {
  const lightColors = ["white", "yellow", "beige", "silver"];
  return lightColors.includes(colorId);
};

const Header = ({ isSidebarOpen, setIsSidebarOpen, onSidebarClose }) => {
  const t = useTranslations("HomePage");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [logo, setLogo] = useState("/logo.png");
  const [topSettings, setTopSettings] = useState({});

  const ConditionButton = ({ condition, selected, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
          selected
            ? "border-violet-600 bg-violet-600 text-white shadow-md"
            : "border-gray-300 bg-white text-gray-700 hover:border-violet-400 hover:bg-violet-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-violet-500 dark:hover:bg-gray-700"
        }`}
      >
        {condition === "new" ? "New" : "Used"}
      </button>
    );
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  // Fetch JSON data on component mount
  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/Vehicle make and model data (2).json");
        const data = await response.json();
        setJsonData(data.Sheet1);

        // Extract unique makes
        const uniqueMakes = [...new Set(data.Sheet1.map((item) => item.Maker))];
        setMakes(uniqueMakes);
      } catch (error) {
        console.error("Error loading vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJsonData();
  }, []);

  useEffect(() => {
    if (selectedMake && jsonData) {
      const makeData = jsonData.find((item) => item.Maker === selectedMake);
      if (makeData && makeData["model "]) {
        const modelArray = makeData["model "]
          .split(",")
          .map((model) => model.trim());
        setModels(modelArray);
      } else {
        setModels([]);
      }
      setSelectedModel("");
    }
  }, [selectedMake, jsonData]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings/general");
        const data = await response.json();
        if (data.settings?.logo) {
          setLogo(data.settings.logo);
        }
        
          setTopSettings(prev => ({
        hideDarkMode: false,
        hideFavourite: false,
        hideLogo: false,
        ...data.settings?.top
      }));
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);
  
  const handleColorSelection = (colorId) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((c) => c !== colorId)
        : [...prev, colorId],
    );
  };

  const handleConditionSelection = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  const handleSearch = async () => {
    if (
      !selectedMake &&
      minPrice === 100 &&
      maxPrice === 100000 &&
      selectedColors.length === 0 &&
      selectedConditions.length === 0
    ) {
      alert(
        "Please select at least one search criterion (Make, Price Range, Color, or Condition).",
      );
      return;
    }

    setSearchLoading(true);
    try {
      const queryParams = [];

      if (selectedMake) {
        queryParams.push(`make=${encodeURIComponent(selectedMake)}`);
      }

      if (selectedModel) {
        queryParams.push(`model=${encodeURIComponent(selectedModel)}`);
      }

      if (minPrice !== 100 || maxPrice !== 100000) {
        queryParams.push(`minPrice=${minPrice}`);
        queryParams.push(`maxPrice=${maxPrice}`);
      }

      if (selectedColors.length > 0) {
        selectedColors.forEach((color) => {
          queryParams.push(`color=${encodeURIComponent(color)}`);
        });
      }

      if (selectedConditions.length > 0) {
        selectedConditions.forEach((condition) => {
          queryParams.push(`condition=${encodeURIComponent(condition)}`);
        });
      }

      const queryString = queryParams.join("&");
      router.push(`/car-for-sale?${queryString}`);
      closeSidebar();
    } catch (error) {
      console.error("Error searching cars:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price.toLocaleString()}`;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    if (onSidebarClose) {
      onSidebarClose();
    }
  };

  const quickLinks = [
    { name: "Find Cars", href: "/car-for-sale", icon: FaCar },
    { name: "Car valuation", href: "/cars/valuation", icon: FaCalculator },
    { name: "Lease deals", href: "/cars/leasing", icon: FaTags },
    { name: "Vehicle Services", href: "/cars/about-us", icon: FaHandshake },
  ];

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {!topSettings.hideLogo && (
              <Link href="/" className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-16 w-16 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    Front Seat
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Built to Sell Cars
                  </span>
                </div>
              </Link>
            )}

            <div className="hidden items-center space-x-6 lg:flex">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  >
                    <IconComponent className="h-4 w-4 transition-colors duration-200" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                aria-label="Open Search"
                className="group relative rounded-xl bg-gray-100 p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <FaSearch className="h-5 w-5 text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:group-hover:text-blue-400" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10"></div>
              </button>

              {!topSettings.hideFavourite && (
                <button
                  onClick={() => router.push("/liked-cars")}
                  aria-label="Liked Cars"
                  className="group relative hidden rounded-xl bg-gray-100 p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex"
                >
                  <FaHeart className="h-5 w-5 text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:group-hover:text-blue-400" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10"></div>
                </button>
              )}

              <div className="hidden items-center space-x-3 md:flex">
                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="group relative rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200/80 hover:text-gray-900 hover:ring-gray-400/70 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 dark:hover:bg-gray-600/80 dark:hover:text-white dark:hover:ring-gray-500/70"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <FaSun className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FaMoon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-3 md:hidden">
                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200/80 hover:text-gray-900 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 dark:hover:bg-gray-600/80 dark:hover:text-white"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <FaSun className="h-5 w-5" />
                    ) : (
                      <FaMoon className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } scrollbar-hide`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header - Minimal */}
          <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Filters
            </h2>
            <button
              onClick={closeSidebar}
              aria-label="Close Sidebar"
              className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
            >
              <FaTimes className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 space-y-4 overflow-y-auto p-2 px-4">
            {/* Make and Model Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="make"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Make
                </label>
                <div className="relative">
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    aria-label="Select Make"
                    className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:ring-blue-800"
                    disabled={loading}
                  >
                    <option value="">Select Make</option>
                    {makes.map((make, index) => (
                      <option key={index} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                  {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Model
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    aria-label="Select Model"
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 transition-all duration-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-800"
                    disabled={!selectedMake || loading}
                  >
                    <option value="">Select Model</option>
                    {models.map((model, index) => (
                      <option key={index} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  {loading && selectedMake && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="flex items-center space-x-1">
                  <FaTags className="h-3 w-3 text-green-600" />
                  <span>{t("priceRange")}</span>
                </span>
              </label>

              <div className="rounded-xl border-2 border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/60">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-3 py-1 dark:bg-green-900/30">
                      <span className="text-sm font-bold text-green-700 dark:text-green-400">
                        {formatPrice(minPrice)}
                      </span>
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="rounded-lg bg-green-100 px-3 py-1 dark:bg-green-900/30">
                      <span className="text-sm font-bold text-green-700 dark:text-green-400">
                        {formatPrice(maxPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-4">
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={minPrice}
                    aria-label="Minimum price range"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < maxPrice) setMinPrice(value);
                    }}
                    className="absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={maxPrice}
                    aria-label="Maximum price range"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > minPrice) setMaxPrice(value);
                    }}
                    className="absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                  <div className="relative h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="absolute h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-sm"
                      style={{
                        left: `${((minPrice - 100) / 99900) * 100}%`,
                        width: `${((maxPrice - minPrice) / 99900) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                      Minimum
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="100000"
                      value={minPrice}
                      aria-label="Minimum price range"
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 100;
                        if (value < maxPrice && value >= 100)
                          setMinPrice(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                      Maximum
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="100000"
                      value={maxPrice}
                      aria-label="Maximum price range"
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 100000;
                        if (value > minPrice && value <= 100000)
                          setMaxPrice(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Selection - Compact */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(colorMap).map(([id, hex]) => {
                  const label = id.charAt(0).toUpperCase() + id.slice(1);
                  const isSelected = selectedColors.includes(id);

                  return (
                    <button
                      key={id}
                      className={`relative h-6 w-6 rounded-full border ${
                        isSelected
                          ? "border-white ring-2 ring-violet-500"
                          : "border-gray-300 dark:border-gray-600"
                      } transition-all duration-200`}
                      style={{ backgroundColor: hex }}
                      onClick={() => handleColorSelection(id)}
                      title={label}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className={`h-3 w-3 ${
                              isLightColor(id) ? "text-black" : "text-white"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Condition Selection - Compact */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Condition
              </label>
              <div className="flex gap-2">
                <ConditionButton
                  condition="new"
                  selected={selectedConditions.includes("new")}
                  onClick={() => handleConditionSelection("new")}
                />
                <ConditionButton
                  condition="used"
                  selected={selectedConditions.includes("used")}
                  onClick={() => handleConditionSelection("used")}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={searchLoading}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="flex items-center justify-center">
                {searchLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2 h-4 w-4" />
                    <span>Search Cars</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;