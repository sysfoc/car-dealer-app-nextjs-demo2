// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import LanguageSwitching from "./LanguageSwitching";
// import { useTranslations } from "next-intl";
// import { iconComponentsMap, allSocialPlatforms } from "../lib/social-icons";

// const Footerr = () => {
//   const t = useTranslations("Footer");

//   const [footerSettings, setFooterSettings] = useState(null);
//   const [logo, setLogo] = useState("");
//   const [logoLoading, setLogoLoading] = useState(true);
//   const [homepageData, setHomepageData] = useState(null);
//   const [fetchedSocials, setFetchedSocials] = useState([]);

//   useEffect(() => {
//     const fetchHomepageData = async () => {
//       try {
//         const res = await fetch("/api/homepage",{next: { revalidate: 60 }});
//         const data = await res.json();
//         setHomepageData(data?.footer);
//       } catch (error) {
//         console.error("Failed to fetch homepage data:", error);
//       }
//     };

//     fetchHomepageData();
//   }, []);

//   useEffect(() => {
//     const fetchSocialMedia = async () => {
//       try {
//         const res = await fetch("/api/socials");
//         const json = await res.json();

//         if (json.data) {
//           const combinedSocials = json.data.map((social) => {
//             if (social.iconType === "react-icon") {
//               const platformDetails = allSocialPlatforms.find(
//                 (p) => p.name === social.iconValue,
//               );
//               return {
//                 ...social,
//                 color: platformDetails?.color || "from-gray-200 to-gray-300",
//                 textColor: platformDetails?.textColor || "text-gray-600",
//               };
//             }

//             return {
//               ...social,
//               color: "from-gray-200 to-gray-300",
//               textColor: "text-gray-600",
//             };
//           });

//           setFetchedSocials(combinedSocials);
//         }
//       } catch (error) {
//         console.error("Failed to fetch social media data:", error);
//       }
//     };

//     fetchSocialMedia();
//   }, []);

//   const tradingHours = [
//     { day: t("monday"), hours: homepageData?.monday || t("openingHours") },
//     { day: t("tuesday"), hours: homepageData?.tuesday || t("openingHours") },
//     {
//       day: t("wednesday"),
//       hours: homepageData?.wednesday || t("openingHours"),
//     },
//     { day: t("thursday"), hours: homepageData?.thursday || t("openingHours") },
//     { day: t("friday"), hours: homepageData?.friday || t("openingHours") },
//     { day: t("saturday"), hours: homepageData?.saturday || t("closedHours") },
//     { day: t("sunday"), hours: t("closedHours") },
//   ];

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await fetch("/api/settings/general", { cache: "no-store" });
//         const data = await res.json();
//         setFooterSettings(data?.settings?.footer || {});
//       } catch (error) {
//         console.error("Failed to fetch footer settings:", error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   useEffect(() => {
//     const fetchLogo = async () => {
//       try {
//         setLogoLoading(true);
//         const res = await fetch("/api/settings/general", { cache: "no-store" });
//         const data = await res.json();
//         setLogo(data?.settings?.logo2);
//       } catch (error) {
//         console.error("Failed to fetch footer Logo:", error);
//       } finally {
//         setLogoLoading(false);
//       }
//     };

//     fetchLogo();
//   }, []);

//   return (
//     <div className="relative mt-5">
//       {/* Top SVG Wave */}
//       <div className="absolute left-0 top-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block h-12 w-full md:h-16"
//           data-name="Layer 1"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19
//             c-82.26-17.34-168.06-16.33-250.45.39
//             -57.84,11.73-114,31.07-172,41.86
//             A600.21,600.21,0,0,1,0,27.35V120H1200V95.8
//             C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
//             className="fill-gray-50 dark:fill-gray-800"
//           />
//         </svg>
//       </div>

//       {/* Footer Content */}
//       <footer className="relative rounded-t-3xl bg-gray-200 pb-3 pt-8 shadow-inner dark:bg-gray-800">
//         <div className="mx-auto w-full max-w-7xl px-4">
//           <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
//             {/* Logo */}
//             <div className="space-y-4">
//               {logoLoading ? (
//                 <div className="h-[90px] w-[180px] animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
//               ) : logo ? (
//                 <Image
//                   src={logo}
//                   alt="Sysfoc Cars Dealer"
//                   priority
//                   width={180}
//                   height={90}
//                   className="h-auto w-auto max-w-[180px] object-contain"
//                 />
//               ) : null}
//             </div>

//             {/* Quick Links */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {footerSettings?.col1Heading || t("quickLinks")}
//               </h3>
//               <div className="mb-2 h-0.5 w-10 rounded-full bg-blue-500"></div>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/about"
//                     className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
//                   >
//                     {t("about")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/contact"
//                     className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
//                   >
//                     {t("contact")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/terms"
//                     className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
//                   >
//                     {t("terms")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/privacy"
//                     className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
//                   >
//                     {t("privacy")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Trading Hours */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {footerSettings?.col2Heading || t("tradingHours")}
//               </h3>
//               <div className="mb-2 h-0.5 w-10 rounded-full bg-green-500"></div>
//               <div className="space-y-2">
//                 {tradingHours.map((schedule, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between py-1"
//                   >
//                     <span className="text-sm text-gray-700 dark:text-gray-300">
//                       {schedule.day}
//                     </span>
//                     <span
//                       className={`text-sm font-medium ${
//                         schedule.hours === t("closedHours")
//                           ? "text-red-500 dark:text-red-400"
//                           : "text-green-600 dark:text-green-400"
//                       }`}
//                     >
//                       {schedule.hours}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Language & Socials */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {footerSettings?.col3Heading || t("language")}
//               </h3>
//               <div className="mb-2 h-0.5 w-10 rounded-full bg-purple-500"></div>
//               <div className="space-y-4">
//                 <LanguageSwitching />
//                 <div className="pt-2">
//                   <h4 className="mb-3 text-sm font-medium text-black dark:text-gray-300">
//                     Follow us:
//                   </h4>
//                   <div className="flex flex-wrap items-center gap-2 space-x-3">
//                     {fetchedSocials.length > 0 ? (
//                       fetchedSocials.map((platform, index) => {
//                         const IconComponent =
//                           platform.iconType === "react-icon"
//                             ? iconComponentsMap[platform.iconValue]
//                             : null;

//                         return (
//                           <a
//                             key={index}
//                             href={platform.url}
//                             target="_blank"
//                             rel="noreferrer"
//                             aria-label={`Follow us on ${platform.iconValue}`}
//                             className="transform text-xl text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                           >
//                             {IconComponent ? (
//                               <IconComponent className="h-5 w-5" />
//                             ) : platform.iconType === "svg-code" ? (
//                               <div
//                                 className="h-5 w-5"
//                                 dangerouslySetInnerHTML={{
//                                   __html: platform.iconValue,
//                                 }}
//                               />
//                             ) : (
//                               <div className="h-5 w-5 text-gray-500">?</div>
//                             )}
//                           </a>
//                         );
//                       })
//                     ) : (
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         No social media links configured yet.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mb-3 mt-8 border-t border-gray-200 pt-6 dark:border-gray-700 sm:mb-2">
//             <div className="flex flex-col items-center justify-center space-y-2 text-center">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 &copy; {new Date().getFullYear()} {t("copyright")} by Sysfoc.
//                 All Rights Reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footerr;




"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import LanguageSwitching from "./LanguageSwitching";
import { useTranslations } from "next-intl";
import { iconComponentsMap, allSocialPlatforms } from "../lib/social-icons";

// Cache management for footer data
class FooterDataCache {
  constructor() {
    this.homepageCache = null;
    this.settingsCache = null;
    this.socialsCache = null;
    this.timestamp = 0;
    this.duration = 300000; // 5 minutes for footer data
  }

  isValid() {
    return Date.now() - this.timestamp < this.duration;
  }

  setData(type, data) {
    this[`${type}Cache`] = data;
    this.timestamp = Date.now();
  }

  getData(type) {
    return this[`${type}Cache`];
  }
}

const footerCache = new FooterDataCache();

const Footerr = () => {
  const t = useTranslations("Footer");
  const mountedRef = useRef(true);

  const [footerSettings, setFooterSettings] = useState(null);
  const [logo, setLogo] = useState("");
  const [logoLoading, setLogoLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [homepageData, setHomepageData] = useState(null);
  const [fetchedSocials, setFetchedSocials] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Memoize trading hours to prevent recalculation
  const tradingHours = useMemo(() => [
    { day: t("monday"), hours: homepageData?.monday || t("openingHours") },
    { day: t("tuesday"), hours: homepageData?.tuesday || t("openingHours") },
    { day: t("wednesday"), hours: homepageData?.wednesday || t("openingHours") },
    { day: t("thursday"), hours: homepageData?.thursday || t("openingHours") },
    { day: t("friday"), hours: homepageData?.friday || t("openingHours") },
    { day: t("saturday"), hours: homepageData?.saturday || t("closedHours") },
    { day: t("sunday"), hours: t("closedHours") },
  ], [homepageData, t]);

  // Optimized homepage data fetch
  const fetchHomepageData = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      // Check cache first
      if (footerCache.isValid() && footerCache.getData('homepage')) {
        setHomepageData(footerCache.getData('homepage'));
        return;
      }

      const res = await fetch("/api/homepage", { 
        next: { revalidate: 300 }, // 5 minutes
        priority: 'low' // Non-critical
      });

      if (!res.ok) throw new Error('Homepage fetch failed');
      
      const data = await res.json();
      const footerData = data?.footer;
      
      if (mountedRef.current) {
        setHomepageData(footerData);
        footerCache.setData('homepage', footerData);
      }
    } catch (error) {
      console.error("Failed to fetch homepage data:", error);
    }
  }, []);

  // Optimized social media fetch with memoization
  const fetchSocialMedia = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      // Check cache first
      if (footerCache.isValid() && footerCache.getData('socials')) {
        setFetchedSocials(footerCache.getData('socials'));
        return;
      }

      const res = await fetch("/api/socials", {
        priority: 'low'
      });

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
        footerCache.setData('socials', combinedSocials);
      }
    } catch (error) {
      console.error("Failed to fetch social media data:", error);
    }
  }, []);

  // Optimized settings fetch
  const fetchSettings = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      // Check cache first
      if (footerCache.isValid() && footerCache.getData('settings')) {
        const cachedSettings = footerCache.getData('settings');
        setFooterSettings(cachedSettings.footer || {});
        setLogo(cachedSettings.logo2 || "");
        setLogoLoading(false);
        return;
      }

      setLogoLoading(true);
      const res = await fetch("/api/settings/general", { 
        cache: "no-store",
        priority: 'low'
      });

      if (!res.ok) throw new Error('Settings fetch failed');
      
      const data = await res.json();
      
      if (mountedRef.current) {
        const settings = data?.settings || {};
        setFooterSettings(settings.footer || {});
        setLogo(settings.logo2 || "");
        footerCache.setData('settings', settings);
      }
    } catch (error) {
      console.error("Failed to fetch footer settings:", error);
    } finally {
      if (mountedRef.current) {
        setLogoLoading(false);
      }
    }
  }, []);

  // Combined data fetch with proper sequencing
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

  // Effect with proper cleanup and idle callback
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

  // Handle logo error
  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, []);

  // Memoized logo component with fixed dimensions
  const LogoComponent = useMemo(() => {
    if (logoLoading) {
      return (
        <div 
          className="animate-pulse rounded bg-gray-300 dark:bg-gray-600" 
          style={{ height: '90px', width: '180px' }}
        />
      );
    }

    if (logo && !logoError) {
      return (
        <div style={{ height: '90px', width: '180px', position: 'relative' }}>
          <Image
            src={logo}
            alt="Sysfoc Cars Dealer"
            fill
            className="object-contain"
            onError={handleLogoError}
            sizes="180px"
            priority={false}
            fetchPriority="high"
            loading="lazy"
          />
        </div>
      );
    }

    return null;
  }, [logo, logoLoading, logoError, handleLogoError]);

  // Memoized social links
  const SocialLinks = useMemo(() => {
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
  }, [fetchedSocials]);

  // Memoized quick links
  const QuickLinks = useMemo(() => (
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
  ), [t]);

  // Memoized trading hours display
  const TradingHoursDisplay = useMemo(() => (
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
  ), [tradingHours, t]);

  return (
    <div className="relative mt-5">
      {/* Optimized SVG Wave with reduced complexity */}
      <div className="absolute left-0 top-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-12 w-full md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39c-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-gray-50 dark:fill-gray-800"
          />
        </svg>
      </div>

      {/* Footer Content with fixed layout to prevent CLS */}
      <footer 
        className="relative rounded-t-3xl bg-gray-200 pb-3 pt-8 shadow-inner dark:bg-gray-800"
        style={{ minHeight: '400px' }} // Prevent layout shift
      >
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo Column */}
            <div className="space-y-4">
              {LogoComponent}
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col1Heading || t("quickLinks")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-blue-500"></div>
              {QuickLinks}
            </div>

            {/* Trading Hours Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col2Heading || t("tradingHours")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-green-500"></div>
              {TradingHoursDisplay}
            </div>

            {/* Language & Socials Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
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