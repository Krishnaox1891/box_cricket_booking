import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import Icon from "../../components/AppIcon";

const PlayerRegistration = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - BoxCricket";
  }, []);

  const handleRegistrationSubmit = (formData) => {
    // In a real app, this would be an API call to register the user
    console.log("Registration form submitted:", formData);
    
    // Show success message
    setRegistrationSuccess(true);
    
    // Redirect to login page after 3 seconds
    setTimeout(() => {
      navigate("/player-login");
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {registrationSuccess ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={32} className="text-green-600" />
                </div>
                <h2 className="text-h2 mb-4">Registration Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your account has been created successfully. You will be redirected to the login page shortly.
                </p>
                <Link to="/player-login" className="btn-primary">
                  Go to Login
                </Link>
              </div>
            ) : (
              <div className="card p-6 md:p-8">
                <div className="text-center mb-8">
                  <h1 className="text-h2 mb-2">Create Your Account</h1>
                  <p className="text-subtitle">
                    Join BoxCricket to book venues and manage your cricket games
                  </p>
                </div>
                
                <RegistrationForm onSubmit={handleRegistrationSubmit} />
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/player-login" className="text-primary-600 hover:text-primary-700 font-medium">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlayerRegistration;