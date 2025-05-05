import React from "react";
import Icon from "../../../components/AppIcon";

const TrustIndicators = () => {
  const stats = [
    {
      icon: "MapPin",
      value: "200+",
      label: "Venues Nationwide"
    },
    {
      icon: "Users",
      value: "50,000+",
      label: "Happy Players"
    },
    {
      icon: "Calendar",
      value: "10,000+",
      label: "Monthly Bookings"
    },
    {
      icon: "Star",
      value: "4.8",
      label: "Average Rating"
    }
  ];

  return (
    <section className="py-12 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4">
                <Icon name={stat.icon} size={24} className="text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;