import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const OtpVerificationForm = ({ email, onVerify, onBack, isLoading, resendOtp }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      
      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    onVerify(otpValue);
  };

  const handleResendOtp = () => {
    if (canResend) {
      resendOtp();
      setCountdown(30);
      setCanResend(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Icon name="ShieldCheck" size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-h3 mb-2">Verify OTP</h2>
        <p className="text-gray-600">
          We've sent a 6-digit OTP to <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} onPaste={handlePaste}>
        <div className="mb-6">
          <label className="text-label block mb-3 text-center">Enter OTP</label>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="btn-secondary w-full"
          >
            Back
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Didn't receive the OTP?
        </p>
        {canResend ? (
          <button
            onClick={handleResendOtp}
            className="text-emerald-600 font-medium hover:text-emerald-700 text-sm"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-gray-500">
            Resend OTP in <span className="font-medium">{countdown}</span> seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpVerificationForm;