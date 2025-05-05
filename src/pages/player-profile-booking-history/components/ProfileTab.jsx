import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from '../../../components/AppImage';


const ProfileTab = ({ user, stats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the data to the backend here
    setIsEditing(false);
    // For demo purposes, we're not actually updating the user object
  };

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-h3">Personal Information</h2>
          <button 
            className="btn-secondary-small flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Icon name={isEditing ? "X" : "Edit2"} size={16} className="mr-1" />
            <span>{isEditing ? "Cancel" : "Edit"}</span>
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-label block mb-1">Full Name</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-default"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-label block mb-1">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-default"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-label block mb-1">Phone Number</label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-default"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="text-label block mb-1">Address</label>
                <input
                  type="text" id="address" name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-default"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-label text-gray-500">Full Name</p>
              <p className="text-body mt-1">{user.name}</p>
            </div>
            <div>
              <p className="text-label text-gray-500">Email Address</p>
              <p className="text-body mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-label text-gray-500">Phone Number</p>
              <p className="text-body mt-1">{user.phone}</p>
            </div>
            <div>
              <p className="text-label text-gray-500">Address</p>
              <p className="text-body mt-1">{user.address || "Not provided"}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-h4 text-gray-700">{stat.label}</h3>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                <Icon name={stat.icon} size={20} className={stat.iconColor} />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            {stat.change && (
              <div className="flex items-center mt-2 text-sm">
                <Icon 
                  name={stat.change > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={stat.change > 0 ? "text-green-500 mr-1" : "text-red-500 mr-1"} 
                />
                <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(stat.change)}% {stat.change > 0 ? "increase" : "decrease"}
                </span>
                <span className="text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="card p-6">
        <h2 className="text-h3 mb-4">Favorite Venues</h2>
        {user.favoriteVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.favoriteVenues.map((venue, index) => (
              <div key={index} className="card-interactive p-4 flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                  <Image 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{venue.name}</h4>
                  <p className="text-sm text-gray-600">{venue.location}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Icon name="Heart" size={18} className="fill-current text-primary-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Heart" size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">You haven't added any favorite venues yet</p>
            <button className="btn-secondary-small mt-4">Explore Venues</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;