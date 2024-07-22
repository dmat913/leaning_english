"use client";

import { Background } from "@/components/aceternity/Background";
import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import React from "react";

const Home = () => {
  return (
    <Background>
      <div className="w-full h-full flex flex-col items-center p-3 gap-3">
        <MeteorsCard
          title="600点レベル"
          description="助走の400語"
          path="level600"
          meteorsNumber={5}
        />
        <MeteorsCard
          title="730点レベル"
          description="加速の300語"
          path="level730"
          meteorsNumber={10}
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
        <MeteorsCard
          title="パート1重要語100"
          description="100 Essential Words for Part 1"
          // path="level730"
          className="opacity-[0.5]"
          disabled
        />
        <MeteorsCard
          title="部署・職業名"
          description="Departments & Occupations"
          // path="level730"
          className="opacity-[0.5]"
          disabled
        />
        <MeteorsCard
          title="前置詞・接続詞・接続副詞"
          description="Prepositions,Conjunctions,and Conjunctive Adverbs"
          // path="level730"
          className="opacity-[0.5]"
          disabled
        />
        <MeteorsCard
          title="多義語"
          description="88 Words with Multiple Meanings"
          // path="level730"
          className="opacity-[0.5]"
          disabled
        />
        <MeteorsCard
          title="定型表現"
          description="120 Set Phrases"
          // path="level730"
          className="opacity-[0.5]"
          disabled
        />
      </div>
    </Background>
  );
};

export default Home;
