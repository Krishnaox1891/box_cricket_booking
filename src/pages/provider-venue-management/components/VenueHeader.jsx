import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const VenueHeader = ({ venueName, isPublished, onSave, onPreview, onPublish }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link 
              to="/provider-dashboard" className="text-gray-600 hover:text-gray-800 mr-4" aria-label="Back to dashboard"
            >
              <Icon name="ArrowLeft" size={20} />
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">
              {venueName || "New Venue"}
            </h1>
            {isPublished && (
              <span className="ml-3 badge-confirmed">Published</span>
            )}
            {!isPublished && (
              <span className="ml-3 badge-pending">Draft</span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={onSave} 
              className="btn-secondary-small flex items-center"
            >
              <Icon name="Save" size={16} className="mr-1" />
              <span>Save</span>
            </button>
            <button 
              onClick={onPreview} 
              className="btn-secondary-small flex items-center"
            >
              <Icon name="Eye" size={16} className="mr-1" />
              <span>Preview</span>
            </button>
            <button 
              onClick={onPublish} 
              className="btn-primary-small flex items-center"
            >
              <Icon name="Upload" size={16} className="mr-1" />
              <span>{isPublished ? "Update" : "Publish"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueHeader;