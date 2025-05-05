import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const EmailRequestForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    onSubmit(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Icon name="Mail" size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-h3 mb-2">Forgot Your Password?</h2>
        <p className="text-gray-600">
          Enter your registered email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-label block mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={18} className="text-gray-400" />
            </div>
            <input
              type="email" id="email" className={`input-default pl-10 ${error ?"border-red-500" : ""}`}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {error}
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
              Sending...
            </>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <a href="/player-login" className="text-emerald-600 font-medium hover:text-emerald-700">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailRequestForm;