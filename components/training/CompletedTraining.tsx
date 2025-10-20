import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { memo, useMemo, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TrainingResultState, testDataState } from "@/states/trainingState";
import DisplayResult from "@/features/training/DisplayResult";
import { TestData } from "@/types/types";
import useDoughnutChart from "@/hooks/useDoughnutChart";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdHome,
  MdList,
  MdCelebration,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { PATHS } from "@/lib/paths";

const CompletedTraining = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  const router = useRouter();
  const setTestData = useSetRecoilState(testDataState);

  // Training結果
  const [trainingResult, setTrainingResult] =
    useRecoilState(TrainingResultState);

  //正解データ
  const correctData: TestData[] = useMemo(() => {
    const result = trainingResult.filter((item) => item.result);
    return result.map((item) => item.data);
  }, [trainingResult]);

  //不正解データ
  const incorrectData: TestData[] = useMemo(() => {
    const result = trainingResult.filter((item) => !item.result);
    return result.map((item) => item.data);
  }, [trainingResult]);

  // カスタムフックからデータとオプションを取得
  const { data, options, centerTextPlugin } = useDoughnutChart(
    correctData,
    incorrectData
  );

  // スコア計算
  const totalQuestions = trainingResult.length;
  const correctCount = correctData.length;
  const incorrectCount = incorrectData.length;
  const accuracyRate =
    totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  // パフォーマンスレベル判定
  const getPerformanceLevel = () => {
    if (accuracyRate >= 90)
      return { level: "優秀", color: "text-green-400", emoji: "🏆" };
    if (accuracyRate >= 80)
      return { level: "良好", color: "text-blue-400", emoji: "🌟" };
    if (accuracyRate >= 70)
      return { level: "普通", color: "text-yellow-400", emoji: "👍" };
    if (accuracyRate >= 60)
      return { level: "要努力", color: "text-orange-400", emoji: "💪" };
    return { level: "要復習", color: "text-red-400", emoji: "📚" };
  };

  const performance = getPerformanceLevel();

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push(PATHS.GOLD_PHRASE_HOME);
    setTrainingResult([]);
    setTestData([]);
    setTimeout(() => {
      handleChangeStatus("not_started");
    }, 1000);
  };

  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // セレブレーション効果
  useEffect(() => {
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4 pt-6 w-full px-6 h-full relative overflow-hidden"
    >
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
              <MdCelebration size={24} className="text-white" />
              <span className="text-white font-bold text-sm">
                Training完了！
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <MdCheckCircle size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white-1">
              トレーニング完了
            </h1>
            <p className="text-gray-300 text-sm">お疲れさまでした！</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 px-6 overflow-y-auto">
        {/* Stats and Chart Container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            opacity: isOpenResult ? 0.1 : 1,
          }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-6 items-center justify-center max-w-6xl mx-auto"
        >
          {/* Left Side - Stats */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white-1/10 backdrop-blur-md rounded-2xl p-4 border border-white-1/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MdCheckCircle size={20} className="text-green-400" />
                  <span className="text-white-1 font-semibold text-sm">
                    正解
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {correctCount}
                </p>
                <p className="text-xs text-gray-300">問</p>
              </div>

              <div className="bg-white-1/10 backdrop-blur-md rounded-2xl p-4 border border-white-1/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MdCancel size={20} className="text-red-400" />
                  <span className="text-white-1 font-semibold text-sm">
                    不正解
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-400">
                  {incorrectCount}
                </p>
                <p className="text-xs text-gray-300">問</p>
              </div>
            </div>

            {/* Performance Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="bg-white-1/10 backdrop-blur-md rounded-2xl p-4 border border-white-1/20 shadow-lg text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">{performance.emoji}</span>
                <span className={`font-bold text-lg ${performance.color}`}>
                  {performance.level}
                </span>
              </div>
              <p className="text-white-1 font-semibold">
                正答率: {accuracyRate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {totalQuestions}問中{correctCount}問正解
              </p>
            </motion.div>
          </div>

          {/* Right Side - Chart */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative bg-white-1/5 backdrop-blur-sm rounded-3xl p-6 border border-white-1/10 shadow-xl w-full max-w-md"
          >
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="p-6 z-40"
      >
        <div className="flex items-center gap-4 w-full max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClickBackToTop}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MdHome size={20} />
            ホームに戻る
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpenResult(true)}
            className="flex-1 h-12 rounded-xl bg-white-1/10 backdrop-blur-md border border-white-1/30 hover:bg-white-1/20 text-white-1 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MdList size={20} />
            結果詳細
          </motion.button>
        </div>
      </motion.div>
      {/* Result Detail Modal */}
      <AnimatePresence>
        {isOpenResult && (
          <DisplayResult
            correctData={correctData}
            incorrectData={incorrectData}
            setIsOpen={setIsOpenResult}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(CompletedTraining);
