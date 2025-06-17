// "use client";
// import React, { useState, useEffect } from "react";
// import { FaLongArrowAltUp } from "react-icons/fa";

// const ScrolltoTop = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const toggleVisibility = () => {
//     if (window.scrollY > 300) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", toggleVisibility);
//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   return (
//     <div>
//       {isVisible && (
//         <div
//           className="group fixed bottom-8 right-5 w-fit cursor-pointer rounded-full bg-red-500 shadow-lg"
//           onClick={scrollToTop}
//           style={{ zIndex: 99 }}
//         >
//           <div className="flex items-center gap-3 p-5">
//             <FaLongArrowAltUp fontSize={25} color="white" />
//             <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-white transition-all duration-300 ease-in-out group-hover:max-w-xs">
//               Scroll to top
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScrolltoTop;
"use client";
import React, { useState, useEffect } from "react";
import { FaLongArrowAltUp, FaChevronUp, FaArrowUp } from "react-icons/fa";

const ScrolltoTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    
    setScrollProgress(progress);
    
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          className="group fixed bottom-8 right-8 cursor-pointer z-50 transform transition-all duration-300 hover:scale-110"
          onClick={scrollToTop}
        >
          {/* Main Button Container */}
          <div className="relative">
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              {/* Background Circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
              />
              {/* Progress Circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20">
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <FaChevronUp className="w-6 h-6 text-white relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>

            {/* Expandable Text Label */}
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 group-hover:translate-x-0 translate-x-4">
              <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700/50 whitespace-nowrap">
                <span className="text-sm font-medium">Back to Top</span>
                {/* Arrow pointer */}
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-l-gray-900/90 border-y-4 border-y-transparent"></div>
                </div>
              </div>
            </div>

            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrolltoTop;