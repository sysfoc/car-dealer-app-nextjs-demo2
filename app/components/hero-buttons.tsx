"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

interface HeroButtonsProps {
  exploreVehiclesHref: string
  likedCarsHref: string
}

export default function HeroButtons({ exploreVehiclesHref, likedCarsHref }: HeroButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
      <button
        onClick={() => router.push(exploreVehiclesHref)}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 sm:px-8 sm:py-4"
      >
        <span className="relative mr-3">Explore Our Vehicles</span>
        <ArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </button>

      <button
        onClick={() => router.push(likedCarsHref)}
        className="sm:hidden group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        <span className="relative mr-5">Your Favorite Cars</span>
        <ArrowRight className="relative h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </button>
    </div>
  )
}
