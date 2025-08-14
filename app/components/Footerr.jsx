"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import LanguageSwitching from "./LanguageSwitching";
import { useTranslations } from "next-intl";
import { iconComponentsMap, allSocialPlatforms } from "../lib/social-icons";

const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEYS = {
  FOOTER_SETTINGS: 'footer_settings',
  HOMEPAGE_DATA: 'footer_homepage',
  SOCIAL_MEDIA: 'footer_socials'
};

const CacheManager = {
  get: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Cache retrieval failed for key:', key, error);
      return null;
    }
  },

  set: (key, data) => {
    try {
      if (typeof window === 'undefined') return;
      
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed for key:', key, error);
    }
  },

  clear: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Cache clear failed for key:', key, error);
    }
  }
};

const DEFAULT_FOOTER_SETTINGS = {
  col1Heading: null,
  col2Heading: null,
  col3Heading: null,
};

const DEFAULT_HOMEPAGE_DATA = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
};

const Footerr = () => {
  const t = useTranslations("Footer");
  const mountedRef = useRef(true);

  const [footerSettings, setFooterSettings] = useState(DEFAULT_FOOTER_SETTINGS);
  const [logo, setLogo] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [homepageData, setHomepageData] = useState(DEFAULT_HOMEPAGE_DATA);
  const [fetchedSocials, setFetchedSocials] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tradingHours = useMemo(() => [
    { day: t("monday"), hours: homepageData?.monday || t("openingHours") },
    { day: t("tuesday"), hours: homepageData?.tuesday || t("openingHours") },
    { day: t("wednesday"), hours: homepageData?.wednesday || t("openingHours") },
    { day: t("thursday"), hours: homepageData?.thursday || t("openingHours") },
    { day: t("friday"), hours: homepageData?.friday || t("openingHours") },
    { day: t("saturday"), hours: homepageData?.saturday || t("closedHours") },
    { day: t("sunday"), hours: t("closedHours") },
  ], [homepageData, t]);

  const fetchHomepageData = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      const cachedData = CacheManager.get(CACHE_KEYS.HOMEPAGE_DATA);
      if (cachedData) {
        setHomepageData(cachedData);
        return;
      }

      const res = await fetch("/api/homepage", { 
        next: { revalidate: 300 }
      });

      if (!res.ok) throw new Error('Homepage fetch failed');
      
      const data = await res.json();
      const footerData = data?.footer || DEFAULT_HOMEPAGE_DATA;
      
      if (mountedRef.current) {
        setHomepageData(footerData);
        CacheManager.set(CACHE_KEYS.HOMEPAGE_DATA, footerData);
      }
    } catch (error) {
      console.error("Failed to fetch homepage data:", error);
      
      // Try to use stale cache as fallback
      const staleCache = localStorage.getItem(CACHE_KEYS.HOMEPAGE_DATA);
      if (staleCache) {
        try {
          const { data } = JSON.parse(staleCache);
          if (data && mountedRef.current) {
            setHomepageData(data);
          }
        } catch (parseError) {
          console.warn('Failed to parse stale homepage cache:', parseError);
        }
      }
    }
  }, []);

  // Enhanced social media fetch with professional caching
  const fetchSocialMedia = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      // Check cache first
      const cachedData = CacheManager.get(CACHE_KEYS.SOCIAL_MEDIA);
      if (cachedData) {
        setFetchedSocials(cachedData);
        return;
      }

      const res = await fetch("/api/socials");

      if (!res.ok) throw new Error('Socials fetch failed');
      
      const json = await res.json();

      if (json.data && mountedRef.current) {
        const combinedSocials = json.data.map((social) => {
          if (social.iconType === "react-icon") {
            const platformDetails = allSocialPlatforms.find(
              (p) => p.name === social.iconValue,
            );
            return {
              ...social,
              color: platformDetails?.color || "from-gray-200 to-gray-300",
              textColor: platformDetails?.textColor || "text-gray-600",
            };
          }

          return {
            ...social,
            color: "from-gray-200 to-gray-300",
            textColor: "text-gray-600",
          };
        });

        setFetchedSocials(combinedSocials);
        CacheManager.set(CACHE_KEYS.SOCIAL_MEDIA, combinedSocials);
      }
    } catch (error) {
      console.error("Failed to fetch social media data:", error);
      
      // Try to use stale cache as fallback
      const staleCache = localStorage.getItem(CACHE_KEYS.SOCIAL_MEDIA);
      if (staleCache) {
        try {
          const { data } = JSON.parse(staleCache);
          if (data && mountedRef.current) {
            setFetchedSocials(data);
          }
        } catch (parseError) {
          console.warn('Failed to parse stale socials cache:', parseError);
        }
      }
    }
  }, []);

  // Enhanced settings fetch with professional cache handling
  const fetchSettings = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      setIsLoading(true);
      
      // Check cache first
      const cachedData = CacheManager.get(CACHE_KEYS.FOOTER_SETTINGS);
      if (cachedData) {
        setFooterSettings(cachedData.footer || DEFAULT_FOOTER_SETTINGS);
        setLogo(cachedData.logo2 || "");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/settings/general", { 
        next: { revalidate: 300 }
      });

      if (!res.ok) throw new Error('Settings fetch failed');
      
      const data = await res.json();
      
      if (mountedRef.current) {
        const settings = data?.settings || {};
        
        // Cache the response
        CacheManager.set(CACHE_KEYS.FOOTER_SETTINGS, settings);
        
        const updates = {
          footerSettings: settings.footer || DEFAULT_FOOTER_SETTINGS,
          logo: settings.logo2 || ""
        };
        
        setFooterSettings(updates.footerSettings);
        setLogo(updates.logo);
      }
    } catch (error) {
      console.error("Failed to fetch footer settings:", error);
      
      // Try to use stale cache as fallback
      const staleCache = localStorage.getItem(CACHE_KEYS.FOOTER_SETTINGS);
      if (staleCache) {
        try {
          const { data } = JSON.parse(staleCache);
          if (data && mountedRef.current) {
            setFooterSettings(data.footer || DEFAULT_FOOTER_SETTINGS);
            setLogo(data.logo2 || "");
          }
        } catch (parseError) {
          console.warn('Failed to parse stale settings cache:', parseError);
        }
      }
      
      // Silently fall back to defaults
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Combined data fetch with proper error handling
  const fetchAllData = useCallback(async () => {
    const promises = [
      fetchHomepageData(),
      fetchSocialMedia(),
      fetchSettings()
    ];

    await Promise.allSettled(promises);
    
    if (mountedRef.current) {
      setIsDataLoaded(true);
    }
  }, [fetchHomepageData, fetchSocialMedia, fetchSettings]);

  // Effect with proper cleanup and idle callback optimization
  useEffect(() => {
    mountedRef.current = true;

    // Use requestIdleCallback for non-critical footer data
    const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
    const taskId = scheduleTask(() => {
      fetchAllData();
    }, { timeout: 5000 });

    return () => {
      mountedRef.current = false;
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(taskId);
      } else {
        clearTimeout(taskId);
      }
    };
  }, [fetchAllData]);

  // Handle logo error with callback optimization
  const handleLogoError = useCallback(() => {
    setLogoError(true);
    setLogo("");
  }, []);

  // Optimized skeleton without animations to prevent CLS
  const LogoSkeleton = useMemo(() => (
    <div className="rounded bg-gray-300 dark:bg-gray-600 div-style-15" />

  ), []);

  // Professional logo component with fixed dimensions and error handling
  const LogoComponent = useMemo(() => {
    if (!isDataLoaded) return LogoSkeleton;

    if (logo && !logoError) {
      return (
        <div className="div-style-17">
  <Image
    src={logo}
    alt="Footer Logo"
    fill
    className="object-contain"
    onError={handleLogoError}
    sizes="180px"
    priority
  />
</div>

      );
    }

    // Fallback text logo when no image available
    return (
   <div className="flex flex-col space-y-1 div-style-16">
 <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          FrontSeat
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Built to Sell Cars
        </span>
      </div>
    );
  }, [logo, logoError, isDataLoaded, LogoSkeleton, handleLogoError]);

  // Memoized social links with loading state
  const SocialLinks = useMemo(() => {
    if (!isDataLoaded) {
      return (
        <div className="flex space-x-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-600" 
            />
          ))}
        </div>
      );
    }

    if (fetchedSocials.length === 0) {
      return (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No social media links configured yet.
        </p>
      );
    }

    return (
      <div className="flex flex-wrap items-center gap-2 space-x-3">
        {fetchedSocials.map((platform, index) => {
          const IconComponent =
            platform.iconType === "react-icon"
              ? iconComponentsMap[platform.iconValue]
              : null;

          return (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Follow us on ${platform.iconValue}`}
              className="transform text-xl text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {IconComponent ? (
                <IconComponent className="h-5 w-5" />
              ) : platform.iconType === "svg-code" ? (
                <div
                  className="h-5 w-5"
                  dangerouslySetInnerHTML={{
                    __html: platform.iconValue,
                  }}
                />
              ) : (
                <div className="h-5 w-5 text-gray-500">?</div>
              )}
            </a>
          );
        })}
      </div>
    );
  }, [fetchedSocials, isDataLoaded]);

  // Memoized quick links with loading states
  const QuickLinks = useMemo(() => {
    if (!isDataLoaded) {
      return (
        <ul className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600" />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <ul className="space-y-2">
        <li>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {t("about")}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {t("contact")}
          </Link>
        </li>
        <li>
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {t("terms")}
          </Link>
        </li>
        <li>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {t("privacy")}
          </Link>
        </li>
      </ul>
    );
  }, [t, isDataLoaded]);

  // Memoized trading hours display with loading state
  const TradingHoursDisplay = useMemo(() => {
    if (!isDataLoaded) {
      return (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {tradingHours.map((schedule, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {schedule.day}
            </span>
            <span
              className={`text-sm font-medium ${
                schedule.hours === t("closedHours")
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>
    );
  }, [tradingHours, t, isDataLoaded]);

  return (
    <div className="relative mt-5">
      {/* Optimized SVG Wave */}
      <div className="absolute left-0 top-0 w-full overflow-hidden leading-none">
       <svg
  className="relative block h-12 w-full md:h-16 transform-gpu"
  data-name="Layer 1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1200 120"
  preserveAspectRatio="none"
>
  <path
    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39c-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
    className="fill-gray-50 dark:fill-gray-800"
  />
</svg>
      </div>

      {/* Footer Content with fixed layout to prevent CLS */}
     <footer className="relative rounded-t-3xl bg-gray-200 pb-3 pt-8 shadow-inner dark:bg-gray-800 footer-style-1">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo Column */}
            <div className="space-y-4">
              {LogoComponent}
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-200 ${isLoading ? 'opacity-75' : 'opacity-100'}`}>
                {footerSettings?.col1Heading || t("quickLinks")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-blue-500"></div>
              {QuickLinks}
            </div>

            {/* Trading Hours Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-200 ${isLoading ? 'opacity-75' : 'opacity-100'}`}>
                {footerSettings?.col2Heading || t("tradingHours")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-green-500"></div>
              {TradingHoursDisplay}
            </div>

            {/* Language & Socials Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-200 ${isLoading ? 'opacity-75' : 'opacity-100'}`}>
                {footerSettings?.col3Heading || t("language")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-purple-500"></div>
              <div className="space-y-4">
                <LanguageSwitching />
                <div className="pt-2">
                  <h4 className="mb-3 text-sm font-medium text-black dark:text-gray-300">
                    Follow us:
                  </h4>
                  {SocialLinks}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mb-3 mt-8 border-t border-gray-200 pt-6 dark:border-gray-700 sm:mb-2">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} {t("copyright")} by Sysfoc.
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footerr;