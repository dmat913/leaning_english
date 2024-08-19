import React from "react";

const GlassLoadingSpinner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-lg backdrop-blur-sm bg-white bg-opacity-30 border border-gray-100 shadow-glass">
      <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
      <p className="mt-4 text-white-1 font-semibold">Loading...</p>
    </div>
  );
};

export default GlassLoadingSpinner;
