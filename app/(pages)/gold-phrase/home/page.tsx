import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import { PATHS } from "@/lib/paths";

const HomePage = () => {
  return (
    <div className="w-full h-full overflow-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
        <MeteorsCard
          title="600点レベル"
          description="助走の400語"
          path={PATHS.GOLD_PHRASE_LEVEL600}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="730点レベル"
          description="加速の300語"
          path={PATHS.GOLD_PHRASE_LEVEL730}
          meteorsNumber={10}
        />
        <MeteorsCard
          title="860点レベル"
          description="飛躍の200語"
          path={PATHS.GOLD_PHRASE_LEVEL860}
          meteorsNumber={15}
        />
        <MeteorsCard
          title="990点レベル"
          description="頂点の100語"
          path={PATHS.GOLD_PHRASE_LEVEL990}
          meteorsNumber={20}
        />
        <MeteorsCard
          title="パート1重要語100"
          description="100 Essential Words for Part 1"
          path={PATHS.GOLD_PHRASE_PART1_ESSENTIAL_WORD100}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="部署"
          description="Departments"
          path={PATHS.GOLD_PHRASE_DEPARTMENTS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="職業"
          description="Occupations"
          path={PATHS.GOLD_PHRASE_OCCUPATIONS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="専攻名"
          description="Majors"
          path={PATHS.GOLD_PHRASE_MAJORS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="前置詞"
          description="Prepositions"
          path={PATHS.GOLD_PHRASE_PREPOSITIONS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="接続詞"
          description="Conjunctions"
          path={PATHS.GOLD_PHRASE_CONJUNCTIONS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="接続副詞"
          description="Conjunctive Adverbs"
          path={PATHS.GOLD_PHRASE_CONJUNCTIVE_ADVERBS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="多義語"
          description="88 Words with Multiple Meanings"
          path={PATHS.GOLD_PHRASE_MULTIPLE_MEANINGS}
          meteorsNumber={5}
        />
        <MeteorsCard
          title="定型表現"
          description="120 Set Phrases"
          path={PATHS.GOLD_PHRASE_PHRASES120}
          meteorsNumber={5}
        />
      </div>
    </div>
  );
};

export default HomePage;
