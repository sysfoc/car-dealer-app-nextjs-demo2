export async function fetchHeaderSettings() {
  const DEFAULT_SETTINGS = {
    hideDarkMode: false,
    hideFavourite: false,
    hideLogo: false,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings/general`, {
      next: { revalidate: 600 }, // 10 minutes cache
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      logo: data.settings?.logo2 || "",
      topSettings: {
        ...DEFAULT_SETTINGS,
        ...data.settings?.top,
      }
    };
  } catch (error) {
    console.error("Failed to fetch header settings:", error);
    return {
      logo: "",
      topSettings: DEFAULT_SETTINGS
    };
  }
}