import React from "react";
import Icon from "../../../components/AppIcon";

const ReviewSelection = ({ bookingDetails, onContinue }) => {
  return (
    <div>
      <h2 className="text-h3 mb-4">Review Your Selection</h2>
      
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-h4">Venue Details</h3>
          <div className="flex items-center">
            <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{bookingDetails.venue.rating}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex">
            <Icon name="MapPin" size={18} className="text-gray-500 mr-2 flex-shrink-0" />
            <span className="text-gray-800">{bookingDetails.venue.location}</span>
          </div>
          
          <div className="flex">
            <Icon name="Calendar" size={18} className="text-gray-500 mr-2 flex-shrink-0" />
            <span className="text-gray-800">{bookingDetails.date}</span>
          </div>
          
          <div className="flex">
            <Icon name="Clock" size={18} className="text-gray-500 mr-2 flex-shrink-0" />
            <span className="text-gray-800">{bookingDetails.timeSlot}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">Venue Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {bookingDetails.venue.amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card p-4 mb-6">
        <h3 className="text-h4 mb-3">Cancellation Policy</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-1" />
            <span>Full refund if cancelled 24 hours before the booking time</span>
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={16} className="text-primary-600 mr-2 mt-1" />
            <span>50% refund if cancelled between 12-24 hours before the booking</span>
          </li>
          <li className="flex items-start">
            <Icon name="X" size={16} className="text-error-600 mr-2 mt-1" />
            <span>No refund for cancellations less than 12 hours before the booking</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-end">
        <button onClick={onContinue} className="btn-primary flex items-center">
          <span>Continue to Player Details</span>
          <Icon name="ArrowRight" size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ReviewSelection;