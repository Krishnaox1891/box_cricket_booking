import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import VenueCard from "./components/VenueCard";
import ActiveFilters from "./components/ActiveFilters";
import MapView from "./components/MapView";
import EmptyState from "./components/EmptyState";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import Footer from "./components/Footer";
import Icon from "../../components/AppIcon";

const VenueSearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";
  
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  const [sortOption, setSortOption] = useState("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    cities: [],
    facilities: [],
    rating: null,
    priceRange: [500, 2000]
  });

  const observer = useRef();
  const lastVenueElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Mock data for venues
  const mockVenues = [
    {
      id: 1,
      name: "Cricket Hub Arena",
      location: "Andheri East, Mumbai",
      city: "mumbai",
      rating: 4.8,
      reviewCount: 124,
      price: 1200,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Parking", icon: "ParkingCircle" }
      ],
      facilities: ["floodlights", "changing_room", "parking"]
    },
    {
      id: 2,
      name: "Pitch Perfect",
      location: "Koramangala, Bangalore",
      city: "bangalore",
      rating: 4.6,
      reviewCount: 98,
      price: 1000,
      image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Cafeteria", icon: "Coffee" },
        { name: "Scoreboard", icon: "MonitorSmartphone" }
      ],
      facilities: ["floodlights", "cafeteria", "scoreboard"]
    },
    {
      id: 3,
      name: "Wicket Warriors",
      location: "Gachibowli, Hyderabad",
      city: "hyderabad",
      rating: 4.7,
      reviewCount: 87,
      price: 1100,
      image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Equipment", icon: "Bat" }
      ],
      facilities: ["floodlights", "changing_room", "equipment"]
    },
    {
      id: 4,
      name: "Boundary Blasters",
      location: "Sector 29, Gurgaon",
      city: "delhi",
      rating: 4.5,
      reviewCount: 76,
      price: 950,
      image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Parking", icon: "ParkingCircle" },
        { name: "Cafeteria", icon: "Coffee" }
      ],
      facilities: ["floodlights", "parking", "cafeteria"]
    },
    {
      id: 5,
      name: "Stumps & Bails",
      location: "Salt Lake, Kolkata",
      city: "kolkata",
      rating: 4.4,
      reviewCount: 65,
      price: 900,
      image: "https://images.unsplash.com/photo-1599407384144-6aa2e4982e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Scoreboard", icon: "MonitorSmartphone" }
      ],
      facilities: ["floodlights", "changing_room", "scoreboard"]
    },
    {
      id: 6,
      name: "Cricket Square",
      location: "Adyar, Chennai",
      city: "chennai",
      rating: 4.6,
      reviewCount: 82,
      price: 1050,
      image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Equipment", icon: "Bat" },
        { name: "Parking", icon: "ParkingCircle" }
      ],
      facilities: ["floodlights", "equipment", "parking"]
    },
    {
      id: 7,
      name: "Sixer Stadium",
      location: "Vashi, Navi Mumbai",
      city: "mumbai",
      rating: 4.3,
      reviewCount: 58,
      price: 850,
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1905&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Washroom", icon: "Bath" },
        { name: "Cafeteria", icon: "Coffee" }
      ],
      facilities: ["floodlights", "washroom", "cafeteria"]
    },
    {
      id: 8,
      name: "Cover Drive Arena",
      location: "Indiranagar, Bangalore",
      city: "bangalore",
      rating: 4.9,
      reviewCount: 112,
      price: 1300,
      image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Equipment", icon: "Bat" },
        { name: "Cafeteria", icon: "Coffee" }
      ],
      facilities: ["floodlights", "changing_room", "equipment", "cafeteria"]
    },
    {
      id: 9,
      name: "Yorker Sports",
      location: "Banjara Hills, Hyderabad",
      city: "hyderabad",
      rating: 4.2,
      reviewCount: 45,
      price: 800,
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Parking", icon: "ParkingCircle" }
      ],
      facilities: ["floodlights", "parking"]
    },
    {
      id: 10,
      name: "Googly Grounds",
      location: "Powai, Mumbai",
      city: "mumbai",
      rating: 4.7,
      reviewCount: 93,
      price: 1150,
      image: "https://images.unsplash.com/photo-1599407384144-6aa2e4982e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Scoreboard", icon: "MonitorSmartphone" },
        { name: "Cafeteria", icon: "Coffee" }
      ],
      facilities: ["floodlights", "changing_room", "scoreboard", "cafeteria"]
    },
    {
      id: 11,
      name: "Bouncer Box Cricket",
      location: "Whitefield, Bangalore",
      city: "bangalore",
      rating: 4.4,
      reviewCount: 67,
      price: 950,
      image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Equipment", icon: "Bat" },
        { name: "Parking", icon: "ParkingCircle" }
      ],
      facilities: ["floodlights", "equipment", "parking"]
    },
    {
      id: 12,
      name: "Doosra Cricket Club",
      location: "Connaught Place, Delhi",
      city: "delhi",
      rating: 4.8,
      reviewCount: 105,
      price: 1250,
      image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      amenities: [
        { name: "Floodlights", icon: "Lightbulb" },
        { name: "Changing Rooms", icon: "DoorOpen" },
        { name: "Washroom", icon: "Bath" },
        { name: "Cafeteria", icon: "Coffee" }
      ],
      facilities: ["floodlights", "changing_room", "washroom", "cafeteria"]
    }
  ];

  const cities = [
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi" },
    { id: "bangalore", name: "Bangalore" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "chennai", name: "Chennai" },
    { id: "kolkata", name: "Kolkata" },
    { id: "pune", name: "Pune" },
    { id: "ahmedabad", name: "Ahmedabad" }
  ];
  
  const facilities = [
    { id: "floodlights", name: "Floodlights", icon: "Lightbulb" },
    { id: "parking", name: "Parking", icon: "ParkingCircle" },
    { id: "washroom", name: "Washroom", icon: "Bath" },
    { id: "equipment", name: "Equipment Rental", icon: "Bat" },
    { id: "cafeteria", name: "Cafeteria", icon: "Coffee" },
    { id: "changing_room", name: "Changing Room", icon: "DoorOpen" },
    { id: "scoreboard", name: "Digital Scoreboard", icon: "MonitorSmartphone" }
  ];

  // Simulate loading venues
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter venues based on search query
      let results = [...mockVenues];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(venue => 
          venue.name.toLowerCase().includes(query) || 
          venue.location.toLowerCase().includes(query)
        );
      }
      
      setVenues(results);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...venues];
    
    // Apply city filter
    if (activeFilters.cities && activeFilters.cities.length > 0) {
      results = results.filter(venue => activeFilters.cities.includes(venue.city));
    }
    
    // Apply facilities filter
    if (activeFilters.facilities && activeFilters.facilities.length > 0) {
      results = results.filter(venue => 
        activeFilters.facilities.every(facility => venue.facilities.includes(facility))
      );
    }
    
    // Apply rating filter
    if (activeFilters.rating) {
      const minRating = activeFilters.rating === "4_plus" ? 4 : activeFilters.rating ==="3_plus" ? 3 : 2;
      results = results.filter(venue => venue.rating >= minRating);
    }
    
    // Apply price range filter
    if (activeFilters.priceRange) {
      results = results.filter(venue => 
        venue.price >= activeFilters.priceRange[0] && 
        venue.price <= activeFilters.priceRange[1]
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price_low_high":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_high_low":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default: // recommended
        // No specific sorting for recommended
        break;
    }
    
    setFilteredVenues(results);
    setHasMore(results.length > 0);
  }, [venues, activeFilters, sortOption]);

  // Set page title
  useEffect(() => {
    document.title = searchQuery 
      ? `${searchQuery} - Box Cricket Venues` 
      : "Search Box Cricket Venues";
  }, [searchQuery]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (type, value) => {
    const newFilters = { ...activeFilters };
    
    switch (type) {
      case 'city':
        newFilters.cities = newFilters.cities.filter(city => city !== value);
        break;
      case 'facility':
        newFilters.facilities = newFilters.facilities.filter(facility => facility !== value);
        break;
      case 'rating':
        newFilters.rating = null;
        break;
      case 'priceRange':
        newFilters.priceRange = [500, 2000];
        break;
      default:
        break;
    }
    
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({
      cities: [],
      facilities: [],
      rating: null,
      priceRange: [500, 2000]
    });
  };

  // Display venues based on pagination
  const displayedVenues = filteredVenues.slice(0, page * 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-h2 mb-2">
              {searchQuery 
                ? `Search results for "${searchQuery}"` 
                : "All Box Cricket Venues"}
            </h1>
            <p className="text-gray-600">
              {isLoading 
                ? "Searching for venues..." 
                : `Found ${filteredVenues.length} venues`}
            </p>
          </div>
          
          {/* View Toggle and Sort Options */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg mb-4 md:mb-0">
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
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
              <select 
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full btn-secondary flex items-center justify-center"
            >
              <Icon name="SlidersHorizontal" size={18} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Active Filters */}
          <ActiveFilters 
            filters={activeFilters} 
            onRemoveFilter={handleRemoveFilter}
            facilities={facilities}
            cities={cities}
          />
          
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter Panel (Desktop) */}
            <div className="hidden md:block w-full md:w-64 flex-shrink-0">
              <FilterPanel 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                clearFilters={clearFilters}
              />
            </div>
            
            {/* Results */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
                  <p className="text-gray-600">Loading venues...</p>
                </div>
              ) : filteredVenues.length === 0 ? (
                <EmptyState searchQuery={searchQuery} />
              ) : viewMode === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedVenues.map((venue, index) => {
                    if (index === displayedVenues.length - 1) {
                      return (
                        <div ref={lastVenueElementRef} key={venue.id}>
                          <VenueCard venue={venue} />
                        </div>
                      );
                    } else {
                      return <VenueCard key={venue.id} venue={venue} />;
                    }
                  })}
                </div>
              ) : (
                <MapView venues={filteredVenues} />
              )}
              
              {/* Loading more indicator */}
              {viewMode === 'list' && hasMore && displayedVenues.length < filteredVenues.length && (
                <div className="flex justify-center mt-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        clearFilters={clearFilters}
      />
      
      <Footer />
    </div>
  );
};

export default VenueSearchResults;