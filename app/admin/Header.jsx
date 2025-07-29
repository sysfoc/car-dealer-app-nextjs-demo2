"use client";
import React, { useState, useEffect } from "react";
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

const Header = ({ isDarkMode }) => {
  const { user } = useAuth();
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch("/api/settings/general");
        const data = await response.json();
        if (data.settings?.logo) {
          setLogo(data.settings.logo);
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
    <Navbar
      fluid
      rounded
      className="border-b border-gray-300 dark:border-gray-700 dark:shadow-xl min-h-[80px]"
    >
      <NavbarBrand href="/admin/dashboard">
        <div className="flex items-center gap-0">
          <div className="flex items-center justify-center h-16 w-20 md:h-16 md:w-24 overflow-hidden">
            {loading ? (
              <div className="h-12 w-16 md:h-14 md:w-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />
            ) : (
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <Image
                  src={logo}
                  alt="Sysfoc-cars-dealer"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
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