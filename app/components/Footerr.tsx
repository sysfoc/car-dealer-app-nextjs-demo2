"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import LanguageSwitching from "../components/LanguageSwitching"
import { useTranslations } from "next-intl"
import { iconComponentsMap } from "../lib/social-icons"

// Define props interface for Footerr
interface FooterrProps {
  initialHomepageData: any // Use a more specific type if available
  initialFooterSettings: any // Use a more specific type if available
  initialLogo: string
  initialFetchedSocials: any[] // Use a more specific type if available
}

const Footerr = ({ initialHomepageData, initialFooterSettings, initialLogo, initialFetchedSocials }: FooterrProps) => {
  const t = useTranslations("Footer")
  const [footerSettings, setFooterSettings] = useState(initialFooterSettings) // Initialize with prop
  const [logo, setLogo] = useState(initialLogo) // Initialize with prop
  const [homepageData, setHomepageData] = useState(initialHomepageData) // Initialize with prop
  const [fetchedSocials, setFetchedSocials] = useState(initialFetchedSocials) // Initialize with prop

  // Removed all useEffects for data fetching, as data is now passed via props
  // Removed logoLoading state as logo is directly available

  const tradingHours = [
    {
      day: t("monday"),
      hours: homepageData?.monday || t("openingHours"),
    },
    {
      day: t("tuesday"),
      hours: homepageData?.tuesday || t("openingHours"),
    },
    {
      day: t("wednesday"),
      hours: homepageData?.wednesday || t("openingHours"),
    },
    {
      day: t("thursday"),
      hours: homepageData?.thursday || t("openingHours"),
    },
    {
      day: t("friday"),
      hours: homepageData?.friday || t("openingHours"),
    },
    {
      day: t("saturday"),
      hours: homepageData?.saturday || t("closedHours"),
    },
    { day: t("sunday"), hours: t("closedHours") },
  ]

  return (
    <div className="relative mt-5">
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
      <footer className="relative rounded-t-3xl bg-gray-200 pb-3 pt-8 shadow-inner dark:bg-gray-800">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              {/* Logo is now directly available from props, no loading state needed here */}
              {logo ? (
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Sysfoc Cars Dealer"
                  priority // Retained priority, consider lazy if footer is always below fold [^2][^3]
                  width={180}
                  height={90}
                  className="h-auto w-auto max-w-[180px] object-contain"
                />
              ) : null}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col1Heading || t("quickLinks")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-blue-500"></div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {t("privacy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col2Heading || t("tradingHours")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-green-500"></div>
              <div className="space-y-2">
                {tradingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {footerSettings?.col3Heading || t("language")}
              </h3>
              <div className="mb-2 h-0.5 w-10 rounded-full bg-purple-500"></div>
              <div className="space-y-4">
                <LanguageSwitching />

                <div className="pt-2">
                  <h4 className="mb-3 text-sm font-medium text-black dark:text-gray-300">Follow us:</h4>
                  <div className="flex flex-wrap gap-2 space-x-3">
                    {fetchedSocials.length > 0 ? (
                      fetchedSocials.map((platform: { iconType: string; iconValue: string; url: string }, index) => {
                        const IconComponent =
                          platform.iconType === "react-icon" ? iconComponentsMap[platform.iconValue] : null
                        return (
                          <a
                            key={index}
                            href={platform.url}
                            target="_blank"
                            aria-label={`Follow us on ${platform.iconValue}`}
                            className="text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            rel="noreferrer"
                          >
                            {IconComponent ? (
                              <IconComponent className="h-5 w-5" />
                            ) : platform.iconType === "svg-code" ? (
                              <div className="h-5 w-5" dangerouslySetInnerHTML={{ __html: platform.iconValue }} />
                            ) : (
                              <div className="h-5 w-5 text-gray-500">?</div>
                            )}
                          </a>
                        )
                      })
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">No social media links configured yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-8 border-t border-gray-200 pt-6 sm:mb-2 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  &copy; {2024} {t("copyright")} by Sysfoc. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footerr
