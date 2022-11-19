import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-b-2 border-teal-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
