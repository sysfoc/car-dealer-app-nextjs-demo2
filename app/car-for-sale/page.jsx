"use client";
import SidebarFilters from "../components/SidebarFilters"
import CardetailCard from "../components/CardetailCard";
import { Pagination } from "flowbite-react";
export default function Home() {
  return (
    <section className="mx-4 my-16 sm:mx-8">
      <div className="relative mt-5 flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <div className="w-full md:w-2/5">
          <SidebarFilters />
        </div>
        <div className="w-full md:w-5/6">
          <CardetailCard />
          <div className="mt-5 flex overflow-x-auto sm:justify-center">
          </div>
        </div>
      </div>
    </section>
  );
}
