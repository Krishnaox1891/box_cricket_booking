import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const CountdownTimer = ({ initialMinutes, initialSeconds, onExpire }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, onExpire]);

  // Calculate percentage for progress bar
  const totalSeconds = initialMinutes * 60 + initialSeconds;
  const remainingSeconds = minutes * 60 + seconds;
  const progressPercentage = (remainingSeconds / totalSeconds) * 100;

  return (
    <div className="bg-warning-100 p-3 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon name="Clock" size={18} className="text-warning-600 mr-2" />
          <span className="text-sm font-medium text-warning-600">
            Time remaining to complete booking
          </span>
        </div>
        <span className="font-medium text-warning-600">
          {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="w-full bg-white rounded-full h-1.5">
        <div
          className="bg-warning-600 h-1.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;