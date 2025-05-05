import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const CalendarView = () => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for calendar events
  const calendarEvents = [
    {
      id: 1,
      title: "Rahul Sharma",
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
      status: "confirmed",
      payment: "paid"
    },
    {
      id: 2,
      title: "Priya Patel",
      start: new Date(2023, 5, 15, 14, 0),
      end: new Date(2023, 5, 15, 16, 0),
      status: "confirmed",
      payment: "paid"
    },
    {
      id: 3,
      title: "Vikram Singh",
      start: new Date(2023, 5, 16, 9, 0),
      end: new Date(2023, 5, 16, 11, 0),
      status: "pending",
      payment: "pending"
    },
    {
      id: 4,
      title: "Ananya Desai",
      start: new Date(2023, 5, 16, 16, 0),
      end: new Date(2023, 5, 16, 18, 0),
      status: "confirmed",
      payment: "paid"
    },
    {
      id: 5,
      title: "Rajesh Kumar",
      start: new Date(2023, 5, 17, 11, 0),
      end: new Date(2023, 5, 17, 13, 0),
      status: "confirmed",
      payment: "paid"
    }
  ];
  
  // Generate time slots for the day view
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
  
  // Generate days for the week view
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col p-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 space-x-2 sm:mb-0">
          <h3 className="text-lg font-medium text-gray-800">Booking Calendar</h3>
          <div className="px-2 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full">
            {getFormattedDate(currentDate)}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-1 bg-gray-100 rounded-md">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'day' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'week' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'month' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
          </div>
          
          <div className="flex">
            <button 
              className="p-1 text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-50"
              onClick={handlePrevious}
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button 
              className="px-2 py-1 text-xs font-medium text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50"
              onClick={handleToday}
            >
              Today
            </button>
            <button 
              className="p-1 text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-50"
              onClick={handleNext}
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {viewMode === 'week' && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="p-2 text-sm font-medium text-center text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((_, dayIndex) => (
                <div key={dayIndex} className="min-h-[400px] border border-gray-200 rounded-md p-1">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="relative h-8 text-xs text-gray-500 border-t border-gray-100">
                      <span className="absolute left-1">{hour}:00</span>
                      
                      {/* Render events for this day and hour */}
                      {calendarEvents
                        .filter(event => {
                          const eventDate = new Date(event.start);
                          return eventDate.getDay() === dayIndex && eventDate.getHours() === hour;
                        })
                        .map(event => (
                          <div 
                            key={event.id}
                            className={`absolute right-0 left-6 p-1 text-xs rounded-sm truncate ${
                              event.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}
                            style={{
                              top: '0',
                              height: `${(event.end - event.start) / (1000 * 60 * 30)}rem`
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {viewMode === 'day' && (
          <div className="min-h-[500px] border border-gray-200 rounded-md p-4">
            <h4 className="mb-4 text-lg font-medium text-center text-gray-800">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h4>
            
            <div className="space-y-2">
              {timeSlots.map((hour) => (
                <div key={hour} className="flex">
                  <div className="w-16 py-2 pr-4 text-sm text-right text-gray-500">
                    {hour}:00
                  </div>
                  <div className="flex-1 py-2 border-t border-gray-200">
                    {calendarEvents
                      .filter(event => {
                        const eventDate = new Date(event.start);
                        return eventDate.getHours() === hour;
                      })
                      .map(event => (
                        <div 
                          key={event.id}
                          className={`p-2 mb-1 text-sm rounded-md ${
                            event.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs">
                            {new Date(event.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(event.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {viewMode === 'month' && (
          <div className="min-h-[500px] border border-gray-200 rounded-md p-4">
            <h4 className="mb-4 text-lg font-medium text-center text-gray-800">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="p-2 text-sm font-medium text-center text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => i).map((day) => (
                <div key={day} className="h-24 p-1 text-sm border border-gray-200 rounded-md">
                  <div className="mb-1 font-medium text-gray-700">{day + 1}</div>
                  <div className="overflow-y-auto h-[calc(100%-1.5rem)]">
                    {day % 3 === 0 && (
                      <div className="p-1 mb-1 text-xs bg-emerald-100 rounded-sm text-emerald-800">
                        2 Bookings
                      </div>
                    )}
                    {day % 5 === 0 && (
                      <div className="p-1 text-xs bg-amber-100 rounded-sm text-amber-800">
                        1 Pending
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;