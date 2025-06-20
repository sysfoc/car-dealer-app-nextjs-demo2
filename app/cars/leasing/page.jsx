"use client";
import { Pagination } from "flowbite-react";
import LeasingCarsDetail from "@/app/components/LeasingCarsDetail";
import SidebarFilters from "@/app/components/SidebarFilters";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("carLeasing");
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  return (
    <section className="mx-4 my-16 sm:mx-8">
      <div className="relative mt-4 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <div>
            <LeasingCarsDetail />
          </div>
        </div>
      </div>
    </section>
  );
}
