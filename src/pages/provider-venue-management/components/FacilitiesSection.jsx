import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FacilitiesSection = ({ venueData, onChange }) => {
  const [expandedFacility, setExpandedFacility] = useState(null);

  const handleToggleFacility = (facilityId) => {
    const updatedFacilities = { ...venueData.facilities };
    updatedFacilities[facilityId] = {
      ...updatedFacilities[facilityId],
      available: !updatedFacilities[facilityId]?.available
    };
    onChange('facilities', updatedFacilities);
  };

  const handleFacilityDetailChange = (facilityId, detail) => {
    const updatedFacilities = { ...venueData.facilities };
    updatedFacilities[facilityId] = {
      ...updatedFacilities[facilityId],
      details: detail
    };
    onChange('facilities', updatedFacilities);
  };

  const facilityGroups = [
    {
      name: "Essential Facilities",
      items: [
        { id: "floodlights", name: "Floodlights", icon: "Lightbulb" },
        { id: "changing_rooms", name: "Changing Rooms", icon: "DoorOpen" },
        { id: "washrooms", name: "Washrooms", icon: "Bath" },
        { id: "parking", name: "Parking", icon: "Car" },
        { id: "seating", name: "Spectator Seating", icon: "Users" }
      ]
    },
    {
      name: "Equipment & Services",
      items: [
        { id: "equipment_rental", name: "Equipment Rental", icon: "Cricket" },
        { id: "scoreboard", name: "Digital Scoreboard", icon: "BarChart" },
        { id: "cafeteria", name: "Cafeteria/Food", icon: "Coffee" },
        { id: "first_aid", name: "First Aid Kit", icon: "FirstAid" },
        { id: "wifi", name: "Free WiFi", icon: "Wifi" }
      ]
    },
    {
      name: "Pitch Features",
      items: [
        { id: "artificial_turf", name: "Artificial Turf", icon: "Layers" },
        { id: "multiple_pitches", name: "Multiple Pitches", icon: "Grid" },
        { id: "covered_pitch", name: "Covered Pitch", icon: "Umbrella" },
        { id: "practice_nets", name: "Practice Nets", icon: "Goal" }
      ]
    }
  ];

  return (
    <section id="facilities" className="py-6 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Facilities & Amenities</h2>
        <p className="text-gray-600">
          Select the facilities available at your venue to help players make informed decisions
        </p>
      </div>
      
      <div className="space-y-8">
        {facilityGroups.map((group) => (
          <div key={group.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">{group.name}</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {group.items.map((facility) => (
                <div key={facility.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name={facility.icon} size={20} className="text-gray-500 mr-3" />
                      <span className="font-medium text-gray-700">{facility.name}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          venueData.facilities?.[facility.id]?.available
                            ? "bg-primary-600" :"bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={venueData.facilities?.[facility.id]?.available || false}
                        onClick={() => handleToggleFacility(facility.id)}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            venueData.facilities?.[facility.id]?.available
                              ? "translate-x-5" :"translate-x-0"
                          }`}
                        ></span>
                      </button>
                      
                      {venueData.facilities?.[facility.id]?.available && (
                        <button
                          onClick={() => setExpandedFacility(expandedFacility === facility.id ? null : facility.id)}
                          className="ml-3 text-gray-500 hover:text-gray-700"
                        >
                          <Icon 
                            name={expandedFacility === facility.id ? "ChevronUp" : "ChevronDown"} 
                            size={18} 
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {venueData.facilities?.[facility.id]?.available && expandedFacility === facility.id && (
                    <div className="mt-3 pl-8">
                      <label htmlFor={`facility-${facility.id}-details`} className="text-sm text-gray-600 block mb-1">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        id={`facility-${facility.id}-details`}
                        className="input-default text-sm min-h-[80px]"
                        placeholder={`Add details about your ${facility.name.toLowerCase()}...`}
                        value={venueData.facilities?.[facility.id]?.details || ''}
                        onChange={(e) => handleFacilityDetailChange(facility.id, e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Custom Facilities */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-h4 mb-3">Additional Facilities</h3>
          <p className="text-sm text-gray-600 mb-4">
            Have any unique facilities not listed above? Add them here to highlight what makes your venue special.
          </p>
          
          <textarea
            className="input-default min-h-[100px]"
            placeholder="e.g., Professional coaching available on weekends, Video analysis equipment, etc."
            value={venueData.customFacilities || ''}
            onChange={(e) => onChange('customFacilities', e.target.value)}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;