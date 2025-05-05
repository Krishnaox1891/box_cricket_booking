import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SettingsTab = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailBookingConfirmation: true,
    emailBookingReminder: true,
    emailPromotions: false,
    pushBookingConfirmation: true,
    pushBookingReminder: true,
    pushPromotions: false
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous messages
    setPasswordError("");
    setPasswordSuccess("");
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    
    // In a real app, you would submit to the backend here
    setPasswordSuccess("Password updated successfully");
    
    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="card p-6">
        <h2 className="text-h3 mb-6">Notification Preferences</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-h4 mb-3">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Booking Confirmations</p>
                  <p className="text-sm text-gray-500">Receive emails when your booking is confirmed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="emailBookingConfirmation"
                    checked={notificationSettings.emailBookingConfirmation}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Booking Reminders</p>
                  <p className="text-sm text-gray-500">Receive reminder emails before your scheduled booking</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="emailBookingReminder"
                    checked={notificationSettings.emailBookingReminder}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Promotions & Offers</p>
                  <p className="text-sm text-gray-500">Receive emails about special offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="emailPromotions"
                    checked={notificationSettings.emailPromotions}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-h4 mb-3">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Booking Confirmations</p>
                  <p className="text-sm text-gray-500">Receive push notifications when your booking is confirmed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="pushBookingConfirmation"
                    checked={notificationSettings.pushBookingConfirmation}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Booking Reminders</p>
                  <p className="text-sm text-gray-500">Receive push notifications before your scheduled booking</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="pushBookingReminder"
                    checked={notificationSettings.pushBookingReminder}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Promotions & Offers</p>
                  <p className="text-sm text-gray-500">Receive push notifications about special offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" className="sr-only peer" name="pushPromotions"
                    checked={notificationSettings.pushPromotions}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-h3 mb-6">Change Password</h2>
        
        <form onSubmit={handlePasswordSubmit}>
          {passwordError && (
            <div className="alert-error mb-4">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={18} className="mr-2" />
                <p>{passwordError}</p>
              </div>
            </div>
          )}
          
          {passwordSuccess && (
            <div className="alert-success mb-4">
              <div className="flex items-center">
                <Icon name="CheckCircle" size={18} className="mr-2" />
                <p>{passwordSuccess}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="text-label block mb-1">Current Password</label>
              <input
                type="password" id="currentPassword" name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="input-default"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="text-label block mb-1">New Password</label>
              <input
                type="password" id="newPassword" name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="input-default"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="text-label block mb-1">Confirm New Password</label>
              <input
                type="password" id="confirmPassword" name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="input-default"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button type="submit" className="btn-primary">Update Password</button>
          </div>
        </form>
      </div>
      
      <div className="card p-6 border-red-200">
        <h2 className="text-h3 mb-2">Delete Account</h2>
        <p className="text-gray-600 mb-6">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        
        {!showDeleteConfirm ? (
          <button 
            className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-h4 text-red-700 mb-2">Are you sure?</h3>
            <p className="text-red-600 mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <button 
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                Yes, Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTab;