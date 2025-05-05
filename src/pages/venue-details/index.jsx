import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhotoCarousel from "./components/PhotoCarousel";
import VenueInfo from "./components/VenueInfo";
import FacilitiesSection from "./components/FacilitiesSection";
import LocationMap from "./components/LocationMap";
import BookingSection from "./components/BookingSection";
import ReviewsSection from "./components/ReviewsSection";
import StickyNavigation from "./components/StickyNavigation";
import MobileBookButton from "./components/MobileBookButton";
import Icon from "../../components/AppIcon";

const VenueDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Mock venue data
  const venue = {
    id: "v1",
    name: "Cricket Hub Arena",
    address: "123 Sports Complex, Andheri East, Mumbai 400069",
    description: "Cricket Hub Arena is a premium box cricket facility featuring state-of-the-art infrastructure, professional-grade pitches, and modern amenities. Perfect for casual games, corporate events, and tournaments.",
    rating: 4.8,
    reviewCount: 124,
    priceRange: { min: 1000, max: 1600 },
    openingHours: "6:00 AM - 11:00 PM",
    contactNumber: "+91 9876543210",
    location: {
      lat: 19.1136,
      lng: 72.8697
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
        alt: "Cricket Hub Arena - Main Field"
      },
      {
        url: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        alt: "Cricket Hub Arena - Night View"
      },
      {
        url: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        alt: "Cricket Hub Arena - Pitch View"
      },
      {
        url: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        alt: "Cricket Hub Arena - Changing Room"
      },
      {
        url: "https://images.unsplash.com/photo-1599407384144-6aa2e4982e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        alt: "Cricket Hub Arena - Cafeteria"
      }
    ],
    facilities: [
      "Floodlights",
      "Parking",
      "Changing Rooms",
      "Washrooms",
      "Equipment Rental",
      "Cafeteria",
      "Water Cooler",
      "First Aid",
      "Scoreboard",
      "Seating Area",
      "WiFi"
    ]
  };
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      userName: "Rahul Sharma",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "2023-05-15",
      comment: "Excellent facility with well-maintained pitches. The floodlights are perfect for evening games, and the staff is very helpful. Will definitely come back!"
    },
    {
      id: 2,
      userName: "Priya Patel",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      date: "2023-06-20",
      comment: "Great venue for our corporate cricket event. The changing rooms and cafeteria were a plus. Only giving 4 stars because the parking was a bit limited."
    },
    {
      id: 3,
      userName: "Vikram Singh",
      userAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      date: "2023-07-05",
      comment: "Best box cricket venue in Mumbai! The pitch quality is outstanding, and the booking process was seamless. Highly recommend for serious cricket enthusiasts."
    },
    {
      id: 4,
      userName: "Ananya Desai",
      userAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 3,
      date: "2023-07-18",
      comment: "Decent place to play. The facilities are good, but it gets very crowded on weekends, and sometimes the time slots aren\'t strictly enforced."
    },
    {
      id: 5,
      userName: "Arjun Mehta",
      userAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      date: "2023-08-02",
      comment: "Fantastic experience! The equipment rental saved us a lot of hassle, and the pitch was in perfect condition. The staff was also very accommodating."
    },
    {
      id: 6,
      userName: "Neha Kapoor",
      userAvatar: "https://randomuser.me/api/portraits/women/26.jpg",
      rating: 4,
      date: "2023-08-15",
      comment: "Very good venue with all necessary amenities. The cafeteria serves decent food at reasonable prices. Would have given 5 stars if the washrooms were a bit cleaner."
    },
    {
      id: 7,
      userName: "Sanjay Kumar",
      userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      date: "2023-09-01",
      comment: "Absolutely loved playing here! The floodlights are excellent for night games, and the overall atmosphere is very professional. Will be our regular spot from now on."
    }
  ];
  
  // Calculate average rating and rating distribution
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  
  // Set page title
  useEffect(() => {
    document.title = `${venue.name} - BoxCricket`;
  }, []);
  
  // Handle date and slot selection for the mobile book button
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      
      <StickyNavigation />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/player-landing-page" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
                  <Icon name="Home" size={16} className="mr-2" />
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                  <a href="/venue-search-results" className="ml-1 text-gray-600 hover:text-gray-900">
                    Venues
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                  <span className="ml-1 text-gray-500 truncate max-w-[150px] md:max-w-xs">
                    {venue.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <section id="info" className="mb-12">
          <PhotoCarousel images={venue.images} />
          <VenueInfo venue={venue} />
        </section>
        
        <FacilitiesSection facilities={venue.facilities} />
        
        <LocationMap venue={venue} />
        
        <BookingSection 
          venue={venue} 
          onDateChange={handleDateChange}
          onSlotSelect={handleSlotSelect}
        />
        
        <ReviewsSection 
          reviews={reviews} 
          averageRating={averageRating} 
          ratingDistribution={ratingDistribution} 
        />
      </main>
      
      <MobileBookButton 
        isSlotSelected={!!selectedSlot}
        venueId={venue.id}
        selectedDate={selectedDate}
        selectedSlotId={selectedSlot?.id}
      />
      
      <Footer />
    </div>
  );
};

export default VenueDetails;