import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const PopularTimeSlots = () => {
  const data = [
    { name: "Morning (8-12)", value: 35, color: "#10b981" },
    { name: "Afternoon (12-4)", value: 20, color: "#3b82f6" },
    { name: "Evening (4-8)", value: 45, color: "#8b5cf6" }
  ];
  
  const COLORS = data.map(item => item.color);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Popular Time Slots</h3>
      </div>
      
      <div className="p-4" aria-label="Popular Time Slots Pie Chart">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, "Booking Percentage"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Evening slots are the most popular, followed by morning slots. Consider optimizing pricing for these high-demand periods.</p>
        </div>
      </div>
    </div>
  );
};

export default PopularTimeSlots;