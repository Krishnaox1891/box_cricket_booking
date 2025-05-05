import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const EmptyState = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <Icon name="Search" size={48} className="text-gray-400" />
      </div>
      <h2 className="text-h3 mb-2">No venues found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        {searchQuery 
          ? `We couldn't find any venues matching "${searchQuery}". Try adjusting your filters or search for a different location.`
          : "We couldn't find any venues matching your criteria. Try adjusting your filters or search for a different location."}
      </p>
      <div className="space-y-4">
        <div className="text-left">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Try these suggestions:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            <li>Check the spelling of your search term</li>
            <li>Use more general keywords</li>
            <li>Reset your filters and try again</li>
            <li>Search in a different area or city</li>
          </ul>
        </div>
        <div className="flex space-x-4 pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary flex items-center"
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Reset Filters
          </button>
          <Link to="/player-landing-page" className="btn-primary flex items-center">
            <Icon name="Home" size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;