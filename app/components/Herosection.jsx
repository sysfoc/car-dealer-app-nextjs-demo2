"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useEffect } from "react";

const HeroSection = ({ heading }) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/sysfoc1.webp";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleExploreVehicles = useCallback(() => {
    router.push("/car-for-sale");
  }, [router]);

  const handleLikedCars = useCallback(() => {
    router.push("/liked-cars");
  }, [router]);

  const headingParts = useMemo(() => {
    const words = heading?.split(" ");
    return words.map((word, i) => {
      if (i >= 2 && i <= 3) {
        return (
          <span key={i} className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {word + " "}
          </span>
        );
      }
      return (
        <span key={i} className="text-gray-900 dark:text-white">
          {word + " "}
        </span>
      );
    });
  }, [heading]);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
              <span>Revolutionary Automotive Solutions</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                {headingParts}
              </h1>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                onClick={handleExploreVehicles}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
              >
                <span className="relative mr-3">Explore Our Vehicles</span>
                <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button>

              <button
                onClick={handleLikedCars}
                className="sm:hidden group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
              >
                <span className="relative mr-5">Your Favorite Cars</span>
                <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex items-start lg:pl-8">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/sysfoc1.webp"
                alt="Automotive dealer platform"
                fill
                priority
                fetchPriority="high"
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                placeholder="empty"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;




// "use client";
// import Image from "next/image";
// import { FaArrowRight } from "react-icons/fa";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useDeferredValue, useCallback, useMemo } from "react";

// // Static content to prevent layout shifts - moved outside component
// const FALLBACK_HEADING = "Website for Automotive Dealers Built to Sell Cars";

// // Pre-calculate text parts to prevent recalculation
// const calculateTextParts = (text) => {
//   if (!text) return [{ text: FALLBACK_HEADING, style: 'normal' }];
  
//   const words = text.split(' ');
//   if (words.length <= 2) {
//     return [{ text, style: 'normal' }];
//   }
  
//   const firstTwoWords = words.slice(0, 2).join(' ');
//   const nextTwoWords = words.slice(2, 4).join(' ');
//   const remainingWords = words.slice(4).join(' ');
  
//   const parts = [
//     { text: firstTwoWords + ' ', style: 'normal' },
//     { text: nextTwoWords, style: 'gradient' }
//   ];
  
//   if (remainingWords) {
//     parts.push({ text: ' ' + remainingWords, style: 'normal' });
//   }
  
//   return parts;
// };

// // Pre-calculate responsive text sizes
// const getResponsiveTextSize = (text) => {
//   if (!text) return "text-4xl sm:text-5xl lg:text-6xl";
  
//   const length = text.length;
//   if (length < 40) return "text-5xl sm:text-6xl lg:text-7xl";
//   if (length < 80) return "text-4xl sm:text-5xl lg:text-6xl";
//   return "text-3xl sm:text-4xl lg:text-5xl";
// };

// // Memoized gradient text component
// const GradientText = ({ children }) => (
//   <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
//     {children}
//   </span>
// );

// const HeroSection = () => {
//   const t = useTranslations("HomePage");
//   const router = useRouter();
//   const [headingData, setHeadingData] = useState(FALLBACK_HEADING);
//   const deferredHeading = useDeferredValue(headingData);
  
//   // Memoize expensive calculations
//   const textParts = useMemo(() => calculateTextParts(deferredHeading), [deferredHeading]);
//   const textSizeClass = useMemo(() => getResponsiveTextSize(deferredHeading), [deferredHeading]);
  
//   // Memoize rendered text parts to prevent re-renders
//   const renderedParts = useMemo(() => {
//     return textParts.map((part, index) => {
//       if (part.style === 'gradient') {
//         return <GradientText key={index}>{part.text}</GradientText>;
//       }
//       return <span key={index}>{part.text}</span>;
//     });
//   }, [textParts]);

//   // Optimize API call with better error handling and caching
//   useEffect(() => {
//     let isMounted = true;
    
//     const fetchData = async () => {
//       try {
//         // Use AbortController for cleanup
//         const controller = new AbortController();
        
//         const response = await fetch("/api/homepage", {
//           next: { revalidate: 3600 },
//           signal: controller.signal,
//           // Add performance hints
//           priority: 'low' // This is not critical for initial render
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         // Only update if component is still mounted and data is valid
//         if (isMounted && result.searchSection?.mainHeading && 
//             result.searchSection.mainHeading !== FALLBACK_HEADING) {
//           setHeadingData(result.searchSection.mainHeading);
//         }
        
//         return () => controller.abort();
//       } catch (error) {
//         // Only log if not aborted
//         if (error.name !== 'AbortError') {
//           console.error("Error fetching homepage data:", error);
//         }
//       }
//     };

//     // Use requestIdleCallback to defer API call until browser is idle
//     const scheduleAPICall = () => {
//       if ('requestIdleCallback' in window) {
//         return requestIdleCallback(() => {
//           setTimeout(fetchData, 100); // Small delay to prioritize critical resources
//         }, { timeout: 5000 });
//       } else {
//         return setTimeout(fetchData, 300);
//       }
//     };

//     const taskId = scheduleAPICall();
    
//     return () => {
//       isMounted = false;
//       if ('cancelIdleCallback' in window) {
//         cancelIdleCallback(taskId);
//       } else {
//         clearTimeout(taskId);
//       }
//     };
//   }, []);

//   // Memoize navigation handlers to prevent re-renders
//   const handleExploreVehicles = useCallback(() => {
//     router.push("/car-for-sale");
//   }, [router]);

//   const handleLikedCars = useCallback(() => {
//     router.push("/liked-cars");
//   }, [router]);

//   // Memoize button components
//   const ExploreButton = useMemo(() => (
//     <button
//       onClick={handleExploreVehicles}
//       className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
//     >
//       <span className="relative mr-3">Explore Our Vehicles</span>
//       <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
//     </button>
//   ), [handleExploreVehicles]);

//   const LikedCarsButton = useMemo(() => (
//     <button
//       onClick={handleLikedCars}
//       className="sm:hidden group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
//     >
//       <span className="relative mr-5">Your Favorite Cars</span>
//       <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
//     </button>
//   ), [handleLikedCars]);

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
//       {/* Optimized background effects - use transform instead of positioning for better performance */}
//       <div className="absolute inset-0 opacity-50 will-change-transform">
//         <div 
//           className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-100 to-transparent blur-3xl dark:from-blue-900/20"
//           style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
//         ></div>
//         <div 
//           className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-100 to-transparent blur-3xl dark:from-purple-900/20"
//           style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
//         ></div>
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">
//         <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
//           <div className="space-y-8 lg:pr-8">
//             {/* Status badge */}
//             <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
//               <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
//               <span>Revolutionary Automotive Solutions</span>
//             </div>

//             {/* Main heading with fixed height to prevent CLS */}
//             <div className="space-y-6">
//               <h1 
//                 className={`font-bold leading-tight text-gray-900 dark:text-white ${textSizeClass}`}
//                 style={{ minHeight: '120px' }} // Prevent layout shift
//               >
//                 {renderedParts}
//               </h1>
//             </div>

//             {/* Action buttons */}
//             <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//               {ExploreButton}
//               {LikedCarsButton}
//             </div>
//           </div>

//           {/* Optimized image section */}
//           <div className="relative flex items-start lg:pl-8">
//             <div className="relative w-full">
//               {/* Add explicit dimensions to prevent CLS */}
//               <div style={{ aspectRatio: '4/3', position: 'relative' }}>
//                 <Image
//                   src="/sysfoc1.webp"
//                   alt="Automotive Web Solutions - Professional Dealer Websites"
//                   fill
//                   priority
//                   fetchPriority="high"
//                   className="object-cover rounded-lg"
//                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
//                   // Add performance optimizations
//                   placeholder="blur"
//                   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2Jj0S5sut6tGVLcPNK4pOl7ue4/lQGp4YdCBPdrm0Aayi9h+M5dIeHaZHUknUlOjlGUTvuC7xmMm7w="
//                   // Preload critical resource
//                   onLoad={() => {
//                     // Mark LCP element as loaded
//                     if (typeof window !== 'undefined') {
//                       window.performance?.mark?.('hero-image-loaded');
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;