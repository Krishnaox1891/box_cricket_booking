import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const BookingSummary = ({ bookingDetails, isCollapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="card">
      {isCollapsible && (
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-h4">Booking Summary</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500"
          >
            <Icon
              name={isCollapsed ? "ChevronDown" : "ChevronUp"}
              size={20}
            />
          </button>
        </div>
      )}

      <div className={`${isCollapsible && isCollapsed ? "hidden" : "block"} p-4`}>
        <div className="flex items-start mb-4">
          <div className="w-20 h-20 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <Image
              src={bookingDetails.venue.image}
              alt={bookingDetails.venue.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-h4 mb-1">{bookingDetails.venue.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Icon name="MapPin" size={16} className="mr-1" />
              <span>{bookingDetails.venue.location}</span>
            </div>
            <Link
              to={`/venue-details?id=${bookingDetails.venue.id}`}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <span>View Venue</span>
              <Icon name="ExternalLink" size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex items-center mb-2">
            <Icon name="Calendar" size={18} className="text-gray-500 mr-2" />
            <span className="text-gray-800">
              {bookingDetails.date}
            </span>
          </div>
          <div className="flex items-center">
            <Icon name="Clock" size={18} className="text-gray-500 mr-2" />
            <span className="text-gray-800">
              {bookingDetails.timeSlot}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Base Price</span>
            <span className="text-gray-800">₹{bookingDetails.basePrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">GST (18%)</span>
            <span className="text-gray-800">₹{bookingDetails.gst}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Booking Fee</span>
            <span className="text-gray-800">₹{bookingDetails.bookingFee}</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200 mt-2">
            <span>Total</span>
            <span className="text-primary-700">₹{bookingDetails.totalPrice}</span>
          </div>
        </div>

        {bookingDetails.holdExpiryTime && (
          <div className="mt-4 bg-warning-100 p-3 rounded-md flex items-center">
            <Icon name="Clock" size={18} className="text-warning-600 mr-2" />
            <span className="text-sm text-warning-600">
              Slot reserved for {bookingDetails.holdExpiryTime} minutes
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;