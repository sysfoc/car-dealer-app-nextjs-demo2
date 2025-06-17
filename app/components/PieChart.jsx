// "use client";
// import React from "react";
// import { Chart } from "react-google-charts";
// const PieChart = () => {
//   const data = [
//     ["Vehicals", "Sales Over Months"],
//     ["Corolla", 9],
//     ["Honda", 6],
//     ["Suzuki", 2],
//     ["Alto", 2],
//   ];

//   const options = {
//     legend: {
//       position: "bottom",
//       alignment: "center",
//       textStyle: {
//         color: "gray",
//         fontSize: 14,
//       },
//     },
//     colors: ["#0DCAF0", "#FD3550", "#15CA20", "#FA7123"],
//   };
//   return (
//     <div className="relative bg-white shadow">
//       <p className="absolute left-5 top-3 z-10 text-gray-500">
//         Trending Vehicals
//       </p>
//       <Chart
//         chartType="PieChart"
//         data={data}
//         options={options}
//         width={300}
//         height={380}
//       />
//     </div>
//   );
// };

// export default PieChart;

"use client";
import React from "react";
import { Chart } from "react-google-charts";

export const PieChart = () => {
  const data = [
    ["Vehicle", "Sales"],
    ["Corolla", 9],
    ["Honda", 6],
    ["Suzuki", 2],
    ["Alto", 2],
  ];

  const options = {
    title: "",
    pieHole: 0.4,
    legend: {
      position: "labeled",
      alignment: "center",
      textStyle: {
        color: "#6b7280",
        fontSize: 12,
        fontName: "Inter"
      },
    },
    chartArea: {
      width: "90%",
      height: "80%",
      left: "5%",
      top: "10%"
    },
    colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
    pieSliceText: "none",
    tooltip: { 
      text: "percentage", 
      textStyle: { 
        fontName: "Inter", 
        fontSize: 12 
      } 
    },
    enableInteractivity: true,
    fontSize: 12,
    fontName: "Inter"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Vehicle Sales Distribution</h3>
          <div className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            Last 30 days
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Top performing models</p>
      </div>
      <div className="p-2">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"300px"}
        />
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Total Sales</span>
          <span className="font-medium">19 vehicles</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;