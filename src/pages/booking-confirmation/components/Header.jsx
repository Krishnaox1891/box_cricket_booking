import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/player-landing-page" className="flex items-center space-x-2">
          <Icon name="Cricket" size={28} color="#059669" />
          <span className="text-xl font-bold text-gray-800">BoxCricket</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/venue-search-results" className="hidden md:block text-gray-600 hover:text-primary-600 font-medium">
            Find Venues
          </Link>
          <Link to="/player-profile-booking-history" className="hidden md:block text-gray-600 hover:text-primary-600 font-medium">
            My Bookings
          </Link>
          <div className="flex items-center space-x-1">
            <Icon name="User" size={20} className="text-gray-600" />
            <span className="text-gray-800 font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;