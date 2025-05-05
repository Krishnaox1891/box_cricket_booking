import React from "react";
import Icon from "../../../components/AppIcon";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center lg:hidden">
        <button
          className="p-1 mr-4 text-gray-600 rounded-md hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Icon name="Menu" size={24} />
        </button>
      </div>
      
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name="Search" size={18} className="text-gray-400" />
          </div>
          <input
            type="text" placeholder="Search bookings, customers..." className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-1 text-gray-600 rounded-md hover:bg-gray-100">
          <Icon name="Bell" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="relative p-1 text-gray-600 rounded-md hover:bg-gray-100">
          <Icon name="MessageSquare" size={20} />
        </button>
        
        <button className="relative p-1 text-gray-600 rounded-md hover:bg-gray-100">
          <Icon name="HelpCircle" size={20} />
        </button>
        
        <div className="w-px h-6 bg-gray-300"></div>
        
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full">
            <Icon name="User" size={20} className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;