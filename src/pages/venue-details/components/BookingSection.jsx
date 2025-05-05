import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvailabilityCalendar from "./AvailabilityCalendar";
import TimeSlots from "./TimeSlots";
import Icon from "../../../components/AppIcon";

const BookingSection = ({ venue }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Mock time slots data based on selected date
  const getTimeSlots = (date) => {
    // This would normally come from an API
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isWeekend = day === 0 || day === 6;
    
    // Generate different availability patterns based on weekday/weekend
    return [
      {
        id: 1,
        startTime: "06:00",
        endTime: "07:00",
        price: isWeekend ? 1200 : 1000,
        available: true,
        isPeakHour: false
      },
      {
        id: 2,
        startTime: "07:00",
        endTime: "08:00",
        price: isWeekend ? 1200 : 1000,
        available: false,
        isPeakHour: false
      },
      {
        id: 3,
        startTime: "08:00",
        endTime: "09:00",
        price: isWeekend ? 1300 : 1100,
        available: true,
        isPeakHour: false
      },
      {
        id: 4,
        startTime: "09:00",
        endTime: "10:00",
        price: isWeekend ? 1300 : 1100,
        available: true,
        isPeakHour: false
      },
      {
        id: 5,
        startTime: "10:00",
        endTime: "11:00",
        price: isWeekend ? 1300 : 1100,
        available: false,
        isPeakHour: false
      },
      {
        id: 6,
        startTime: "11:00",
        endTime: "12:00",
        price: isWeekend ? 1300 : 1100,
        available: true,
        isPeakHour: false
      },
      {
        id: 7,
        startTime: "12:00",
        endTime: "13:00",
        price: isWeekend ? 1400 : 1200,
        available: true,
        isPeakHour: false
      },
      {
        id: 8,
        startTime: "13:00",
        endTime: "14:00",
        price: isWeekend ? 1400 : 1200,
        available: false,
        isPeakHour: false
      },
      {
        id: 9,
        startTime: "14:00",
        endTime: "15:00",
        price: isWeekend ? 1400 : 1200,
        available: true,
        isPeakHour: false
      },
      {
        id: 10,
        startTime: "15:00",
        endTime: "16:00",
        price: isWeekend ? 1400 : 1200,
        available: true,
        isPeakHour: false
      },
      {
        id: 11,
        startTime: "16:00",
        endTime: "17:00",
        price: isWeekend ? 1400 : 1200,
        available: false,
        isPeakHour: false
      },
      {
        id: 12,
        startTime: "17:00",
        endTime: "18:00",
        price: isWeekend ? 1600 : 1400,
        available: true,
        isPeakHour: true
      },
      {
        id: 13,
        startTime: "18:00",
        endTime: "19:00",
        price: isWeekend ? 1600 : 1400,
        available: false,
        isPeakHour: true
      },
      {
        id: 14,
        startTime: "19:00",
        endTime: "20:00",
        price: isWeekend ? 1600 : 1400,
        available: true,
        isPeakHour: true
      },
      {
        id: 15,
        startTime: "20:00",
        endTime: "21:00",
        price: isWeekend ? 1600 : 1400,
        available: true,
        isPeakHour: true
      },
      {
        id: 16,
        startTime: "21:00",
        endTime: "22:00",
        price: isWeekend ? 1600 : 1400,
        available: false,
        isPeakHour: true
      },
      {
        id: 17,
        startTime: "22:00",
        endTime: "23:00",
        price: isWeekend ? 1500 : 1300,
        available: true,
        isPeakHour: false
      }
    ];
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  const timeSlots = getTimeSlots(selectedDate);
  
  return (
    <section id="booking" className="mb-12">
      <h2 className="text-h2 mb-6">Check Availability & Book</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-h4 mb-4">Select Date</h3>
          <AvailabilityCalendar onDateChange={handleDateChange} />
        </div>
        
        <div>
          <h3 className="text-h4 mb-4">Available Time Slots</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center">
                <Icon name="Calendar" size={18} className="text-gray-600 mr-2" />
                <span className="font-medium">{formatDate(selectedDate)}</span>
              </div>
            </div>
            
            <TimeSlots 
              slots={timeSlots} 
              selectedSlot={selectedSlot} 
              onSelectSlot={handleSlotSelect} 
            />
          </div>
        </div>
      </div>
      
      {/* Booking Summary & CTA */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-h4 mb-4">Booking Summary</h3>
        
        {selectedSlot ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Date:</span>
              <span className="font-medium">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Time:</span>
              <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Price:</span>
              <span className="font-medium">₹{selectedSlot.price}</span>
            </div>
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <Link 
                to={`/booking-confirmation?venueId=${venue.id}&date=${selectedDate.toISOString()}&slotId=${selectedSlot.id}`}
                className="btn-primary w-full text-center"
              >
                Book Now
              </Link>
              <p className="text-sm text-gray-600 mt-2 text-center">
                You won't be charged until you confirm on the next page
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Calendar" size={40} className="text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">Select a date and time slot to continue</p>
            <button className="btn-primary-disabled w-full" disabled>
              Book Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;