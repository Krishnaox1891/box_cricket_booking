import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MetricCard from "./components/MetricCard";
import CalendarView from "./components/CalendarView";
import UpcomingBookings from "./components/UpcomingBookings";
import NotificationCenter from "./components/NotificationCenter";
import PerformanceChart from "./components/PerformanceChart";
import PopularTimeSlots from "./components/PopularTimeSlots";
import Icon from "../../components/AppIcon";

const ProviderDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = "Provider Dashboard - BoxCricket";
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your venues today.</p>
          </div>
          
          {/* Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Total Bookings" value="128" change="12%" changeType="increase" icon="Calendar" iconBg="bg-emerald-500"
            />
            <MetricCard 
              title="Revenue" value="₹1,52,400" change="8%" changeType="increase" icon="DollarSign" iconBg="bg-blue-500"
            />
            <MetricCard 
              title="Occupancy Rate" value="78%" change="5%" changeType="increase" icon="BarChart2" iconBg="bg-purple-500"
            />
            <MetricCard 
              title="Cancellations" value="12" change="3%" changeType="decrease" icon="XCircle" iconBg="bg-red-500"
            />
          </div>
          
          {/* Calendar Section */}
          <div className="mb-6">
            <CalendarView />
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PerformanceChart />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PopularTimeSlots />
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md">
                      <div className="p-2 bg-emerald-100 rounded-md mr-3">
                        <Icon name="Plus" size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Add New Venue</div>
                        <div className="text-sm text-gray-600">Create a new venue listing</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md">
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <Icon name="CalendarRange" size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Manage Time Slots</div>
                        <div className="text-sm text-gray-600">Configure availability</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md">
                      <div className="p-2 bg-purple-100 rounded-md mr-3">
                        <Icon name="Tag" size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Special Offers</div>
                        <div className="text-sm text-gray-600">Create promotions</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <UpcomingBookings />
              <NotificationCenter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;