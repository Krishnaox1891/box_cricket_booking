import React from "react";
import Icon from "../../../components/AppIcon";

const ActiveFilters = ({ filters, onRemoveFilter, facilities, cities }) => {
  if (!filters.cities?.length && !filters.facilities?.length && !filters.rating) {
    return null;
  }

  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : cityId;
  };

  const getFacilityName = (facilityId) => {
    const facility = facilities.find(f => f.id === facilityId);
    return facility ? facility.name : facilityId;
  };

  const getRatingName = (ratingId) => {
    switch(ratingId) {
      case "4_plus": return "4+ Stars";
      case "3_plus": return "3+ Stars";
      case "2_plus": return "2+ Stars";
      default: return ratingId;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.cities?.map(cityId => (
        <div 
          key={`city-${cityId}`}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
        >
          <Icon name="MapPin" size={14} className="mr-1" />
          {getCityName(cityId)}
          <button 
            onClick={() => onRemoveFilter('city', cityId)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      
      {filters.facilities?.map(facilityId => (
        <div 
          key={`facility-${facilityId}`}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
        >
          {getFacilityName(facilityId)}
          <button 
            onClick={() => onRemoveFilter('facility', facilityId)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      
      {filters.rating && (
        <div 
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
        >
          <Icon name="Star" size={14} className="mr-1 text-yellow-500" />
          {getRatingName(filters.rating)}
          <button 
            onClick={() => onRemoveFilter('rating', filters.rating)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      )}
      
      {filters.priceRange && (
        <div 
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
        >
          <Icon name="IndianRupee" size={14} className="mr-1" />
          {`₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`}
          <button 
            onClick={() => onRemoveFilter('priceRange', null)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;