import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const Payment = ({ bookingDetails, onBack, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentError(null);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentError(null);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate successful payment (90% chance)
      if (Math.random() > 0.1) {
        onPaymentComplete({
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
          paymentMethod: paymentMethod,
          amount: bookingDetails.totalPrice,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Simulate payment error
        setPaymentError("Your payment could not be processed. Please try again or use a different payment method.");
      }
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-h3 mb-4">Payment</h2>
      
      {paymentError && (
        <div className="alert-error mb-4 flex items-start">
          <Icon name="AlertTriangle" size={20} className="mr-2 flex-shrink-0 mt-0.5" />
          <p>{paymentError}</p>
        </div>
      )}
      
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-h4">Select Payment Method</h3>
          <div className="flex items-center">
            <Icon name="Lock" size={16} className="text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">Secure Payment</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
            <input
              type="radio" name="paymentMethod"
              checked={paymentMethod === 'card'}
              onChange={() => handlePaymentMethodChange('card')}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4"
            />
            <div className="ml-3 flex-1">
              <span className="font-medium block">Credit/Debit Card</span>
              <span className="text-sm text-gray-500">Visa, Mastercard, RuPay</span>
            </div>
            <div className="flex space-x-1">
              <Icon name="CreditCard" size={20} className="text-gray-400" />
            </div>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'upi' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
            <input
              type="radio" name="paymentMethod"
              checked={paymentMethod === 'upi'}
              onChange={() => handlePaymentMethodChange('upi')}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4"
            />
            <div className="ml-3 flex-1">
              <span className="font-medium block">UPI</span>
              <span className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</span>
            </div>
            <div className="flex space-x-1">
              <Icon name="Smartphone" size={20} className="text-gray-400" />
            </div>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'netbanking' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
            <input
              type="radio" name="paymentMethod"
              checked={paymentMethod === 'netbanking'}
              onChange={() => handlePaymentMethodChange('netbanking')}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4"
            />
            <div className="ml-3 flex-1">
              <span className="font-medium block">Net Banking</span>
              <span className="text-sm text-gray-500">All major banks supported</span>
            </div>
            <div className="flex space-x-1">
              <Icon name="Building" size={20} className="text-gray-400" />
            </div>
          </label>
        </div>
      </div>
      
      <div className="card p-4 mb-6">
        <h3 className="text-h4 mb-3">Payment Summary</h3>
        <div className="flex justify-between font-medium text-lg">
          <span>Total Amount</span>
          <span className="text-primary-700">₹{bookingDetails.totalPrice}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          By proceeding with the payment, you agree to our Terms of Service and Cancellation Policy.
        </p>
      </div>
      
      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={onBack}
          className="btn-secondary flex items-center"
          disabled={isProcessing}
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          <span>Back</span>
        </button>
        
        <button 
          type="button"
          onClick={handlePayment}
          className={isProcessing ? "btn-primary-disabled" : "btn-primary"}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Icon name="Loader" size={18} className="animate-spin mr-2" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay ₹{bookingDetails.totalPrice}</span>
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;