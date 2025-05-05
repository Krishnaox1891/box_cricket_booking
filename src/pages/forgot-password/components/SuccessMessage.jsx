import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const SuccessMessage = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
        <Icon name="CheckCircle" size={40} className="text-emerald-600" />
      </div>
      
      <h2 className="text-h2 mb-3">Password Reset Successful!</h2>
      
      <p className="text-gray-600 mb-8">
        Your password has been reset successfully. You can now log in with your new password.
      </p>
      
      <Link to="/player-login" className="btn-primary w-full inline-block">
        Go to Login
      </Link>
    </div>
  );
};

export default SuccessMessage;