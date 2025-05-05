import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Icon name="Cricket" size={20} color="#059669" className="mr-2" />
            <span className="text-gray-700 font-medium">BoxCricket</span>
            <span className="text-gray-500 text-sm ml-2">
              &copy; {currentYear} All rights reserved
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;