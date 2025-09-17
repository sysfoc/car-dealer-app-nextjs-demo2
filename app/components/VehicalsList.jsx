"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useCurrency } from "../context/CurrencyContext";
import { useDistance } from "../context/DistanceContext";
import { FaRegHeart } from "react-icons/fa6";
import { ChevronDown, ChevronUp } from "lucide-react";

// Optimized skeleton with fixed dimensions to prevent CLS
const SimpleSkeleton = ({ className = "", height = "h-4", width = "w-full" }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${height} ${width} ${className}`}></div>
);

// Memoized vehicle card to prevent unnecessary re-renders
const VehicleCard = ({ 
  vehicle, 
  convertedValues, 
  selectedCurrency, 
  currency, 
  userLikedCars, 
  handleLikeToggle,
  isLCP = false 
}) => {
  const isLiked = userLikedCars && Array.isArray(userLikedCars) && userLikedCars.includes(vehicle._id);
  
  return (
    <div className="group transform overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl transition-all duration-500 md:hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="relative aspect-[16/10]">
          <Image
            src={vehicle.imageUrls?.[0]}
            fill
            alt={`${vehicle.make} ${vehicle.model}`}
            className="object-cover transition-all duration-700 md:group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority={isLCP}
            loading={isLCP ? "eager" : "lazy"}
            fetchPriority={isLCP ? "high" : "auto"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"></div>
          
          {/* Status badges with fixed positioning to prevent CLS */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 min-h-[2rem]">
            {vehicle.sold ? (
              <div className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                  SOLD
                </div>
              </div>
            ) : (
              <div className="rounded-full bg-emerald-900 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                  AVAILABLE
                </div>
              </div>
            )}
            {!vehicle.sold && vehicle.tag && vehicle.tag !== "default" && (
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                  {vehicle.tag.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Like button with fixed positioning */}
          <div className="absolute right-4 top-4 flex translate-x-4 transform gap-2 opacity-0 transition-all duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100 sm:opacity-100 sm:translate-x-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLikeToggle(vehicle._id);
              }}
              aria-label={isLiked ? "Unlike Car" : "Like Car"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-lg backdrop-blur-md transition-all duration-200 md:hover:scale-110 hover:bg-white hover:shadow-xl"
            >
              {isLiked ? (
                <FaHeart className="h-4 w-4 text-red-500" />
              ) : (
                <FaRegHeart className="h-4 w-4 hover:text-red-500" />
              )}
            </button>
          </div>
          
          {/* Price badge with fixed positioning */}
          <div className="absolute bottom-4 right-4 min-w-[120px] rounded-2xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md dark:bg-slate-800/95">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                From
              </p>
              <p className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-slate-300">
                {selectedCurrency?.symbol}{" "}
                {Math.round(
                  (vehicle?.price * (selectedCurrency?.value || 1)) /
                    (currency?.value || 1),
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4 min-h-[4rem]">
          <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors duration-300 md:group-hover:text-blue-600 dark:text-white dark:md:group-hover:text-blue-400 line-clamp-1">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {vehicle?.description?.slice(0, 80)}...
          </p>
        </div>
        
        {/* Fixed height specs section to prevent CLS */}
        <div className="mb-6 space-y-3 min-h-[9rem]">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
              <IoSpeedometer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-slate-600 dark:text-slate-400">
              Mileage:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {convertedValues.kms}{" "}
              {convertedValues.unit?.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
              <GiGasPump className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-slate-600 dark:text-slate-400">
              Fuel Type:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {vehicle?.fuelType}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30">
              <TbManualGearbox className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-slate-600 dark:text-slate-400">
              Transmission:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {vehicle?.gearbox}
            </span>
          </div>
        </div>
        
        <Link
          href={`/car-detail/${vehicle.slug || vehicle._id}`}
          className="group/cta block w-full"
        >
          <div className="transform rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3.5 text-center font-semibold text-white shadow-lg transition-all duration-300 md:hover:scale-[1.02] hover:from-slate-800 hover:to-slate-600 hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200">
            <div className="flex items-center justify-center gap-2">
              <span>View Details</span>
              <MdOutlineArrowOutward className="h-4 w-4 transition-transform duration-300 md:group-hover/cta:-translate-y-1 md:group-hover/cta:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const VehicalsList = ({ loadingState }) => {
  const t = useTranslations("HomePage");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, selectedCurrency } = useCurrency();
  const { distance: defaultUnit, loading: distanceLoading } = useDistance();
  const [userLikedCars, setUserLikedCars] = useState([]);
  const [user, setUser] = useState(null);
  const [visibleVehiclesCount, setVisibleVehiclesCount] = useState(3);
  const [listingData, setListingData] = useState({
    heading: "Featured Vehicles",
    status: "active"
  });

  // Enhanced cache with better key management
  const [apiCache, setApiCache] = useState(new Map());

  // Memoized conversion functions
  const convertKmToMiles = useCallback((km) => {
    const numericKm = Number.parseFloat(km);
    return isNaN(numericKm) ? km : (numericKm * 0.621371).toFixed(1);
  }, []);
  
  const convertMilesToKm = useCallback((miles) => {
    const numericMiles = Number.parseFloat(miles);
    return isNaN(numericMiles) ? miles : (numericMiles * 1.60934).toFixed(1);
  }, []);

  // Optimized conversion with memoization
  const getConvertedValues = useCallback((vehicle) => {
    if (distanceLoading || !defaultUnit || !vehicle.unit) {
      return {
        kms: vehicle.kms,
        mileage: vehicle.mileage,
        unit: vehicle.unit || defaultUnit,
      };
    }

    if (vehicle.unit === defaultUnit) {
      return {
        kms: vehicle.kms,
        mileage: vehicle.mileage,
        unit: vehicle.unit,
      };
    }

    let convertedKms = vehicle.kms;
    let convertedMileage = vehicle.mileage;
    if (vehicle.unit === "km" && defaultUnit === "miles") {
      convertedKms = convertKmToMiles(vehicle.kms);
      convertedMileage = convertKmToMiles(vehicle.mileage);
    } else if (vehicle.unit === "miles" && defaultUnit === "km") {
      convertedKms = convertMilesToKm(vehicle.kms);
      convertedMileage = convertMilesToKm(vehicle.mileage);
    }
    
    return {
      kms: convertedKms,
      mileage: convertedMileage,
      unit: defaultUnit,
    };
  }, [defaultUnit, distanceLoading, convertKmToMiles, convertMilesToKm]);

  // Optimized API fetch with better error handling and abort controllers
  const fetchWithCache = useCallback(async (url, cacheKey, cacheTime = 180000) => {
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      return cached.data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: Math.floor(cacheTime / 1000) }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setApiCache(prev => new Map(prev).set(cacheKey, {
        data,
        timestamp: Date.now()
      }));
      
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }, [apiCache]);

  const fetchListingData = useCallback(async () => {
    try {
      const result = await fetchWithCache("/api/homepage", 'homepage-listing', 300000);
      setListingData(result?.listingSection || listingData);
    } catch (error) {
      console.error("Error fetching listing data:", error);
      // Keep fallback data
    }
  }, [fetchWithCache, listingData]);

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await fetchWithCache("/api/cars", 'vehicles-list', 180000);
      const filteredCars = data.cars.filter(
        (car) => car.status === 1 || car.status === "1",
      );
      setVehicles(filteredCars);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [fetchWithCache]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/users/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setUserLikedCars(
          Array.isArray(data.user?.likedCars) ? data.user.likedCars : [],
        );
      }
    } catch (error) {
      // Silent fail for user data
      return;
    }
  }, []);

  const handleLikeToggle = useCallback(async (carId) => {
    try {
      const response = await fetch("/api/users/liked-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserLikedCars(Array.isArray(data.likedCars) ? data.likedCars : []);
        setUser((prev) => ({
          ...prev,
          likedCars: data.likedCars,
        }));
      }
    } catch (error) {
      console.error("Error updating liked cars:", error);
    }
  }, []);

  const handleToggleVisibility = useCallback(() => {
    if (visibleVehiclesCount >= vehicles.length) {
      setVisibleVehiclesCount(3);
    } else {
      setVisibleVehiclesCount((prevCount) =>
        Math.min(prevCount + 3, vehicles.length),
      );
    }
  }, [visibleVehiclesCount, vehicles.length]);

  // Optimized useEffect with proper cleanup
  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      if (!mounted) return;
      
      // Load critical data first
      await fetchVehicles();
      
      if (!mounted) return;
      
      // Load non-critical data after a delay
      setTimeout(() => {
        if (mounted) {
          fetchListingData();
          fetchUserData();
        }
      }, 100);
    };

    loadData();
    
    return () => {
      mounted = false;
    };
  }, [fetchVehicles, fetchListingData, fetchUserData]);

  // Memoized visible vehicles to prevent recalculation
  const visibleVehicles = useMemo(() => 
    vehicles.slice(0, visibleVehiclesCount),
    [vehicles, visibleVehiclesCount]
  );

  // Early returns for error and inactive states
  if (error) {
    return (
      <div className="mx-4 my-10 sm:mx-8 md:my-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
              <span className="text-sm text-white">!</span>
            </div>
            <span className="font-medium">Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (listingData?.status === 'inactive') {
    return null;
  }

  return (
    <section className="my-7 rounded-xl bg-slate-50 py-7 dark:bg-slate-900 sm:mx-4 md:my-0 md:py-0">
      {/* Header section with fixed min-height to prevent CLS */}
      <div className="min-h-[320px] flex flex-col justify-center">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <BiTachometer className="h-4 w-4" />
            <span>Premium Collection</span>
          </div>
          <h2 className="mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:via-slate-100 dark:to-slate-300 md:text-5xl lg:text-6xl">
            {listingData?.heading}
          </h2>
          <Link href={"/car-for-sale"}>
            <div className="group inline-flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-slate-800 hover:to-slate-600 hover:shadow-2xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200 md:hover:scale-105">
              <span>{t("viewAll")}</span>
              <MdOutlineArrowOutward className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Grid with fixed aspect ratios to prevent CLS */}
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-8 md:grid-cols-3 lg:gap-8">
        {loading
          ? Array(3)
              .fill()
              .map((_, index) => (
                <div
                  className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
                  key={index}
                >
                  <div className="relative">
                    <SimpleSkeleton className="w-full" height="h-64" />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="space-y-3">
                      <SimpleSkeleton height="h-7" />
                      <SimpleSkeleton height="h-4" width="w-3/4" />
                    </div>
                    <div className="space-y-3 min-h-[9rem]">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <SimpleSkeleton className="rounded-xl" height="h-8" width="w-8" />
                          <SimpleSkeleton height="h-4" width="w-20" />
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                      <SimpleSkeleton height="h-8" width="w-24" />
                      <SimpleSkeleton height="h-10" className="mt-3" />
                    </div>
                  </div>
                </div>
              ))
          : visibleVehicles.map((vehicle, index) => {
              const convertedValues = getConvertedValues(vehicle);
              return (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  convertedValues={convertedValues}
                  selectedCurrency={selectedCurrency}
                  currency={currency}
                  userLikedCars={userLikedCars}
                  handleLikeToggle={handleLikeToggle}
                  isLCP={index === 0} // First image gets LCP optimization
                />
              );
            })}
      </div>
      
      {/* Show more/less button */}
      {!loading && vehicles.length > 3 && (
        <div className="mt-10 text-center">
          <button
            onClick={handleToggleVisibility}
            className="group inline-flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 md:hover:scale-105 hover:from-slate-800 hover:to-slate-600 hover:shadow-2xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200"
          >
            <span>
              {visibleVehiclesCount >= vehicles.length
                ? "Show less"
                : "Show more"}
            </span>
            {visibleVehiclesCount >= vehicles.length ? (
              <ChevronUp className="h-5 w-5 transition-transform duration-300 md:group-hover:-translate-y-1" />
            ) : (
              <ChevronDown className="h-5 w-5 transition-transform duration-300 md:group-hover:translate-y-1" />
            )}
          </button>
        </div>
      )}
      
      {/* Empty state with fixed dimensions */}
      {vehicles.length === 0 && !loading && (
        <div className="py-20 text-center min-h-[400px] flex flex-col justify-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-slate-50 shadow-inner dark:bg-slate-800">
            <svg
              className="h-16 w-16 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            No Vehicles Available
          </h3>
          <p className="mx-auto max-w-md text-lg text-slate-600 dark:text-slate-400">
            Our premium collection is currently being updated. Please check back
            soon for the latest additions.
          </p>
        </div>
      )}
    </section>
  );
};

export default VehicalsList;