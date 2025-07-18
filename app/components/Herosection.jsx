"use client";
import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaPlay, FaCheck } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// Precomputed blur placeholder (small base64 version of your image)
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YyZjJmMiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4ODgiPkxvYWRpbmc8L3RleHQ+PC9zdmc+";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-bl from-blue-100/50 to-transparent blur-3xl dark:from-blue-900/20"></div>
        <div className="absolute bottom-0 left-0 h-1/4 w-1/4 rounded-full bg-gradient-to-tr from-purple-100/50 to-transparent blur-3xl dark:from-purple-900/20"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Section - Text Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
              <span>Revolutionary Automotive Solutions</span>
            </div>

            {/* Main Heading - Optimized text rendering */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Website for{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Automotive Dealers
                </span>{" "}
                Built to{" "}
                <span className="relative">
                  <span className="relative z-10">Sell Cars</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-3 -skew-x-12 transform bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-400/30 dark:to-yellow-500/30"></div>
                </span>
              </h1>
            </div>

            {/* CTA Buttons - Optimized button sizes */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              {/* <button
                onClick={() => router.push("/contact")}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
              >
                <span className="relative z-10 mr-3">Request More Info</span>
                <FaArrowRight className="relative z-10 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button> */}

              <button
                onClick={() => router.push("/car-for-sale")}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
              >
                <span className="relative z-10 mr-3">Explore Our Vehicles</span>
                <FaArrowRight className="relative z-10 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button>
              
              <button
                onClick={() => router.push("/liked-cars")}
                className="sm:hidden group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
              >
                <span className="relative z-10 mr-2">Your Favorite Cars</span>
                <FaArrowRight className="relative z-10 h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Section - Image with critical optimizations */}
          <div className="relative flex items-start lg:pl-8">
            <div className="relative w-full">
              <Image
                src="/sysfoc1.webp" // Changed to WebP format
                alt="Automotive Web Solutions - Professional Dealer Websites"
                width={800}
                height={600}
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider - Optimized SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-12 w-full text-white dark:text-gray-900"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;