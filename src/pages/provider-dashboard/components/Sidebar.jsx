import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: "LayoutDashboard",
      path: "/provider-dashboard",
    },
    {
      title: "Venue Management",
      icon: "MapPin",
      path: "/provider-venue-management",
    },
    {
      title: "Slot Configuration",
      icon: "Calendar",
      path: "/slot-configuration",
    },
    {
      title: "Bookings",
      icon: "BookOpen",
      path: "/bookings",
    },
    {
      title: "Customers",
      icon: "Users",
      path: "/customers",
    },
    {
      title: "Reports",
      icon: "BarChart2",
      path: "/reports",
    },
    {
      title: "Settings",
      icon: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <Link to="/provider-dashboard" className="flex items-center space-x-2">
          <Icon name="Cricket" size={28} color="#059669" />
          <span className="text-xl font-bold text-gray-800">BoxCricket</span>
        </Link>
        <button 
          className="p-1 text-gray-600 rounded-md lg:hidden hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center p-3 mb-6 space-x-3 bg-gray-100 rounded-lg">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
            <Icon name="User" size={24} className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Venue Manager</p>
            <p className="text-xs text-gray-500">Cricket Hub Arena</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group ${
                location.pathname === item.path
                  ? "bg-emerald-50 text-emerald-700" :"text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`mr-3 ${
                  location.pathname === item.path
                    ? "text-emerald-600" :"text-gray-500 group-hover:text-gray-600"
                }`} 
              />
              {item.title}
              {location.pathname === item.path && (
                <div className="w-1 h-8 ml-auto bg-emerald-600 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <Link to="/player-landing-page" className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50">
          <Icon name="LogOut" size={20} className="mr-3 text-gray-500" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;