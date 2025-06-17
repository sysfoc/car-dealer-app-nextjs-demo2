import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import LayoutRenderer from "@/app/components/LayoutRenderer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Cookiebox from "@/app/components/Cookiebox";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AuthProvider } from "./context/UserContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Auto Car Dealers",
  description: "Make Deals Of Cars And Any Other Vehical",
};

const getGeneralSettings = async () => {
  try {
     const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}`
        : "http://localhost:3000";
   const res = await fetch(`${baseUrl}/api/settings/general`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch settings: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching general settings:", error);
    return null;
  }
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const settingsData = await getGeneralSettings();
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
  };

  return (
    <html lang={locale}>
      <head>
        <ThemeModeScript />
      </head>

      {settings?.analytics?.status === "active" && (
        <GoogleAnalytics GA_MEASUREMENT_ID={settings.analytics.trackingId} />
      )}

      <body
        className={`transition-all dark:bg-gray-800 dark:text-gray-200 ${poppins.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <LayoutRenderer>
              <NuqsAdapter>
                <CurrencyProvider>
                  {children}
                  <Cookiebox cookieConsent={settings.cookieConsent} />
                </CurrencyProvider>
              </NuqsAdapter>
            </LayoutRenderer>
          </AuthProvider>
        </NextIntlClientProvider>

        <ToastContainer autoClose={3000} />
      </body>
    </html>
  );
}
