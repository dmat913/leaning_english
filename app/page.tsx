"use client";

import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center px-3 gap-3">
      <MeteorsCard title="600点レベル" description="助走の400語" />
    </div>
  );
};

export default Home;
