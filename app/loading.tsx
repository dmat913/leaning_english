import GlassLoadingSpinner from "@/components/elements/GlassLoadingSpinner";
import React from "react";

const loading = () => {
  return (
    <div className="w-[100vw] h-[100svh] flex items-center justify-center">
      <GlassLoadingSpinner />
    </div>
  );
};

export default loading;
