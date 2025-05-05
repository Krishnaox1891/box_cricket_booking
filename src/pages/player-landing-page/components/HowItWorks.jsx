import React from "react";
import Icon from "../../../components/AppIcon";

const HowItWorks = () => {
  const steps = [
    {
      icon: "Search",
      title: "Find",
      description: "Search for box cricket venues by location, price, or amenities",
      color: "bg-blue-500"
    },
    {
      icon: "Calendar",
      title: "Book",
      description: "Select your preferred date and time slot, then confirm your booking",
      color: "bg-primary-600"
    },
    {
      icon: "Cricket",
      title: "Play",
      description: "Arrive at the venue and enjoy your game with friends and teammates",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-h2 mb-4">How It Works</h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Book your favorite box cricket venue in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                <Icon name={step.icon} size={28} color="white" />
              </div>
              <h3 className="text-h3 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute transform translate-x-32">
                  <Icon name="ArrowRight" className="text-gray-300 mt-8" size={32} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;