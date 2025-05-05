import React from "react";
import Icon from "../../../components/AppIcon";

const ProgressIndicator = ({ sections, activeSection, onSectionClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeSection === section.id
                    ? "bg-primary-100 text-primary-700" :"text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={16} 
                  className={`mr-1.5 ${section.isComplete ? "text-primary-600" : ""}`} 
                />
                <span>{section.name}</span>
                {section.isComplete && (
                  <Icon name="CheckCircle" size={16} className="ml-1.5 text-primary-600" />
                )}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center mt-2 md:mt-0">
            <div className="bg-gray-200 w-48 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary-600 h-full rounded-full"
                style={{ width: `${calculateProgress(sections)}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {calculateProgress(sections)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateProgress = (sections) => {
  if (!sections.length) return 0;
  const completedSections = sections.filter(section => section.isComplete).length;
  return Math.round((completedSections / sections.length) * 100);
};

export default ProgressIndicator;