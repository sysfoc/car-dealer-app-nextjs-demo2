import Herosection from "./components/Herosection"
import VehicalsList from "./components/VehicalsList"
import BrandsList from "./components/BrandsList"
import Services from "./components/Services"
import BrowseCars from "./components/BrowseCars"
import Blog from "./components/Blog"
// import Link from "next/link"
// import { useState, useEffect } from "react"
// import { useTranslations } from "next-intl"
// import MainLayout from "./components/MainLayout.jsx"
// import { iconComponentsMap, allSocialPlatforms } from "../app/lib/social-icons"

export default function Home() {

  return (
    <div>
     <ScrollHandler>
      <Herosection />
      <SearchCallToAction /> {/* Render the client component here */}
      <VehicalsList />
      <BrandsList />
      <BrowseCars />
      <Services />
      <Blog />
    </ScrollHandler>
    </div>
  )
}
