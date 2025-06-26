"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPencilAlt, FaList, FaUser } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { HiChartPie } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAppSettingsAlt, MdLogout } from "react-icons/md";
import { ChevronDown, ChevronRight } from "lucide-react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.user.role);
          console.log("User Role from API:", data.user.role);
        } else {
          console.error("Failed to fetch user data");
          const token = Cookies.get("token");
          if (token) {
            const decoded = jwt.decode(token);
            setUserRole(decoded?.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        const token = Cookies.get("token");
        if (token) {
          const decoded = jwt.decode(token);
          setUserRole(decoded?.role);
          console.log("User Role from token fallback:", decoded?.role);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        Cookies.remove("token");
        router.replace("/login");
      } else {
        console.error("Logout failed:", await response.text());
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleGroup = (groupLabel) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
  };

  const sidebarItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: HiChartPie },
  ];

  const collapsibleItems = [
    ...(userRole === "superadmin"
      ? [
          {
            label: "Manage Users",
            icon: FaUser,
            links: [
              { label: "All users", href: "/admin/manage-users" },
              { label: "Create User", href: "/admin/createUser" },
            ],
          },
        ]
      : []),
    {
      label: "Manage Listings",
      icon: FaList,
      links: [
        { label: "Listing Brands", href: "/admin/listing/brand" },
        { label: "Add Listings", href: "/admin/listing/add" },
        { label: "Listings", href: "/admin/listing/view" },
        { label: "Pending Listings", href: "/admin/listing/approved" },
      ],
    },
    {
      label: "Manage Blogs",
      icon: FaPencilAlt,
      links: [{ label: "Blog", href: "/admin/blog" }],
    },
    {
      label: "Manage Website",
      icon: TiWorld,
      links: [
        { label: "FAQ", href: "/admin/manage-website/faq" },
        { label: "Testimonial", href: "/admin/manage-website/testimonial" },
      ],
    },
    {
      label: "Settings",
      icon: IoSettingsSharp,
      links: [
        { label: "General Settings", href: "/admin/setting/general" },
        { label: "Default Settings", href: "/admin/setting/default" },
        { label: "Currency", href: "/admin/setting/currency" },
        { label: "Social Media", href: "/admin/setting/social" },
      ],
    },
    {
      label: "Page Settings",
      icon: MdAppSettingsAlt,
      links: [
        { label: "Home", href: "/admin/setting/page/home" },
        { label: "Contact", href: "/admin/setting/page/contact" },
        { label: "Utility pages", href: "/admin/setting/page/about" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="w-64 h-screen bg-white border-r border-slate-200 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <HiChartPie className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg">Admin Panel</h2>
            <p className="text-xs text-slate-500 capitalize">{userRole || 'Loading...'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-2">
          {/* Single Items */}
          {sidebarItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors duration-200 group"
            >
              <item.icon className="h-5 w-5 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
              <span className="font-medium text-sm">{item.label}</span>
            </a>
          ))}

          {/* Collapsible Groups */}
          {collapsibleItems.map((group) => (
            <div key={group.label} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors duration-200 group"
              >
                <group.icon className="h-5 w-5 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
                <span className="font-medium text-sm flex-1 text-left">{group.label}</span>
                {expandedGroups[group.label] ? (
                  <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" />
                )}
              </button>
              
              {expandedGroups[group.label] && (
                <div className="ml-4 pl-4 border-l border-slate-200 space-y-1">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdLogout className="h-5 w-5" />
          <span className="font-medium text-sm">
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;