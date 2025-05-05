import React from "react";
import Icon from "../../../components/AppIcon";
import FilterPanel from "./FilterPanel";

const MobileFilterDrawer = ({ 
  isOpen, 
  onClose, 
  onFilterChange, 
  activeFilters, 
  clearFilters 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden">
      <div className="bg-white w-full max-w-xs h-full overflow-y-auto ml-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700" aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4">
          <FilterPanel 
            onFilterChange={onFilterChange}
            activeFilters={activeFilters}
            clearFilters={clearFilters}
          />

          <div className="mt-6 flex space-x-4 sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <button 
              className="btn-secondary flex-1"
              onClick={clearFilters}
            >
              Reset
            </button>
            <button 
              className="btn-primary flex-1"
              onClick={onClose}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;