import React, { useState } from "react";


const PricingSection = ({ venueData, onChange }) => {
  const [errors, setErrors] = useState({});
  const [showPeakPricing, setShowPeakPricing] = useState(venueData.hasPeakPricing || false);

  const handleChange = (field, value) => {
    const newErrors = { ...errors };
    
    // Validation for numeric fields
    if (['basePrice', 'peakPrice', 'weekendPrice'].includes(field)) {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue <= 0) {
        newErrors[field] = "Please enter a valid price";
      } else {
        delete newErrors[field];
      }
    }
    
    setErrors(newErrors);
    onChange(field, value);
  };

  const handlePeakPricingToggle = (enabled) => {
    setShowPeakPricing(enabled);
    onChange('hasPeakPricing', enabled);
  };

  const timeSlots = [
    { id: "morning", label: "Morning (6 AM - 12 PM)" },
    { id: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
    { id: "evening", label: "Evening (4 PM - 8 PM)" },
    { id: "night", label: "Night (8 PM - 12 AM)" }
  ];

  return (
    <section id="pricing" className="py-6 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Pricing</h2>
        <p className="text-gray-600">
          Set your venue's hourly rates and special pricing options
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Base Price */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Standard Pricing</h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="base-price" className="text-label block mb-1">
                  Base Hourly Rate (₹) <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    id="base-price" type="number" min="0" step="50"
                    className={`input-default pl-8 ${errors.basePrice ? 'input-error' : ''}`}
                    placeholder="e.g., 1000"
                    value={venueData.basePrice || ''}
                    onChange={(e) => handleChange('basePrice', e.target.value)}
                  />
                </div>
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-error-600">{errors.basePrice}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  This is your standard hourly rate for regular bookings
                </p>
              </div>
              
              <div>
                <label htmlFor="slot-duration" className="text-label block mb-1">
                  Minimum Booking Duration <span className="text-error-600">*</span>
                </label>
                <select
                  id="slot-duration" className="input-default"
                  value={venueData.minDuration || '1'}
                  onChange={(e) => handleChange('minDuration', e.target.value)}
                >
                  <option value="1">1 hour</option>
                  <option value="1.5">1.5 hours</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-label block mb-2">
                Available Time Slots <span className="text-error-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <label key={slot.id} className="flex items-center">
                    <input
                      type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      checked={venueData.availableSlots?.[slot.id] || false}
                      onChange={(e) => {
                        const updatedSlots = { ...(venueData.availableSlots || {}) };
                        updatedSlots[slot.id] = e.target.checked;
                        onChange('availableSlots', updatedSlots);
                      }}
                    />
                    <span className="ml-2 text-gray-700">{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Special Pricing */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Special Pricing Options</h3>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showPeakPricing ? "bg-primary-600" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={showPeakPricing}
              onClick={() => handlePeakPricingToggle(!showPeakPricing)}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showPeakPricing ? "translate-x-5" : "translate-x-0"
                }`}
              ></span>
            </button>
          </div>
          
          {showPeakPricing && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weekend-price" className="text-label block mb-1">
                    Weekend Rate (₹) <span className="text-error-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      id="weekend-price" type="number" min="0" step="50"
                      className={`input-default pl-8 ${errors.weekendPrice ? 'input-error' : ''}`}
                      placeholder="e.g., 1200"
                      value={venueData.weekendPrice || ''}
                      onChange={(e) => handleChange('weekendPrice', e.target.value)}
                    />
                  </div>
                  {errors.weekendPrice && (
                    <p className="mt-1 text-sm text-error-600">{errors.weekendPrice}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Rate for Friday, Saturday, and Sunday
                  </p>
                </div>
                
                <div>
                  <label htmlFor="peak-price" className="text-label block mb-1">
                    Peak Hours Rate (₹) <span className="text-error-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      id="peak-price" type="number" min="0" step="50"
                      className={`input-default pl-8 ${errors.peakPrice ? 'input-error' : ''}`}
                      placeholder="e.g., 1500"
                      value={venueData.peakPrice || ''}
                      onChange={(e) => handleChange('peakPrice', e.target.value)}
                    />
                  </div>
                  {errors.peakPrice && (
                    <p className="mt-1 text-sm text-error-600">{errors.peakPrice}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Rate for evening slots (4 PM - 10 PM)
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="pricing-notes" className="text-label block mb-1">
                  Additional Pricing Notes (Optional)
                </label>
                <textarea
                  id="pricing-notes" className="input-default min-h-[80px]" placeholder="e.g., Special discounts for regular customers, corporate packages, etc."
                  value={venueData.pricingNotes || ''}
                  onChange={(e) => handleChange('pricingNotes', e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
          
          {!showPeakPricing && (
            <div className="p-4 text-center">
              <p className="text-gray-600">
                Enable special pricing to set different rates for weekends and peak hours
              </p>
            </div>
          )}
        </div>
        
        {/* Cancellation Policy */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-h4 mb-3">Cancellation Policy</h3>
          
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="radio" name="cancellation-policy" className="mt-1 rounded-full border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={venueData.cancellationPolicy === 'flexible'}
                onChange={() => handleChange('cancellationPolicy', 'flexible')}
              />
              <div className="ml-2">
                <span className="font-medium text-gray-800 block">Flexible</span>
                <span className="text-sm text-gray-600">Full refund if cancelled 24 hours before the booking</span>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="radio" name="cancellation-policy" className="mt-1 rounded-full border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={venueData.cancellationPolicy === 'moderate'}
                onChange={() => handleChange('cancellationPolicy', 'moderate')}
              />
              <div className="ml-2">
                <span className="font-medium text-gray-800 block">Moderate</span>
                <span className="text-sm text-gray-600">50% refund if cancelled 24 hours before the booking</span>
              </div>
            </label>
            
            <label className="flex items-start">
              <input
                type="radio" name="cancellation-policy" className="mt-1 rounded-full border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                checked={venueData.cancellationPolicy === 'strict'}
                onChange={() => handleChange('cancellationPolicy', 'strict')}
              />
              <div className="ml-2">
                <span className="font-medium text-gray-800 block">Strict</span>
                <span className="text-sm text-gray-600">No refund for cancellations</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;