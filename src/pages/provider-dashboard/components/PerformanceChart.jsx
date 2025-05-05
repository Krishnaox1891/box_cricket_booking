import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const PerformanceChart = () => {
  const [chartType, setChartType] = useState("revenue");
  
  const revenueData = [
    { name: "Mon", value: 12000 },
    { name: "Tue", value: 9000 },
    { name: "Wed", value: 15000 },
    { name: "Thu", value: 18000 },
    { name: "Fri", value: 22000 },
    { name: "Sat", value: 30000 },
    { name: "Sun", value: 25000 }
  ];
  
  const bookingsData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 12 },
    { name: "Thu", value: 15 },
    { name: "Fri", value: 18 },
    { name: "Sat", value: 25 },
    { name: "Sun", value: 20 }
  ];
  
  const occupancyData = [
    { name: "Mon", value: 60 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 75 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 90 },
    { name: "Sat", value: 95 },
    { name: "Sun", value: 85 }
  ];
  
  const getChartData = () => {
    switch (chartType) {
      case "revenue":
        return revenueData;
      case "bookings":
        return bookingsData;
      case "occupancy":
        return occupancyData;
      default:
        return revenueData;
    }
  };
  
  const getChartTitle = () => {
    switch (chartType) {
      case "revenue":
        return "Weekly Revenue";
      case "bookings":
        return "Weekly Bookings";
      case "occupancy":
        return "Weekly Occupancy Rate (%)";
      default:
        return "Weekly Revenue";
    }
  };
  
  const formatYAxisTick = (value) => {
    if (chartType === "revenue") {
      return `₹${value / 1000}K`;
    } else if (chartType === "occupancy") {
      return `${value}%`;
    }
    return value;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col p-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="mb-2 text-lg font-medium text-gray-800 sm:mb-0">{getChartTitle()}</h3>
        
        <div className="flex p-1 bg-gray-100 rounded-md">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${chartType === 'revenue' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setChartType('revenue')}
          >
            Revenue
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${chartType === 'bookings' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setChartType('bookings')}
          >
            Bookings
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${chartType === 'occupancy' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setChartType('occupancy')}
          >
            Occupancy
          </button>
        </div>
      </div>
      
      <div className="p-4" aria-label={getChartTitle()}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxisTick} />
              <Tooltip 
                formatter={(value) => {
                  if (chartType === "revenue") {
                    return [`₹${value.toLocaleString()}`, "Revenue"];
                  } else if (chartType === "occupancy") {
                    return [`${value}%`, "Occupancy Rate"];
                  }
                  return [value, "Bookings"];
                }}
              />
              <Bar 
                dataKey="value" fill="#10b981" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;