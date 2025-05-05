import React, { useState, useEffect } from "react";
import VenueHeader from "./components/VenueHeader";
import ProgressIndicator from "./components/ProgressIndicator";
import BasicInfoSection from "./components/BasicInfoSection";
import LocationSection from "./components/LocationSection";
import FacilitiesSection from "./components/FacilitiesSection";
import PhotosSection from "./components/PhotosSection";
import PricingSection from "./components/PricingSection";
import PreviewModal from "./components/PreviewModal";
import Icon from "../../components/AppIcon";

const ProviderVenueManagement = () => {
  // Mock data for a venue being edited
  const [venueData, setVenueData] = useState({
    id: "v1",
    name: "Cricket Hub Arena",
    description: "A premium box cricket facility with state-of-the-art amenities. Our venue features high-quality artificial turf, professional lighting for night games, and comfortable changing rooms. Perfect for casual games, tournaments, and corporate events.",
    address: "123 Cricket Lane, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400069",
    landmark: "Near Metro Station",
    latitude: "19.0760",
    longitude: "72.8777",
    phone: "9876543210",
    email: "info@crickethub.com",
    website: "https://www.crickethub.com",
    basePrice: "1200",
    minDuration: "1",
    hasPeakPricing: true,
    weekendPrice: "1500",
    peakPrice: "1800",
    pricingNotes: "Corporate packages available on weekdays. Special discounts for regular customers.",
    cancellationPolicy: "moderate",
    isPublished: false,
    facilities: {
      floodlights: { available: true, details: "Professional LED floodlights for perfect visibility during night games" },
      changing_rooms: { available: true, details: "Separate changing rooms for home and away teams with lockers" },
      washrooms: { available: true, details: "Clean washrooms with shower facilities" },
      parking: { available: true, details: "Free parking for up to 10 cars" },
      equipment_rental: { available: true, details: "Bats, balls, and protective gear available for rent" },
      scoreboard: { available: true, details: "Digital scoreboard with remote control" },
      cafeteria: { available: false },
      first_aid: { available: true },
      wifi: { available: true },
      seating: { available: true, details: "Covered seating area for spectators" },
      artificial_turf: { available: true },
      multiple_pitches: { available: false },
      covered_pitch: { available: true },
      practice_nets: { available: false }
    },
    customFacilities: "Professional coaching available on weekends. Video analysis equipment for technique improvement.",
    availableSlots: {
      morning: true,
      afternoon: true,
      evening: true,
      night: true
    },
    photos: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
        name: "Main Pitch",
        isFeatured: true
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1905&q=80",
        name: "Night View",
        isFeatured: false
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        name: "Changing Room",
        isFeatured: false
      },
      {
        id: "p4",
        url: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        name: "Seating Area",
        isFeatured: false
      }
    ]
  });

  const [activeSection, setActiveSection] = useState("basic-info");
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = venueData.name 
      ? `Edit Venue - ${venueData.name} | BoxCricket`
      : "Add New Venue | BoxCricket";
      
    // Auto-save when form is dirty
    if (isFormDirty) {
      const timer = setTimeout(() => {
        handleSave();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [venueData, isFormDirty]);

  const handleFieldChange = (field, value) => {
    setVenueData(prev => ({ ...prev, [field]: value }));
    setIsFormDirty(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving venue data:", venueData);
    setShowSaveNotification(true);
    setIsFormDirty(false);
    
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };

  const handlePublish = () => {
    // Validate all required fields before publishing
    const requiredFields = validateRequiredFields();
    
    if (requiredFields.length === 0) {
      setVenueData(prev => ({ ...prev, isPublished: true }));
      handleSave();
      alert("Venue published successfully!");
    } else {
      alert(`Please complete the following sections before publishing: ${requiredFields.join(", ")}`);
    }
  };

  const validateRequiredFields = () => {
    const incompleteFields = [];
    
    // Basic Info validation
    if (!venueData.name || !venueData.description || !venueData.phone || !venueData.email) {
      incompleteFields.push("Basic Information");
    }
    
    // Location validation
    if (!venueData.address || !venueData.city || !venueData.state || !venueData.pincode) {
      incompleteFields.push("Location");
    }
    
    // Facilities validation - at least one facility should be available
    const hasFacilities = venueData.facilities && 
      Object.values(venueData.facilities).some(facility => facility.available);
    if (!hasFacilities) {
      incompleteFields.push("Facilities");
    }
    
    // Photos validation - at least one photo required
    if (!venueData.photos || venueData.photos.length === 0) {
      incompleteFields.push("Photos");
    }
    
    // Pricing validation
    if (!venueData.basePrice || !venueData.minDuration || !venueData.cancellationPolicy) {
      incompleteFields.push("Pricing");
    }
    
    return incompleteFields;
  };

  // Calculate section completion status
  const sections = [
    {
      id: "basic-info",
      name: "Basic Info",
      icon: "Info",
      isComplete: !!(venueData.name && venueData.description && venueData.phone && venueData.email)
    },
    {
      id: "location",
      name: "Location",
      icon: "MapPin",
      isComplete: !!(venueData.address && venueData.city && venueData.state && venueData.pincode)
    },
    {
      id: "facilities",
      name: "Facilities",
      icon: "Settings",
      isComplete: !!(venueData.facilities && Object.values(venueData.facilities).some(facility => facility.available))
    },
    {
      id: "photos",
      name: "Photos",
      icon: "Image",
      isComplete: !!(venueData.photos && venueData.photos.length > 0)
    },
    {
      id: "pricing",
      name: "Pricing",
      icon: "DollarSign",
      isComplete: !!(venueData.basePrice && venueData.minDuration && venueData.cancellationPolicy)
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <VenueHeader 
        venueName={venueData.name}
        isPublished={venueData.isPublished}
        onSave={handleSave}
        onPreview={() => setShowPreview(true)}
        onPublish={handlePublish}
      />
      
      <ProgressIndicator 
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <BasicInfoSection 
            venueData={venueData} 
            onChange={handleFieldChange} 
          />
          
          <LocationSection 
            venueData={venueData} 
            onChange={handleFieldChange} 
          />
          
          <FacilitiesSection 
            venueData={venueData} 
            onChange={handleFieldChange} 
          />
          
          <PhotosSection 
            venueData={venueData} 
            onChange={handleFieldChange} 
          />
          
          <PricingSection 
            venueData={venueData} 
            onChange={handleFieldChange} 
          />
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal 
          venue={venueData} 
          onClose={() => setShowPreview(false)} 
        />
      )}
      
      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-4 right-4 bg-primary-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50">
          <Icon name="CheckCircle" size={20} className="mr-2" />
          <span>Changes saved successfully</span>
        </div>
      )}
      
      {/* Floating Save Button (visible when scrolling) */}
      {isFormDirty && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleSave}
            className="bg-primary-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
            aria-label="Save changes"
          >
            <Icon name="Save" size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderVenueManagement;