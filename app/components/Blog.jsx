// Blog.jsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

const BlogSkeleton = ({ isLarge = false }) => (
  <div className={`backdrop-blur-md bg-white/70 dark:bg-white/10 border border-gray-200/50 dark:border-white/20 rounded-3xl overflow-hidden ${isLarge ? 'h-96' : 'h-64'}`}>
    <div className={`bg-gray-200 dark:bg-gray-700 ${isLarge ? 'h-72 md:h-80' : 'h-40'} w-full`}></div>
    <div className="p-6 space-y-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
)

const Blog = () => {
  const t = useTranslations("HomePage")
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          next: { revalidate: 300 } // 5 minutes cache
        })
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()
        setBlogs(data.blogs || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs")
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== "undefined") {
      window.requestIdleCallback(fetchBlogs);
    }
  }, [])

  if (error) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-850"></div>
        <div className="relative px-4 py-12 sm:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="backdrop-blur-md bg-red-50/70 dark:bg-red-950/20 border border-red-200/50 dark:border-red-500/20 rounded-3xl p-6">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Blogs</h3>
              <p className="text-red-500 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-850"></div>
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 dark:bg-gray-700/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-gray-800/5 rounded-full blur-3xl"></div>

      <div className="relative px-4 py-12 sm:px-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-block">
                  <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 rounded-full px-6 py-2">
                    <span className="text-blue-600 dark:text-blue-200 text-sm font-semibold tracking-wider uppercase">
                      Latest Updates
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                    {t("blogHeading")}
                  </span>
                </h2>
              </div>
              <Link href={"/blogs"} className="group" prefetch={false}>
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 md:hover:from-blue-600 md:hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 md:hover:scale-105 md:hover:shadow-xl">
                  <span>{t("viewAll")}</span>
                  <ArrowUpRight className="transition-transform duration-300 md:group-hover:translate-x-1 md:group-hover:-translate-y-1" />
                </div>
              </Link>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlogSkeleton isLarge={true} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <BlogSkeleton key={i} />
                ))}
              </div>
            </div>
          )}

          {!loading && blogs.length >= 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 border border-gray-200/50 dark:border-white/20 rounded-3xl overflow-hidden transition-all duration-500 md:hover:scale-105 md:hover:shadow-2xl md:hover:shadow-blue-500/10 dark:md:hover:shadow-blue-500/25">
                <div className="relative z-10">
                  <div className="relative overflow-hidden">
                    <Link href={`/blog/${blogs[0].slug}`} prefetch={false}>
                      <div className="relative h-72 md:h-80">
                        <Image
                          src={blogs[0].image || "/sydney.jpg"}
                          alt={blogs[0].title || "Featured blog post"}
                          fill
                          className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Featured
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link href={`/blog/${blogs[0].slug}`} className="group/title" prefetch={false}>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white md:group-hover/title:text-blue-600 dark:md:group-hover/title:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {blogs[0].slug}
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.slice(1, 5).map((blog, index) => (
                  <div
                    key={`${blog.slug}-${index}`}
                    className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 border border-gray-200/50 dark:border-white/20 rounded-2xl overflow-hidden transition-all duration-500 md:hover:scale-105 md:hover:shadow-xl md:hover:shadow-blue-500/10 dark:md:hover:shadow-blue-500/25"
                  >
                    <div className="relative z-10">
                      <div className="relative overflow-hidden">
                        <Link href={`/blog/${blog.slug}`} prefetch={false}>
                          <div className="relative h-40">
                            <Image
                              src={blog.image || "/sydney.jpg"}
                              alt={blog.slug}
                              fill
                              className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                          </div>
                        </Link>
                      </div>
                      <div className="p-4 space-y-2">
                        <Link href={`/blog/${blog.slug}`} className="group/title" prefetch={false}>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white md:group-hover/title:text-blue-600 dark:md:group-hover/title:text-blue-400 transition-colors duration-300 line-clamp-2">
                            {blog.slug}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-16">
              <div className="backdrop-blur-md bg-white/70 dark:bg-white/10 border border-gray-200/50 dark:border-white/20 rounded-3xl p-10 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Blogs Available</h3>
                <p className="text-gray-600 dark:text-blue-100/80 text-lg">
                  We are working on bringing you fresh content. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog