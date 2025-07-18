"use client"
import Herosection from "./components/Herosection"
import VehicalsList from "./components/VehicalsList"
import BrandsList from "./components/BrandsList"
import Services from "./components/Services"
import BrowseCars from "./components/BrowseCars"
import Blog from "./components/Blog"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import MainLayout from "./components/MainLayout.jsx"
import { iconComponentsMap, allSocialPlatforms } from "../app/lib/social-icons"

export default function Home() {
  const t = useTranslations("HomePage")
  const [loading, setLoading] = useState(false)
  const [fetchedSocials, setFetchedSocials] = useState([])

  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar")
    return () => {
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const res = await fetch("/api/socials")
        const json = await res.json()
        if (json.data) {
          const combinedSocials = json.data.map((social) => {
            if (social.iconType === "react-icon") {
              const platformDetails = allSocialPlatforms.find((p) => p.name === social.iconValue)
              return {
                ...social,
                color: platformDetails?.color || "from-gray-200 to-gray-300",
                textColor: platformDetails?.textColor || "text-gray-600",
              }
            }
            return {
              ...social,
              color: "from-gray-200 to-gray-300",
              textColor: "text-gray-600",
            }
          })
          setFetchedSocials(combinedSocials)
        }
      } catch (error) {
        console.error("Failed to fetch social media data:", error)
      }
    }
    fetchSocialMedia()
  }, [])

  return (
    <div>
      <MainLayout>
        <Herosection />
      </MainLayout>
      <VehicalsList loadingState={loading} />
      <BrandsList />
      <BrowseCars />
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
              {fetchedSocials.length > 0 ? (
                fetchedSocials.map((platform, index) => {
                  const IconComponent =
                    platform.iconType === "react-icon" ? iconComponentsMap[platform.iconValue] : null

                  return (
                    <Link
                      key={index}
                      href={platform.url}
                      target="_blank"
                      aria-label={`Follow us on ${platform.iconValue}`}
                      className="group relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-gray-50 dark:bg-slate-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-700/80"
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-15 transition-all duration-300`}
                      ></div>
                      {IconComponent ? (
                        <IconComponent
                          className={`w-6 h-6 ${platform.textColor} relative z-10 transition-all duration-300`}
                        />
                      ) : platform.iconType === "svg-code" ? (
                        // Render SVG code directly
                        <div
                          className={`w-6 h-6 ${platform.textColor} relative z-10 transition-all duration-300`}
                          dangerouslySetInnerHTML={{ __html: platform.iconValue }}
                        />
                      ) : (
                        // Fallback for unknown types or errors
                        <div className="w-6 h-6 text-gray-500 relative z-10">?</div>
                      )}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-25 blur-xl transition-all duration-300 -z-10`}
                      ></div>
                    </Link>
                  )
                })
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No social media links configured yet.</p>
              )}
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
  )
}
