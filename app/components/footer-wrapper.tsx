import Footerr from "./Footerr"
import { allSocialPlatforms } from "../lib/social-icons" // Ensure this path is correct

// Define a type for the social platform objects fetched from the API
interface FetchedSocialPlatform {
  iconType: string
  iconValue: string
  url: string
  // Add other properties if they are consistently returned by your /api/socials endpoint
  // e.g., name?: string; displayName?: string;
}

// This is a Server Component
export default async function FooterWrapper() {
  let homepageData = null
  let footerSettings = null
  let logo = ""
  let fetchedSocials: (FetchedSocialPlatform & { color?: string; textColor?: string })[] = [] // Explicitly type fetchedSocials

  try {
    // Fetch homepage data
    const homepageRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/homepage`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    const homepageJson = await homepageRes.json()
    homepageData = homepageJson?.footer || null

    // Fetch general settings for logo and footer settings
    const settingsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/general`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    const settingsJson = await settingsRes.json()
    footerSettings = settingsJson?.settings?.footer || {}
    logo = settingsJson?.settings?.logo2 || ""

    // Fetch social media data
    const socialsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socials`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    const socialsJson = await socialsRes.json()
    if (socialsJson.data) {
      fetchedSocials = socialsJson.data.map((social: FetchedSocialPlatform) => {
        // Explicitly type 'social' here
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
    }
  } catch (error) {
    console.error("Failed to fetch footer data on server:", error)
  }

  // Pass the fetched data as props to the client component
  return (
    <Footerr
      initialHomepageData={homepageData}
      initialFooterSettings={footerSettings}
      initialLogo={logo}
      initialFetchedSocials={fetchedSocials}
    />
  )
}
