import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingProgressBar from "./components/BookingProgressBar";
import BookingSummary from "./components/BookingSummary";
import ReviewSelection from "./components/ReviewSelection";
import PlayerDetails from "./components/PlayerDetails";
import Payment from "./components/Payment";
import Confirmation from "./components/Confirmation";
import CountdownTimer from "./components/CountdownTimer";
import Icon from '../../components/AppIcon';


const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [playerInfo, setPlayerInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    teamSize: "10",
    specialRequests: "",
  });
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showTimer, setShowTimer] = useState(true);

  // Mock booking details
  const bookingDetails = {
    bookingId: "BK" + Math.floor(Math.random() * 1000000),
    venue: {
      id: 1,
      name: "Cricket Hub Arena",
      location: "Andheri East, Mumbai",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
      amenities: ["Floodlights", "Changing Rooms", "Parking", "Equipment Rental", "Cafeteria"]
    },
    date: "Saturday, 15 June 2024",
    timeSlot: "6:00 PM - 8:00 PM",
    basePrice: 1200,
    gst: 216,
    bookingFee: 50,
    totalPrice: 1466,
    holdExpiryTime: 10, // minutes
  };

  // Set page title
  useEffect(() => {
    document.title = "Booking Confirmation - BoxCricket";
  }, []);

  const handleContinueToPlayerDetails = () => {
    setCurrentStep(2);
  };

  const handleBackToReview = () => {
    setCurrentStep(1);
  };

  const handleContinueToPayment = (formData) => {
    setPlayerInfo(formData);
    setCurrentStep(3);
  };

  const handleBackToPlayerDetails = () => {
    setCurrentStep(2);
  };

  const handlePaymentComplete = (details) => {
    setPaymentDetails(details);
    setCurrentStep(4);
    setShowTimer(false);
  };

  const handleTimerExpire = () => {
    alert("Your booking session has expired. You will be redirected to the venue details page.");
    navigate("/venue-details?id=" + bookingDetails.venue.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <BookingProgressBar currentStep={currentStep} />
          
          {showTimer && currentStep < 4 && (
            <div className="mb-6">
              <CountdownTimer 
                initialMinutes={bookingDetails.holdExpiryTime} 
                initialSeconds={0} 
                onExpire={handleTimerExpire} 
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <ReviewSelection 
                  bookingDetails={bookingDetails} 
                  onContinue={handleContinueToPlayerDetails} 
                />
              )}
              
              {currentStep === 2 && (
                <PlayerDetails 
                  playerInfo={playerInfo}
                  onBack={handleBackToReview}
                  onContinue={handleContinueToPayment}
                />
              )}
              
              {currentStep === 3 && (
                <Payment 
                  bookingDetails={bookingDetails}
                  onBack={handleBackToPlayerDetails}
                  onPaymentComplete={handlePaymentComplete}
                />
              )}
              
              {currentStep === 4 && (
                <Confirmation 
                  bookingDetails={bookingDetails}
                  paymentDetails={paymentDetails}
                />
              )}
            </div>
            
            <div className="lg:col-span-1">
              <BookingSummary 
                bookingDetails={bookingDetails} 
                isCollapsible={true}
              />
              
              {currentStep < 4 && (
                <div className="mt-6 card p-4">
                  <h3 className="text-h4 mb-3">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions or need assistance with your booking, our support team is here to help.
                  </p>
                  <div className="flex items-center text-primary-600 font-medium">
                    <Icon name="Phone" size={18} className="mr-2" />
                    <span>+91 9876543210</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;