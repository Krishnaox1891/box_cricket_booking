import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/player-landing-page" className="flex items-center space-x-2">
          <Icon name="Cricket" size={28} color="#059669" />
          <span className="text-xl font-bold text-gray-800">BoxCricket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/venue-search-results" className="text-primary-600 font-medium">
            Find Venues
          </Link>
          <Link to="/player-profile-booking-history" className="text-gray-600 hover:text-primary-600 font-medium">
            My Bookings
          </Link>
          <Link to="/player-login" className="btn-secondary-small">
            Log In
          </Link>
          <Link to="/player-registration" className="btn-primary-small">
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/venue-search-results" className="text-primary-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Venues
            </Link>
            <Link 
              to="/player-profile-booking-history" className="text-gray-600 hover:text-primary-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              My Bookings
            </Link>
            <div className="flex space-x-4 pt-2">
              <Link 
                to="/player-login" className="btn-secondary-small flex-1 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/player-registration" className="btn-primary-small flex-1 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;