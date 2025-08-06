// For App Router (app/page.js)
async function getHomepageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/homepage`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const result = await response.json();
    return result.searchSection?.mainHeading || "Website for Automotive Dealers Built to Sell Cars";
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return "Website for Automotive Dealers Built to Sell Cars";
  }
}

export default async function HomePage() {
  const headingData = await getHomepageData();
  
  return (
    <>
      <HeroSection initialHeading={headingData} />
    </>
  );
}