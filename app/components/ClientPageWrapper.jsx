"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ClientPageWrapper({ children }) {
  const t = useTranslations("HomePage");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar");
    return () => {
      document.documentElement.classList.remove("no-scrollbar");
    };
  }, []);

  return <>{children}</>;
}