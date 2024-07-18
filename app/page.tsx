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
      <MeteorsCard
        title="730点レベル"
        description="加速の300語"
        // path="level730"
        className="opacity-[0.5]"
        disabled
      />
      <MeteorsCard
        title="860点レベル"
        description="飛躍の200語"
        // path="level860"
        className="opacity-[0.5]"
        disabled
      />
      <MeteorsCard
        title="990点レベル"
        description="頂点の100語"
        // path="level990"
        className="opacity-[0.5]"
        disabled
      />
    </div>
  );
};

export default Home;
