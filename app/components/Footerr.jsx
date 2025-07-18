// "use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Facebook,
  Instagram,
  Youtube,
  InstagramIcon as Tiktok,
  GavelIcon as Giphy,
  PinIcon as Pinterest,
} from "lucide-react" // Replaced react-icons with lucide-react
import LanguageSwitching from "./LanguageSwitching"
import { useTranslations } from "next-intl" // Note: next-intl is not supported in v0 preview

const Footerr = ({ isDarkMode }) => {
  const t = useTranslations("Footer")
  const [footerSettings, setFooterSettings] = useState(null)
  const [logo, setLogo] = useState("/logo.png")
  const [homepageData, setHomepageData] = useState(null)

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" })
        const data = await res.json()
        setHomepageData(data?.data || {})
      } catch (error) {
        console.error("Failed to fetch homepage data:", error)
      }
    }
    fetchHomepageData()
  }, [])

  const tradingHours = [
    {
      day: t("monday"),
      hours: homepageData?.footer?.monday || t("openingHours"),
    },
    {
      day: t("tuesday"),
      hours: homepageData?.footer?.tuesday || t("openingHours"),
    },
    {
      day: t("wednesday"),
      hours: homepageData?.footer?.wednesday || t("openingHours"),
    },
    {
      day: t("thursday"),
      hours: homepageData?.footer?.thursday || t("openingHours"),
    },
    {
      day: t("friday"),
      hours: homepageData?.footer?.friday || t("openingHours"),
    },
    {
      day: t("saturday"),
      hours: homepageData?.footer?.saturday || t("closedHours"),
    },
    { day: t("sunday"), hours: t("closedHours") }, // Sunday is not in your schema, so keep default
  ]

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/general", { cache: "no-store" })
        const data = await res.json()
        setFooterSettings(data?.settings?.footer || {})
      } catch (error) {
        console.error("Failed to fetch footer settings:", error)
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch("/api/settings/general", { cache: "no-store" })
        const data = await res.json()
        setLogo(data?.settings?.logo || "/logo.png")
      } catch (error) {
        console.error("Failed to fetch footer Logo:", error)
      }
    }
    fetchLogo()
  }, [])

  const socialLinks = [
    {
      icon: Facebook, // Lucide icon
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram, // Lucide icon
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Youtube, // Lucide icon
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600",
    },
    {
      icon: Tiktok, // Lucide icon
      href: "#",
      label: "TikTok",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    { icon: Giphy, href: "#", label: "Giphy", color: "hover:text-green-500" }, // Lucide icon
    {
      icon: Pinterest, // Lucide icon
      href: "#",
      label: "Pinterest",
      color: "hover:text-red-500",
    },
  ]

  return (
    <div className="relative mt-5">
      {/* Curved Top Edge */}
      <div className="absolute left-0 top-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-12 w-full md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-gray-50 dark:fill-gray-800" // Adjusted to match new footer background
          />
        </svg>
      </div>
      <footer className="relative bg-gray-50 dark:bg-gray-800 py-8">
        {" "}
        {/* Simplified background, reduced padding */}
        <div className="mx-auto w-full max-w-7xl px-4">
          {" "}
          {/* Reduced horizontal padding */}
          {/* Main Footer Content */}
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info Section */}
            <div className="space-y-4">
              {" "}
              {/* Reduced space-y */}
              <Image
                src={logo || "/placeholder.svg"}
                alt="Sysfoc Cars Dealer"
                priority
                width={180} // Slightly reduced width for minimalism
                height={90} // Adjusted height
                className="h-auto w-auto max-w-[180px] object-contain"
              />
            </div>
            {/* Quick Links Section */}
            <div className="space-y-4">
              {" "}
              {/* Reduced space-y */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col1Heading || t("quickLinks")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-blue-500"></div> {/* Minimalistic divider */}
              <ul className="space-y-2">
                {" "}
                {/* Reduced space-y */}
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("privacy")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Trading Hours Section */}
            <div className="space-y-4">
              {" "}
              {/* Reduced space-y */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col2Heading || t("tradingHours")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-green-500"></div> {/* Minimalistic divider */}
              <div className="space-y-2">
                {" "}
                {/* Reduced space-y */}
                {tradingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    {" "}
                    {/* Reduced vertical padding */}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{schedule.day}</span>
                    <span
                      className={`text-sm font-medium ${
                        schedule.hours === t("closedHours")
                          ? "text-red-500 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Language Section */}
            <div className="space-y-4">
              {" "}
              {/* Reduced space-y */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col3Heading || t("language")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-purple-500"></div> {/* Minimalistic divider */}
              <div className="space-y-4">
                <LanguageSwitching />
              </div>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
            {" "}
            {/* Reduced top margin, padding */}
            <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
              {/* Copyright */}
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  &copy; {2024} {t("copyright")} by Sysfoc. All Rights Reserved.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-gray-400">•</span>
                  <Link
                    href="/sitemap"
                    className="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sitemap
                  </Link>
                </div>
              </div>
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                {" "}
                {/* Reduced space-x */}
                <span className="text-sm text-gray-600 dark:text-gray-400">Follow us:</span>
                <div className="flex items-center space-x-3">
                  {" "}
                  {/* Reduced space-x */}
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      aria-label={social.label}
                      className={`text-gray-500 dark:text-gray-400 ${social.color} transform text-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-110`} // Adjusted hover effect
                      rel="noreferrer" // Adjusted hover effect
                    >
                      <social.icon className="h-5 w-5" /> {/* Adjusted icon size */}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footerr
