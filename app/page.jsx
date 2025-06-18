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
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import WebFeatures from "./components/WebFeatures";

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
      textColor: "text-blue-600",
      followers: "10K+"
    },
    {
      icon: FaYoutube,
      name: "Youtube",
      color: "from-red-600 to-red-700",
      textColor: "text-red-600",
      followers: "25K+"
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      color: "from-pink-500 to-purple-600",
      textColor: "text-pink-500",
      followers: "15K+"
    },
    {
      icon: FaXTwitter,
      name: "Twitter",
      color: "from-gray-800 to-black",
      textColor: "text-black dark:text-white",
      followers: "8K+"
    },
    {
      icon: FaTiktok,
      name: "Tiktok",
      color: "from-black to-gray-800",
      textColor: "text-black dark:text-white",
      followers: "20K+"
    },
    {
      icon: SiGiphy,
      name: "Giphy",
      color: "from-green-500 to-teal-600",
      textColor: "text-green-500",
      followers: "5K+"
    },
    {
      icon: FaPinterest,
      name: "Pinterest",
      color: "from-red-500 to-red-600",
      textColor: "text-red-500",
      followers: "12K+"
    }
  ];

  return (
    <div>
      <Herosection />
      {/* <WebFeatures /> */}
      <BrowseCars />
      <BrandsList />
      <VehicalsList loadingState={loading} />
      <Services />
      <Blog />
      <section className="bg-gray-50 dark:bg-slate-950 py-16 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-3 tracking-tight">
              {t("followHeading")}
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-base leading-relaxed max-w-lg mx-auto font-medium">
              {t("followDescription")}
            </p>
          </div>

          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-800/50 backdrop-blur-sm">
              {socialPlatforms.map((platform, index) => (
                <Link
                  key={index}
                  href="#"
                  target="_blank"
                  className="group relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-gray-50 dark:bg-slate-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-700/80"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-15 transition-all duration-300`}></div>
                  <platform.icon className={`w-6 h-6 ${platform.textColor} relative z-10 transition-all duration-300`} />
                  
                  {/* Subtle glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-25 blur-xl transition-all duration-300 -z-10`}></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-slate-500 font-medium">
              Join our community • Stay updated with latest news
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
