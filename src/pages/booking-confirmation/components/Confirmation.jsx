import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Confirmation = ({ bookingDetails, paymentDetails }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={40} className="text-primary-600" />
        </div>
        <h2 className="text-h2 text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-subtitle">
          Your booking has been successfully confirmed. We've sent the details to your email.
        </p>
      </div>
      
      <div className="card p-6 mb-8 text-left">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-h3">Booking Details</h3>
          <span className="badge-confirmed">Confirmed</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Booking ID</span>
            <span className="font-medium">{bookingDetails.bookingId}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Venue</span>
            <span className="font-medium">{bookingDetails.venue.name}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Date</span>
            <span className="font-medium">{bookingDetails.date}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Time</span>
            <span className="font-medium">{bookingDetails.timeSlot}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Transaction ID</span>
            <span className="font-medium">{paymentDetails.transactionId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-medium text-primary-700">₹{bookingDetails.totalPrice}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button className="btn-secondary flex items-center justify-center">
          <Icon name="Calendar" size={18} className="mr-2" />
          <span>Add to Calendar</span>
        </button>
        
        <button className="btn-secondary flex items-center justify-center">
          <Icon name="Share2" size={18} className="mr-2" />
          <span>Share Details</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/player-profile-booking-history" className="btn-primary flex items-center justify-center">
          <Icon name="List" size={18} className="mr-2" />
          <span>View My Bookings</span>
        </Link>
        
        <Link to="/venue-search-results" className="btn-secondary flex items-center justify-center">
          <Icon name="Search" size={18} className="mr-2" />
          <span>Find More Venues</span>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;