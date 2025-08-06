"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useDeferredValue,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const FALLBACK_HEADING = "Website for Automotive Dealers Built to Sell Cars";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_KEY = "homepage_data";

// Cache utilities
const CacheManager = {
  get: (key) => {
    try {
      if (typeof window === "undefined") return null;

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
      console.warn("Cache retrieval failed:", error);
      return null;
    }
  },

  set: (key, data) => {
    try {
      if (typeof window === "undefined") return;

      const cacheData = {
        data,
        timestamp: Date.now(),
      };

      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn("Cache storage failed:", error);
    }
  },

  clear: (key) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Cache clear failed:", error);
    }
  },
};

// Axios instance with caching configuration
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600", // 1 hour cache
  },
});

// Add request interceptor for cache checking
apiClient.interceptors.request.use((config) => {
  const cachedData = CacheManager.get(CACHE_KEY);
  if (cachedData && config.url?.includes("/api/homepage")) {
    // Return cached data as a resolved promise
    config.adapter = () =>
      Promise.resolve({
        data: cachedData,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        request: {},
      });
  }
  return config;
});

// Add response interceptor for caching
apiClient.interceptors.response.use(
  (response) => {
    // Cache successful API responses
    if (
      response.config.url?.includes("/api/homepage") &&
      response.status === 200
    ) {
      CacheManager.set(CACHE_KEY, response.data);
    }
    return response;
  },
  (error) => {
    console.error("API request failed:", error.message);
    return Promise.reject(error);
  },
);

const calculateTextParts = (text) => {
  if (!text) return [{ text: FALLBACK_HEADING, style: "normal" }];

  const words = text.split(" ");
  if (words.length <= 2) {
    return [{ text, style: "normal" }];
  }

  const firstTwoWords = words.slice(0, 2).join(" ");
  const nextTwoWords = words.slice(2, 4).join(" ");
  const remainingWords = words.slice(4).join(" ");

  const parts = [
    { text: firstTwoWords + " ", style: "normal" },
    { text: nextTwoWords, style: "gradient" },
  ];

  if (remainingWords) {
    parts.push({ text: " " + remainingWords, style: "normal" });
  }

  return parts;
};

const getResponsiveTextSize = (text) => {
  if (!text) return "text-4xl sm:text-5xl lg:text-6xl";

  const length = text.length;
  if (length < 40) return "text-5xl sm:text-6xl lg:text-7xl";
  if (length < 80) return "text-4xl sm:text-5xl lg:text-6xl";
  return "text-3xl sm:text-4xl lg:text-5xl";
};

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
    {children}
  </span>
);

const HeroSection = () => {
  const router = useRouter();
  const [headingData, setHeadingData] = useState(FALLBACK_HEADING);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageCached, setImageCached] = useState(false);

  const deferredHeading = useDeferredValue(headingData);

  const textParts = useMemo(
    () => calculateTextParts(deferredHeading),
    [deferredHeading],
  );
  const textSizeClass = useMemo(
    () => getResponsiveTextSize(deferredHeading),
    [deferredHeading],
  );

  const renderedParts = useMemo(() => {
    return textParts.map((part, index) => {
      if (part.style === "gradient") {
        return <GradientText key={index}>{part.text}</GradientText>;
      }
      return <span key={index}>{part.text}</span>;
    });
  }, [textParts]);

  // Enhanced data fetching with proper error handling and caching
  const fetchHomepageData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      const cachedData = CacheManager.get(CACHE_KEY);
      if (cachedData?.searchSection?.mainHeading) {
        setHeadingData(cachedData.searchSection.mainHeading);
        setIsLoading(false);
        return;
      }

      const response = await apiClient.get("/api/homepage", {
        params: {
          timestamp: Date.now(), // Prevent browser caching conflicts
        },
      });

      if (
        response.data?.searchSection?.mainHeading &&
        response.data.searchSection.mainHeading !== FALLBACK_HEADING
      ) {
        setHeadingData(response.data.searchSection.mainHeading);
      }
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      setError(error.message);

      // Try to use stale cache data as fallback
      const staleCache = localStorage.getItem(CACHE_KEY);
      if (staleCache) {
        try {
          const { data } = JSON.parse(staleCache);
          if (data?.searchSection?.mainHeading) {
            setHeadingData(data.searchSection.mainHeading);
          }
        } catch (parseError) {
          console.warn("Failed to parse stale cache data:", parseError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Image caching and optimization utilities
  const preloadAndCacheImage = useCallback(async (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();

      img.onload = () => {
        setImageCached(true);
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.crossOrigin = "anonymous";
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const initializeData = async () => {
      if (!isMounted) return;

      // Use requestIdleCallback for better performance
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        requestIdleCallback(
          () => {
            if (isMounted) {
              timeoutId = setTimeout(() => fetchHomepageData(), 150);
            }
          },
          { timeout: 5000 },
        );
      } else {
        timeoutId = setTimeout(() => fetchHomepageData(), 300);
      }
    };

    initializeData();

    // Preload hero image for better caching
    if (typeof window !== "undefined") {
      preloadAndCacheImage("/sysfoc1.webp").catch(console.warn);
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fetchHomepageData, preloadAndCacheImage]);

  const handleExploreVehicles = useCallback(() => {
    router.push("/car-for-sale");
  }, [router]);

  const handleLikedCars = useCallback(() => {
    router.push("/liked-cars");
  }, [router]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    if (typeof window !== "undefined") {
      window.performance?.mark?.("hero-image-loaded");
      // Trigger preloading for better caching
      preloadAndCacheImage("/sysfoc1.webp").catch(console.warn);
    }
  }, [preloadAndCacheImage]);

  const ExploreButton = useMemo(
    () => (
      <button
        onClick={handleExploreVehicles}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 py-3 sm:py-4 h-12 sm:h-14"
        aria-label="Explore our vehicle inventory"
      >
        <span className="relative mr-3">Explore Our Vehicles</span>
        <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </button>
    ),
    [handleExploreVehicles],
  );

  const LikedCarsButton = useMemo(
    () => (
      <button
        onClick={handleLikedCars}
        className="group relative inline-flex items-center py-3 sm:py-4 h-12 sm:h-14 justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 sm:hidden"
        aria-label="View your favorite cars"
      >
        <span className="relative mr-5">Your Favorite Cars</span>
        <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </button>
    ),
    [handleLikedCars],
  );

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
      aria-label="Hero section"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 opacity-50 will-change-transform">
        <div
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-100 to-transparent blur-3xl dark:from-blue-900/20"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-100 to-transparent blur-3xl dark:from-purple-900/20"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-10 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              <span>Revolutionary Automotive Solutions</span>
            </div>

            <div className="space-y-6">
              <h1
                className={`font-bold leading-tight text-gray-900 transition-opacity duration-300 dark:text-white ${textSizeClass} ${isLoading ? "opacity-75" : "opacity-100"}`}
                style={{ minHeight: "120px" }}
              >
                {renderedParts}
              </h1>

              {error && (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  Notice: Using cached content due to connectivity issues
                </p>
              )}
            </div>

           <div className="flex flex-col gap-4 pt-4 min-h-[120px] sm:min-h-[60px] sm:flex-row">
              {ExploreButton}
              {LikedCarsButton}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:pl-8">
            <div className="relative mx-auto w-full max-w-2xl">
              {/* Professional image container with proper aspect ratio and containment */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  aspectRatio: "16/10",
                  maxHeight: "500px",
                  contain: "layout style paint",
                }}
              >
                {/* Loading placeholder with professional styling */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></div>
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optimized image with professional rendering */}
                <Image
                  src="/sysfoc1.png"
                  alt="Automotive Web Solutions - Professional Dealer Websites"
                  fill
                  priority
                  fetchPriority="high"
                  className={`
                    object-cover 
                    transition-all duration-500 ease-out
                    ${imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"}
                  `}
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 600px"
                  onLoad={handleImageLoad}
                  quality={90}
                  style={{
                    objectPosition: "center center",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Professional overlay gradient for better text contrast if needed */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
