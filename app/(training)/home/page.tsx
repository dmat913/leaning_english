import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full h-full flex overflow-auto flex-col items-center gap-3">
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
        path="level860"
        meteorsNumber={15}
      />
      <MeteorsCard
        title="990点レベル"
        description="頂点の100語"
        path="level990"
        meteorsNumber={20}
      />
      <MeteorsCard
        title="パート1重要語100"
        description="100 Essential Words for Part 1"
        path="part1_essentialWord100"
        meteorsNumber={5}
      />
      <MeteorsCard
        title="部署・職業名"
        description="Departments & Occupations"
        path="departmentsAndOccupations"
        meteorsNumber={5}
      />
      <MeteorsCard
        title="前置詞・接続詞・接続副詞"
        description="Prepositions,Conjunctions,and Conjunctive Adverbs"
        path="functionWords"
        meteorsNumber={5}
      />
      <MeteorsCard
        title="多義語"
        description="88 Words with Multiple Meanings"
        path="multipleMeanings"
        meteorsNumber={5}
      />
      <MeteorsCard
        title="定型表現"
        description="120 Set Phrases"
        path="phrases"
        meteorsNumber={5}
      />
    </div>
  );
};

export default HomePage;
