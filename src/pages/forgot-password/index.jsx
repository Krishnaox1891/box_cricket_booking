import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import ProgressStepper from "./components/ProgressStepper";
import EmailRequestForm from "./components/EmailRequestForm";
import OtpVerificationForm from "./components/OtpVerificationForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import SuccessMessage from "./components/SuccessMessage";
import Footer from "./components/Footer";
import Icon from "../../components/AppIcon";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password | BoxCricket";
  }, []);

  const handleEmailSubmit = (email) => {
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail(email);
      setCurrentStep(2);
    }, 1500);
  };

  const handleOtpVerify = (otp) => {
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock validation - any 6-digit OTP is valid except 000000
      if (otp === "000000") {
        setError("Invalid or expired OTP. Please try again.");
      } else {
        setCurrentStep(3);
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message for OTP resend
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const handlePasswordReset = (password) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Error Alert */}
          {error && (
            <div className="alert-error max-w-md mx-auto mb-6 flex items-start">
              <Icon name="AlertTriangle" size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}
          
          {/* Success Alert */}
          {success && (
            <div className="alert-success max-w-md mx-auto mb-6 flex items-start">
              <Icon name="CheckCircle" size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Success</p>
                <p>OTP has been resent to your email address.</p>
              </div>
            </div>
          )}
          
          {/* Progress Stepper - Only show for steps 1-3 */}
          {currentStep < 4 && <ProgressStepper currentStep={currentStep} />}
          
          {/* Card Container */}
          <div className="card max-w-md mx-auto p-6 md:p-8">
            {currentStep === 1 && (
              <EmailRequestForm 
                onSubmit={handleEmailSubmit} 
                isLoading={isLoading} 
              />
            )}
            
            {currentStep === 2 && (
              <OtpVerificationForm 
                email={email}
                onVerify={handleOtpVerify}
                onBack={() => setCurrentStep(1)}
                isLoading={isLoading}
                resendOtp={handleResendOtp}
              />
            )}
            
            {currentStep === 3 && (
              <ResetPasswordForm 
                onReset={handlePasswordReset}
                isLoading={isLoading}
              />
            )}
            
            {currentStep === 4 && (
              <SuccessMessage />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;