"use client";
import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaPlay, FaCheck } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-bl from-blue-100/50 to-transparent blur-3xl dark:from-blue-900/20"></div>
        <div className="absolute bottom-0 left-0 h-1/4 w-1/4 rounded-full bg-gradient-to-tr from-purple-100/50 to-transparent blur-3xl dark:from-purple-900/20"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Section - Text Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
              <span>Revolutionary Automotive Solutions</span>
            </div>

            {/* Main Heading */}
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              {/* Request More Info Button */}
              <button
                onClick={() => router.push("/contact")}
                className="group relative inline-flex transform items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative z-10 mr-3">Request More Info</span>
                <FaArrowRight className="relative z-10 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Explore Add-Ons Button */}
              <button
                onClick={() => router.push("/add-ons")}
                className="text-md group relative inline-flex transform items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-indigo-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative z-10 mr-2">Explore Add-Ons</span>
                <FaArrowRight className="relative z-10 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push("/liked-cars")}
                className="text-md sm:hidden group relative inline-flex transform items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-700 via-purple-700 to-pink-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative z-10 mr-2">Your Favorite Cars</span>
                <FaArrowRight className="relative z-10 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  500+
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Dealers Served
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  98%
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  24/7
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Support Available
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative flex items-start lg:pl-8">
            <div className="relative w-full">
              {/* Simple Image Container */}
              <div className="relative z-10">
                {/* Loading State */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  </div>
                )}

                <Image
                  // src="/fsysfoc.png"
                  src="/sysfoc1.png"
                  alt="Automotive Web Solutions - Professional Dealer Websites"
                  width={800}
                  height={600}
                  className={`h-auto w-full object-cover transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-12 w-full text-white dark:text-gray-900"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
