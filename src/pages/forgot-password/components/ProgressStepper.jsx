import React from "react";
import Icon from "../../../components/AppIcon";

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Request" },
    { id: 2, name: "Verify" },
    { id: 3, name: "Reset" },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.id < currentStep
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : step.id === currentStep
                    ? "border-emerald-600 text-emerald-600" :"border-gray-300 text-gray-300"
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={18} />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.id <= currentStep ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line (except after the last step) */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step.id < currentStep ? "bg-emerald-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;