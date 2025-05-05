import React, { useState } from "react";

import Icon from "../../../components/AppIcon";

const ResetPasswordForm = ({ onReset, isLoading }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
    };
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    const validation = validatePassword(password);
    const criteriaCount = Object.values(validation).filter(Boolean).length - 1; // Subtract isValid

    if (criteriaCount <= 2) return { strength: 1, label: "Weak" };
    if (criteriaCount === 3) return { strength: 2, label: "Medium" };
    if (criteriaCount === 4) return { strength: 3, label: "Strong" };
    return { strength: 4, label: "Very Strong" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password).isValid) {
      newErrors.password = "Password doesn't meet the requirements";
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onReset(formData.password);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-gray-200", // Empty
    "bg-red-500",  // Weak
    "bg-yellow-500", // Medium
    "bg-blue-500",  // Strong
    "bg-green-500", // Very Strong
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Icon name="KeyRound" size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-h3 mb-2">Create New Password</h2>
        <p className="text-gray-600">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="text-label block mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password" name="password" className={`input-default pl-10 pr-10 ${errors.password ?"border-red-500" : ""}`}
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} className="text-gray-400" />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.password}
            </p>
          )}

          {formData.password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Password strength:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength.strength === 1 ? "text-red-600" : passwordStrength.strength === 2 ?"text-yellow-600": passwordStrength.strength === 3 ?"text-blue-600": passwordStrength.strength === 4 ?"text-green-600" : ""
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strengthColors[passwordStrength.strength]}`}
                  style={{ width: `${passwordStrength.strength * 25}%` }}
                ></div>
              </div>
              
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                <li className={`flex items-center ${validatePassword(formData.password).minLength ? "text-green-600" : ""}`}>
                  <Icon name={validatePassword(formData.password).minLength ? "Check" : "Circle"} size={12} className="mr-1" />
                  At least 8 characters
                </li>
                <li className={`flex items-center ${validatePassword(formData.password).hasUppercase ? "text-green-600" : ""}`}>
                  <Icon name={validatePassword(formData.password).hasUppercase ? "Check" : "Circle"} size={12} className="mr-1" />
                  At least one uppercase letter
                </li>
                <li className={`flex items-center ${validatePassword(formData.password).hasLowercase ? "text-green-600" : ""}`}>
                  <Icon name={validatePassword(formData.password).hasLowercase ? "Check" : "Circle"} size={12} className="mr-1" />
                  At least one lowercase letter
                </li>
                <li className={`flex items-center ${validatePassword(formData.password).hasNumber ? "text-green-600" : ""}`}>
                  <Icon name={validatePassword(formData.password).hasNumber ? "Check" : "Circle"} size={12} className="mr-1" />
                  At least one number
                </li>
                <li className={`flex items-center ${validatePassword(formData.password).hasSpecialChar ? "text-green-600" : ""}`}>
                  <Icon name={validatePassword(formData.password).hasSpecialChar ? "Check" : "Circle"} size={12} className="mr-1" />
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
              <Icon name="Lock" size={18} className="text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword" name="confirmPassword" className={`input-default pl-10 pr-10 ${errors.confirmPassword ?"border-red-500" : ""}`}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} className="text-gray-400" />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`btn-primary w-full flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icon name="Loader" size={20} className="animate-spin mr-2" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;