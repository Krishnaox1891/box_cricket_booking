import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Cricket Enthusiast",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "BoxCricket made it super easy to find and book venues for our weekend matches. The booking process is seamless, and the venue ratings helped us choose the best place.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Corporate Team Lead",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "We use BoxCricket for all our corporate team-building events. The variety of venues and transparent pricing make planning hassle-free. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "College Cricket Team Captain",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      quote: "As a college team, we needed affordable venues for practice. BoxCricket helped us find budget-friendly options with good facilities. The booking confirmation is instant!",
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-h2 mb-4">What Our Users Say</h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Join thousands of satisfied players who book box cricket venues through our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100">
                  <Image 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i}
                      name="Star" 
                      size={20} 
                      className={i < testimonials[currentIndex].rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div>
                  <p className="font-semibold text-gray-800">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 right-8 flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-primary-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;