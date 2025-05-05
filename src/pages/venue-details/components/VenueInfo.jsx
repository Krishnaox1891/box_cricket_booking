import React from "react";
import Icon from "../../../components/AppIcon";

const VenueInfo = ({ venue }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h1 className="text-h1 mb-2">{venue.name}</h1>
          <div className="flex items-center mb-2">
            <Icon name="MapPin" size={18} className="text-gray-600 mr-1" />
            <span className="text-gray-700">{venue.address}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="flex items-center mb-2">
            <Icon name="Star" size={20} className="text-yellow-500 fill-current mr-1" />
            <span className="font-semibold text-lg">{venue.rating}</span>
            <span className="text-gray-600 ml-1">({venue.reviewCount} reviews)</span>
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">₹{venue.priceRange.min} - ₹{venue.priceRange.max}</span> per hour
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-h4 mb-3">About this venue</h3>
        <p className="text-gray-700 mb-4">{venue.description}</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center">
            <Icon name="Clock" size={18} className="text-gray-600 mr-2" />
            <span className="text-gray-700">
              <span className="font-medium">Hours:</span> {venue.openingHours}
            </span>
          </div>
          <div className="flex items-center">
            <Icon name="Phone" size={18} className="text-gray-600 mr-2" />
            <span className="text-gray-700">
              <span className="font-medium">Contact:</span> {venue.contactNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;