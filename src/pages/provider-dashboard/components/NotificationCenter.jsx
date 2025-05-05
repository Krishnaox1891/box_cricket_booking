import React from "react";
import Icon from "../../../components/AppIcon";

const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: "booking",
      message: "New booking request from Rahul Sharma for tomorrow at 10:00 AM",
      time: "10 minutes ago",
      isRead: false
    },
    {
      id: 2,
      type: "cancellation",
      message: "Booking #BK-1230 has been cancelled by the customer",
      time: "1 hour ago",
      isRead: false
    },
    {
      id: 3,
      type: "payment",
      message: "Payment of ₹1,200 received for booking #BK-1229",
      time: "3 hours ago",
      isRead: true
    },
    {
      id: 4,
      type: "system",
      message: "System maintenance scheduled for tonight at 2:00 AM",
      time: "Yesterday",
      isRead: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return { name: "Calendar", className: "text-emerald-500" };
      case "cancellation":
        return { name: "XCircle", className: "text-red-500" };
      case "payment":
        return { name: "CreditCard", className: "text-blue-500" };
      case "system":
        return { name: "Bell", className: "text-amber-500" };
      default:
        return { name: "Info", className: "text-gray-500" };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          Mark All as Read
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => {
          const icon = getNotificationIcon(notification.type);
          
          return (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50">
                    <Icon name={icon.name} className={icon.className} size={20} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                </div>
                
                {!notification.isRead && (
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 text-center border-t border-gray-200">
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;