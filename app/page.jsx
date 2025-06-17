"use client";
import Herosection from "./components/Herosection";
import VehicalsList from "./components/VehicalsList";
import BrandsList from "./components/BrandsList";
import ChooseUs from "./components/ChooseUs";
import Services from "./components/Services";
import BrowseCars from "./components/BrowseCars";
import Blog from "./components/Blog";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { SiGiphy } from "react-icons/si";
import { FaPinterest } from "react-icons/fa";
import Link from "next/link";
import { useState , useEffect } from "react";
import { useTranslations } from "next-intl";
import WebFeatures from "./components/WebFeatures";
import CustomerTestimonials from "./components/CustomerTestimonials";

export default function Home() {
  const t = useTranslations("HomePage");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('no-scrollbar');
    return () => {
      document.documentElement.classList.remove('no-scrollbar');
    };
  }, []);

  const socialPlatforms = [
    {
      icon: FaFacebookSquare,
      name: "Facebook",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-500/10",
      hoverBgColor: "group-hover:bg-blue-500/20",
      followers: "10K+"
    },
    {
      icon: FaYoutube,
      name: "Youtube",
      color: "from-red-600 to-red-700",
      bgColor: "bg-red-500/10",
      hoverBgColor: "group-hover:bg-red-500/20",
      followers: "25K+"
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-500/10",
      hoverBgColor: "group-hover:bg-pink-500/20",
      followers: "15K+"
    },
    {
      icon: FaXTwitter,
      name: "Twitter",
      color: "from-gray-800 to-black",
      bgColor: "bg-gray-500/10",
      hoverBgColor: "group-hover:bg-gray-500/20",
      followers: "8K+"
    },
    {
      icon: FaTiktok,
      name: "Tiktok",
      color: "from-black to-gray-800",
      bgColor: "bg-gray-500/10",
      hoverBgColor: "group-hover:bg-gray-500/20",
      followers: "20K+"
    },
    {
      icon: SiGiphy,
      name: "Giphy",
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-500/10",
      hoverBgColor: "group-hover:bg-green-500/20",
      followers: "5K+"
    },
    {
      icon: FaPinterest,
      name: "Pinterest",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10",
      hoverBgColor: "group-hover:bg-red-500/20",
      followers: "12K+"
    }
  ];

  return (
    <div>
      <Herosection />
      <WebFeatures />
      <BrandsList />
      <BrowseCars />
      <VehicalsList loadingState={loading} />
      <CustomerTestimonials />
      <Services />
      <Blog />
      
      {/* <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative px-4 py-16 sm:px-8 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-6">
              <div className="inline-block">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-4">
                  <span className="text-purple-200 text-sm font-semibold tracking-wider uppercase">
                    Stay Connected
                  </span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                  {t("followHeading")}
                </span>
              </h2>
              
              <p className="text-xl text-purple-100/80 max-w-3xl mx-auto leading-relaxed">
                {t("followDescription")}
              </p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
              {socialPlatforms.map((platform, index) => (
                <Link
                  key={index}
                  href={"#"}
                  target="_blank"
                  className="group relative backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl p-4 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 text-center"
                >
                  <div className={`absolute inset-0 ${platform.bgColor} ${platform.hoverBgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 space-y-3">
                    <div className="relative mx-auto w-fit">
                      <div className={`w-14 h-14 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                        <platform.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">
                      {platform.name}
                    </h3>
                  </div>

                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${platform.color} p-[1px]`}>
                    <div className="w-full h-full rounded-2xl bg-slate-900"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white dark:fill-gray-900 rotate-180">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section> */}

      
{/* Modern Social Media Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("followHeading")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
              {t("followDescription")}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm border border-gray-200 dark:border-gray-700">
              {socialPlatforms.map((platform, index) => (
                <Link
                  key={index}
                  href="#"
                  target="_blank"
                  className="group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
                  <platform.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white relative z-10 transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Join our community • Stay updated with latest news
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
