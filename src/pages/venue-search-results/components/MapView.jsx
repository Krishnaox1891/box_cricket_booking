import React from "react";
import Icon from "../../../components/AppIcon";

const MapView = ({ venues }) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-[600px] relative">
      <iframe
        width="100%" height="100%" loading="lazy" title="Box Cricket Venues" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=19.0760,72.8777&z=12&output=embed">
      </iframe>
      
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="font-medium text-gray-800 mb-2">{venues.length} Venues Found</h3>
        <p className="text-sm text-gray-600">Showing venues matching your search criteria</p>
      </div>

      {/* Sample venue popup on map */}
      <div className="absolute bottom-16 right-16 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80" 
              alt="Cricket Hub Arena" className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm">Cricket Hub Arena</h4>
            <div className="flex items-center mt-1">
              <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-xs font-medium">4.8</span>
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-xs text-gray-600">₹1200/hr</span>
            </div>
            <button className="mt-2 text-xs btn-primary-small py-1 px-2">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;