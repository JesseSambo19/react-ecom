import React from "react";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} loading-spinner`}></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
