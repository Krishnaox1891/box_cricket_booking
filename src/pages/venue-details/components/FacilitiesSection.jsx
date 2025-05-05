import React from "react";
import Icon from "../../../components/AppIcon";

const FacilitiesSection = ({ facilities }) => {
  // Map facility names to appropriate icons
  const facilityIcons = {
    "Floodlights": "Lightbulb",
    "Parking": "Car",
    "Changing Rooms": "DoorOpen",
    "Washrooms": "Bath",
    "Equipment Rental": "Cricket",
    "Cafeteria": "Coffee",
    "Water Cooler": "Droplets",
    "First Aid": "FirstAid",
    "Scoreboard": "BarChart",
    "Seating Area": "Armchair",
    "WiFi": "Wifi"
  };

  return (
    <section id="facilities" className="mb-12">
      <h2 className="text-h2 mb-6">Facilities & Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {facilities.map((facility, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
              <Icon 
                name={facilityIcons[facility] || "Check"} 
                size={24} 
                className="text-primary-600" 
              />
            </div>
            <span className="text-gray-800 font-medium">{facility}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacilitiesSection;