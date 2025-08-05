import Header from "./Header"

// This is a Server Component
export default async function HeaderWrapper() {
  let logo = ""
  let topSettings = {
    hideDarkMode: false,
    hideFavourite: false,
    hideLogo: false,
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/general`, {
      next: { revalidate: 600 }, // 10 minutes cache
    })
    const data = await response.json()
    if (data.settings?.logo2) {
      logo = data.settings.logo2
    }
    topSettings = {
      ...topSettings,
      ...data.settings?.top,
    }
  } catch (error) {
    console.error("Failed to fetch header settings on server:", error)
  }

  // Pass the fetched data as props to the client component
  return <Header initialLogo={logo} initialTopSettings={topSettings} />
}
