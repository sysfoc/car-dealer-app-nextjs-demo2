"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownHeader,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/UserContext";

// Cache configuration for logo only
const CACHE_DURATION = 5 * 60 * 1000; // 1 hour in milliseconds
const CACHE_KEY = 'header_settings';

// Professional cache utilities
const CacheManager = {
  get: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  },

  set: (key, data) => {
    try {
      if (typeof window === 'undefined') return;
      
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }
};

const Header = () => {
  const { user } = useAuth();
  const [logo, setLogo] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  // Professional logo fetch with cache-first approach
  const fetchLogo = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      setLoading(true);
      
      const cachedData = CacheManager.get(CACHE_KEY);
      if (cachedData) {
        setLogo(cachedData?.settings?.logo2 || "");
        setLoading(false);
        return;
      }

      // If no cache, make API request
      const response = await fetch("/api/settings/general", {
        next: { revalidate: 600 }
      });

      if (!response.ok) {
        throw new Error('Logo fetch failed');
      }

      const data = await response.json();

      if (!mountedRef.current) return;

      const logoUrl = data?.settings?.logo2 || "";
      
      // Cache the logo URL
      CacheManager.set(CACHE_KEY, logoUrl);
      
      setLogo(logoUrl);
      
    } catch (error) {
      console.error("Failed to fetch logo:", error);
      
      // Try to use stale cache as fallback
      const staleCache = localStorage.getItem(CACHE_KEY);
      if (staleCache) {
        try {
          const { data } = JSON.parse(staleCache);
          if (data && mountedRef.current) {
            setLogo(data);
          }
        } catch (parseError) {
          console.warn('Failed to parse stale cache data:', parseError);
        }
      }
      
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    // Use requestIdleCallback for non-critical logo loading
    const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    const taskId = scheduleTask(() => {
      fetchLogo();
    }, { timeout: 3000 });
    
    return () => {
      mountedRef.current = false;
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(taskId);
      } else {
        clearTimeout(taskId);
      }
    };
  }, [fetchLogo]);

  // Handle logo error
  const handleLogoError = useCallback(() => {
    setLogoError(true);
    setLogo("");
  }, []);

  return (
    <Navbar
      fluid
      rounded
      className="min-h-[80px] border-b border-gray-300 dark:border-gray-700 dark:shadow-xl"
    >
      <NavbarBrand href="/admin/dashboard">
        <div className="flex items-center gap-0">
          <div className="flex h-16 w-20 items-center justify-center overflow-hidden md:h-16 md:w-24">
            {loading ? (
              <div className="h-12 w-16 rounded-md bg-gray-200 dark:bg-gray-700 md:h-14 md:w-20" />
            ) : logo && !logoError ? (
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain"
                  onError={handleLogoError}
                  priority
                  sizes="80px"
                />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              FrontSeat
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Built to sell cars
            </span>
          </div>
        </div>
      </NavbarBrand>
      <div className="flex items-center gap-x-5 md:order-2">
        <div className="hidden md:block">
          <Button color="gray" href="/">
            <FiLogOut fontSize={20} className="text-gray-500" />
          </Button>
        </div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user?.profilePicture} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.username}</span>
            <span className="block truncate text-sm font-semibold">
              {user?.email}
            </span>
          </DropdownHeader>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;