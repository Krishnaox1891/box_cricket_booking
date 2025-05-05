import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AvailabilityCalendar = ({ onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate days for the current month view
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Create array of day numbers for the current month
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Create array for empty cells before the first day
  const emptyCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    emptyCells.push(i);
  }
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  const handleDateSelect = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };
  
  // Check if a date is today
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };
  
  // Check if a date is selected
  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           month === selectedDate.getMonth() && 
           year === selectedDate.getFullYear();
  };
  
  // Check if a date is in the past
  const isPastDate = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <h3 className="font-medium text-lg">
          {monthNames[month]} {year}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {emptyCells.map((i) => (
            <div key={`empty-${i}`} className="h-10"></div>
          ))}
          
          {days.map((day) => (
            <button
              key={day}
              onClick={() => !isPastDate(day) && handleDateSelect(day)}
              disabled={isPastDate(day)}
              className={`h-10 rounded-full flex items-center justify-center text-sm transition-colors
                ${isPastDate(day) ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}
                ${isToday(day) ? 'border border-primary-500' : ''}
                ${isSelected(day) ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-primary-600 rounded-full mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border border-primary-500 rounded-full mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;