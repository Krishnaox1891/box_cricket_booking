import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const VenueCard = ({ venue }) => {
  return (
    <Link to={`/venue-details?id=${venue.id}`} className="card-interactive group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium text-gray-800">
          ₹{venue.price}/hr
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{venue.name}</h3>
          <div className="flex items-center">
            <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{venue.rating}</span>
            <span className="ml-1 text-xs text-gray-500">({venue.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span className="text-sm">{venue.location}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {venue.amenities.map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
              {amenity.icon && <Icon name={amenity.icon} size={12} className="mr-1" />}
              {amenity.name}
            </span>
          ))}
        </div>
        <button className="mt-4 w-full btn-primary-small">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default VenueCard;