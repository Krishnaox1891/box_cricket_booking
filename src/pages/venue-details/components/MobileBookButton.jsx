import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const MobileBookButton = ({ isSlotSelected, venueId, selectedDate, selectedSlotId }) => {
  const scrollToBookingSection = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      const yOffset = -80; // Adjust for header height
      const y = bookingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
      {isSlotSelected ? (
        <Link 
          to={`/booking-confirmation?venueId=${venueId}&date=${selectedDate.toISOString()}&slotId=${selectedSlotId}`}
          className="btn-primary w-full flex items-center justify-center"
        >
          <Icon name="Calendar" size={18} className="mr-2" />
          <span>Book Now</span>
        </Link>
      ) : (
        <button 
          onClick={scrollToBookingSection}
          className="btn-primary w-full flex items-center justify-center"
        >
          <Icon name="Calendar" size={18} className="mr-2" />
          <span>Check Availability</span>
        </button>
      )}
    </div>
  );
};

export default MobileBookButton;