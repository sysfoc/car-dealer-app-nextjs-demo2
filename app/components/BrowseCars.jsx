"use client"
import { useState, useEffect } from "react"
import { Car, CarFront, Truck, BatteryCharging, Wrench } from "lucide-react"

const getInitialVisibleCount = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) {
      return 3
    } else {
      return 6
    }
  }
  return 6
}

const BrowseCars = () => {
  const allItems = [
    { category: "Automatic Cars", icon: <Car />, count: 245, popular: true },
    { category: "Family Cars", icon: <CarFront />, count: 189, popular: true },
    { category: "Sports Cars", icon: <Car />, count: 78, popular: false },
    { category: "Electric Cars", icon: <BatteryCharging />, count: 156, popular: true },
    { category: "5 Seaters", icon: <Truck />, count: 234, popular: false },
    { category: "Small Cars", icon: <Car />, count: 167, popular: false },
    { category: "Classic Cars", icon: <Truck />, count: 45, popular: false },
    { category: "AWD/4WD", icon: <Truck />, count: 123, popular: false },
    { category: "SUV", icon: <Car />, count: 198, popular: true },
    { category: "Commercial", icon: <Car />, count: 89, popular: false },
    { category: "5 Doors", icon: <Car />, count: 201, popular: false },
    { category: "Low Priced Cars", icon: <Car />, count: 178, popular: true },
    { category: "Low Mileage Cars", icon: <CarFront />, count: 134, popular: false },
    { category: "Hybrid Cars", icon: <Car />, count: 92, popular: false },
    { category: "Diesel Cars", icon: <Car />, count: 145, popular: false },
    { category: "7 Seaters", icon: <Truck />, count: 87, popular: false },
    { category: "Modified Cars", icon: <Wrench />, count: 34, popular: false },
    { category: "Vintage Models", icon: <Car />, count: 23, popular: false },
  ]

  const [filteredItems, setFilteredItems] = useState(allItems)
  const [isLoading, setIsLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3)
      } else {
        setVisibleCount(6)
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])
  
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setFilteredItems(allItems)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const CategoryCard = ({ item, index }) => (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800">
      {item.popular && (
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
      )}
      
      <div className="flex items-center space-x-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <div className="text-xl text-blue-600 dark:text-blue-400">
            {item.icon}
          </div>
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {item.category}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {item.count} available
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="mx-4 my-6 rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Car Categories
          </h3>
          <p className="mx-auto max-w-lg text-sm text-gray-600 dark:text-gray-400">
            Find the perfect vehicle from our curated collection
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span>Loading categories...</span>
              </span>
            ) : (
              `${filteredItems.length} categories available`
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems
              .slice(0, visibleCount)
              .map((item, index) => (
                <CategoryCard 
                  key={`${item.category}-${index}`} 
                  item={item} 
                  index={index} 
                />
              ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <Car className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                No categories found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                There are no car categories to display.
              </p>
            </div>
          )}
        </div>

        {filteredItems.length > getInitialVisibleCount() && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (visibleCount >= filteredItems.length) {
                  setVisibleCount(getInitialVisibleCount())
                } else {
                  setVisibleCount((prev) => prev + 6)
                }
              }}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {visibleCount >= filteredItems.length ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BrowseCars