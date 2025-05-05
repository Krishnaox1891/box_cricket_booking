import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MobileFilterButton = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = [
    {
      name: "Price Range",
      options: [
        { id: "price-1", label: "₹500 - ₹1000" },
        { id: "price-2", label: "₹1000 - ₹1500" },
        { id: "price-3", label: "₹1500 - ₹2000" },
        { id: "price-4", label: "₹2000+" }
      ]
    },
    {
      name: "Amenities",
      options: [
        { id: "amenity-1", label: "Floodlights" },
        { id: "amenity-2", label: "Changing Rooms" },
        { id: "amenity-3", label: "Parking" },
        { id: "amenity-4", label: "Equipment Rental" },
        { id: "amenity-5", label: "Cafeteria" }
      ]
    },
    {
      name: "Rating",
      options: [
        { id: "rating-1", label: "4+ Stars" },
        { id: "rating-2", label: "3+ Stars" },
        { id: "rating-3", label: "2+ Stars" }
      ]
    }
  ];

  return (
    <>
      {/* Sticky Filter Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-primary-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          aria-label="Open filters"
        >
          <Icon name="SlidersHorizontal" size={24} />
        </button>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-xs h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700" aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-4">
              {filters.map((filter, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">{filter.name}</h4>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option.id}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 flex space-x-4">
                <button 
                  className="btn-secondary flex-1"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Reset
                </button>
                <button 
                  className="btn-primary flex-1"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterButton;