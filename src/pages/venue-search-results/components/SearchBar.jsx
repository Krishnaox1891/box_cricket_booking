import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venue-search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white shadow-sm py-4 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <form 
          onSubmit={handleSearch}
          className="w-full bg-white rounded-lg border border-gray-300 overflow-hidden flex"
        >
          <div className="flex-1 flex items-center px-4">
            <Icon name="MapPin" size={20} className="text-gray-400 mr-2" />
            <input
              type="text" placeholder="Search by city, area, or venue name" className="w-full py-3 px-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium flex items-center"
          >
            <Icon name="Search" size={20} className="mr-2" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;