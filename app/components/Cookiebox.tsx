"use client"
import { getLocalStorage, setLocalStorage } from "../lib/storageHelper"
import { useState, useEffect } from "react"

interface CookieboxProps {
  cookieConsent?: {
    message: string
    buttonText: string
    textColor: string
    bgColor: string
    buttonTextColor: string
    buttonBgColor: string
    status: "active" | "inactive"
  }
}

// Type guard to validate cookie consent object
const isValidCookieConsent = (obj: any): obj is NonNullable<CookieboxProps["cookieConsent"]> => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.message === "string" &&
    typeof obj.buttonText === "string" &&
    typeof obj.textColor === "string" &&
    typeof obj.bgColor === "string" &&
    typeof obj.buttonTextColor === "string" &&
    typeof obj.buttonBgColor === "string" &&
    (obj.status === "active" || obj.status === "inactive")
  )
}

// Validate hex color format
const isValidHexColor = (color: string): boolean => {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

// Sanitize and validate cookie consent settings
const sanitizeCookieConsent = (
  settings: CookieboxProps["cookieConsent"],
): NonNullable<CookieboxProps["cookieConsent"]> => {
  const defaultSettings = {
    message: "We Use Cookies",
    buttonText: "Accept All",
    textColor: "#000000",
    bgColor: "#ffffff",
    buttonTextColor: "#ffffff",
    buttonBgColor: "#000000",
    status: "active" as const,
  }

  // Handle undefined or null settings
  if (!settings || !isValidCookieConsent(settings)) {
    console.warn("Invalid cookie consent settings, using defaults")
    return defaultSettings
  }

  const sanitized = {
    message: settings.message?.trim() || defaultSettings.message,
    buttonText: settings.buttonText?.trim() || defaultSettings.buttonText,
    textColor: isValidHexColor(settings.textColor) ? settings.textColor : defaultSettings.textColor,
    bgColor: isValidHexColor(settings.bgColor) ? settings.bgColor : defaultSettings.bgColor,
    buttonTextColor: isValidHexColor(settings.buttonTextColor)
      ? settings.buttonTextColor
      : defaultSettings.buttonTextColor,
    buttonBgColor: isValidHexColor(settings.buttonBgColor) ? settings.buttonBgColor : defaultSettings.buttonBgColor,
    status: settings.status || defaultSettings.status,
  }

  // Log warnings for invalid colors
  if (settings.textColor && !isValidHexColor(settings.textColor)) {
    console.warn("Invalid textColor format, using default")
  }
  if (settings.bgColor && !isValidHexColor(settings.bgColor)) {
    console.warn("Invalid bgColor format, using default")
  }
  if (settings.buttonTextColor && !isValidHexColor(settings.buttonTextColor)) {
    console.warn("Invalid buttonTextColor format, using default")
  }
  if (settings.buttonBgColor && !isValidHexColor(settings.buttonBgColor)) {
    console.warn("Invalid buttonBgColor format, using default")
  }

  return sanitized
}

const Cookiebox = ({ cookieConsent: propsCookieConsent }: CookieboxProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<NonNullable<CookieboxProps["cookieConsent"]> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchSettings = async (attempt = 0) => {
    const maxRetries = 3
    const retryDelay = 1000 * Math.pow(2, attempt) // Exponential backoff

    try {
      console.log(`Fetching cookie settings (attempt ${attempt + 1}/${maxRetries + 1})...`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      const response = await fetch("/api/settings/general", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format")
      }

      if (data.error) {
        throw new Error(`API Error: ${data.error}`)
      }

      let finalSettings: NonNullable<CookieboxProps["cookieConsent"]>
      if (data.settings && data.settings.cookieConsent) {
        console.log("Cookie settings fetched successfully from API")
        finalSettings = sanitizeCookieConsent(data.settings.cookieConsent)
      } else {
        console.log("No cookie settings found in API response, using props or defaults")
        finalSettings = sanitizeCookieConsent(propsCookieConsent)
      }

      setCookieConsent(finalSettings)
      setFetchError(null)
    } catch (error) {
      console.error(`Failed to fetch cookie settings (attempt ${attempt + 1}):`, error)

      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setFetchError(errorMessage)

      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms...`)
        setRetryCount(attempt + 1)

        setTimeout(() => {
          fetchSettings(attempt + 1)
        }, retryDelay)
      } else {
        console.error("Max retries reached, using fallback settings")
        const fallbackSettings = sanitizeCookieConsent(propsCookieConsent)
        setCookieConsent(fallbackSettings)
      }
    } finally {
      if (attempt === 0 || attempt >= maxRetries) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    // Validate environment
    if (typeof window === "undefined") {
      console.error("Cookiebox: Window object not available")
      setIsLoading(false)
      return
    }

    // Check if required storage helper functions exist
    if (typeof getLocalStorage !== "function" || typeof setLocalStorage !== "function") {
      console.error("Cookiebox: Storage helper functions not available")
      setIsLoading(false)
      return
    }

    fetchSettings()
  }, [propsCookieConsent])

  useEffect(() => {
    if (!isLoading && cookieConsent) {
      const stored = getLocalStorage("cookie_consent", null)
      const isValidStoredConsent = stored === "essential" || stored === "all"

      // Always show if no consent exists AND consent is active
      if (!isValidStoredConsent && cookieConsent.status === "active") {
        console.log("No valid cookie consent found, showing cookie box")
        setIsVisible(true)
      } else if (isValidStoredConsent) {
        console.log(`Valid cookie consent found: ${stored}`)
        setIsVisible(false)
      } else if (cookieConsent.status === "inactive") {
        console.log("Cookie consent is inactive, hiding cookie box")
        setIsVisible(false)
      }
    }
  }, [isLoading, cookieConsent?.status, cookieConsent]) // Add cookieConsent as dependency

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = getLocalStorage("cookie_consent", null)
      if (!stored && cookieConsent?.status === "active") {
        setIsVisible(true)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [cookieConsent])

  const handleConsent = (value: "essential" | "all") => {
    try {
      console.log(`Cookie consent selected: ${value}`)

      // Validate consent value
      if (value !== "essential" && value !== "all") {
        console.error("Invalid consent value provided")
        return
      }

      // Store consent preference
      setLocalStorage("cookie_consent", value)

      // Handle Google Analytics consent
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        const analyticsValue = value === "all" ? "granted" : "denied"
        console.log(`Updating Google Analytics consent: ${analyticsValue}`)

        window.gtag("consent", "update", {
          analytics_storage: analyticsValue,
          ad_storage: analyticsValue,
        })
      }

      setIsVisible(false)

      try {
        window.location.reload()
      } catch (reloadError) {
        console.error("Error reloading page:", reloadError)
      }
    } catch (error) {
      console.error("Error handling consent:", error)
    }
  }

  // Early returns for various states
  if (typeof window === "undefined") {
    return null
  }

  if (isLoading) {
    return null
  }

  if (fetchError && retryCount >= 3) {
    console.error("Failed to load cookie settings after multiple attempts:", fetchError)
    // Continue with fallback settings rather than showing error to user
  }

  if (!isVisible || !cookieConsent || cookieConsent.status === "inactive") {
    return null
  }

  // Additional safety checks before rendering
  if (!cookieConsent.message || !cookieConsent.buttonText) {
    console.warn("Missing required cookie consent text, using defaults")
  }

  return (
    <section className="fixed bottom-3 right-3 z-10 shadow-lg flex">
      <div
        className="w-[350px] rounded-md px-6 py-4"
        style={{
          backgroundColor: cookieConsent.bgColor,
          color: cookieConsent.textColor,
        }}
      >
        <h2 className="text-lg font-bold">{cookieConsent.message || "We Use Cookies"}</h2>
        <p className="mt-2 text-sm opacity-80">
          We use cookies to enhance your experience. You can choose which ones to allow.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: cookieConsent.buttonBgColor,
              color: cookieConsent.buttonTextColor,
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.opacity = "0.8"
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.opacity = "1"
            }}
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={() => handleConsent("all")}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: cookieConsent.buttonBgColor,
              color: cookieConsent.buttonTextColor,
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.opacity = "0.8"
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.opacity = "1"
            }}
          >
            {cookieConsent.buttonText || "Accept All"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cookiebox
