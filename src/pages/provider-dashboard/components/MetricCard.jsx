import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCard = ({ title, value, change, changeType, icon, iconBg }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`p-2 rounded-full ${iconBg}`}>
          <Icon name={icon} size={20} className="text-white" />
        </div>
      </div>
      
      <div className="mb-2 text-2xl font-bold">{value}</div>
      
      <div className="flex items-center">
        <div className={`flex items-center ${
          changeType === "increase" ? "text-green-600" : changeType ==="decrease" ? "text-red-600" : "text-gray-600"
        }`}>
          <Icon 
            name={
              changeType === "increase" ? "TrendingUp" : changeType ==="decrease" ? "TrendingDown" : "Minus"
            } 
            size={16} 
            className="mr-1" 
          />
          <span className="text-sm font-medium">{change}</span>
        </div>
        <span className="ml-1 text-sm text-gray-500">vs last month</span>
      </div>
    </div>
  );
};

export default MetricCard;