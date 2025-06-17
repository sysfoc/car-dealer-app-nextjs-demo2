import React from "react";
import GeoChart from "@/app/components/GeoChart";
import RevenueChart from "@/app/components/RevenueChart";

const Statistics = () => {
  return (
    <section className="my-5">
      <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
        <GeoChart />
        <RevenueChart />
      </div>
    </section>
  );
};

export default Statistics;
