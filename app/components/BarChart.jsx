"use client";
import React from "react";
import { Chart } from "react-google-charts";

const BarChart = () => {
  const data = [
    ["Month", "Sales", "Expenses"],
    ["Jan", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Feb", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Mar", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Apr", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["May", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Jun", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Jul", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Aug", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Sep", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Oct", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Nov", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
    ["Dec", Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)],
  ];

  const options = {
    isStacked: true,
    chart: {
      title: "Company Performance",
      subtitle: "Sales and Expenses over the Months",
    },
    vAxis: {
      title: "Sales",
      minValue: 0,
      maxValue: 90,
      gridlines: { count: 10 },
    },
    colors: ["#0DCAF0", "#FFB54B"],
    hAxis: { title: "Visits" },
  };
  return (
    <div className='p-4 bg-white shadow'>
      <Chart
        chartType='Bar'
        data={data}
        options={options}
        width={630}
        height={350}
      />
    </div>
  );
}

export default BarChart;
