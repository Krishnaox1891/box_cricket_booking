import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venue-search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[500px] md:h-[600px] bg-gray-900">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1905&q=80')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
          Find and Book the Best Box Cricket Venues Near You
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
          Discover top-rated box cricket venues, check availability, and book your slot in minutes
        </p>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden flex"
        >
          <div className="flex-1 flex items-center px-4">
            <Icon name="MapPin" size={20} className="text-gray-400 mr-2" />
            <input
              type="text" placeholder="Search by city, area, or venue name" className="w-full py-4 px-2 focus:outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 font-medium flex items-center"
          >
            <Icon name="Search" size={20} className="mr-2" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;