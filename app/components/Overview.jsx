// "use client";
// import React, { useState, useEffect } from "react";
// import { ShoppingCart, Wallet, TrendingDown, Users, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

// const metricsData = [
//   {
//     title: "Total Orders",
//     value: "4,805",
//     change: "+2.5%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: ShoppingCart,
//     gradient: "from-blue-500 to-blue-600",
//     bgPattern: "bg-gradient-to-br from-blue-50 to-blue-100",
//     iconBg: "bg-blue-500",
//     trend: [65, 78, 82, 95, 88, 92, 98]
//   },
//   {
//     title: "Total Revenue",
//     value: "$84,245",
//     change: "+5.4%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: Wallet,
//     gradient: "from-emerald-500 to-emerald-600",
//     bgPattern: "bg-gradient-to-br from-emerald-50 to-emerald-100",
//     iconBg: "bg-emerald-500",
//     trend: [45, 52, 68, 74, 82, 89, 95]
//   },
//   {
//     title: "Bounce Rate",
//     value: "34.6%",
//     change: "-4.5%",
//     changeType: "decrease",
//     period: "vs last week",
//     icon: TrendingDown,
//     gradient: "from-orange-500 to-orange-600",
//     bgPattern: "bg-gradient-to-br from-orange-50 to-orange-100",
//     iconBg: "bg-orange-500",
//     trend: [85, 78, 72, 68, 62, 58, 54]
//   },
//   {
//     title: "Total Customers",
//     value: "8.4K",
//     change: "+8.4%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: Users,
//     gradient: "from-purple-500 to-purple-600",
//     bgPattern: "bg-gradient-to-br from-purple-50 to-purple-100",
//     iconBg: "bg-purple-500",
//     trend: [32, 45, 58, 67, 74, 79, 84]
//   },
// ];

// const MiniChart = ({ data, color }) => {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min;

//   return (
//     <div className="flex items-end h-8 space-x-0.5">
//       {data.map((value, index) => {
//         const height = range === 0 ? 4 : ((value - min) / range) * 24 + 4;
//         return (
//           <div
//             key={index}
//             className={`w-1 rounded-full ${color} opacity-60`}
//             style={{ height: `${height}px` }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const Overview = () => {
//   const [lastUpdated, setLastUpdated] = useState("");

//   useEffect(() => {
//     setLastUpdated(new Date().toLocaleTimeString());
//   }, []);

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="mb-8">
//       {/* Header Section */}
//       <div className="mb-6">
//         <div className="flex flex-wrap items-center gap-2">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Dashboard Overview
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Monitor your business performance with real-time metrics
//             </p>
//           </div>
//           <button
//             onClick={handleRefresh}
//             className="flex gap-1 px-4 py-2 text-sm bg-blue-600 items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
//             aria-label="Refresh data"
//           >
//             <RefreshCw size={16} className=" dark:text-gray-600" />
//             <p>Refresh Page</p>
//           </button>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         {metricsData.map((metric, index) => {
//           const Icon = metric.icon;
//           const isPositive = metric.changeType === "increase";
//           const isNegative = metric.changeType === "decrease";

//           return (
//             <div
//               key={index}
//               className={`relative overflow-hidden rounded-2xl ${metric.bgPattern} dark:bg-gray-800 
//                          border border-white/20 dark:border-gray-700 
//                          backdrop-blur-sm shadow-lg hover:shadow-xl 
//                          transition-all duration-300 hover:-translate-y-1`}
//             >
//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-5">
//                 <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white"></div>
//                 <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white"></div>
//               </div>

//               <div className="relative p-6">
//                 {/* Header with Icon */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`p-3 rounded-xl ${metric.iconBg} shadow-lg`}>
//                     <Icon size={24} className="text-white" />
//                   </div>
//                   <div className="text-right">
//                     <MiniChart
//                       data={metric.trend}
//                       color={metric.iconBg.replace("bg-", "bg-")}
//                     />
//                   </div>
//                 </div>

//                 {/* Metric Title */}
//                 <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
//                   {metric.title}
//                 </h3>

//                 {/* Value */}
//                 <div className="flex items-baseline space-x-2 mb-3">
//                   <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                     {metric.value}
//                   </span>
//                 </div>

//                 {/* Change Indicator */}
//                 <div className="flex items-center space-x-2">
//                   <div
//                     className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
//                     ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
//                     ${isNegative ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
//                     ${!isPositive && !isNegative ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" : ""}
//                   `}
//                   >
//                     {isPositive && <ArrowUp size={12} />}
//                     {isNegative && <ArrowDown size={12} />}
//                     <span>{metric.change}</span>
//                   </div>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {metric.period}
//                   </span>
//                 </div>
//               </div>

//               {/* Subtle bottom gradient */}
//               <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.gradient}`}></div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Stats Bar */}
//       <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//         <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-gray-600 dark:text-gray-400">System Status: Operational</span>
//             </div>
//             <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
//             <span className="text-gray-600 dark:text-gray-400">
//               Last updated: 
//               <span className="font-semibold"> {lastUpdated}</span>
//             </span>
//           </div>
//           <div className="text-gray-500 dark:text-gray-400">
//             Data refreshes every 5 minutes
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Overview;


// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   ShoppingCart, 
//   Wallet, 
//   TrendingDown, 
//   Users, 
//   ArrowUp, 
//   ArrowDown, 
//   RefreshCw, 
//   Download,
//   Activity,
//   BarChart3
// } from "lucide-react";

// const metricsData = [
//   {
//     title: "Total Orders",
//     value: "4,805",
//     change: "+2.5%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: ShoppingCart,
//     color: "indigo",
//     trend: [65, 78, 82, 95, 88, 92, 98]
//   },
//   {
//     title: "Total Revenue",
//     value: "$84,245",
//     change: "+5.4%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: Wallet,
//     color: "emerald",
//     trend: [45, 52, 68, 74, 82, 89, 95]
//   },
//   {
//     title: "Bounce Rate",
//     value: "34.6%",
//     change: "-4.5%",
//     changeType: "decrease",
//     period: "vs last week",
//     icon: TrendingDown,
//     color: "amber",
//     trend: [85, 78, 72, 68, 62, 58, 54]
//   },
//   {
//     title: "Total Customers",
//     value: "8.4K",
//     change: "+8.4%",
//     changeType: "increase",
//     period: "vs last week",
//     icon: Users,
//     color: "violet",
//     trend: [32, 45, 58, 67, 74, 79, 84]
//   },
// ];

// const colorMap = {
//   indigo: {
//     bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
//     border: "border-indigo-200/50 dark:border-indigo-500/30",
//     icon: "bg-indigo-500 text-white",
//     accent: "bg-indigo-500",
//     text: "text-indigo-600 dark:text-indigo-400"
//   },
//   emerald: {
//     bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
//     border: "border-emerald-200/50 dark:border-emerald-500/30",
//     icon: "bg-emerald-500 text-white",
//     accent: "bg-emerald-500",
//     text: "text-emerald-600 dark:text-emerald-400"
//   },
//   amber: {
//     bg: "bg-amber-500/10 dark:bg-amber-500/20",
//     border: "border-amber-200/50 dark:border-amber-500/30",
//     icon: "bg-amber-500 text-white",
//     accent: "bg-amber-500",
//     text: "text-amber-600 dark:text-amber-400"
//   },
//   violet: {
//     bg: "bg-violet-500/10 dark:bg-violet-500/20",
//     border: "border-violet-200/50 dark:border-violet-500/30",
//     icon: "bg-violet-500 text-white",
//     accent: "bg-violet-500",
//     text: "text-violet-600 dark:text-violet-400"
//   }
// };

// const SparklineChart = ({ data, color }) => {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min;

//   return (
//     <div className="flex items-end h-10 space-x-1">
//       {data.map((value, index) => {
//         const height = range === 0 ? 8 : ((value - min) / range) * 32 + 8;
//         return (
//           <div
//             key={index}
//             className={`w-1.5 rounded-full transition-all duration-300 ${colorMap[color].accent} opacity-70 hover:opacity-100`}
//             style={{ height: `${height}px` }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const generatePDF = () => {
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
  
//   const currentTime = new Date().toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   const pdfContent = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <title>SYSFOC Car Dealership - Analytics Report</title>
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//         }
//         body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: #2d3748;
//             line-height: 1.6;
//         }
//         .container {
//             max-width: 800px;
//             margin: 0 auto;
//             background: white;
//             min-height: 100vh;
//         }
//         .header {
//             background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
//             color: white;
//             padding: 40px;
//             text-align: center;
//             position: relative;
//             overflow: hidden;
//         }
//         .header::before {
//             content: '';
//             position: absolute;
//             top: -50%;
//             left: -50%;
//             width: 200%;
//             height: 200%;
//             background: repeating-linear-gradient(
//                 45deg,
//                 transparent,
//                 transparent 2px,
//                 rgba(255,255,255,0.03) 2px,
//                 rgba(255,255,255,0.03) 4px
//             );
//         }
//         .header-content {
//             position: relative;
//             z-index: 1;
//         }
//         .company-name {
//             font-size: 2.5rem;
//             font-weight: 700;
//             margin-bottom: 8px;
//             letter-spacing: 2px;
//             text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
//         }
//         .subtitle {
//             font-size: 1.1rem;
//             opacity: 0.9;
//             font-weight: 300;
//             letter-spacing: 1px;
//         }
//         .report-info {
//             background: #f8fafc;
//             padding: 30px 40px;
//             border-bottom: 3px solid #e2e8f0;
//         }
//         .report-title {
//             font-size: 1.8rem;
//             color: #2d3748;
//             margin-bottom: 15px;
//             font-weight: 600;
//         }
//         .report-meta {
//             display: flex;
//             justify-content: space-between;
//             color: #64748b;
//             font-size: 0.95rem;
//         }
//         .metrics-section {
//             padding: 40px;
//         }
//         .section-title {
//             font-size: 1.5rem;
//             color: #2d3748;
//             margin-bottom: 30px;
//             font-weight: 600;
//             padding-bottom: 10px;
//             border-bottom: 2px solid #e2e8f0;
//         }
//         .metrics-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 25px;
//             margin-bottom: 40px;
//         }
//         .metric-card {
//             background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
//             border: 1px solid #e2e8f0;
//             border-radius: 12px;
//             padding: 25px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//             transition: all 0.3s ease;
//             position: relative;
//             overflow: hidden;
//         }
//         .metric-card::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             height: 4px;
//             background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
//         }
//         .metric-title {
//             font-size: 0.9rem;
//             color: #64748b;
//             margin-bottom: 8px;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//             font-weight: 500;
//         }
//         .metric-value {
//             font-size: 2.2rem;
//             font-weight: 700;
//             color: #1a202c;
//             margin-bottom: 8px;
//         }
//         .metric-change {
//             font-size: 0.9rem;
//             font-weight: 500;
//             display: flex;
//             align-items: center;
//             gap: 5px;
//         }
//         .positive { color: #059669; }
//         .negative { color: #dc2626; }
//         .change-arrow {
//             font-weight: bold;
//         }
//         .footer {
//             background: #f1f5f9;
//             padding: 30px 40px;
//             text-align: center;
//             border-top: 1px solid #e2e8f0;
//             margin-top: 20px;
//         }
//         .footer-text {
//             color: #64748b;
//             font-size: 0.85rem;
//             line-height: 1.4;
//         }
//         .summary-stats {
//             background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
//             border: 1px solid #c7d2fe;
//             border-radius: 12px;
//             padding: 25px;
//             margin: 30px 0;
//         }
//         .summary-title {
//             color: #3730a3;
//             font-weight: 600;
//             margin-bottom: 15px;
//             font-size: 1.2rem;
//         }
//         .summary-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 15px;
//         }
//         .summary-item {
//             background: rgba(255, 255, 255, 0.7);
//             padding: 15px;
//             border-radius: 8px;
//             text-align: center;
//         }
//         .summary-label {
//             font-size: 0.8rem;
//             color: #4c1d95;
//             font-weight: 500;
//             margin-bottom: 5px;
//         }
//         .summary-value {
//             font-size: 1.1rem;
//             font-weight: 600;
//             color: #1e1b4b;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <div class="header-content">
//                 <h1 class="company-name">SYSFOC</h1>
//                 <p class="subtitle">CAR DEALERSHIP</p>
//             </div>
//         </div>
        
//         <div class="report-info">
//             <h2 class="report-title">Business Analytics Report</h2>
//             <div class="report-meta">
//                 <span><strong>Generated:</strong> ${currentDate} at ${currentTime}</span>
//                 <span><strong>Period:</strong> Weekly Overview</span>
//             </div>
//         </div>

//         <div class="metrics-section">
//             <h3 class="section-title">Key Performance Indicators</h3>
            
//             <div class="metrics-grid">
//                 <div class="metric-card">
//                     <div class="metric-title">Total Orders</div>
//                     <div class="metric-value">4,805</div>
//                     <div class="metric-change positive">
//                         <span class="change-arrow">↑</span>
//                         <span>+2.5% vs last week</span>
//                     </div>
//                 </div>
                
//                 <div class="metric-card">
//                     <div class="metric-title">Total Revenue</div>
//                     <div class="metric-value">$84,245</div>
//                     <div class="metric-change positive">
//                         <span class="change-arrow">↑</span>
//                         <span>+5.4% vs last week</span>
//                     </div>
//                 </div>
                
//                 <div class="metric-card">
//                     <div class="metric-title">Bounce Rate</div>
//                     <div class="metric-value">34.6%</div>
//                     <div class="metric-change positive">
//                         <span class="change-arrow">↓</span>
//                         <span>-4.5% vs last week</span>
//                     </div>
//                 </div>
                
//                 <div class="metric-card">
//                     <div class="metric-title">Total Customers</div>
//                     <div class="metric-value">8.4K</div>
//                     <div class="metric-change positive">
//                         <span class="change-arrow">↑</span>
//                         <span>+8.4% vs last week</span>
//                     </div>
//                 </div>
//             </div>

//             <div class="summary-stats">
//                 <h4 class="summary-title">Performance Summary</h4>
//                 <div class="summary-grid">
//                     <div class="summary-item">
//                         <div class="summary-label">Average Order Value</div>
//                         <div class="summary-value">$17.54</div>
//                     </div>
//                     <div class="summary-item">
//                         <div class="summary-label">Customer Growth</div>
//                         <div class="summary-value">+8.4%</div>
//                     </div>
//                     <div class="summary-item">
//                         <div class="summary-label">Revenue Growth</div>
//                         <div class="summary-value">+5.4%</div>
//                     </div>
//                     <div class="summary-item">
//                         <div class="summary-label">Conversion Rate</div>
//                         <div class="summary-value">65.4%</div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="footer">
//             <div class="footer-text">
//                 <strong>SYSFOC Car Dealership</strong><br>
//                 Professional Analytics Dashboard • Confidential Report<br>
//                 This report contains sensitive business information and should be handled accordingly.
//             </div>
//         </div>
//     </div>
// </body>
// </html>
//   `;

//   const blob = new Blob([pdfContent], { type: 'text/html' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `SYSFOC_Analytics_Report_${new Date().toISOString().split('T')[0]}.html`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// };

// const Dashboard = () => {
//   const [lastUpdated, setLastUpdated] = useState("");
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     setLastUpdated(new Date().toLocaleTimeString());
//     // Check for system dark mode preference
//     setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
//   }, []);

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   const toggleDarkMode = () => {
//     setIsDark(!isDark);
//   };

//   return (
//     <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="mb-6 lg:mb-0">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                 Analytics Dashboard
//               </h1>
//             </div>
//             <p className="text-gray-600 dark:text-gray-400 text-lg">
//               Comprehensive business performance insights
//             </p>
//           </div>
          
//           <div className="flex flex-wrap items-center space-x-3">
            
//             <button
//               onClick={generatePDF}
//               className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <Download size={18} />
//               <span className="font-medium">Export Report</span>
//             </button>
            
//             <button
//               onClick={handleRefresh}
//               className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <RefreshCw size={18} />
//               <span className="font-medium">Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//           {metricsData.map((metric, index) => {
//             const Icon = metric.icon;
//             const colors = colorMap[metric.color];
//             const isPositive = metric.changeType === "increase";
//             const isNegative = metric.changeType === "decrease";

//             return (
//               <div
//                 key={index}
//                 className={`relative p-6 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm 
//                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
//                            dark:bg-gray-800/50 dark:border-gray-700`}
//               >
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`p-3 rounded-xl ${colors.icon} shadow-md`}>
//                     <Icon size={20} />
//                   </div>
//                   <div className="flex items-center">
//                     <Activity size={16} className={`${colors.text} mr-2`} />
//                     <SparklineChart data={metric.trend} color={metric.color} />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
//                     {metric.title}
//                   </h3>
//                   <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                     {metric.value}
//                   </p>
//                   <div className="flex items-center space-x-2">
//                     <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold
//                       ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
//                       ${isNegative ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
//                     `}>
//                       {isPositive && <ArrowUp size={12} />}
//                       {isNegative && <ArrowDown size={12} />}
//                       <span>{metric.change}</span>
//                     </div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       {metric.period}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Status Bar */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center space-x-3">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   System Operational
//                 </span>
//               </div>
//               <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
//               <div className="flex items-center space-x-2">
//                 <Activity size={16} className="text-gray-500 dark:text-gray-400" />
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   Updated: <span className="font-semibold text-gray-900 dark:text-white">{lastUpdated}</span>
//                 </span>
//               </div>
//             </div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">
//               Auto-refresh: 5 minutes
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from 'jspdf';
import { 
  ShoppingCart, 
  Wallet, 
  TrendingDown, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Download,
  Activity,
  BarChart3
} from "lucide-react";

const metricsData = [
  {
    title: "Total Orders",
    value: "4,805",
    change: "+2.5%",
    changeType: "increase",
    period: "vs last week",
    icon: ShoppingCart,
    color: "indigo",
    trend: [65, 78, 82, 95, 88, 92, 98]
  },
  {
    title: "Total Revenue",
    value: "$84,245",
    change: "+5.4%",
    changeType: "increase",
    period: "vs last week",
    icon: Wallet,
    color: "emerald",
    trend: [45, 52, 68, 74, 82, 89, 95]
  },
  {
    title: "Bounce Rate",
    value: "34.6%",
    change: "-4.5%",
    changeType: "decrease",
    period: "vs last week",
    icon: TrendingDown,
    color: "amber",
    trend: [85, 78, 72, 68, 62, 58, 54]
  },
  {
    title: "Total Customers",
    value: "8.4K",
    change: "+8.4%",
    changeType: "increase",
    period: "vs last week",
    icon: Users,
    color: "violet",
    trend: [32, 45, 58, 67, 74, 79, 84]
  },
];

const colorMap = {
  indigo: {
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    border: "border-indigo-200/50 dark:border-indigo-500/30",
    icon: "bg-indigo-500 text-white",
    accent: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400"
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-200/50 dark:border-emerald-500/30",
    icon: "bg-emerald-500 text-white",
    accent: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400"
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    border: "border-amber-200/50 dark:border-amber-500/30",
    icon: "bg-amber-500 text-white",
    accent: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400"
  },
  violet: {
    bg: "bg-violet-500/10 dark:bg-violet-500/20",
    border: "border-violet-200/50 dark:border-violet-500/30",
    icon: "bg-violet-500 text-white",
    accent: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400"
  }
};

const SparklineChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return (
    <div className="flex items-end h-10 space-x-1">
      {data.map((value, index) => {
        const height = range === 0 ? 8 : ((value - min) / range) * 32 + 8;
        return (
          <div
            key={index}
            className={`w-1.5 rounded-full transition-all duration-300 ${colorMap[color].accent} opacity-70 hover:opacity-100`}
            style={{ height: `${height}px` }}
          />
        );
      })}
    </div>
  );
};

const generatePDF = async () => {
  try {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create new PDF document
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Colors
    const primaryColor = [26, 54, 93]; // Dark blue
    const secondaryColor = [45, 55, 72]; // Gray
    const accentColor = [59, 130, 246]; // Blue
    const successColor = [16, 185, 129]; // Green
    const warningColor = [245, 158, 11]; // Amber
    
    // Header with gradient effect (simulated with rectangles)
    doc.setFillColor(26, 54, 93);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('SYSFOC', pageWidth / 2, 25, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('CAR DEALERSHIP', pageWidth / 2, 35, { align: 'center' });
    
    // Report title section
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 50, pageWidth, 25, 'F');
    
    doc.setTextColor(45, 55, 72);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Business Analytics Report', 20, 65);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${currentDate} at ${currentTime}`, 20, 72);
    doc.text('Period: Weekly Overview', pageWidth - 20, 72, { align: 'right' });
    
    // Metrics section
    let yPosition = 90;
    
    doc.setTextColor(45, 55, 72);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Performance Indicators', 20, yPosition);
    
    // Draw underline
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
    
    yPosition += 15;
    
    // Metrics data
    const metrics = [
      { title: 'Total Orders', value: '4,805', change: '+2.5%', positive: true },
      { title: 'Total Revenue', value: '$84,245', change: '+5.4%', positive: true },
      { title: 'Bounce Rate', value: '34.6%', change: '-4.5%', positive: true },
      { title: 'Total Customers', value: '8.4K', change: '+8.4%', positive: true }
    ];
    
    // Draw metric cards (2x2 grid)
    const cardWidth = (pageWidth - 60) / 2;
    const cardHeight = 35;
    const spacing = 20;
    
    metrics.forEach((metric, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 20 + col * (cardWidth + spacing);
      const y = yPosition + row * (cardHeight + 10);
      
      // Card background
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'FD');
      
      // Accent line at top
      doc.setFillColor(59, 130, 246);
      doc.rect(x, y, cardWidth, 2, 'F');
      
      // Metric title
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(metric.title.toUpperCase(), x + 8, y + 12);
      
      // Metric value
      doc.setTextColor(26, 32, 44);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(metric.value, x + 8, y + 22);
      
      // Change indicator - Fixed text encoding
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      if (metric.positive) {
        doc.setTextColor(16, 185, 129);
        // Use proper arrow character or simple text
        doc.text(`${metric.change} vs last week`, x + 8, y + 30);
      } else {
        doc.setTextColor(220, 38, 38);
        doc.text(`${metric.change} vs last week`, x + 8, y + 30);
      }
    });
    
    yPosition += 90;
    
    // Performance Summary section - FIXED STYLING
    doc.setFillColor(245, 247, 250); // Light gray background instead of blue
    doc.setDrawColor(203, 213, 225); // Light border
    doc.setLineWidth(0.5);
    doc.roundedRect(20, yPosition, pageWidth - 40, 50, 3, 3, 'FD');
    
    doc.setTextColor(51, 65, 85); // Dark gray for title instead of purple
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Performance Summary', 25, yPosition + 12);
    
    // Summary items with FIXED styling
    const summaryItems = [
      { label: 'Average Order Value', value: '$17.54' },
      { label: 'Customer Growth', value: '+8.4%' },
      { label: 'Revenue Growth', value: '+5.4%' },
      { label: 'Conversion Rate', value: '65.4%' }
    ];
    
    const itemWidth = (pageWidth - 60) / 2;
    summaryItems.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 25 + col * itemWidth;
      const y = yPosition + 20 + row * 16;
      
      // WHITE background for each item - FIXED
      doc.setFillColor(255, 255, 255); // Pure white background
      doc.setDrawColor(226, 232, 240); // Light border
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y - 3, itemWidth - 10, 12, 2, 2, 'FD');
      
      // Label text - FIXED colors for better readability
      doc.setTextColor(71, 85, 105); // Medium gray for labels
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(item.label, x + 3, y + 1);
      
      // Value text - FIXED colors for better readability
      doc.setTextColor(15, 23, 42); // Dark text for values
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(item.value, x + 3, y + 5);
    });
    
    // Footer
    yPosition = pageHeight - 30;
    doc.setFillColor(241, 245, 249);
    doc.rect(0, yPosition, pageWidth, 30, 'F');
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('SYSFOC Car Dealership', pageWidth / 2, yPosition + 10, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Professional Analytics Dashboard - Confidential Report', pageWidth / 2, yPosition + 16, { align: 'center' });
    doc.text('This report contains sensitive business information and should be handled accordingly.', pageWidth / 2, yPosition + 21, { align: 'center' });
    
    // Save the PDF
    const fileName = `SYSFOC_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to HTML download if PDF generation fails
    generateHTMLReport();
  }
};
// Fallback HTML generation function
const generateHTMLReport = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SYSFOC Analytics Report</title><style>body{font-family:Arial,sans-serif;margin:0;background:#f0f0f0}.container{max-width:800px;margin:20px auto;background:white;box-shadow:0 0 20px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#1a365d,#2d3748);color:white;padding:40px;text-align:center}.company-name{font-size:2.5rem;font-weight:bold;margin-bottom:8px}.subtitle{font-size:1.1rem;opacity:0.9}.report-info{background:#f8fafc;padding:30px;border-bottom:3px solid #e2e8f0}.report-title{font-size:1.8rem;color:#2d3748;margin-bottom:15px;font-weight:600}.metrics-section{padding:40px}.metrics-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:25px}.metric-card{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:25px;box-shadow:0 4px 6px rgba(0,0,0,0.05);border-top:4px solid #3b82f6}.metric-title{font-size:0.9rem;color:#64748b;margin-bottom:8px;text-transform:uppercase;font-weight:500}.metric-value{font-size:2.2rem;font-weight:700;color:#1a202c;margin-bottom:8px}.metric-change{color:#059669;font-weight:500}.footer{background:#f1f5f9;padding:30px;text-align:center;color:#64748b;font-size:0.85rem}</style></head><body><div class="container"><div class="header"><h1 class="company-name">SYSFOC</h1><p class="subtitle">CAR DEALERSHIP</p></div><div class="report-info"><h2 class="report-title">Business Analytics Report</h2><p>Generated: ${currentDate} at ${currentTime} | Period: Weekly Overview</p></div><div class="metrics-section"><div class="metrics-grid"><div class="metric-card"><div class="metric-title">Total Orders</div><div class="metric-value">4,805</div><div class="metric-change">↑ +2.5% vs last week</div></div><div class="metric-card"><div class="metric-title">Total Revenue</div><div class="metric-value">$84,245</div><div class="metric-change">↑ +5.4% vs last week</div></div><div class="metric-card"><div class="metric-title">Bounce Rate</div><div class="metric-value">34.6%</div><div class="metric-change">↓ -4.5% vs last week</div></div><div class="metric-card"><div class="metric-title">Total Customers</div><div class="metric-value">8.4K</div><div class="metric-change">↑ +8.4% vs last week</div></div></div></div><div class="footer"><strong>SYSFOC Car Dealership</strong><br>Professional Analytics Dashboard • Confidential Report</div></div></body></html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `SYSFOC_Analytics_Report_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    // Check for system dark mode preference
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Comprehensive business performance insights
            </p>
          </div>
          
          <div className="flex flex-wrap items-center space-x-3">
           
            <button
              onClick={generatePDF}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download size={18} />
              <span className="font-medium">Export Report</span>
            </button>
            
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw size={18} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon;
            const colors = colorMap[metric.color];
            const isPositive = metric.changeType === "increase";
            const isNegative = metric.changeType === "decrease";

            return (
              <div
                key={index}
                className={`relative p-6 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm 
                           shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                           dark:bg-gray-800/50 dark:border-gray-700`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.icon} shadow-md`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center">
                    <Activity size={16} className={`${colors.text} mr-2`} />
                    <SparklineChart data={metric.trend} color={metric.color} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {metric.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold
                      ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${isNegative ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
                    `}>
                      {isPositive && <ArrowUp size={12} />}
                      {isNegative && <ArrowDown size={12} />}
                      <span>{metric.change}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.period}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  System Operational
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <Activity size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Updated: <span className="font-semibold text-gray-900 dark:text-white">{lastUpdated}</span>
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Auto-refresh: 5 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;