import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const BookingCard = ({ booking, isPast }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'badge-confirmed';
      case 'pending':
        return 'badge-pending';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-confirmed';
    }
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const calculateTimeRemaining = (dateString) => {
    const bookingDate = new Date(dateString);
    const now = new Date();
    const diffTime = bookingDate - now;
    
    if (diffTime <= 0) return "Starting soon";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else {
      return `${diffHours}h remaining`;
    }
  };
  
  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, you would submit the review to the backend here
    setIsReviewModalOpen(false);
    // Reset form
    setReviewRating(0);
    setReviewComment("");
  };
  
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-40 md:h-auto relative">
          <Image 
            src={booking.venue.image} 
            alt={booking.venue.name} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-2 right-2 ${getStatusBadgeClass(booking.status)}`}>
            {booking.status}
          </div>
        </div>
        
        <div className="p-4 md:p-6 flex-1">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-h4 mb-1">{booking.venue.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span>{booking.venue.location}</span>
              </div>
            </div>
            
            <div className="mt-2 md:mt-0 md:text-right">
              <div className="text-gray-700 font-medium">{formatDate(booking.date)}</div>
              <div className="text-gray-600 text-sm">{booking.timeSlot}</div>
              <div className="text-primary-600 font-medium mt-1">₹{booking.amount}</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <Icon name="Users" size={16} className="text-gray-600" />
              </div>
              <span className="text-gray-700">{booking.players} Players</span>
              
              {!isPast && (
                <div className="ml-4 flex items-center text-primary-600">
                  <Icon name="Clock" size={16} className="mr-1" />
                  <span className="text-sm font-medium">{calculateTimeRemaining(booking.date)}</span>
                </div>
              )}
              
              {isPast && booking.hasReviewed && (
                <div className="ml-4 flex items-center">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{booking.rating}/5 Rated</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              {!isPast && booking.status.toLowerCase() === 'confirmed' && (
                <>
                  <button className="btn-secondary-small flex items-center">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    <span>Directions</span>
                  </button>
                  <button className="btn-secondary-small flex items-center text-red-600 border-red-200 hover:bg-red-50">
                    <Icon name="X" size={16} className="mr-1" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
              
              {isPast && !booking.hasReviewed && (
                <button 
                  className="btn-secondary-small flex items-center"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Icon name="Star" size={16} className="mr-1" />
                  <span>Leave Review</span>
                </button>
              )}
              
              {isPast && (
                <Link to="/booking-confirmation" className="btn-primary-small flex items-center">
                  <Icon name="Repeat" size={16} className="mr-1" />
                  <span>Book Again</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-h3">Rate Your Experience</h3>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <p className="text-label mb-2">Venue: {booking.venue.name}</p>
                <p className="text-sm text-gray-600 mb-4">Played on {formatDate(booking.date)}</p>
                
                <div className="flex items-center mb-2">
                  <p className="text-label mr-3">Your Rating:</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Icon 
                          name="Star" 
                          size={24} 
                          className={`${
                            star <= reviewRating ? "text-yellow-500 fill-current" : "text-gray-300"
                          } hover:text-yellow-500`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="reviewComment" className="text-label block mb-2">
                  Your Review
                </label>
                <textarea
                  id="reviewComment" rows="4" className="input-default" placeholder="Share your experience at this venue..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" className="btn-secondary"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" className="btn-primary"
                  disabled={reviewRating === 0}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;