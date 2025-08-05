"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import {
  FaHeart,
  FaSearch,
  FaTimes,
  FaCalculator,
  FaHandshake,
  FaCar,
  FaSun,
  FaMoon,
  FaTags,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import CarSearchSidebar from "./Car-search-sidebar";
import { useSidebar } from "../context/SidebarContext";
import Image from "next/image";

// Static fallback data to prevent loading states
const DEFAULT_SETTINGS = {
  hideDarkMode: false,
  hideFavourite: false,
  hideLogo: false,
};

const Header = () => {
  const t = useTranslations("HomePage");
  const [darkMode, setDarkMode] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoLoading, setLogoLoading] = useState(false); // Start as false
  const [topSettings, setTopSettings] = useState(DEFAULT_SETTINGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Cache for settings API
  const [settingsCache, setSettingsCache] = useState(null);

  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      // Check cache first (10 minute cache)
      if (settingsCache && Date.now() - settingsCache.timestamp < 600000) {
        const cachedData = settingsCache.data;
        if (cachedData.settings?.logo2) {
          setLogo(cachedData.settings.logo2);
        }
        setTopSettings((prev) => ({
          ...DEFAULT_SETTINGS,
          ...cachedData.settings?.top,
        }));
        return;
      }

      try {
        setLogoLoading(true);
        const response = await fetch("/api/settings/general", {
          next: { revalidate: 600 }, // 10 minutes cache
        });
        const data = await response.json();

        // Cache the response
        setSettingsCache({
          data,
          timestamp: Date.now(),
        });

        if (data.settings?.logo2) {
          setLogo(data.settings.logo2);
        }
        setTopSettings((prev) => ({
          ...DEFAULT_SETTINGS,
          ...data.settings?.top,
        }));
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        // Keep default settings on error
      } finally {
        setLogoLoading(false);
      }
    };

    // Defer settings fetch to not block initial render
    const timeoutId = setTimeout(fetchSettings, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const toggleSearchSidebar = () => {
    toggleSidebar();
  };

  const quickLinks = [
    { name: "Find Cars", href: "/car-for-sale", icon: FaCar },
    { name: "Car valuation", href: "/cars/valuation", icon: FaCalculator },
    { name: "Lease deals", href: "/cars/leasing", icon: FaTags },
    { name: "Vehicle Services", href: "/cars/about-us", icon: FaHandshake },
  ];

  const mobileMenuLinks = [
    ...quickLinks,
    { name: "Login", href: "/login", icon: FaUser },
  ];

  // Simple skeleton without heavy animations
  const LogoSkeleton = () => (
    <div className="flex items-center space-x-3">
      <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex flex-col space-y-1">
        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {!topSettings.hideLogo && (
              <>
                {logoLoading ? (
                  <LogoSkeleton />
                ) : logo ? (
                  <Link href="/" className="flex items-center space-x-3">
                    <Image
                      src={logo}
                      alt="Logo"
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                      onError={() => setLogo("")}
                      priority
                      sizes="64px"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        FrontSeat
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Built to Sell Cars
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        FrontSeat
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Built to Sell Cars
                      </span>
                    </div>
                  </Link>
                )}
              </>
            )}

            <div className="hidden items-center space-x-6 lg:flex">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 dark:text-gray-300 md:hover:bg-gray-100 md:hover:text-blue-600 dark:md:hover:bg-gray-800 dark:md:hover:text-blue-400"
                  >
                    <IconComponent className="h-4 w-4 transition-colors duration-200" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/login")}
                aria-label="Login"
                className="hidden items-center space-x-2 rounded-xl bg-gray-100 px-4 py-3 text-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 md:hover:scale-105 md:hover:bg-gray-200 md:hover:text-blue-600 dark:md:hover:bg-gray-700 dark:md:hover:text-blue-400 lg:flex"
              >
                <FaUser className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
                className="group relative rounded-xl bg-gray-100 p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 md:hover:scale-105 md:hover:bg-gray-200 dark:md:hover:bg-gray-700 lg:hidden"
              >
                <svg
                  className="h-5 w-5 text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:md:group-hover:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 md:group-hover:from-blue-500/10 md:group-hover:to-purple-500/10"></div>
              </button>

              <button
                onClick={toggleSearchSidebar}
                aria-label="Open Search"
                className="group relative hidden rounded-xl bg-gray-100 p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 md:hover:scale-105 md:hover:bg-gray-200 dark:md:hover:bg-gray-700 lg:block"
              >
                <FaSearch className="h-5 w-5 text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:md:group-hover:text-blue-400" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 md:group-hover:from-blue-500/10 md:group-hover:to-purple-500/10"></div>
              </button>

              {!topSettings.hideFavourite && (
                <button
                  onClick={() => router.push("/liked-cars")}
                  aria-label="Liked Cars"
                  className="group relative hidden rounded-xl bg-gray-100 p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 md:flex md:hover:scale-105 md:hover:bg-gray-200 dark:md:hover:bg-gray-700"
                >
                  <FaHeart className="h-5 w-5 text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:md:group-hover:text-blue-400" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 md:group-hover:from-blue-500/10 md:group-hover:to-purple-500/10"></div>
                </button>
              )}

              <div className="hidden items-center space-x-3 md:flex">
                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="group relative rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm transition-all duration-300 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 md:hover:scale-105 md:hover:bg-gray-200/80 md:hover:text-gray-900 md:hover:ring-gray-400/70 dark:md:hover:bg-gray-600/80 dark:md:hover:text-white dark:md:hover:ring-gray-500/70"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <FaSun className="h-5 w-5 transition-transform duration-300 md:group-hover:scale-110" />
                    ) : (
                      <FaMoon className="h-5 w-5 transition-transform duration-300 md:group-hover:scale-110" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3 md:hidden">
                {!topSettings.hideDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200/80 hover:text-white"
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

      {/* Mobile Menu Overlay - optimized */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - reduced animation complexity */}
      <div
        className={`fixed left-0 top-0 z-[60] h-full w-full max-w-xs transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } scrollbar-hide lg:hidden`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
              className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
            >
              <FaTimes className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="flex-1 space-y-2 p-4">
            {mobileMenuLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <CarSearchSidebar />
    </>
  );
};

export default Header;
