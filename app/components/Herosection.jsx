"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const FALLBACK_HEADING = "Website for Automotive Dealers Built to Sell Cars";

const HeroSection = ({ headingData = FALLBACK_HEADING }) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const splitHeadingAfterTwoWords = (text) => {
    if (!text) return [{ text: FALLBACK_HEADING, style: 'normal' }];
    
    const words = text.split(' ');
    if (words.length <= 2) {
      return [{ text, style: 'normal' }];
    }
    
    const firstTwoWords = words.slice(0, 2).join(' ');
    const nextTwoWords = words.slice(2, 4).join(' ');
    const remainingWords = words.slice(4).join(' ');
    
    const parts = [
      { text: firstTwoWords + ' ', style: 'normal' },
      { text: nextTwoWords, style: 'gradient' }
    ];
    
    if (remainingWords) {
      parts.push({ text: ' ' + remainingWords, style: 'normal' });
    }
    
    return parts;
  };

  const renderStyledParts = (parts) => {
    return parts.map((part, index) => {
      switch (part.style) {
        case 'gradient':
          return (
            <span key={index} className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {part.text}
            </span>
          );
        default:
          return <span key={index}>{part.text}</span>;
      }
    });
  };

  const getResponsiveTextSize = (text) => {
    if (!text) return "text-4xl sm:text-5xl lg:text-6xl";
    
    const length = text.length;
    if (length < 40) return "text-5xl sm:text-6xl lg:text-7xl";
    if (length < 80) return "text-4xl sm:text-5xl lg:text-6xl";
    return "text-3xl sm:text-4xl lg:text-5xl";
  };

  // Process data immediately - no loading states needed
  const parts = splitHeadingAfterTwoWords(headingData);
  const textSizeClass = getResponsiveTextSize(headingData);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Simplified background effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-100 to-transparent blur-3xl dark:from-blue-900/20"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-100 to-transparent blur-3xl dark:from-purple-900/20"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
              <span>Revolutionary Automotive Solutions</span>
            </div>

            <div className="space-y-6">
              <h1 className={`font-bold leading-tight text-gray-900 dark:text-white ${textSizeClass}`}>
                {renderStyledParts(parts)}
              </h1>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                onClick={() => router.push("/car-for-sale")}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
              >
                <span className="relative mr-3">Explore Our Vehicles</span>
                <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button>
              
              <button
                onClick={() => router.push("/liked-cars")}
                className="sm:hidden group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
              >
                <span className="relative mr-5">Your Favorite Cars</span>
                <FaArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex items-start lg:pl-8">
            <div className="relative w-full">
              <Image
                src="/sysfoc1_on.webp"
                alt="Automotive Web Solutions - Professional Dealer Websites"
                width={800}
                height={600}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;