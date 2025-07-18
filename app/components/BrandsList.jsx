"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Car, Truck, Bus, CarFront, CarTaxiFront, TruckIcon as TruckOpen } from "lucide-react"
import { MdOutlineArrowOutward } from "react-icons/md"

// Array of Lucide vehicle icons for random assignment
const vehicleIcons = [Car, Truck, Bus, CarFront, CarTaxiFront, TruckOpen]

const BrandsList = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0) // State for current slide index
  const itemsPerSlide = 12 // 6 top, 6 bottom

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/Vehicle make and model data (2).json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const extractedBrands = data.Sheet1.map((item) => ({
          name: item.Maker.trim(),
          // Assign a truly random icon to each brand
          icon: vehicleIcons[Math.floor(Math.random() * vehicleIcons.length)],
        }))
        setBrands(extractedBrands)
      } catch (error) {
        console.error("Failed to fetch brands:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  const totalSlides = Math.ceil(brands.length / itemsPerSlide)

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
  }

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-slate-600 font-medium">Loading brands...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative mx-4 my-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 px-4 py-12 shadow-lg dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-96 w-96 animate-pulse rounded-full bg-blue-200/15 to-purple-200/15 blur-3xl dark:bg-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute -bottom-32 -left-40 h-80 w-80 animate-pulse rounded-full bg-orange-200/15 to-red-200/15 blur-3xl delay-1000 dark:bg-orange-900/10 dark:to-red-900/10"></div>
      </div>
      <div className="relative mx-auto max-w-7xl translate-y-0 opacity-100 transition-all duration-1000">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
            Browse Cars by Brands
            </h2>
          <div className="flex justify-center">
            <Link href="/brands">
              <div className="transform rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3.5 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-slate-800 hover:to-slate-600 hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200">
                <div className="flex items-center justify-center gap-2">
                  <span>View All Brands</span>
                  <MdOutlineArrowOutward className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-1 group-hover/cta:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="relative px-10">
          {" "}
          {/* Added horizontal padding for buttons */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid w-full flex-shrink-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
                >
                  {brands.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((brand, index) => {
                    const Icon = brand.icon // Use the pre-assigned random icon
                    return (
                      <Link
                        href={`/car-for-sale?make=${encodeURIComponent(brand.name)}`}
                        key={`${brand.name}-${index}`}
                        className="group"
                      >
                        <div
                          className="animate-fade-in-up relative flex flex-col items-center justify-center rounded-xl border border-gray-300 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 p-3 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md dark:bg-gray-700">
                            <Icon className="h-full w-full text-gray-500 dark:text-gray-300" />
                          </div>
                          <h3 className="mt-3 w-full truncate px-1 text-center text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                            {" "}
                            {/* Added truncate and w-full px-1 */}
                            {brand.name}
                          </h3>
                          <div className="mx-auto mt-2 h-1 w-0 rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"></div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-3 text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Previous brands"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-3 text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Next brands"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

export default BrandsList