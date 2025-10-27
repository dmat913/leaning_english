import { MeteorsCard } from "@/components/aceternity/MeteorsCard";
import { PATHS } from "@/lib/paths";

const GrammarExpressHome = () => {
  return (
    <div className="w-full h-full flex overflow-auto flex-col items-center gap-3 p-4">
      <MeteorsCard
        title="第1章/まずは550点"
        description="絶対おさえるべき23題"
        path={PATHS.GRAMMAR_EXPRESS_CHAPTER1}
        meteorsNumber={5}
      />
      <MeteorsCard
        title="第2章/まずは550点"
        description="スピードを手に入れる19題"
        path={PATHS.GRAMMAR_EXPRESS_CHAPTER2}
        meteorsNumber={5}
      />
      <MeteorsCard
        title="第3章/しっかり730点"
        description="苦手分野を克服する14題"
        path={PATHS.HOME}
        meteorsNumber={10}
        disabled
      />
      <MeteorsCard
        title="第4章/しっかり730点"
        description="意外な落とし穴を回避する22題!"
        path={PATHS.HOME}
        meteorsNumber={10}
        disabled
      />
      <MeteorsCard
        title="第5章/しっかり730点"
        description="一気に駆け抜けるPart6!"
        path={PATHS.HOME}
        meteorsNumber={10}
        disabled
      />
      <MeteorsCard
        title="第6章/目指せ!900点越え"
        description="ここで差がつく24題!"
        path={PATHS.HOME}
        meteorsNumber={15}
        disabled
      />
      <MeteorsCard
        title="第7章/目指せ!900点越え"
        description="最高峰を目指す23題!"
        path={PATHS.HOME}
        meteorsNumber={15}
        disabled
      />
    </div>
  );
};

export default GrammarExpressHome;
