"use client";
import GrammarLoader from "@/components/common/GrammarLoader";
import LoadingScreen from "@/components/common/LoadingScreen";
import { GrammarExpress } from "@/models/grammarExpressModel";
import {
  grammarTestDataState,
  selectedGrammarState,
} from "@/states/grammarTestDataState";
import { useRouter, useParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import DMATProgressBar from "@/components/elements/DMATProgressBar";
import { MdList } from "react-icons/md";
import { PATHS } from "@/lib/paths";
import GrammarListCard from "@/components/grammar-express/GrammarListCard";

// 各章の設定
const CHAPTER_CONFIG: Record<string, { title: string; loadingTitle: string }> =
  {
    chapter1: {
      title: "絶対おさえるべき23題",
      loadingTitle: "絶対おさえるべき23題",
    },
    chapter2: {
      title: "スピードを手にいれる19題",
      loadingTitle: "スピードを手にいれる19題",
    },
    chapter3: {
      title: "苦手分野を克服する14題",
      loadingTitle: "苦手分野を克服する14題",
    },
    chapter4: {
      title: "意外な落とし穴を回避する22題",
      loadingTitle: "意外な落とし穴を回避する22題",
    },
    chapter6: {
      title: "ここで差がつく24題",
      loadingTitle: "ここで差がつく24題",
    },
  };

const ChapterPage = () => {
  const router = useRouter();
  const params = useParams();
  const chapter = params.chapter as string;

  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);

  const handleClickCloseButton = () => {
    router.push(PATHS.GRAMMAR_EXPRESS_HOME);
  };

  const handleClickCard = (grammar: GrammarExpress) => {
    setSelectedGrammar(grammar);
    router.push(`/grammar-express/${chapter}/${grammar.grammar_id}`);
  };

  // 章の設定を取得（存在しない場合はデフォルト値）
  const config = CHAPTER_CONFIG[chapter] || {
    title: "文法問題",
    loadingTitle: "文法問題",
  };

  return (
    <GrammarLoader category={chapter} dataState={grammarTestDataState}>
      {(grammars: GrammarExpress[], isLoading: boolean) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title={config.loadingTitle}
              message="データを読み込み中..."
            />
          );
        }

        // 完了した問題数をカウント
        const completedCount = grammars.filter(
          (grammar) => grammar.isCompleted
        ).length;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 relative w-full h-full p-4"
          >
            <DMATCloseButton handleClick={handleClickCloseButton} />

            {/* Header Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <MdList size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white-1">
                    {config.title}
                  </h1>
                </div>
              </div>
              <DMATProgressBar
                totalQuestions={grammars.length}
                completedQuestions={completedCount}
              />
            </motion.div>

            {/* Grammar List */}
            <GrammarListCard
              grammars={grammars}
              onCardClick={handleClickCard}
            />
          </motion.div>
        );
      }}
    </GrammarLoader>
  );
};

export default ChapterPage;
