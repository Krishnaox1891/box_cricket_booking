import React from "react";
import Icon from "../../../components/AppIcon";

const BookingProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Review Selection" },
    { id: 2, name: "Player Details" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirmation" },
  ];

  return (
    <div className="w-full py-4">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.id <= currentStep
                    ? "border-primary-600 bg-primary-600 text-white" :"border-gray-300 bg-white text-gray-400"
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  step.id <= currentStep ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-1 ${
                  step.id < currentStep ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-primary-600">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {steps[currentStep - 1].name}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressBar;