import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTab from "./components/ProfileTab";
import BookingsTab from "./components/BookingsTab";
import SettingsTab from "./components/SettingsTab";

const PlayerProfileBookingHistory = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock user data
  const user = {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Andheri East, Mumbai 400069",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    favoriteVenues: [
      {
        id: 1,
        name: "Cricket Hub Arena",
        location: "Andheri East, Mumbai",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80"
      },
      {
        id: 2,
        name: "Pitch Perfect",
        location: "Koramangala, Bangalore",
        image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      }
    ]
  };
  
  // Mock stats data
  const stats = [
    {
      label: "Total Bookings",
      value: 12,
      icon: "Calendar",
      iconBg: "bg-primary-100",
      iconColor: "text-primary-600",
      change: 20
    },
    {
      label: "Favorite Venues",
      value: 2,
      icon: "Heart",
      iconBg: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      label: "Reviews Given",
      value: 8,
      icon: "Star",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      change: -10
    }
  ];
  
  // Mock bookings data
  const bookings = [
    {
      id: 1,
      venue: {
        name: "Cricket Hub Arena",
        location: "Andheri East, Mumbai",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80"
      },
      date: "2023-07-15T14:00:00",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "Confirmed",
      amount: 1200,
      players: 8,
      hasReviewed: false
    },
    {
      id: 2,
      venue: {
        name: "Pitch Perfect",
        location: "Koramangala, Bangalore",
        image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      },
      date: "2023-08-05T10:00:00",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "Confirmed",
      amount: 1000,
      players: 6,
      hasReviewed: false
    },
    {
      id: 3,
      venue: {
        name: "Wicket Warriors",
        location: "Gachibowli, Hyderabad",
        image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      date: "2023-06-20T16:00:00",
      timeSlot: "4:00 PM - 6:00 PM",
      status: "Completed",
      amount: 1100,
      players: 10,
      hasReviewed: true,
      rating: 4.5
    },
    {
      id: 4,
      venue: {
        name: "Boundary Blasters",
        location: "Sector 29, Gurgaon",
        image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      date: "2023-05-10T18:00:00",
      timeSlot: "6:00 PM - 8:00 PM",
      status: "Completed",
      amount: 950,
      players: 8,
      hasReviewed: true,
      rating: 5
    },
    {
      id: 5,
      venue: {
        name: "Stumps & Bails",
        location: "Salt Lake, Kolkata",
        image: "https://images.unsplash.com/photo-1599407384144-6aa2e4982e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      },
      date: "2023-07-02T14:00:00",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "Cancelled",
      amount: 900,
      players: 6,
      hasReviewed: false
    }
  ];
  
  // Set page title
  useEffect(() => {
    document.title = "Profile & Booking History | BoxCricket";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <ProfileHeader 
          user={user} 
          onTabChange={setActiveTab} 
          activeTab={activeTab} 
        />
        
        <div className="container mx-auto px-4 py-8">
          {activeTab === "profile" && (
            <ProfileTab user={user} stats={stats} />
          )}
          
          {activeTab === "bookings" && (
            <BookingsTab bookings={bookings} />
          )}
          
          {activeTab === "settings" && (
            <SettingsTab />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlayerProfileBookingHistory;