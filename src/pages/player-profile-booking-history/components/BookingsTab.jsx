import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import BookingCard from "./BookingCard";

const BookingsTab = ({ bookings }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  
  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) >= new Date() && booking.status.toLowerCase() !== 'cancelled'
  );
  
  const pastBookings = bookings.filter(booking => 
    new Date(booking.date) < new Date() || booking.status.toLowerCase() === 'cancelled'
  );
  
  const displayedBookings = activeFilter === "upcoming" ? upcomingBookings : pastBookings;
  
  return (
    <div>
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg w-full md:w-64">
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeFilter === "upcoming" ?"bg-white shadow-sm text-gray-800" :"text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveFilter("upcoming")}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeFilter === "past" ?"bg-white shadow-sm text-gray-800" :"text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveFilter("past")}
        >
          Past ({pastBookings.length})
        </button>
      </div>
      
      {displayedBookings.length > 0 ? (
        <div className="space-y-6">
          {displayedBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              isPast={activeFilter === "past"} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <Icon 
            name={activeFilter === "upcoming" ? "Calendar" : "ClipboardCheck"} 
            size={48} 
            className="mx-auto text-gray-300 mb-3" 
          />
          <h3 className="text-h4 text-gray-700 mb-2">
            No {activeFilter} bookings
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {activeFilter === "upcoming" ?"You don't have any upcoming bookings. Explore venues and book your next cricket session!" : "You haven't played any matches yet. Book a venue to get started!"
            }
          </p>
          <button className="btn-primary flex items-center mx-auto">
            <Icon name="Search" size={18} className="mr-2" />
            <span>Find Venues</span>
          </button>
        </div>
      )}
      
      {activeFilter === "upcoming" && upcomingBookings.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
          <Icon name="Info" size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Cancellation Policy</h4>
            <p className="text-sm text-blue-700">
              You can cancel your booking up to 24 hours before the scheduled time for a full refund. 
              Cancellations within 24 hours will be charged 50% of the booking amount.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;