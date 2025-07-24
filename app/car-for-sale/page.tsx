
import { headers } from "next/headers" // Required for dynamic metadata fetching
import type { Metadata } from "next"
import SidebarFilters from "../components/SidebarFilters"
import CardetailCard from "../components/CardetailCard"

// Define the expected shape of the API metadata response
type MetaPageData = {
  metaTitle: string | null
  metaDescription: string | null
}

// Function to fetch metadata for the Car For Sale page
async function getCarForSaleMetaData(baseUrl: string): Promise<MetaPageData | null> {
  const res = await fetch(`${baseUrl}/api/meta-pages?type=car-for-sale`, {
    cache: "no-store", // Ensure no caching for this fetch
  })
  if (!res.ok) return null
  const result = await res.json()
  return result.data || null
}

// Dynamic metadata generation for Car For Sale page
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const host = headersList.get("host")
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  const data = await getCarForSaleMetaData(siteUrl)

  return {
    title: data?.metaTitle ?? "Cars For Sale - Auto Car Dealers",
    description: data?.metaDescription ?? "Browse our extensive inventory of cars for sale.",
  }
}

// Server component
export default function CarForSalePage() {
  return (
    <section className="mx-4 my-16 sm:mx-8">
      <div className="relative mt-5 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <CardetailCard />
          <div className="mt-5 flex overflow-x-auto sm:justify-center" />
        </div>
      </div>
    </section>
  )
}
