import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/player-landing-page" className="flex items-center space-x-2">
          <Icon name="Cricket" size={28} color="#059669" />
          <span className="text-xl font-bold text-gray-800">BoxCricket</span>
        </Link>

        <Link to="/player-login" className="btn-secondary-small">
          Back to Login
        </Link>
      </div>
    </header>
  );
};

export default Header;