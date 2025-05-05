import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const UpcomingBookings = () => {
  const bookings = [
    {
      id: "BK-1234",
      playerName: "Rahul Sharma",
      playerImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Today",
      time: "10:00 AM - 12:00 PM",
      status: "confirmed",
      payment: "paid",
      amount: "₹1,200"
    },
    {
      id: "BK-1235",
      playerName: "Priya Patel",
      playerImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      payment: "paid",
      amount: "₹1,200"
    },
    {
      id: "BK-1236",
      playerName: "Vikram Singh",
      playerImage: "https://randomuser.me/api/portraits/men/67.jpg",
      date: "Tomorrow",
      time: "9:00 AM - 11:00 AM",
      status: "pending",
      payment: "pending",
      amount: "₹1,200"
    },
    {
      id: "BK-1237",
      playerName: "Ananya Desai",
      playerImage: "https://randomuser.me/api/portraits/women/28.jpg",
      date: "Tomorrow",
      time: "4:00 PM - 6:00 PM",
      status: "confirmed",
      payment: "paid",
      amount: "₹1,200"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Upcoming Bookings</h3>
        <Link to="/bookings" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          View All
        </Link>
      </div>
      
      <div className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full">
                  <Image 
                    src={booking.playerImage} 
                    alt={booking.playerName} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{booking.playerName}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">{booking.date}</span>
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mb-1 font-medium text-gray-800">{booking.amount}</div>
                <div className="flex items-center justify-end space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    booking.payment === 'paid' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {booking.payment === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex mt-3 space-x-2">
              <button className="flex items-center px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-100 rounded-md hover:bg-emerald-200">
                <Icon name="CheckCircle" size={16} className="mr-1" />
                Check In
              </button>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                <Icon name="CalendarClock" size={16} className="mr-1" />
                Reschedule
              </button>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">
                <Icon name="X" size={16} className="mr-1" />
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;