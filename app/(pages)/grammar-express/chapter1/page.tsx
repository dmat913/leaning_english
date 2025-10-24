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
import DMATProgressBar from "@/components/elements/DMATProgressBar";
import { MdList, MdLibraryBooks } from "react-icons/md";
import { PATHS } from "@/lib/paths";

// ...existing code...

const Chapter1 = () => {
  const router = useRouter();

  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);

  const handleClickCloseButton = () => {
    router.push(PATHS.GRAMMAR_EXPRESS_HOME);
  };

  const handleClickCard = (grammar: GrammarExpress) => {
    setSelectedGrammar(grammar);
    router.push(`/grammar-express/${grammar.grammar_id}`);
  };

  return (
    <GrammarLoader category="chapter1" dataState={grammarTestDataState}>
      {(grammars: GrammarExpress[], isLoading: boolean) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title="絶対おさえるべき23題"
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
                  <h1 className="text-xl font-bold text-white-1">文法一覧</h1>
                  <p className="text-sm text-gray-300">
                    {grammars.length}題中 0題 完了
                  </p>
                </div>
              </div>
              <DMATProgressBar
                totalQuestions={grammars.length}
                completedQuestions={0}
              />
            </motion.div>

            {/* Grammar List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex-1 overflow-hidden"
            >
              <div className="h-full overflow-y-auto space-y-2 pr-2">
                {grammars.map((item, index) => (
                  <motion.div
                    key={item.grammar_id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClickCard(item)}
                    className="group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg bg-white-1/10 border-white-1/20 hover:bg-white-1/15"
                    // className={
                    //   item.isCompleted
                    //     ? "group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg bg-green-400/10 border-green-400/30 hover:bg-green-400/15"
                    //     : "group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg bg-white-1/10 border-white-1/20 hover:bg-white-1/15"
                    // }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-white-1/20 text-xs font-bold text-white-1">
                            {item.grammar_id.slice(-2)}
                          </span>
                          <span className="text-lg font-semibold text-white-1 group-hover:text-blue-300 transition-colors duration-200">
                            {item.navigation}
                          </span>
                          {/* {item.isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center justify-center w-6 h-6 rounded-full bg-green-400 shadow-lg"
                            >
                              <MdCheck size={16} className="text-white" />
                            </motion.div>
                          )} */}
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <MdLibraryBooks size={16} className="text-blue-400" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      }}
    </GrammarLoader>
  );
};

export default Chapter1;
