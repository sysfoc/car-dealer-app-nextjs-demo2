"use client";
import React, { useState } from "react";
import {
  Button,
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { FaPencilAlt } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAppSettingsAlt, MdOutlineMailLock } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const DrawerSidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Button
        className="mx-3 mt-3"
        color={"dark"}
        size={"sm"}
        onClick={() => setIsDrawerOpen(true)}
      >
        <RiMenu2Fill fontSize={20} />
      </Button>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-start bg-black/50"
          onClick={handleCloseDrawer}
        >
          <div
            className="w-full max-w-xs bg-white shadow-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="absolute right-3 top-3"
              color={"none"}
              onClick={handleCloseDrawer}
            >
              <IoMdClose fontSize={20} />
            </Button>
            <Sidebar aria-label="Sidebar for the dashboard to control and manage the overall functionailty">
              <SidebarItems>
                <SidebarItemGroup>
                  <SidebarItem href="/admin/dashboard" icon={HiChartPie}>
                    Dashboard
                  </SidebarItem>
                  <SidebarItem href="/admin/manage-users" icon={FaUser}>
                    Manage Users
                  </SidebarItem>
                  <SidebarCollapse icon={FaList} label="Manage Listings">
                    <SidebarItem href="/admin/listing/brand">
                      Listing Brands
                    </SidebarItem>
                    <SidebarItem href="/admin/listing/add">
                      Add Listings
                    </SidebarItem>
                    <SidebarItem href="/admin/listing/view">
                      Listings
                    </SidebarItem>
                    <SidebarItem href="/admin/listing/approved">
                      Pending Listings
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarCollapse icon={FaPencilAlt} label="Manage Blogs">
                    <SidebarItem href="/admin/categories">
                      Categories
                    </SidebarItem>
                    <SidebarItem href="/admin/blog">Blog</SidebarItem>
                    <SidebarItem href="/admin/comments/approved">
                      Approved Comments
                    </SidebarItem>
                    <SidebarItem href="/admin/comments/pending">
                      Pending Comments
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarCollapse icon={TiWorld} label="Manage Website">
                    <SidebarItem href="/admin/manage-website/faq">
                      FAQ
                    </SidebarItem>
                    <SidebarItem href="/admin/manage-website/testimonial">
                      Testimonial
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarCollapse icon={IoSettingsSharp} label="Settings">
                    <SidebarItem href="/admin/setting/general">
                      General Settings
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/currency">
                      Currency
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/social">
                      Social media
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarCollapse icon={MdAppSettingsAlt} label="Page Settings">
                    <SidebarItem href="/admin/setting/page/home">
                      Home
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/page/contact">
                      Contact
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/page/about">
                      About Us
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/page/terms">
                      Terms & Conditions
                    </SidebarItem>
                    <SidebarItem href="/admin/setting/page/privacy">
                      Privacy Policy
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarItem
                    href="/admin/emails/view"
                    icon={MdOutlineMailLock}
                  >
                    Email Templates
                  </SidebarItem>
                </SidebarItemGroup>
              </SidebarItems>
            </Sidebar>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerSidebar;
