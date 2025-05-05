import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ReviewsSection = ({ reviews, averageRating, ratingDistribution }) => {
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  
  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });
  
  // Paginate reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <section id="reviews" className="mb-12">
      <h2 className="text-h2 mb-6">Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold mr-3">{averageRating}</div>
            <div>
              <div className="flex mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon 
                    key={star}
                    name="Star" 
                    size={18} 
                    className={star <= Math.round(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-yellow-500 h-full rounded-full" 
                    style={{ width: `${(ratingDistribution[rating] / reviews.length) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-sm text-gray-600 text-right">
                  {ratingDistribution[rating]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-h4">All Reviews</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
          
          {currentReviews.length > 0 ? (
            <div className="space-y-6">
              {currentReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image 
                          src={review.userAvatar} 
                          alt={review.userName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-gray-600">{formatDate(review.date)}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon 
                          key={star}
                          name="Star" 
                          size={16} 
                          className={star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed' :'text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Previous page"
                    >
                      <Icon name="ChevronLeft" size={18} />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-md ${
                          currentPage === page
                            ? 'bg-primary-600 text-white' :'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed' :'text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Next page"
                    >
                      <Icon name="ChevronRight" size={18} />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Icon name="MessageSquare" size={40} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;