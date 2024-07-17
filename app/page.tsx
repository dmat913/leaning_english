"use client";

import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center p-3 gap-3">
      <MeteorsCard
        title="600点レベル"
        description="助走の400語"
        path="level600"
      />
    </div>
  );
};

export default Home;
