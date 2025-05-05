import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PreviewModal = ({ venue, onClose }) => {
  const featuredPhoto = venue.photos?.find(photo => photo.isFeatured) || venue.photos?.[0];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-h3">Venue Preview</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700" aria-label="Close preview"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          {/* Hero Section */}
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            {featuredPhoto ? (
              <Image 
                src={featuredPhoto.url} 
                alt={venue.name || "Venue"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Icon name="Image" size={48} className="text-gray-400" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-white text-2xl font-bold">{venue.name || "Venue Name"}</h1>
              <div className="flex items-center text-white mt-1">
                <Icon name="MapPin" size={16} className="mr-1" />
                <span>{venue.address ? `${venue.address}, ${venue.city}` : "Location"}</span>
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h2 className="text-h4 mb-3">About This Venue</h2>
              <p className="text-gray-700 mb-4">{venue.description || "No description provided."}</p>
              
              <h3 className="font-medium text-gray-800 mb-2">Contact Information</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Icon name="Phone" size={16} className="mr-2" />
                  <span>{venue.phone || "Phone number not provided"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Icon name="Mail" size={16} className="mr-2" />
                  <span>{venue.email || "Email not provided"}</span>
                </div>
                {venue.website && (
                  <div className="flex items-center text-gray-600">
                    <Icon name="Globe" size={16} className="mr-2" />
                    <span>{venue.website}</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-medium text-gray-800 mb-2">Facilities</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.facilities && Object.entries(venue.facilities)
                  .filter(([_, value]) => value.available)
                  .map(([key]) => (
                    <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                {(!venue.facilities || Object.entries(venue.facilities).filter(([_, value]) => value.available).length === 0) && (
                  <span className="text-gray-500">No facilities specified</span>
                )}
              </div>
            </div>
            
            <div>
              <div className="card p-4 mb-4">
                <h3 className="font-medium text-gray-800 mb-3">Pricing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Rate:</span>
                    <span className="font-medium">₹{venue.basePrice || "0"}/hr</span>
                  </div>
                  {venue.hasPeakPricing && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekend Rate:</span>
                        <span className="font-medium">₹{venue.weekendPrice || "0"}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Peak Hours:</span>
                        <span className="font-medium">₹{venue.peakPrice || "0"}/hr</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Duration:</span>
                    <span className="font-medium">{venue.minDuration || "1"} hour(s)</span>
                  </div>
                </div>
              </div>
              
              <div className="card p-4">
                <h3 className="font-medium text-gray-800 mb-3">Location</h3>
                <div className="h-40 bg-gray-200 rounded-lg overflow-hidden mb-2">
                  <iframe
                    width="100%" height="100%" loading="lazy" title="Venue Location" referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${venue.latitude || '19.0760'},${venue.longitude || '72.8777'}&z=14&output=embed`}>
                  </iframe>
                </div>
                <p className="text-sm text-gray-600">
                  {venue.address ? `${venue.address}, ${venue.city}, ${venue.state} - ${venue.pincode}` : "Address not provided"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Photo Gallery */}
          {venue.photos && venue.photos.length > 0 && (
            <div className="mb-6">
              <h2 className="text-h4 mb-3">Photo Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {venue.photos.map((photo, index) => (
                  <div key={photo.id} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                    <Image 
                      src={photo.url} 
                      alt={`Venue photo ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;