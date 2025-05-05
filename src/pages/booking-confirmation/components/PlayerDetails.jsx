import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PlayerDetails = ({ playerInfo, onBack, onContinue }) => {
  const [formData, setFormData] = useState({
    name: playerInfo.name || "",
    email: playerInfo.email || "",
    phone: playerInfo.phone || "",
    teamSize: playerInfo.teamSize || "10",
    specialRequests: playerInfo.specialRequests || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onContinue(formData);
    }
  };

  return (
    <div>
      <h2 className="text-h3 mb-4">Player Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-label block mb-1">
            Full Name
          </label>
          <input
            type="text" id="name" name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : "input-default"}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-error-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-label block mb-1">
              Email Address
            </label>
            <input
              type="email" id="email" name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : "input-default"}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-error-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="text-label block mb-1">
              Phone Number
            </label>
            <input
              type="tel" id="phone" name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "input-error" : "input-default"}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && (
              <p className="text-error-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="teamSize" className="text-label block mb-1">
            Team Size
          </label>
          <select
            id="teamSize" name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="input-default"
          >
            <option value="6">6 Players</option>
            <option value="8">8 Players</option>
            <option value="10">10 Players</option>
            <option value="12">12 Players</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="text-label block mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests" name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3" className="input-default" placeholder="Any special requirements or notes for the venue"
          ></textarea>
        </div>
        
        <div className="flex justify-between pt-4">
          <button 
            type="button" 
            onClick={onBack}
            className="btn-secondary flex items-center"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            <span>Back</span>
          </button>
          
          <button 
            type="submit" className="btn-primary flex items-center"
          >
            <span>Continue to Payment</span>
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerDetails;