import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FilterPanel = ({ onFilterChange, activeFilters, clearFilters }) => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  
  const cities = [
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi" },
    { id: "bangalore", name: "Bangalore" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "chennai", name: "Chennai" },
    { id: "kolkata", name: "Kolkata" },
    { id: "pune", name: "Pune" },
    { id: "ahmedabad", name: "Ahmedabad" }
  ];
  
  const facilities = [
    { id: "floodlights", name: "Floodlights", icon: "Lightbulb" },
    { id: "parking", name: "Parking", icon: "ParkingCircle" },
    { id: "washroom", name: "Washroom", icon: "Bath" },
    { id: "equipment", name: "Equipment Rental", icon: "Bat" },
    { id: "cafeteria", name: "Cafeteria", icon: "Coffee" },
    { id: "changing_room", name: "Changing Room", icon: "DoorOpen" },
    { id: "scoreboard", name: "Digital Scoreboard", icon: "MonitorSmartphone" }
  ];
  
  const ratings = [
    { id: "4_plus", name: "4+ Stars", value: 4 },
    { id: "3_plus", name: "3+ Stars", value: 3 },
    { id: "2_plus", name: "2+ Stars", value: 2 }
  ];

  const handleCityChange = (cityId) => {
    const newFilters = { ...activeFilters };
    if (newFilters.cities?.includes(cityId)) {
      newFilters.cities = newFilters.cities.filter(id => id !== cityId);
    } else {
      newFilters.cities = [...(newFilters.cities || []), cityId];
    }
    onFilterChange(newFilters);
  };

  const handleFacilityChange = (facilityId) => {
    const newFilters = { ...activeFilters };
    if (newFilters.facilities?.includes(facilityId)) {
      newFilters.facilities = newFilters.facilities.filter(id => id !== facilityId);
    } else {
      newFilters.facilities = [...(newFilters.facilities || []), facilityId];
    }
    onFilterChange(newFilters);
  };

  const handleRatingChange = (ratingId) => {
    onFilterChange({ ...activeFilters, rating: ratingId });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const index = e.target.name === "min" ? 0 : 1;
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({ ...activeFilters, priceRange: newRange });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
        >
          <Icon name="RefreshCw" size={14} className="mr-1" />
          Reset All
        </button>
      </div>
      
      {/* City Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">City</h4>
        <div className="space-y-2">
          {cities.map(city => (
            <label key={city.id} className="flex items-center">
              <input
                type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={activeFilters.cities?.includes(city.id) || false}
                onChange={() => handleCityChange(city.id)}
              />
              <span className="ml-2 text-gray-700 text-sm">{city.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Facilities Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities</h4>
        <div className="space-y-2">
          {facilities.map(facility => (
            <label key={facility.id} className="flex items-center">
              <input
                type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={activeFilters.facilities?.includes(facility.id) || false}
                onChange={() => handleFacilityChange(facility.id)}
              />
              <span className="ml-2 text-gray-700 text-sm flex items-center">
                <Icon name={facility.icon} size={16} className="mr-1 text-gray-500" />
                {facility.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹/hour)</h4>
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-1/2">
            <input
              type="number" name="min" min="0" max="5000" step="100"
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <label className="text-xs text-gray-500 mt-1 block">Min</label>
          </div>
          <div className="w-1/2">
            <input
              type="number" name="max" min="0" max="5000" step="100"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <label className="text-xs text-gray-500 mt-1 block">Max</label>
          </div>
        </div>
        <div className="relative pt-1">
          <input
            type="range" min="0" max="5000" step="100"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange({ target: { name: "min", value: e.target.value } })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range" min="0" max="5000" step="100"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange({ target: { name: "max", value: e.target.value } })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
        <div className="space-y-2">
          {ratings.map(rating => (
            <label key={rating.id} className="flex items-center">
              <input
                type="radio" name="rating" className="border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={activeFilters.rating === rating.id}
                onChange={() => handleRatingChange(rating.id)}
              />
              <span className="ml-2 text-gray-700 text-sm flex items-center">
                {rating.name}
                <div className="flex ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i}
                      name="Star" 
                      size={12} 
                      className={i < rating.value ? "text-yellow-500 fill-current" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;