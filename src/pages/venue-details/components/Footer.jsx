import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Cricket" size={24} color="#10b981" />
              <span className="text-xl font-bold text-white">BoxCricket</span>
            </div>
            <p className="mb-4">
              Find and book the best box cricket venues in your city. Easy booking, secure payments, and hassle-free cricket experience.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white" aria-label="Facebook">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-white" aria-label="Twitter">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-white" aria-label="Instagram">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-white" aria-label="YouTube">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/venue-search-results" className="hover:text-white">Find Venues</Link>
              </li>
              <li>
                <Link to="/player-profile-booking-history" className="hover:text-white">My Bookings</Link>
              </li>
              <li>
                <Link to="/player-registration" className="hover:text-white">Register</Link>
              </li>
              <li>
                <Link to="/player-login" className="hover:text-white">Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Cancellation Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="MapPin" size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Cricket Lane, Sports Complex, Mumbai 400001</span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" size={18} className="mr-2 flex-shrink-0" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" size={18} className="mr-2 flex-shrink-0" />
                <span>info@boxcricket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} BoxCricket. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;