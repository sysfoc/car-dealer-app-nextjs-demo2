import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ThemeModeScript } from "flowbite-react" // Assuming this is a client-side script
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ToastContainer } from "react-toastify" // Client Component
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"
// import LayoutRenderer from "./components/LayoutRenderer" // Removed: Client component wrapping server components
import Cookiebox from "./components/Cookiebox" // Client Component
import GoogleAnalytics from "./components/GoogleAnalytics" // Assuming client-side script
import GoogleRecaptcha from "./components/GoogleRecaptcha" // Assuming client-side script
import { CurrencyProvider } from "./context/CurrencyContext" // Client Provider
import { AuthProvider } from "./context/UserContext" // Client Provider
import { SidebarProvider } from "./context/SidebarContext" // Client Provider
import { DistanceProvider } from "./context/DistanceContext" // Client Provider
import { Suspense } from "react"

import HeaderWrapper from "./components/header-wrapper"
import FooterWrapper from "./components/footer-wrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const getGeneralSettings = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}` : "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/settings/general`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      console.error(`Failed to fetch settings: ${res.status}`)
      return null
    }
    return await res.json()
  } catch (error) {
    console.error("Error fetching general settings:", error)
    return null
  }
}

const getHomepageSettings = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}` : "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/homepage`, {
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      console.error(`Failed to fetch homepage settings: ${res.status}`)
      return null
    }
    return await res.json()
  } catch (error) {
    console.error("Error fetching homepage settings:", error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomepageSettings()
  return {
    title: homepageData?.seoTitle || "Auto Car Dealers",
    description: homepageData?.seoDescription || "Make Deals Of Cars And Any Other Vehical",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  const settingsData = await getGeneralSettings()
  const settings = settingsData?.settings || {
    logo: "",
    favicon: "",
    top: {
      hideDarkMode: false,
      hideFavourite: false,
      hideLogo: false,
    },
    footer: {
      col1Heading: "",
      col2Heading: "",
      col3Heading: "",
    },
    recaptcha: {
      siteKey: "",
      status: "inactive",
    },
    analytics: {
      trackingId: "",
      status: "inactive",
    },
    cookieConsent: {
      message: "",
      buttonText: "ACCEPT",
      textColor: "#000000",
      bgColor: "#ffffff",
      buttonTextColor: "#ffffff",
      buttonBgColor: "#000000",
      status: "inactive",
    },
    themeColor: {
      darkModeBg: "#000000",
      darkModeText: "#ffffff",
    },
  }

  return (
    <html lang={locale}>
      <body className={`transition-all dark:bg-gray-800 dark:text-gray-200 ${poppins.className}`}>
        <SidebarProvider>
          <ThemeModeScript />
          <GoogleAnalytics />
          <GoogleRecaptcha />
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              {/* Render HeaderWrapper (Server Component) directly */}
              <HeaderWrapper />
              <main className="flex-grow">
                {" "}
                {/* Added flex-grow for layout */}
                <Suspense fallback={null}>
                  <NuqsAdapter>
                    <CurrencyProvider>
                      <DistanceProvider>{children}</DistanceProvider>
                      <Cookiebox cookieConsent={settings.cookieConsent} />
                    </CurrencyProvider>
                  </NuqsAdapter>
                </Suspense>
              </main>
              {/* Render FooterWrapper (Server Component) directly */}
              <FooterWrapper />
            </AuthProvider>
          </NextIntlClientProvider>
          <ToastContainer autoClose={3000} />
        </SidebarProvider>
      </body>
    </html>
  )
}
