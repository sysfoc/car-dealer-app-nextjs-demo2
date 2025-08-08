"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Truck,
  Bus,
  CarFront,
  CarTaxiFront,
  Truck as TruckOpen,
} from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";

// Array of Lucide vehicle icons for random assignment
const vehicleIcons = [Car, Truck, Bus, CarFront, CarTaxiFront, TruckOpen];

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brandData, setBrandData] = useState(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(12);
  const containerRef = useRef(null);
  const resizeTimeout = useRef(null);

  // Responsive items per slide configuration
  const getItemsPerSlide = useCallback(() => {
    if (typeof window === 'undefined') return 12;
    
    const width = window.innerWidth;
    if (width < 640) return 4;
    if (width < 768) return 6;
    if (width < 1024) return 9;
    return 12;
  }, []);

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        const newItemsPerSlide = getItemsPerSlide();
        setItemsPerSlide(newItemsPerSlide);
        setCurrentSlide(0);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    
    return () => {
      clearTimeout(resizeTimeout.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [getItemsPerSlide]);

  // Fetch brand data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandSectionRes, brandsRes] = await Promise.all([
          fetch("/api/homepage"),
          fetch("/Vehicle make and model data (2).json")
        ]);
        
        // Process brand section data
        if (brandSectionRes.ok) {
          const result = await brandSectionRes.json();
          setBrandData(result?.brandSection);
        }
        
        // Process brands data
        if (brandsRes.ok) {
          const data = await brandsRes.json();
          
          // Optimized brand processing
          const seenBrands = new Set();
          const extractedBrands = [];
          
          for (const item of data.Sheet1) {
            const brandName = item.Maker.trim();
            if (brandName && !seenBrands.has(brandName)) {
              seenBrands.add(brandName);
              extractedBrands.push({
                name: brandName,
                icon: vehicleIcons[Math.floor(Math.random() * vehicleIcons.length)],
              });
              
              // Limit to first 36 brands for performance
              if (extractedBrands.length >= 36) break;
            }
          }
          
          setBrands(extractedBrands);
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Calculate visible brands
  const visibleBrands = useMemo(() => {
    const start = currentSlide * itemsPerSlide;
    return brands.slice(start, start + itemsPerSlide);
  }, [brands, currentSlide, itemsPerSlide]);

  const totalSlides = useMemo(() => {
    return Math.ceil(brands.length / itemsPerSlide);
  }, [brands.length, itemsPerSlide]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-32 sm:h-64 items-center justify-center">
            <div className="h-8 w-8 sm:h-12 sm:w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (brandData && brandData?.status === 'inactive') {
    return null;
  }

  return (
    <section className="relative mx-2 sm:mx-4 my-4 sm:my-6 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-100 px-2 sm:px-4 py-8 sm:py-12 shadow-lg dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 sm:-right-32 -top-20 sm:-top-40 h-48 w-48 sm:h-96 sm:w-96 animate-pulse rounded-full bg-blue-200/15 to-purple-200/15 blur-3xl dark:bg-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute -bottom-16 sm:-bottom-32 -left-20 sm:-left-40 h-40 w-40 sm:h-80 sm:w-80 animate-pulse rounded-full bg-orange-200/15 to-red-200/15 blur-3xl delay-1000 dark:bg-orange-900/10 dark:to-red-900/10"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-16 text-center px-2">
          <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            {brandData?.heading || "Browse Cars by Brands"}
          </h2>
          <p className="mx-auto mb-4 sm:mb-8 max-w-xl sm:max-w-2xl text-center text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 px-4">
            {brandData?.description}
          </p>
          
          <div className="flex justify-center">
            <Link href="/brands" legacyBehavior>
              <a className="transform rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 sm:px-6 py-2.5 sm:py-3.5 text-center text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-slate-800 hover:to-slate-600 hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200">
                <div className="flex items-center justify-center gap-2">
                  <span>View All Brands</span>
                  <MdOutlineArrowOutward className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover/cta:-translate-y-1 group-hover/cta:translate-x-1" />
                </div>
              </a>
            </Link>
          </div>
        </div>
        
        <div className="relative px-6 sm:px-10" ref={containerRef}>
          <div className="overflow-hidden">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {visibleBrands?.map((brand, index) => {
                const Icon = brand.icon;
                return (
                  <Link
                    href={`/car-for-sale?make=${encodeURIComponent(brand.name)}`}
                    key={`${brand?.name}-${index}`}
                    className="group"
                  >
                    <div
                      className="relative flex flex-col items-center justify-center rounded-lg sm:rounded-xl border border-gray-300 bg-white p-2 sm:p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                    >
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 overflow-hidden rounded-md sm:rounded-lg bg-gray-100 p-2 sm:p-3 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md dark:bg-gray-700">
                        <Icon className="h-full w-full text-gray-500 dark:text-gray-300" />
                      </div>
                      <h3 className="mt-2 sm:mt-3 w-full truncate px-1 text-center text-xs sm:text-sm lg:text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                        {brand?.name}
                      </h3>
                      <div className="mx-auto mt-1 sm:mt-2 h-0.5 sm:h-1 w-0 group-hover:w-8 rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 sm:p-3 text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Previous brands"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 sm:p-3 text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Next brands"
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandsList;