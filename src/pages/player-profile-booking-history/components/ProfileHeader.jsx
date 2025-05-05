import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProfileHeader = ({ user, onTabChange, activeTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "bookings", label: "Bookings", icon: "Calendar" },
    { id: "settings", label: "Settings", icon: "Settings" }
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-primary-100">
                <Image 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                aria-label="Change profile picture"
              >
                <Icon name="Camera" size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn-secondary-small flex items-center">
              <Icon name="LogOut" size={16} className="mr-1" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
        
        {/* Desktop Tabs */}
        <div className="hidden md:flex mt-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 font-medium text-sm mr-8 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600" :"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon name={tab.icon} size={18} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Mobile Tabs */}
        <div className="md:hidden mt-4">
          <button 
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex items-center">
              <Icon name={tabs.find(tab => tab.id === activeTab)?.icon} size={18} className="mr-2 text-primary-600" />
              <span className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</span>
            </div>
            <Icon name={isMenuOpen ? "ChevronUp" : "ChevronDown"} size={20} />
          </button>
          
          {isMenuOpen && (
            <div className="mt-2 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeTab === tab.id
                      ? "bg-primary-50 text-primary-600" :"text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon name={tab.icon} size={18} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;