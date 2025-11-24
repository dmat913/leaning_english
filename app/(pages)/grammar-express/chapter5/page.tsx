"use client";
import GrammarLoader from "@/components/common/GrammarLoader";
import LoadingScreen from "@/components/common/LoadingScreen";
import { GrammarExpress } from "@/models/grammarExpressModel";
import {
  grammarTestDataState,
  selectedGrammarState,
} from "@/states/grammarTestDataState";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { MdList } from "react-icons/md";
import { PATHS } from "@/lib/paths";
import GrammarListCard from "@/components/grammar-express/GrammarListCard";

const Chapter5Page = () => {
  const router = useRouter();
  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);

  const handleClickCloseButton = () => {
    router.push(PATHS.GRAMMAR_EXPRESS_HOME);
  };

  const handleClickCard = (grammar: GrammarExpress) => {
    setSelectedGrammar(grammar);
    router.push(`/grammar-express/chapter5/${grammar.grammar_id}`);
  };

  return (
    <GrammarLoader category="chapter5" dataState={grammarTestDataState}>
      {(grammars: GrammarExpress[], isLoading: boolean) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title="一気に駆け抜ける Part 6 28題"
              message="データを読み込み中..."
            />
          );
        }

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
                    一気に駆け抜ける Part 6 28題
                  </h1>
                  <p className="text-sm text-slate-400">
                    1つの長文に4つの空欄があります
                  </p>
                </div>
              </div>
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

export default Chapter5Page;
