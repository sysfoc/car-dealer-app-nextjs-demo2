import { headers } from "next/headers" // Required for dynamic metadata fetching
import type { Metadata } from "next"
import LeasingCarsDetail from "../../components/LeasingCarsDetail"
import SidebarFilters from "../../components/SidebarFilters"
import { useTranslations } from "next-intl";

// Define the expected shape of the API metadata response
type MetaPageData = {
  metaTitle: string | null
  metaDescription: string | null
}

// Fetch metadata from backend
async function getLeasingMetaData(baseUrl: string): Promise<MetaPageData | null> {
  const res = await fetch(`${baseUrl}/api/meta-pages?type=leasing`, {
    cache: "no-store",
  })
  if (!res.ok) return null
  const result = await res.json()
  return result.data || null
}

// Dynamic metadata generation for Leasing page (Server Component)
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const host = headersList.get("host")
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  const data = await getLeasingMetaData(siteUrl)

  return {
    title: data?.metaTitle ?? "Car Leasing Deals - Auto Car Dealers",
    description: data?.metaDescription ?? "Explore the best car leasing offers and find your next vehicle.",
  }
}

// Server Component Page
export default function Home() {
  const t = useTranslations("carLeasing");
  return (
    <section className="mx-4 my-16 sm:mx-8">
      <div className="relative mt-4 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <div>
            <LeasingCarsDetail />
          </div>
        </div>
      </div>
    </section>
  )
}
