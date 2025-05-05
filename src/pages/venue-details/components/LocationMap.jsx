import React from "react";
import Icon from '../../../components/AppIcon';


const LocationMap = ({ venue }) => {
  return (
    <section id="location" className="mb-12">
      <h2 className="text-h2 mb-6">Location</h2>
      <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
        <iframe
          width="100%" height="100%" loading="lazy"
          title={venue.name}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}&z=14&output=embed`}>
        </iframe>
      </div>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-h4 mb-2">Address</h3>
        <p className="text-gray-700">{venue.address}</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${venue.location.lat},${venue.location.lng}`}
            target="_blank" rel="noopener noreferrer" className="btn-secondary-small inline-flex items-center"
          >
            <Icon name="Navigation" size={16} className="mr-2" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;