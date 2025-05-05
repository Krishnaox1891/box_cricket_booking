import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const FeaturedVenues = () => {
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  
  const venues = [
    {
      id: 1,
      name: "Cricket Hub Arena",
      location: "Andheri East, Mumbai",
      rating: 4.8,
      reviewCount: 124,
      price: 1200,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
      amenities: ["Floodlights", "Changing Rooms", "Parking"]
    },
    {
      id: 2,
      name: "Pitch Perfect",
      location: "Koramangala, Bangalore",
      rating: 4.6,
      reviewCount: 98,
      price: 1000,
      image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      amenities: ["Floodlights", "Cafeteria", "Scoreboard"]
    },
    {
      id: 3,
      name: "Wicket Warriors",
      location: "Gachibowli, Hyderabad",
      rating: 4.7,
      reviewCount: 87,
      price: 1100,
      image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: ["Floodlights", "Changing Rooms", "Equipment Rental"]
    },
    {
      id: 4,
      name: "Boundary Blasters",
      location: "Sector 29, Gurgaon",
      rating: 4.5,
      reviewCount: 76,
      price: 950,
      image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: ["Floodlights", "Parking", "Cafeteria"]
    },
    {
      id: 5,
      name: "Stumps & Bails",
      location: "Salt Lake, Kolkata",
      rating: 4.4,
      reviewCount: 65,
      price: 900,
      image: "https://images.unsplash.com/photo-1599407384144-6aa2e4982e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      amenities: ["Floodlights", "Changing Rooms", "Scoreboard"]
    },
    {
      id: 6,
      name: "Cricket Square",
      location: "Adyar, Chennai",
      rating: 4.6,
      reviewCount: 82,
      price: 1050,
      image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: ["Floodlights", "Equipment Rental", "Parking"]
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-h2 mb-2">Featured Venues</h2>
            <p className="text-subtitle">Discover top-rated box cricket venues near you</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <Icon name="List" size={18} className="mr-2" />
              <span>List</span>
            </button>
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Icon name="Map" size={18} className="mr-2" />
              <span>Map</span>
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <Link 
                key={venue.id} 
                to={`/venue-details?id=${venue.id}`}
                className="card-interactive group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium text-gray-800">
                    ₹{venue.price}/hr
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{venue.name}</h3>
                    <div className="flex items-center">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {venue.amenities.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px] relative">
            <iframe
              width="100%" height="100%" loading="lazy" title="Box Cricket Venues" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=19.0760,72.8777&z=12&output=embed">
            </iframe>
            
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
              <h3 className="font-medium text-gray-800 mb-2">6 Venues Found</h3>
              <p className="text-sm text-gray-600">Switch to list view to see detailed information about each venue</p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/venue-search-results" className="btn-primary inline-flex items-center">
            <span>View All Venues</span>
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;