"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaTimes,
  FaCar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTags,
  FaCalculator,
  FaHandshake,
  FaCreditCard,
  FaRegHeart,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("HomePage");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [logo, setLogo] = useState("/logo.png");
  const [topSettings, setTopSettings] = useState({});

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
        if (data.settings?.top) {
          setTopSettings(data.settings.top);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchMakes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/makes");
        setMakes(response.data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (selectedMake) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/models?makeId=${selectedMake}`,
          );
          setModels(response.data);
        } catch (error) {
          console.error("Error fetching models:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchModels();
  }, [selectedMake]);

  const handleSearch = async () => {
    if (!selectedMake && minPrice === 100 && maxPrice === 100000) {
      alert(
        "Please select at least one search criterion (Make or Price Range).",
      );
      return;
    }

    setSearchLoading(true);
    try {
      const queryParams = [];

      if (selectedMake) {
        const makeObj = makes.find((m) => m._id === selectedMake);
        if (makeObj)
          queryParams.push(`make=${encodeURIComponent(makeObj.name)}`);
      }

      if (selectedModel) {
        const modelObj = models.find((m) => m._id === selectedModel);
        if (modelObj)
          queryParams.push(`model=${encodeURIComponent(modelObj.name)}`);
      }

      if (minPrice !== 100 || maxPrice !== 100000) {
        queryParams.push(`minPrice=${minPrice}`);
        queryParams.push(`maxPrice=${maxPrice}`);
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
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  AutomotiveWebSolutions
                </span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Built to Sell Cars
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="group relative rounded-xl bg-gray-100 p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <FaSearch className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10"></div>
              </button>

              <div className="hidden items-center space-x-3 md:flex">
                {!topSettings.hideFavourite && (
                  <Link
                    href="/user/saved"
                    className="group relative rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200/80 hover:text-gray-900 hover:ring-gray-400/70 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 dark:hover:bg-gray-600/80 dark:hover:text-white dark:hover:ring-gray-500/70"
                    aria-label="Saved-ads"
                  >
                    <FaRegHeart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                )}

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
          <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Search & Navigation
            </h2>
            <button
              onClick={closeSidebar}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700"
            >
              <FaTimes className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="border-b border-gray-200 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
            <div className="mb-4">
              <div className="mb-2 flex items-center space-x-2"></div>
            </div>

            <div className="mb-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <span className="flex items-center space-x-1">
                      <FaCar className="h-3 w-3 text-blue-600" />
                      <span>{t("selectMake")}</span>
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/80 p-3 text-sm text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800/80 dark:text-white dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:ring-blue-800"
                      disabled={loading}
                    >
                      <option value="">Make</option>
                      {makes.map((make) => (
                        <option key={make._id} value={make._id}>
                          {make.name}
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
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <span className="flex items-center space-x-1">
                      <FaCar className="h-3 w-3 text-purple-600" />
                      <span>{t("selectModel")}</span>
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/80 p-3 text-sm text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800/80 dark:text-white dark:hover:border-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-800"
                      disabled={!selectedMake || loading}
                    >
                      <option value="">Model</option>
                      {models.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model.name}
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
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="flex items-center space-x-1">
                  <FaTags className="h-3 w-3 text-green-600" />
                  <span>{t("priceRange")}</span>
                </span>
              </label>

              <div className="rounded-xl border-2 border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/60">
                <div className="mb-3 flex items-center justify-between">
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

            <button
              onClick={handleSearch}
              disabled={searchLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center justify-center">
                {searchLoading ? (
                  <>
                    <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="text-lg">{t("searching")}</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-3 h-5 w-5" />
                    <span className="text-lg">{t("searchCar")}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          <div className="flex-1 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <div className="space-y-2">
              {[
                { name: "New & Used Cars", href: "/car-for-sale", icon: FaCar },
                {
                  name: "Sell my car",
                  href: "/cars/sell-my-car",
                  icon: FaHandshake,
                },
                {
                  name: "Value Your Car",
                  href: "/cars/valuation",
                  icon: FaCalculator,
                },
                { name: "Car Leasing", href: "/cars/leasing", icon: FaTags },
                {
                  name: "Car Finance",
                  href: "/cars/finance",
                  icon: FaCreditCard,
                },
              ].map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={closeSidebar}
                    className="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  >
                    <IconComponent className="mr-3 h-4 w-4 text-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="mr-3 h-2 w-2 rounded-full bg-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaPhone className="h-4 w-4 text-blue-600" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="h-4 w-4 text-blue-600" />
                <span className="text-sm">info@automotivewebsolutions.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="h-4 w-4 text-blue-600" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
