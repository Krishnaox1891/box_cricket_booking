import React, { useState } from "react";


const BasicInfoSection = ({ venueData, onChange }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const newErrors = { ...errors };
    
    // Validation
    if (field === 'name') {
      if (!value.trim()) {
        newErrors.name = "Venue name is required";
      } else if (value.length < 5) {
        newErrors.name = "Venue name must be at least 5 characters";
      } else {
        delete newErrors.name;
      }
    }
    
    if (field === 'description') {
      if (!value.trim()) {
        newErrors.description = "Description is required";
      } else if (value.length < 50) {
        newErrors.description = "Description must be at least 50 characters";
      } else {
        delete newErrors.description;
      }
    }
    
    if (field === 'phone') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!value.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(value)) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      } else {
        delete newErrors.phone;
      }
    }
    
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        newErrors.email = "Enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }
    
    setErrors(newErrors);
    onChange(field, value);
  };

  return (
    <section id="basic-info" className="py-6">
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Basic Information</h2>
        <p className="text-gray-600">
          Provide essential details about your venue that players will see first
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Venue Name */}
        <div>
          <label htmlFor="venue-name" className="text-label block mb-1">
            Venue Name <span className="text-error-600">*</span>
          </label>
          <input
            id="venue-name" type="text"
            className={`input-default ${errors.name ? 'input-error' : ''}`}
            placeholder="e.g., Cricket Hub Arena"
            value={venueData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength={50}
          />
          {errors.name ? (
            <p className="mt-1 text-sm text-error-600">{errors.name}</p>
          ) : (
            <p className="mt-1 text-sm text-gray-500 flex justify-between">
              <span>Make it catchy and memorable</span>
              <span>{(venueData.name || '').length}/50</span>
            </p>
          )}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="venue-description" className="text-label block mb-1">
            Description <span className="text-error-600">*</span>
          </label>
          <textarea
            id="venue-description"
            className={`input-default min-h-[120px] ${errors.description ? 'input-error' : ''}`}
            placeholder="Describe your venue, its unique features, and what makes it special..."
            value={venueData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            maxLength={1000}
          ></textarea>
          {errors.description ? (
            <p className="mt-1 text-sm text-error-600">{errors.description}</p>
          ) : (
            <p className="mt-1 text-sm text-gray-500 flex justify-between">
              <span>Highlight special features, pitch quality, and atmosphere</span>
              <span>{(venueData.description || '').length}/1000</span>
            </p>
          )}
        </div>
        
        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-h4 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="venue-phone" className="text-label block mb-1">
                Phone Number <span className="text-error-600">*</span>
              </label>
              <input
                id="venue-phone" type="tel"
                className={`input-default ${errors.phone ? 'input-error' : ''}`}
                placeholder="e.g., 9876543210"
                value={venueData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="venue-email" className="text-label block mb-1">
                Email <span className="text-error-600">*</span>
              </label>
              <input
                id="venue-email" type="email"
                className={`input-default ${errors.email ? 'input-error' : ''}`}
                placeholder="e.g., venue@example.com"
                value={venueData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="venue-website" className="text-label block mb-1">
                Website (Optional)
              </label>
              <input
                id="venue-website" type="url" className="input-default" placeholder="e.g., https://www.yourvenuewebsite.com"
                value={venueData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;