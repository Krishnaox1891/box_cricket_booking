import React from "react";
import Icon from "../../../components/AppIcon";

const TimeSlots = ({ slots, selectedSlot, onSelectSlot }) => {
  // Group slots by time period (morning, afternoon, evening)
  const groupedSlots = {
    morning: slots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour >= 6 && hour < 12;
    }),
    afternoon: slots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour >= 12 && hour < 17;
    }),
    evening: slots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour >= 17 && hour < 24;
    })
  };

  const timeGroups = [
    { id: "morning", label: "Morning", icon: "Sunrise" },
    { id: "afternoon", label: "Afternoon", icon: "Sun" },
    { id: "evening", label: "Evening", icon: "Sunset" }
  ];

  return (
    <div className="space-y-6">
      {timeGroups.map(group => (
        <div key={group.id} className={groupedSlots[group.id].length > 0 ? "block" : "hidden"}>
          <div className="flex items-center mb-3">
            <Icon name={group.icon} size={20} className="text-gray-600 mr-2" />
            <h3 className="text-h4">{group.label}</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {groupedSlots[group.id].map(slot => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelectSlot(slot)}
                disabled={!slot.available}
                className={`
                  p-3 rounded-lg border text-center transition-colors
                  ${slot.available 
                    ? selectedSlot && selectedSlot.id === slot.id 
                      ? 'time-slot-selected' :'time-slot-available' :'time-slot-booked'
                  }
                `}
              >
                <div className="font-medium">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className={`text-sm mt-1 ${slot.available ? (selectedSlot && selectedSlot.id === slot.id ? 'text-white' : 'text-gray-700') : 'text-gray-500'}`}>
                  ₹{slot.price}
                  {slot.isPeakHour && slot.available && (
                    <span className="ml-1 text-xs">
                      (Peak)
                    </span>
                  )}
                </div>
                {!slot.available && (
                  <div className="text-xs mt-1">Booked</div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-full mr-1"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-600 rounded-full mr-1"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-full mr-1"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;