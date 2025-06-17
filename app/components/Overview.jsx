"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Wallet, TrendingDown, Users, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

const metricsData = [
  {
    title: "Total Orders",
    value: "4,805",
    change: "+2.5%",
    changeType: "increase",
    period: "vs last week",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-blue-600",
    bgPattern: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
    trend: [65, 78, 82, 95, 88, 92, 98]
  },
  {
    title: "Total Revenue",
    value: "$84,245",
    change: "+5.4%",
    changeType: "increase",
    period: "vs last week",
    icon: Wallet,
    gradient: "from-emerald-500 to-emerald-600",
    bgPattern: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    iconBg: "bg-emerald-500",
    trend: [45, 52, 68, 74, 82, 89, 95]
  },
  {
    title: "Bounce Rate",
    value: "34.6%",
    change: "-4.5%",
    changeType: "decrease",
    period: "vs last week",
    icon: TrendingDown,
    gradient: "from-orange-500 to-orange-600",
    bgPattern: "bg-gradient-to-br from-orange-50 to-orange-100",
    iconBg: "bg-orange-500",
    trend: [85, 78, 72, 68, 62, 58, 54]
  },
  {
    title: "Total Customers",
    value: "8.4K",
    change: "+8.4%",
    changeType: "increase",
    period: "vs last week",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
    bgPattern: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
    trend: [32, 45, 58, 67, 74, 79, 84]
  },
];

const MiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return (
    <div className="flex items-end h-8 space-x-0.5">
      {data.map((value, index) => {
        const height = range === 0 ? 4 : ((value - min) / range) * 24 + 4;
        return (
          <div
            key={index}
            className={`w-1 rounded-full ${color} opacity-60`}
            style={{ height: `${height}px` }}
          />
        );
      })}
    </div>
  );
};

const Overview = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="mb-8">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your business performance with real-time metrics
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex gap-1 px-4 py-2 text-sm bg-blue-600 items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
            aria-label="Refresh data"
          >
            <RefreshCw size={16} className=" dark:text-gray-600" />
            <p>Refresh Page</p>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.changeType === "increase";
          const isNegative = metric.changeType === "decrease";

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${metric.bgPattern} dark:bg-gray-800 
                         border border-white/20 dark:border-gray-700 
                         backdrop-blur-sm shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white"></div>
              </div>

              <div className="relative p-6">
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.iconBg} shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <MiniChart
                      data={metric.trend}
                      color={metric.iconBg.replace("bg-", "bg-")}
                    />
                  </div>
                </div>

                {/* Metric Title */}
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  {metric.title}
                </h3>

                {/* Value */}
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                </div>

                {/* Change Indicator */}
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                    ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                    ${isNegative ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
                    ${!isPositive && !isNegative ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" : ""}
                  `}
                  >
                    {isPositive && <ArrowUp size={12} />}
                    {isNegative && <ArrowDown size={12} />}
                    <span>{metric.change}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.period}
                  </span>
                </div>
              </div>

              {/* Subtle bottom gradient */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.gradient}`}></div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">System Status: Operational</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Last updated: 
              <span className="font-semibold"> {lastUpdated}</span>
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Data refreshes every 5 minutes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;