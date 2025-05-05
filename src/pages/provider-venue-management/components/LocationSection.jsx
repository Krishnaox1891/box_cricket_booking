import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const LocationSection = ({ venueData, onChange }) => {
  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(true);

  const handleChange = (field, value) => {
    const newErrors = { ...errors };
    
    // Validation
    if (field === 'address') {
      if (!value.trim()) {
        newErrors.address = "Address is required";
      } else if (value.length < 10) {
        newErrors.address = "Please enter a complete address";
      } else {
        delete newErrors.address;
      }
    }
    
    if (field === 'city') {
      if (!value.trim()) {
        newErrors.city = "City is required";
      } else {
        delete newErrors.city;
      }
    }
    
    if (field === 'pincode') {
      const pincodeRegex = /^[0-9]{6}$/;
      if (!value.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!pincodeRegex.test(value)) {
        newErrors.pincode = "Enter a valid 6-digit pincode";
      } else {
        delete newErrors.pincode;
      }
    }
    
    setErrors(newErrors);
    onChange(field, value);
  };

  const handleMapPinDrop = () => {
    // In a real implementation, this would update lat/lng based on map interaction
    onChange('latitude', '19.0760');
    onChange('longitude', '72.8777');
    onChange('address', '123 Cricket Lane, Andheri East');
    onChange('city', 'Mumbai');
    onChange('state', 'Maharashtra');
    onChange('pincode', '400069');
  };

  return (
    <section id="location" className="py-6 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Location</h2>
        <p className="text-gray-600">
          Specify where your venue is located so players can find it easily
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="venue-address" className="text-label block mb-1">
              Address <span className="text-error-600">*</span>
            </label>
            <input
              id="venue-address" type="text"
              className={`input-default ${errors.address ? 'input-error' : ''}`}
              placeholder="Street address"
              value={venueData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-error-600">{errors.address}</p>
            )}
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="venue-city" className="text-label block mb-1">
              City <span className="text-error-600">*</span>
            </label>
            <input
              id="venue-city" type="text"
              className={`input-default ${errors.city ? 'input-error' : ''}`}
              placeholder="City"
              value={venueData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-error-600">{errors.city}</p>
            )}
          </div>
          
          {/* State */}
          <div>
            <label htmlFor="venue-state" className="text-label block mb-1">
              State <span className="text-error-600">*</span>
            </label>
            <select
              id="venue-state" className="input-default"
              value={venueData.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Delhi">Delhi</option>
              <option value="Telangana">Telangana</option>
              <option value="Gujarat">Gujarat</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>
          
          {/* Pincode */}
          <div>
            <label htmlFor="venue-pincode" className="text-label block mb-1">
              Pincode <span className="text-error-600">*</span>
            </label>
            <input
              id="venue-pincode" type="text"
              className={`input-default ${errors.pincode ? 'input-error' : ''}`}
              placeholder="6-digit pincode"
              value={venueData.pincode || ''}
              onChange={(e) => handleChange('pincode', e.target.value)}
              maxLength={6}
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-error-600">{errors.pincode}</p>
            )}
          </div>
          
          {/* Landmark */}
          <div>
            <label htmlFor="venue-landmark" className="text-label block mb-1">
              Landmark (Optional)
            </label>
            <input
              id="venue-landmark" type="text" className="input-default" placeholder="Nearby landmark for easy navigation"
              value={venueData.landmark || ''}
              onChange={(e) => handleChange('landmark', e.target.value)}
            />
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-h4">Map Location</h3>
            <button 
              onClick={() => setShowMap(!showMap)} 
              className="text-primary-600 text-sm font-medium flex items-center"
            >
              {showMap ? (
                <>
                  <Icon name="EyeOff" size={16} className="mr-1" />
                  <span>Hide Map</span>
                </>
              ) : (
                <>
                  <Icon name="Eye" size={16} className="mr-1" />
                  <span>Show Map</span>
                </>
              )}
            </button>
          </div>
          
          {showMap && (
            <div className="relative">
              <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  width="100%" height="100%" loading="lazy" title="Venue Location" referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${venueData.latitude || '19.0760'},${venueData.longitude || '72.8777'}&z=14&output=embed`}>
                </iframe>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {venueData.latitude && venueData.longitude ? (
                    <span>
                      <Icon name="MapPin" size={16} className="inline mr-1 text-primary-600" />
                      Location set at {venueData.latitude}, {venueData.longitude}
                    </span>
                  ) : (
                    <span>
                      <Icon name="AlertCircle" size={16} className="inline mr-1 text-warning-600" />
                      No location set. Please drop a pin on the map.
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={handleMapPinDrop}
                  className="btn-secondary-small flex items-center"
                >
                  <Icon name="MapPin" size={16} className="mr-1" />
                  <span>Drop Pin</span>
                </button>
              </div>
            </div>
          )}
          
          <p className="mt-4 text-sm text-gray-500 flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 text-info-600" />
            <span>Accurate location helps players find your venue easily. You can either enter the address manually or drop a pin on the map.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;