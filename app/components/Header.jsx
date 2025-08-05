"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

const DEFAULT_SETTINGS = {
  hideDarkMode: false,
  hideFavourite: false,
  hideLogo: false,
};

const Header = () => {
  const t = useTranslations("HomePage");
  const [darkMode, setDarkMode] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [topSettings, setTopSettings] = useState(DEFAULT_SETTINGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  const router = useRouter();
  const mountedRef = useRef(true);

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const quickLinks = useMemo(() => [
    { name: "Find Cars", href: "/car-for-sale", icon: FaCar },
    { name: "Car valuation", href: "/cars/valuation", icon: FaCalculator },
    { name: "Lease deals", href: "/cars/leasing", icon: FaTags },
    { name: "Vehicle Services", href: "/cars/about-us", icon: FaHandshake },
  ], []);

  const mobileMenuLinks = useMemo(() => [
    ...quickLinks,
    { name: "Login", href: "/login", icon: FaUser },
  ], [quickLinks]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      const response = await fetch("/api/settings/general", {
        priority: 'low'
      });
      
      if (!response.ok) return;
      
      const data = await response.json();
      if (!mountedRef.current) return;

      setLogo(data.settings?.logo2 || "");
      setTopSettings({
        ...DEFAULT_SETTINGS,
        ...data.settings?.top,
      });
      setIsSettingsLoaded(true);
      
    } catch (error) {
      setIsSettingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(fetchSettings, 300);
    
    return () => {
      mountedRef.current = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [fetchSettings]);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle("dark", newDarkMode);
  }, [darkMode]);

  const toggleSearchSidebar = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleLikedCars = useCallback(() => {
    router.push("/liked-cars");
  }, [router]);

  const handleLogoError = useCallback(() => {
    setLogoError(true);
    setLogo("");
  }, []);

  const LogoComponent = useMemo(() => {
  if (topSettings.hideLogo) return null;

  return (
    <Link href="/" className="flex items-center min-h-[48px] space-x-2">
      {logo && !logoError && (
        <Image
          src={logo}
          alt="Logo"
          width={48}
          height={48}
          className="object-contain"
          onError={handleLogoError}
          priority
          fetchPriority="high"
        />
      )}
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          FrontSeat
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Built to Sell Cars
        </span>
      </div>
    </Link>
  );
}, [topSettings.hideLogo, logo, logoError]);


  const DesktopNavigation = useMemo(() => (
    <div className="hidden items-center space-x-6 lg:flex">
      {quickLinks.map((link, index) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={index}
            href={link.href}
            className="group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
          >
            <IconComponent className="h-4 w-4" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  ), [quickLinks]);

  const ActionButtons = useMemo(() => (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleLogin}
        aria-label="Login"
        className="hidden items-center space-x-2 rounded-xl bg-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 lg:flex"
      >
        <FaUser className="h-5 w-5" />
        <span className="text-sm font-medium">Login</span>
      </button>

      <button
        onClick={handleMobileMenuToggle}
        aria-label="Open Menu"
        className="rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden"
      >
        <svg
          className="h-5 w-5 text-gray-600 dark:text-gray-300"
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
      </button>

      <button
        onClick={toggleSearchSidebar}
        aria-label="Open Search"
        className="hidden rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 lg:block"
      >
        <FaSearch className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {!topSettings.hideFavourite && (
        <button
          onClick={handleLikedCars}
          aria-label="Liked Cars"
          className="hidden rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex"
        >
          <FaHeart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}

      <div className="hidden items-center space-x-3 md:flex">
        {!topSettings.hideDarkMode && (
          <button
            onClick={toggleDarkMode}
            className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm hover:bg-gray-200/80 hover:text-gray-900 hover:ring-gray-400/70 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 dark:hover:bg-gray-600/80 dark:hover:text-white dark:hover:ring-gray-500/70"
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

      <div className="flex items-center space-x-3 md:hidden">
        {!topSettings.hideDarkMode && (
          <button
            onClick={toggleDarkMode}
            className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm hover:bg-gray-200/80 hover:text-white"
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
  ), [handleLogin, handleMobileMenuToggle, toggleSearchSidebar, handleLikedCars, topSettings.hideFavourite, topSettings.hideDarkMode, toggleDarkMode, darkMode]);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {LogoComponent}
            {DesktopNavigation} 
            {ActionButtons}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 z-[60] h-full w-full max-w-xs bg-white shadow-2xl dark:bg-gray-900 scrollbar-hide lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h2>
            <button
              onClick={closeMobileMenu}
              aria-label="Close Menu"
              className="rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
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
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
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




















// "use client";

// import { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaUser } from "react-icons/fa";
// import {
//   FaHeart,
//   FaSearch,
//   FaTimes,
//   FaCalculator,
//   FaHandshake,
//   FaCar,
//   FaSun,
//   FaMoon,
//   FaTags,
// } from "react-icons/fa";
// import { useTranslations } from "next-intl";
// import CarSearchSidebar from "./Car-search-sidebar";
// import { useSidebar } from "../context/SidebarContext";
// import Image from "next/image";

// // Static fallback data to prevent loading states
// const DEFAULT_SETTINGS = {
//   hideDarkMode: false,
//   hideFavourite: false,
//   hideLogo: false,
// };

// // Global cache with better management
// class SettingsCache {
//   constructor() {
//     this.cache = null;
//     this.timestamp = 0;
//     this.duration = 600000; // 10 minutes
//     this.pending = null; // Prevent multiple concurrent requests
//   }

//   isValid() {
//     return this.cache && Date.now() - this.timestamp < this.duration;
//   }

//   get() {
//     return this.cache;
//   }

//   set(data) {
//     this.cache = data;
//     this.timestamp = Date.now();
//     this.pending = null;
//   }

//   async fetch() {
//     if (this.isValid()) {
//       return this.cache;
//     }

//     if (this.pending) {
//       return this.pending;
//     }

//     this.pending = this._fetchSettings();
//     const result = await this.pending;
//     this.set(result);
//     return result;
//   }

//   async _fetchSettings() {
//     const response = await fetch("/api/settings/general", {
//       next: { revalidate: 600 },
//       // Add performance hints
//       priority: 'low'
//     });
    
//     if (!response.ok) throw new Error('Settings fetch failed');
//     return response.json();
//   }
// }

// const globalSettingsCache = new SettingsCache();

// const Header = () => {
//   const t = useTranslations("HomePage");
//   const [darkMode, setDarkMode] = useState(false);
//   const [logo, setLogo] = useState("");
//   const [logoError, setLogoError] = useState(false);
//   const [topSettings, setTopSettings] = useState(DEFAULT_SETTINGS);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
//   const router = useRouter();
//   const mountedRef = useRef(true);

//   const { isSidebarOpen, toggleSidebar } = useSidebar();

//   // Memoize quick links to prevent recreation on every render
//   const quickLinks = useMemo(() => [
//     { name: "Find Cars", href: "/car-for-sale", icon: FaCar },
//     { name: "Car valuation", href: "/cars/valuation", icon: FaCalculator },
//     { name: "Lease deals", href: "/cars/leasing", icon: FaTags },
//     { name: "Vehicle Services", href: "/cars/about-us", icon: FaHandshake },
//   ], []);

//   const mobileMenuLinks = useMemo(() => [
//     ...quickLinks,
//     { name: "Login", href: "/login", icon: FaUser },
//   ], [quickLinks]);

//   // Initialize dark mode synchronously to prevent flash
//   useEffect(() => {
//     // Check localStorage first for faster initialization
//     const savedTheme = localStorage.getItem('theme');
//     const isDark = savedTheme === 'dark' || 
//       (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
//     setDarkMode(isDark);
    
//     // Apply immediately to prevent flash
//     if (isDark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Optimized settings fetch with better error handling
//   const fetchSettings = useCallback(async () => {
//     if (!mountedRef.current) return;

//     try {
//       const data = await globalSettingsCache.fetch();

//       if (!mountedRef.current) return;

//       // Batch state updates to prevent multiple re-renders
//       const updates = {
//         logo: data.settings?.logo2 || "",
//         settings: {
//           ...DEFAULT_SETTINGS,
//           ...data.settings?.top,
//         }
//       };

//       setLogo(updates.logo);
//       setTopSettings(updates.settings);
//       setIsSettingsLoaded(true);
      
//     } catch (error) {
//       console.error("Failed to fetch settings:", error);
//       // Silently fall back to defaults
//       setIsSettingsLoaded(true);
//     }
//   }, []);

//   useEffect(() => {
//     mountedRef.current = true;
    
//     // Use requestIdleCallback for non-critical settings
//     const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
//     const taskId = scheduleTask(() => {
//       fetchSettings();
//     }, { timeout: 3000 });
    
//     return () => {
//       mountedRef.current = false;
//       if (window.cancelIdleCallback) {
//         window.cancelIdleCallback(taskId);
//       } else {
//         clearTimeout(taskId);
//       }
//     };
//   }, [fetchSettings]);

//   // Optimized dark mode toggle with persistence
//   const toggleDarkMode = useCallback(() => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
    
//     // Persist preference
//     localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
//     // Apply immediately
//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const toggleSearchSidebar = useCallback(() => {
//     toggleSidebar();
//   }, [toggleSidebar]);

//   const handleMobileMenuToggle = useCallback(() => {
//     setIsMobileMenuOpen(prev => !prev);
//   }, []);

//   const closeMobileMenu = useCallback(() => {
//     setIsMobileMenuOpen(false);
//   }, []);

//   const handleLogin = useCallback(() => {
//     router.push("/login");
//   }, [router]);

//   const handleLikedCars = useCallback(() => {
//     router.push("/liked-cars");
//   }, [router]);

//   const handleLogoError = useCallback(() => {
//     setLogoError(true);
//     setLogo("");
//   }, []);

//   // Optimized skeleton without animations to prevent CLS
//   const LogoSkeleton = useMemo(() => (
//     <div className="flex items-center space-x-3" style={{ height: '48px', width: '200px' }}>
//       <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
//       <div className="flex flex-col space-y-1">
//         <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
//         <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
//       </div>
//     </div>
//   ), []);

//   // Memoized logo component with fixed dimensions
//   const LogoComponent = useMemo(() => {
//     if (topSettings.hideLogo) return null;

//     if (!isSettingsLoaded) return LogoSkeleton;

//     const logoContent = (
//       <div className="flex items-center space-x-3">
//         <div className="flex flex-col">
//           <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
//             FrontSeat
//           </span>
//           <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
//             Built to Sell Cars
//           </span>
//         </div>
//       </div>
//     );

//     return (
//       <Link href="/" className="flex items-center space-x-3">
//         <div style={{ minHeight: '48px', display: 'flex', alignItems: 'center' }}>
//           {logo && !logoError ? (
//             <>
//               <div style={{ width: '64px', height: '64px', position: 'relative' }}>
//                 <Image
//                   src={logo}
//                   alt="Logo"
//                   fill
//                   className="object-contain"
//                   onError={handleLogoError}
//                   priority
//                   sizes="64px"
//                 />
//               </div>
//               {logoContent}
//             </>
//           ) : (
//             logoContent
//           )}
//         </div>
//       </Link>
//     );
//   }, [topSettings.hideLogo, isSettingsLoaded, logo, logoError, LogoSkeleton, handleLogoError]);

//   // Memoized navigation items
//   const DesktopNavigation = useMemo(() => (
//     <div className="hidden items-center space-x-6 lg:flex">
//       {quickLinks.map((link, index) => {
//         const IconComponent = link.icon;
//         return (
//           <Link
//             key={index}
//             href={link.href}
//             className="group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
//           >
//             <IconComponent className="h-4 w-4" />
//             <span>{link.name}</span>
//           </Link>
//         );
//       })}
//     </div>
//   ), [quickLinks]);

//   // Memoized action buttons
//   const ActionButtons = useMemo(() => (
//     <div className="flex items-center space-x-3">
//       <button
//         onClick={handleLogin}
//         aria-label="Login"
//         className="hidden items-center space-x-2 rounded-xl bg-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 lg:flex"
//       >
//         <FaUser className="h-5 w-5" />
//         <span className="text-sm font-medium">Login</span>
//       </button>

//       <button
//         onClick={handleMobileMenuToggle}
//         aria-label="Open Menu"
//         className="rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden"
//       >
//         <svg
//           className="h-5 w-5 text-gray-600 dark:text-gray-300"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>

//       <button
//         onClick={toggleSearchSidebar}
//         aria-label="Open Search"
//         className="hidden rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 lg:block"
//       >
//         <FaSearch className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//       </button>

//       {!topSettings.hideFavourite && (
//         <button
//           onClick={handleLikedCars}
//           aria-label="Liked Cars"
//           className="hidden rounded-xl bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex"
//         >
//           <FaHeart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//         </button>
//       )}

//       <div className="hidden items-center space-x-3 md:flex">
//         {!topSettings.hideDarkMode && (
//           <button
//             onClick={toggleDarkMode}
//             className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm hover:bg-gray-200/80 hover:text-gray-900 hover:ring-gray-400/70 dark:bg-gray-700/70 dark:text-gray-300 dark:ring-gray-600/50 dark:hover:bg-gray-600/80 dark:hover:text-white dark:hover:ring-gray-500/70"
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? (
//               <FaSun className="h-5 w-5" />
//             ) : (
//               <FaMoon className="h-5 w-5" />
//             )}
//           </button>
//         )}
//       </div>

//       <div className="flex items-center space-x-3 md:hidden">
//         {!topSettings.hideDarkMode && (
//           <button
//             onClick={toggleDarkMode}
//             className="rounded-xl bg-gray-100/70 p-3 text-gray-700 ring-1 ring-gray-300/50 backdrop-blur-sm hover:bg-gray-200/80 hover:text-white"
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? (
//               <FaSun className="h-5 w-5" />
//             ) : (
//               <FaMoon className="h-5 w-5" />
//             )}
//           </button>
//         )}
//       </div>
//     </div>
//   ), [handleLogin, handleMobileMenuToggle, toggleSearchSidebar, handleLikedCars, topSettings.hideFavourite, topSettings.hideDarkMode, toggleDarkMode, darkMode]);

//   return (
//     <>
//       <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/95">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
//           <div className="flex h-16 items-center justify-between">
//             {LogoComponent}
//             {DesktopNavigation} 
//             {ActionButtons}
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay - Use transform for better performance */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
//           onClick={closeMobileMenu}
//           style={{ transform: 'translate3d(0, 0, 0)' }}
//         />
//       )}

//       {/* Mobile Menu - Optimized animations */}
//       <div
//         className={`fixed left-0 top-0 z-[60] h-full w-full max-w-xs transform overflow-y-auto bg-white shadow-2xl dark:bg-gray-900 scrollbar-hide lg:hidden`}
//         style={{ 
//           transform: isMobileMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
//           transition: 'transform 0.2s ease-out',
//           willChange: 'transform'
//         }}
//       >
//         <div className="flex h-full flex-col">
//           <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//               Quick Links
//             </h2>
//             <button
//               onClick={closeMobileMenu}
//               aria-label="Close Menu"
//               className="rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
//             >
//               <FaTimes className="h-4 w-4 text-gray-600 dark:text-gray-300" />
//             </button>
//           </div>
//           <div className="flex-1 space-y-2 p-4">
//             {mobileMenuLinks.map((link, index) => {
//               const IconComponent = link.icon;
//               return (
//                 <Link
//                   key={index}
//                   href={link.href}
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
//                 >
//                   <IconComponent className="h-5 w-5" />
//                   <span>{link.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <CarSearchSidebar />
//     </>
//   );
// };

// export default Header;