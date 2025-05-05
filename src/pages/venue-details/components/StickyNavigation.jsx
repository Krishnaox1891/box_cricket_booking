import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState("info");
  
  const sections = [
    { id: "info", label: "Info", icon: "Info" },
    { id: "facilities", label: "Facilities", icon: "Lightbulb" },
    { id: "location", label: "Location", icon: "MapPin" },
    { id: "booking", label: "Book", icon: "Calendar" },
    { id: "reviews", label: "Reviews", icon: "MessageSquare" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find the section that is currently in view
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  
  return (
    <div className="sticky top-20 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
                activeSection === section.id
                  ? "border-primary-600 text-primary-600" :"border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon name={section.icon} size={18} className="mr-2" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyNavigation;