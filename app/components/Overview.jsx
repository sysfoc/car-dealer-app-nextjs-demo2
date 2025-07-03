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
  DollarSign
} from "lucide-react";

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
  }
};

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState("");
  const [isDark, setIsDark] = useState(false);
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
    }
  ]);
  const [loading, setLoading] = useState(true);
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    fetchCarData();
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [selectedCurrency]);

  const fetchCarData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cars');
      const data = await response.json();
      
      const totalCars = data.cars?.length || 0;
      const leaseCars = data.cars?.filter(car => car.isLease)?.length || 0;
      const totalWorth = data.cars?.reduce((sum, car) => sum + (Number(car.price) || 0), 0) || 0;
      
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
        }
      ]);
      
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching car data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchCarData();
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
      doc.text('Vehicle Inventory Report', 20, 65);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated: ${currentDate} at ${currentTime}`, 20, 72);
      doc.text('Period: Current Inventory', pageWidth - 20, 72, { align: 'right' });
      
      // Metrics section
      let yPosition = 90;
      
      doc.setTextColor(45, 55, 72);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Vehicle Statistics', 20, yPosition);
      
      // Draw underline
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
      
      yPosition += 15;
      
      // Metrics data
      const metricsForPdf = [
        { title: 'Total Cars', value: metrics[0].value, description: 'All vehicles in inventory' },
        { title: 'Lease Cars', value: metrics[1].value, description: 'Available for lease' },
        { title: 'Total Inventory Worth', value: metrics[2].value, description: 'Sum of all car prices' }
      ];
      
      // Draw metric cards (2 in first row, 1 in second row)
      const cardWidth = (pageWidth - 60) / 2;
      const cardHeight = 35;
      const spacing = 20;
      
      metricsForPdf.forEach((metric, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        
        // For the third card (index 2), center it
        let x;
        if (index === 2) {
          x = (pageWidth - cardWidth) / 2;
        } else {
          x = 20 + col * (cardWidth + spacing);
        }
        
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
        
        // Description
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text(metric.description, x + 8, y + 30);
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
      doc.text('Vehicle Inventory Management System', pageWidth / 2, yPosition + 16, { align: 'center' });
      doc.text('This report contains sensitive business information and should be handled accordingly.', pageWidth / 2, yPosition + 21, { align: 'center' });
      
      // Save the PDF
      const fileName = `SYSFOC_Inventory_Report_${new Date().toISOString().split('T')[0]}.pdf`;
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
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Vehicle Inventory
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Comprehensive vehicle management dashboard
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
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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
              Auto-refresh: 5 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;