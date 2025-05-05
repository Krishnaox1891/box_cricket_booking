import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Image from "../../components/AppImage";

const PlayerLogin = () => {
  // Set page title
  useEffect(() => {
    document.title = "Login - BoxCricket";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left side - Login form */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-h2 mb-2 text-gray-800">Welcome Back</h1>
                <p className="text-subtitle mb-8">
                  Log in to your account to book venues and manage your cricket matches
                </p>
                
                <LoginForm />
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="w-full md:w-1/2 hidden md:block">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80" 
                  alt="Box Cricket Venue" className="w-full h-[500px] object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-h4 mb-1">Ready to play?</h3>
                  <p className="text-gray-600">
                    Log in to book your favorite box cricket venues and enjoy the game with friends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlayerLogin;