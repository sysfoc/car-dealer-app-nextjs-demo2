"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components//Header";
import Footer from "@/app/components/Footerr";
import ScrolltoTop from "@/app/components//ScrolltoTop";
import Cookiebox from "@/app/components/Cookiebox";
import Sidebar from "@/app/admin/AdminSidebar";
import Header from "@/app/admin/Header";
import DrawerSidebar from "@/app/admin/DrawerSidebar";

export default function LayoutRenderer({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/admin");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    checkDarkMode();

    return () => observer.disconnect();
  }, []);

  if (isDashboardRoute) {
    return (
      <main>
        <section>
          <Header isDarkMode={isDarkMode} />
          <div className="flex flex-wrap gap-y-5 md:flex-nowrap">
            <div className="md:hidden">
              <DrawerSidebar />
            </div>
            <div className="hidden min-h-screen md:block">
              <Sidebar />
            </div>
            <div className="w-full overflow-x-scroll bg-slate-100 px-4 dark:bg-gray-700">
              {children}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} />
      {children}
      <ScrolltoTop />
      <Cookiebox />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}
