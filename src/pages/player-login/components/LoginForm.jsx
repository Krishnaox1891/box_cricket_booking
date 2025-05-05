import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mock credentials for demo purposes
    const validCredentials = {
      email: "player@example.com",
      password: "password123"
    };

    // Simulate API call with timeout
    setTimeout(() => {
      if (formData.email === validCredentials.email && formData.password === validCredentials.password) {
        // Successful login
        navigate("/player-landing-page");
      } else {
        // Failed login
        setError("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <div className="alert-error rounded-md">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={18} className="mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Email field */}
        <div>
          <label htmlFor="email" className="text-label block mb-2">
            Email or Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={18} className="text-gray-500" />
            </div>
            <input
              id="email" name="email" type="text" autoComplete="email"
              required
              className="input-default pl-10" placeholder="Enter your email or mobile number"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="text-label">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-gray-500" />
            </div>
            <input
              id="password" name="password" type={showPassword ?"text" : "password"}
              autoComplete="current-password"
              required
              className="input-default pl-10 pr-10" placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon 
                name={showPassword ? "EyeOff" : "Eye"} 
                size={18} 
                className="text-gray-500 hover:text-gray-700"
              />
            </button>
          </div>
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-center">
          <input
            id="rememberMe" name="rememberMe" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        {/* Login button */}
        <div>
          <button
            type="submit"
            className={`btn-primary w-full flex justify-center items-center ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader" size={20} className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </div>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/player-registration" className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;