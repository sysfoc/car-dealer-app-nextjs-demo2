"use client"
import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaFacebookSquare, FaPinterest, FaYoutube, FaInstagram } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"
import { SiGiphy } from "react-icons/si"
import LanguageSwitching from "./LanguageSwitching"
import { useTranslations } from "next-intl"

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
      icon: FaFacebookSquare,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600",
    },
    {
      icon: FaTiktok,
      href: "#",
      label: "TikTok",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    { icon: SiGiphy, href: "#", label: "Giphy", color: "hover:text-green-500" },
    {
      icon: FaPinterest,
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
            className="fill-gray-50 dark:fill-gray-800"
          />
        </svg>
      </div>
      <Footer className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
        <div className="mx-auto w-full max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 lg:grid-cols-4">
            {" "}
            {/* Changed py-12 to py-8 */}
            {/* Company Info Section */}
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                <Image
                  // src={isDarkMode ? "/logo-white.png" : "/logo.png"}
                  src={logo || "/placeholder.svg"}
                  alt="Sysfoc Cars Dealer"
                  priority
                  width={200}
                  height={100}
                  className="h-auto w-auto max-w-[200px] object-contain"
                />
              </div>
            </div>
            {/* Quick Links Section */}
            <div className="space-y-6">
              <FooterTitle
                title={footerSettings?.col1Heading || t("quickLinks")}
                className="relative text-lg font-bold text-gray-800 dark:text-gray-200"
              />
              <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <FooterLinkGroup col className="space-y-4">
                <FooterLink
                  href="/about"
                  className="text-sm font-medium text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t("about")}
                </FooterLink>
                <FooterLink
                  href="/contact"
                  className="text-sm font-medium text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t("contact")}
                </FooterLink>
                <FooterLink
                  href="/terms"
                  className="text-sm font-medium text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t("terms")}
                </FooterLink>
                <FooterLink
                  href="/privacy"
                  className="text-sm font-medium text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t("privacy")}
                </FooterLink>
              </FooterLinkGroup>
            </div>
            {/* Trading Hours Section */}
            <div className="space-y-6">
              <FooterTitle
                title={footerSettings?.col2Heading || t("tradingHours")}
                className="text-lg font-bold text-gray-800 dark:text-gray-200"
              />
              <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="space-y-3">
                {tradingHours.map((schedule, index) => (
                  <div key={index} className="group flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
                      {schedule.day}
                    </span>
                    <span
                      className={`text-sm font-bold ${
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
            <div className="space-y-6">
              <FooterTitle
                title={footerSettings?.col3Heading || t("language")}
                className="text-lg font-bold text-gray-800 dark:text-gray-200"
              />
              <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="space-y-6">
                <LanguageSwitching />
              </div>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="border-t border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 dark:border-gray-600 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col space-y-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              {" "}
              {/* Changed py-8 to py-6 */}
              {/* Copyright */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                <FooterCopyright
                  href="https://sysfoc.com"
                  by={t("copyright")}
                  year={2024}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400"
                />
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">All Rights Reserved</span>
                  <span className="text-gray-400">•</span>
                  <a
                    href="/sitemap"
                    className="font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sitemap
                  </a>
                </div>
              </div>
              {/* Social Media Icons */}
              <div className="flex items-center justify-center space-x-6 lg:justify-end">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Follow us:</span>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <FooterIcon
                      key={index}
                      href={social.href}
                      target="_blank"
                      aria-label={social.label}
                      icon={social.icon}
                      className={`text-gray-500 dark:text-gray-400 ${social.color} transform text-xl transition-all duration-300 hover:-translate-y-1 hover:scale-125`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  )
}

export default Footerr