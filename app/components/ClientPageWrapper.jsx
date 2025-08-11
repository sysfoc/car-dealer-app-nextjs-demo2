"use client";
import { useState, useEffect } from "react";

export default function ClientPageWrapper({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar");
    return () => {
      document.documentElement.classList.remove("no-scrollbar");
    };
  }, []);

  return <>{children}</>;
}