// "use client"
// import Herosection from "./components/Herosection"
// import VehicalsList from "./components/VehicalsList"
// import BrandsList from "./components/BrandsList"
// import Services from "./components/Services"
// import BrowseCars from "./components/BrowseCars"
// import Blog from "./components/Blog"
// import { useState, useEffect } from "react"
// import { useTranslations } from "next-intl"
// import MainLayout from "./components/MainLayout.jsx"
// export default function Home() {
//   const t = useTranslations("HomePage")
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     document.documentElement.classList.add("no-scrollbar")
//     return () => {
//       document.documentElement.classList.remove("no-scrollbar")
//     }
//   }, [])

//   return (
//     <div>
//       <MainLayout>
//         <Herosection />
//       <BrandsList />
//       </MainLayout>
//       <VehicalsList loadingState={loading} />
//       <BrowseCars />
//       <Services />
//       <Blog />
//     </div>
//   )
// }

// Remove "use client" from here - this should be a server component
import Herosection from "./components/Herosection"
import VehicalsList from "./components/VehicalsList"
import BrandsList from "./components/BrandsList"
import Services from "./components/Services"
import BrowseCars from "./components/BrowseCars"
import Blog from "./components/Blog"
import MainLayout from "./components/MainLayout.jsx"
import ClientPageWrapper from "./components/ClientPageWrapper"

export default async function Home() {
  // Server-side data fetching
  let headingData = "Website for Automotive Dealers Built to Sell Cars"; // fallback
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/homepage`, {
      next: { revalidate: 3600 }, 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.searchSection?.mainHeading) {
        headingData = result.searchSection.mainHeading;
      }
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <div>
      <MainLayout>
        <Herosection headingData={headingData} />
        <BrandsList />
      </MainLayout>
      <ClientPageWrapper>
        <VehicalsList />
        <BrowseCars />
        <Services />
        <Blog />
      </ClientPageWrapper>
    </div>
  )
}
