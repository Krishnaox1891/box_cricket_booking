import React, { useState } from "react";

import Icon from "../../../components/AppIcon";

const RegistrationForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-green-500";
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
        newErrors.mobile = "Mobile number must be 10 digits";
      }
    } else if (currentStep === 2) {
      if (!formData.otp.trim()) {
        newErrors.otp = "OTP is required";
      } else if (!/^[0-9]{6}$/.test(formData.otp)) {
        newErrors.otp = "OTP must be 6 digits";
      }
    } else if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>
    );
  };

  const renderPersonalInfoStep = () => {
    return (
      <>
        <div className="mb-6">
          <label htmlFor="firstName" className="text-label block mb-2">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="User" size={18} className="text-gray-500" />
            </div>
            <input
              type="text" id="firstName" name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.firstName ? 'input-error' : ''}`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="text-label block mb-2">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="User" size={18} className="text-gray-500" />
            </div>
            <input
              type="text" id="lastName" name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.lastName ? 'input-error' : ''}`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="text-label block mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={18} className="text-gray-500" />
            </div>
            <input
              type="email" id="email" name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-8">
          <label htmlFor="mobile" className="text-label block mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Phone" size={18} className="text-gray-500" />
            </div>
            <input
              type="tel" id="mobile" name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.mobile ? 'input-error' : ''}`}
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
            />
          </div>
          {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <button
          type="button"
          onClick={handleNextStep}
          className="btn-primary w-full"
        >
          Continue
        </button>
      </>
    );
  };

  const renderOtpVerificationStep = () => {
    return (
      <>
        <div className="text-center mb-6">
          <Icon name="MessageSquare" size={48} className="mx-auto text-primary-600 mb-4" />
          <h3 className="text-h3 mb-2">OTP Verification</h3>
          <p className="text-gray-600">
            We've sent a 6-digit OTP to your mobile number {formData.mobile.substring(0, 2)}******{formData.mobile.substring(8, 10)}
          </p>
        </div>

        <div className="mb-8">
          <label htmlFor="otp" className="text-label block mb-2">
            Enter OTP
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-gray-500" />
            </div>
            <input
              type="text" id="otp" name="otp"
              value={formData.otp}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.otp ? 'input-error' : ''}`}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>
          {errors.otp && <p className="text-red-600 text-sm mt-1">{errors.otp}</p>}
        </div>

        <div className="flex justify-between mb-8">
          <button
            type="button" className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            <Icon name="RefreshCw" size={16} className="mr-1" />
            Resend OTP
          </button>
          <p className="text-gray-600 text-sm">
            Resend available in <span className="font-medium">30s</span>
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className="btn-primary flex-1"
          >
            Verify & Continue
          </button>
        </div>
      </>
    );
  };

  const renderPasswordCreationStep = () => {
    return (
      <>
        <div className="text-center mb-6">
          <Icon name="ShieldCheck" size={48} className="mx-auto text-primary-600 mb-4" />
          <h3 className="text-h3 mb-2">Create Password</h3>
          <p className="text-gray-600">
            Create a strong password to secure your account
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-label block mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-gray-500" />
            </div>
            <input
              type="password" id="password" name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.password ? 'input-error' : ''}`}
              placeholder="Create a password"
            />
          </div>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Password strength:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength <= 1 ? 'text-red-600' : passwordStrength === 2 ?'text-orange-600': passwordStrength === 3 ?'text-yellow-600': 'text-green-600'
                }`}>
                  {getPasswordStrengthLabel()}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthColor()}`} 
                  style={{ width: `${passwordStrength * 25}%` }}
                ></div>
              </div>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <Icon 
                    name={formData.password.length >= 8 ? "CheckCircle" : "Circle"} 
                    size={12} 
                    className={formData.password.length >= 8 ? "text-green-500 mr-1" : "text-gray-400 mr-1"} 
                  />
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <Icon 
                    name={/[A-Z]/.test(formData.password) ? "CheckCircle" : "Circle"} 
                    size={12} 
                    className={/[A-Z]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-400 mr-1"} 
                  />
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <Icon 
                    name={/[0-9]/.test(formData.password) ? "CheckCircle" : "Circle"} 
                    size={12} 
                    className={/[0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-400 mr-1"} 
                  />
                  At least one number
                </li>
                <li className="flex items-center">
                  <Icon 
                    name={/[^A-Za-z0-9]/.test(formData.password) ? "CheckCircle" : "Circle"} 
                    size={12} 
                    className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-400 mr-1"} 
                  />
                  At least one special character
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="text-label block mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-gray-500" />
            </div>
            <input
              type="password" id="confirmPassword" name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-default pl-10 ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm your password"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-8">
          <label className="flex items-start">
            <input
              type="checkbox" name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
            />
            <span className="ml-2 text-sm text-gray-700">
              I agree to the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            type="submit" className="btn-primary flex-1"
          >
            Create Account
          </button>
        </div>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {renderStepIndicator()}
      
      {step === 1 && renderPersonalInfoStep()}
      {step === 2 && renderOtpVerificationStep()}
      {step === 3 && renderPasswordCreationStep()}
    </form>
  );
};

export default RegistrationForm;