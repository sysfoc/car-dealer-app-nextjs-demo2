// "use client";
// import React, { useState, useEffect } from "react";
// import { useCurrency } from "../context/CurrencyContext";
// import { jsPDF } from 'jspdf';
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
//   BarChart3,
//   Car,
//   CarFront,
//   DollarSign
// } from "lucide-react";

// const colorMap = {
//   indigo: {
//     bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
//     border: "border-indigo-200/50 dark:border-indigo-500/30",
//     icon: "bg-indigo-500 text-white dark:bg-indigo-600 dark:text-white",
//     accent: "bg-indigo-500 dark:bg-indigo-600",
//     text: "text-indigo-600 dark:text-indigo-400"
//   },
//   emerald: {
//     bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
//     border: "border-emerald-200/50 dark:border-emerald-500/30",
//     icon: "bg-emerald-500 text-white dark:bg-emerald-600 dark:text-white",
//     accent: "bg-emerald-500 dark:bg-emerald-600",
//     text: "text-emerald-600 dark:text-emerald-400"
//   },
//   amber: {
//     bg: "bg-amber-500/10 dark:bg-amber-500/20",
//     border: "border-amber-200/50 dark:border-amber-500/30",
//     icon: "bg-amber-500 text-white dark:bg-amber-600 dark:text-white",
//     accent: "bg-amber-500 dark:bg-amber-600",
//     text: "text-amber-600 dark:text-amber-400"
//   }
// };

// const Dashboard = () => {
//   const [lastUpdated, setLastUpdated] = useState("");
//   const [isDark, setIsDark] = useState(false);
//   const [metrics, setMetrics] = useState([
//     {
//       title: "Total Cars",
//       value: "0",
//       description: "All vehicles in inventory",
//       icon: Car,
//       color: "indigo"
//     },
//     {
//       title: "Lease Cars",
//       value: "0",
//       description: "Available for lease",
//       icon: CarFront,
//       color: "emerald"
//     },
//     {
//       title: "Total Inventory Worth",
//       value: "$0",
//       description: "Sum of all car prices",
//       icon: DollarSign,
//       color: "amber"
//     }
//   ]);
//   const [loading, setLoading] = useState(true);
//   const { selectedCurrency } = useCurrency();

//   useEffect(() => {
//     fetchCarData();
//     setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
//   }, [selectedCurrency]);

//   const fetchCarData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/cars');
//       const data = await response.json();
      
//       const totalCars = data.cars?.length || 0;
//       const leaseCars = data.cars?.filter(car => car.isLease)?.length || 0;
//       const totalWorth = data.cars?.reduce((sum, car) => sum + (Number(car.price) || 0), 0) || 0;
      
//       setMetrics([
//         {
//           ...metrics[0],
//           value: totalCars.toLocaleString()
//         },
//         {
//           ...metrics[1],
//           value: leaseCars.toLocaleString()
//         },
//         {
//           ...metrics[2],
//           value: `${selectedCurrency?.symbol || '$'} ${totalWorth.toLocaleString()}`
//         }
//       ]);
      
//       setLastUpdated(new Date().toLocaleTimeString());
//     } catch (error) {
//       console.error("Error fetching car data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchCarData();
//   };

//   const generatePDF = async () => {
//     try {
//       const currentDate = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
      
//       const currentTime = new Date().toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });

//       // Create new PDF document
//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
      
//       // Colors
//       const primaryColor = [26, 54, 93];
//       const secondaryColor = [45, 55, 72];
//       const accentColor = [59, 130, 246];
//       const successColor = [16, 185, 129];
      
//       // Header
//       doc.setFillColor(26, 54, 93);
//       doc.rect(0, 0, pageWidth, 50, 'F');
      
//       // Company name
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(28);
//       doc.setFont('helvetica', 'bold');
//       doc.text('AUTOMOTIVE', pageWidth / 2, 25, { align: 'center' });
      
//       // Subtitle
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'normal');
//       doc.text('CAR DEALERSHIP', pageWidth / 2, 35, { align: 'center' });
      
//       // Report title section
//       doc.setFillColor(248, 250, 252);
//       doc.rect(0, 50, pageWidth, 25, 'F');
      
//       doc.setTextColor(45, 55, 72);
//       doc.setFontSize(18);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Vehicle Inventory Report', 20, 65);
      
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(100, 116, 139);
//       doc.text(`Generated: ${currentDate} at ${currentTime}`, 20, 72);
//       doc.text('Period: Current Inventory', pageWidth - 20, 72, { align: 'right' });
      
//       // Metrics section
//       let yPosition = 90;
      
//       doc.setTextColor(45, 55, 72);
//       doc.setFontSize(16);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Vehicle Statistics', 20, yPosition);
      
//       // Draw underline
//       doc.setDrawColor(226, 232, 240);
//       doc.setLineWidth(1);
//       doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
      
//       yPosition += 15;
      
//       // Metrics data
//       const metricsForPdf = [
//         { title: 'Total Cars', value: metrics[0].value, description: 'All vehicles in inventory' },
//         { title: 'Lease Cars', value: metrics[1].value, description: 'Available for lease' },
//         { title: 'Total Inventory Worth', value: metrics[2].value, description: 'Sum of all car prices' }
//       ];
      
//       // Draw metric cards (2 in first row, 1 in second row)
//       const cardWidth = (pageWidth - 60) / 2;
//       const cardHeight = 35;
//       const spacing = 20;
      
//       metricsForPdf.forEach((metric, index) => {
//         const row = Math.floor(index / 2);
//         const col = index % 2;
        
//         // For the third card (index 2), center it
//         let x;
//         if (index === 2) {
//           x = (pageWidth - cardWidth) / 2;
//         } else {
//           x = 20 + col * (cardWidth + spacing);
//         }
        
//         const y = yPosition + row * (cardHeight + 10);
        
//         // Card background
//         doc.setFillColor(255, 255, 255);
//         doc.setDrawColor(226, 232, 240);
//         doc.setLineWidth(0.5);
//         doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'FD');
        
//         // Accent line at top
//         doc.setFillColor(59, 130, 246);
//         doc.rect(x, y, cardWidth, 2, 'F');
        
//         // Metric title
//         doc.setTextColor(100, 116, 139);
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.text(metric.title.toUpperCase(), x + 8, y + 12);
        
//         // Metric value
//         doc.setTextColor(26, 32, 44);
//         doc.setFontSize(20);
//         doc.setFont('helvetica', 'bold');
//         doc.text(metric.value, x + 8, y + 22);
        
//         // Description
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(100, 116, 139);
//         doc.text(metric.description, x + 8, y + 30);
//       });
      
//       // Footer
//       yPosition = pageHeight - 30;
//       doc.setFillColor(241, 245, 249);
//       doc.rect(0, yPosition, pageWidth, 30, 'F');
      
//       doc.setTextColor(100, 116, 139);
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Automotive Car Dealership', pageWidth / 2, yPosition + 10, { align: 'center' });
      
//       doc.setFont('helvetica', 'normal');
//       doc.setFontSize(8);
//       doc.text('Vehicle Inventory Management System', pageWidth / 2, yPosition + 16, { align: 'center' });
//       doc.text('This report contains sensitive business information and should be handled accordingly.', pageWidth / 2, yPosition + 21, { align: 'center' });
      
//       // Save the PDF
//       const fileName = `Automotive_Inventory_Report_${new Date().toISOString().split('T')[0]}.pdf`;
//       doc.save(fileName);
      
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="mb-6 lg:mb-0">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                 Vehicle Inventory
//               </h1>
//             </div>
//             <p className="text-gray-600 dark:text-gray-400 text-lg">
//               Comprehensive vehicle management dashboard
//             </p>
//           </div>
          
//           <div className="flex flex-wrap items-center space-x-3">
//             <button
//               onClick={generatePDF}
//               className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-800 dark:hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <Download size={18} />
//               <span className="font-medium">Export Report</span>
//             </button>
            
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
//                 loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800'
//               }`}
//             >
//               <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
//               <span className="font-medium">Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {metrics.map((metric, index) => {
//             const Icon = metric.icon;
//             const colors = colorMap[metric.color];

//             return (
//               <div
//                 key={index}
//                 className={`relative p-6 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm 
//                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
//                            dark:bg-gray-800/50 dark:border-gray-700`}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`p-3 rounded-xl ${colors.icon} shadow-md`}>
//                     <Icon size={20} />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
//                     {metric.title}
//                   </h3>
//                   <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                     {loading ? (
//                       <span className="inline-block h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
//                     ) : (
//                       metric.value
//                     )}
//                   </p>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       {metric.description}
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
//                 <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   System Operational
//                 </span>
//               </div>
//               <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
//               <div className="flex items-center space-x-2">
//                 <Activity size={16} className="text-gray-500 dark:text-gray-400" />
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   Updated: <span className="font-semibold text-gray-900 dark:text-white">
//                     {loading ? 'Loading...' : lastUpdated}
//                   </span>
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
import { useCurrency } from "../context/CurrencyContext";
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
  BarChart3,
  Car,
  CarFront,
  DollarSign,
  FileText,
  Fuel,
  Settings,
  Calendar,
  MapPin,
  Zap
} from "lucide-react";

const colorMap = {
  indigo: {
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    border: "border-indigo-200/50 dark:border-indigo-500/30",
    icon: "bg-indigo-500 text-white dark:bg-indigo-600 dark:text-white",
    accent: "bg-indigo-500 dark:bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400"
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-200/50 dark:border-emerald-500/30",
    icon: "bg-emerald-500 text-white dark:bg-emerald-600 dark:text-white",
    accent: "bg-emerald-500 dark:bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400"
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    border: "border-amber-200/50 dark:border-amber-500/30",
    icon: "bg-amber-500 text-white dark:bg-amber-600 dark:text-white",
    accent: "bg-amber-500 dark:bg-amber-600",
    text: "text-amber-600 dark:text-amber-400"
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    border: "border-purple-200/50 dark:border-purple-500/30",
    icon: "bg-purple-500 text-white dark:bg-purple-600 dark:text-white",
    accent: "bg-purple-500 dark:bg-purple-600",
    text: "text-purple-600 dark:text-purple-400"
  }
};

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [metrics, setMetrics] = useState([
    {
      title: "Total Cars",
      value: "0",
      description: "All vehicles in inventory",
      icon: Car,
      color: "indigo"
    },
    {
      title: "Lease Cars",
      value: "0",
      description: "Available for lease",
      icon: CarFront,
      color: "emerald"
    },
    {
      title: "Total Inventory Worth",
      value: "$0",
      description: "Sum of all car prices",
      icon: DollarSign,
      color: "amber"
    },
    {
      title: "Total Blogs",
      value: "0",
      description: "Published blog posts",
      icon: FileText,
      color: "purple"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    fetchData();
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [selectedCurrency]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch car data
      const carResponse = await fetch('/api/cars');
      const carData = await carResponse.json();
      setCarData(carData.cars || []);
      
      // Fetch blog data
      const blogResponse = await fetch('/api/blog');
      const blogData = await blogResponse.json();
      setBlogs(blogData.blogs || []);
      
      const totalCars = carData.cars?.length || 0;
      const leaseCars = carData.cars?.filter(car => car.isLease)?.length || 0;
      const totalWorth = carData.cars?.reduce((sum, car) => sum + (Number(car.price) || 0), 0) || 0;
      const totalBlogs = blogData.blogs?.length || 0;
      
      setMetrics([
        {
          ...metrics[0],
          value: totalCars.toLocaleString()
        },
        {
          ...metrics[1],
          value: leaseCars.toLocaleString()
        },
        {
          ...metrics[2],
          value: `${selectedCurrency?.symbol || '$'} ${totalWorth.toLocaleString()}`
        },
        {
          ...metrics[3],
          value: totalBlogs.toLocaleString()
        }
      ]);
      
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
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
      const primaryColor = [26, 54, 93];
      const secondaryColor = [45, 55, 72];
      const accentColor = [59, 130, 246];
      const successColor = [16, 185, 129];
      
      // Header
      doc.setFillColor(26, 54, 93);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Company name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('AUTOMOTIVE', pageWidth / 2, 25, { align: 'center' });
      
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
      doc.text('Comprehensive Business Report', 20, 65);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated: ${currentDate} at ${currentTime}`, 20, 72);
      doc.text('Period: Current Data', pageWidth - 20, 72, { align: 'right' });
      
      let yPosition = 90;
      
      // Calculate analytics
      const totalCars = carData.length;
      const leaseCars = carData.filter(car => car.isLease).length;
      const soldCars = carData.filter(car => car.sold).length;
      const totalWorth = carData.reduce((sum, car) => sum + (Number(car.price) || 0), 0);
      const avgPrice = totalCars > 0 ? totalWorth / totalCars : 0;
      
      // Vehicle type breakdown
      const vehicleTypes = carData.reduce((acc, car) => {
        acc[car.type] = (acc[car.type] || 0) + 1;
        return acc;
      }, {});
      
      // Fuel type breakdown
      const fuelTypes = carData.reduce((acc, car) => {
        acc[car.fuelType] = (acc[car.fuelType] || 0) + 1;
        return acc;
      }, {});
      
      // Popular makes
      const makes = carData.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
      }, {});
      
      // Year distribution
      const years = carData.reduce((acc, car) => {
        const year = car.modelYear || 'Unknown';
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {});

      // Executive Summary
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 20, yPosition);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
      
      yPosition += 15;
      
      // Summary cards
      const summaryData = [
        { title: 'Total Vehicles', value: totalCars.toLocaleString(), color: [59, 130, 246] },
        { title: 'Available for Lease', value: leaseCars.toLocaleString(), color: [16, 185, 129] },
        { title: 'Sold Vehicles', value: soldCars.toLocaleString(), color: [245, 158, 11] },
        { title: 'Total Inventory Value', value: `${selectedCurrency?.symbol || '$'} ${totalWorth.toLocaleString()}`, color: [168, 85, 247] },
        { title: 'Average Vehicle Price', value: `${selectedCurrency?.symbol || '$'} ${Math.round(avgPrice).toLocaleString()}`, color: [239, 68, 68] },
        { title: 'Blog Posts', value: blogs.length.toLocaleString(), color: [34, 197, 94] }
      ];
      
      const cardWidth = (pageWidth - 60) / 3;
      const cardHeight = 25;
      const spacing = 10;
      
      summaryData.forEach((item, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        const x = 20 + col * (cardWidth + spacing);
        const y = yPosition + row * (cardHeight + 8);
        
        // Card background
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, 'FD');
        
        // Accent line
        doc.setFillColor(item.color[0], item.color[1], item.color[2]);
        doc.rect(x, y, cardWidth, 1.5, 'F');
        
        // Title
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(item.title.toUpperCase(), x + 5, y + 8);
        
        // Value
        doc.setTextColor(26, 32, 44);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(item.value, x + 5, y + 16);
      });
      
      yPosition += 65;
      
      // Check if we need a new page
      if (yPosition > pageHeight - 100) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Vehicle Analysis Section
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Vehicle Analysis', 20, yPosition);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
      
      yPosition += 15;
      
      // Vehicle Types
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Vehicle Types Distribution', 20, yPosition);
      
      yPosition += 10;
      Object.entries(vehicleTypes).slice(0, 5).forEach(([type, count]) => {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`• ${type || 'Unknown'}: ${count} vehicles`, 25, yPosition);
        yPosition += 6;
      });
      
      yPosition += 5;
      
      // Fuel Types
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Fuel Types Distribution', 20, yPosition);
      
      yPosition += 10;
      Object.entries(fuelTypes).slice(0, 5).forEach(([fuel, count]) => {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`• ${fuel || 'Unknown'}: ${count} vehicles`, 25, yPosition);
        yPosition += 6;
      });
      
      yPosition += 5;
      
      // Popular Makes
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Popular Vehicle Makes', 20, yPosition);
      
      yPosition += 10;
      Object.entries(makes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([make, count]) => {
          doc.setTextColor(100, 116, 139);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`• ${make}: ${count} vehicles`, 25, yPosition);
          yPosition += 6;
        });
      
      yPosition += 10;
      
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Blog Analytics Section
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Content Analytics', 20, yPosition);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
      
      yPosition += 15;
      
      // Blog statistics
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Blog Posts: ${blogs.length}`, 25, yPosition);
      yPosition += 8;
      
      if (blogs.length > 0) {
        doc.text('Recent Blog Posts:', 25, yPosition);
        yPosition += 8;
        
        blogs.slice(0, 5).forEach((blog, index) => {
          doc.setTextColor(59, 130, 246);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          const title = blog.title ? blog.title.substring(0, 50) + (blog.title.length > 50 ? '...' : '') : 'Untitled';
          doc.text(`${index + 1}. ${title}`, 30, yPosition);
          yPosition += 6;
        });
      }
      
      // Footer
      yPosition = pageHeight - 30;
      doc.setFillColor(241, 245, 249);
      doc.rect(0, yPosition, pageWidth, 30, 'F');
      
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Automotive Car Dealership', pageWidth / 2, yPosition + 10, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Comprehensive Business Intelligence Report', pageWidth / 2, yPosition + 16, { align: 'center' });
      doc.text('This report contains confidential business information and should be handled accordingly.', pageWidth / 2, yPosition + 21, { align: 'center' });
      
      // Save the PDF
      const fileName = `Automotive_Business_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Business Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Comprehensive business intelligence overview
            </p>
          </div>
          
          <div className="flex flex-wrap items-center space-x-3">
            <button
              onClick={generatePDF}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-800 dark:hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download size={18} />
              <span className="font-medium">Export Report</span>
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800'
              }`}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const colors = colorMap[metric.color];

            return (
              <div
                key={index}
                className={`relative p-6 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm 
                           shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                           dark:bg-gray-800/50 dark:border-gray-700`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.icon} shadow-md`}>
                    <Icon size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {metric.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? (
                      <span className="inline-block h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                    ) : (
                      metric.value
                    )}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.description}
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
                <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  System Operational
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <Activity size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Updated: <span className="font-semibold text-gray-900 dark:text-white">
                    {loading ? 'Loading...' : lastUpdated}
                  </span>
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Auto-refresh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;