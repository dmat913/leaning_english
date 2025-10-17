import React, { useEffect, useState } from "react";
import { Status } from "@/types/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FcStart } from "react-icons/fc";
import {
  statusState,
  testDataState,
  trainingDisplayTypeState,
} from "@/states/trainingState";
import { getRandomItems } from "@/common/utils";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { TestData } from "@/types/types";
import { motion } from "framer-motion";
import {
  MdShuffle,
  MdSort,
  MdLanguage,
  MdPlayArrow,
  MdQuiz,
} from "react-icons/md";
import { cn } from "@/lib/utils";

const SettingTraining = ({
  handleChangeStatus,
  targetTestData,
}: {
  handleChangeStatus: (status: Status) => void;
  targetTestData: TestData[];
}) => {
  // testData
  const [testData, setTestData] = useRecoilState(testDataState);
  // テスト状態
  const setStatus = useSetRecoilState(statusState);

  // テスト表示種類
  const [displayType, setDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

  // テストデータ設定
  useEffect(() => {
    setTestData(targetTestData);
  }, [targetTestData, setTestData]);

  // テスト表示種類radioボタン変更
  const handleChangeDisplayRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayType(event.target.value);
  };

  // ランダムor順番radioボタンchangeイベント
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(event.target.value);
  };

  // 開始ボタン押下時
  const handleStartTest = () => {
    if (orderType === "random") {
      setTestData(getRandomItems(testData, testData.length));
    }
    setStatus("in_progress");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center p-4 gap-4"
    >
      <DMATCloseButton
        handleClick={() => {
          handleChangeStatus("not_started");
          setDisplayType("englishToJapanese");
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-xl text-white-1 font-bold mb-2 flex items-center justify-center gap-3">
          <MdQuiz className="text-yellow-400" size={32} />
          トレーニング設定
        </h1>
      </motion.div>

      <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
        {/* 学習順序設定 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
        >
          <h2 className="text-lg font-semibold text-white-1 mb-4 flex items-center gap-2">
            <MdPlayArrow className="text-green-400" size={24} />
            学習モード
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                orderType === "order"
                  ? "border-blue-400 bg-blue-400/20 text-blue-200"
                  : "border-white-1/30 bg-white-1/5 text-white/70 hover:border-white-1/50 hover:bg-white-1/10"
              )}
            >
              <MdSort size={32} className="mb-2" />
              <input
                type="radio"
                value="order"
                name="order"
                onChange={handleChangeRadio}
                checked={orderType === "order"}
                className="sr-only"
              />
              <span className="font-medium">順番</span>
              <span className="text-xs mt-1 text-center">
                データ順通りに出題
              </span>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                orderType === "random"
                  ? "border-purple-400 bg-purple-400/20 text-purple-200"
                  : "border-white-1/30 bg-white-1/5 text-white/70 hover:border-white-1/50 hover:bg-white-1/10"
              )}
            >
              <MdShuffle size={32} className="mb-2" />
              <input
                type="radio"
                value="random"
                name="order"
                onChange={handleChangeRadio}
                checked={orderType === "random"}
                className="sr-only"
              />
              <span className="font-medium">ランダム</span>
              <span className="text-xs mt-1 text-center">問題をシャッフル</span>
            </motion.label>
          </div>
        </motion.div>

        {/* 表示設定 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white-1/15 backdrop-blur-md rounded-2xl p-6 border border-white-1/30 shadow-xl"
        >
          <h2 className="text-lg font-semibold text-white-1 mb-4 flex items-center gap-2">
            <MdLanguage className="text-pink-400" size={24} />
            表示形式
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                displayType === "englishToJapanese"
                  ? "border-green-400 bg-green-400/20 text-green-200"
                  : "border-white-1/30 bg-white-1/5 text-white/70 hover:border-white-1/50 hover:bg-white-1/10"
              )}
            >
              <input
                type="radio"
                value="englishToJapanese"
                name="display"
                onChange={handleChangeDisplayRadio}
                checked={displayType === "englishToJapanese"}
                className="sr-only"
              />
              <div className="text-2xl">🇺🇸 → 🇯🇵</div>
              <div>
                <div className="font-medium">英語→日本語</div>
                <div className="text-xs">英単語を見て日本語を答える</div>
              </div>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                displayType === "japaneseToEnglish"
                  ? "border-red-400 bg-red-400/20 text-red-200"
                  : "border-white-1/30 bg-white-1/5 text-white/70 hover:border-white-1/50 hover:bg-white-1/10"
              )}
            >
              <input
                type="radio"
                value="japaneseToEnglish"
                name="display"
                onChange={handleChangeDisplayRadio}
                checked={displayType === "japaneseToEnglish"}
                className="sr-only"
              />
              <div className="text-2xl">🇯🇵 → 🇺🇸</div>
              <div>
                <div className="font-medium">日本語→英語</div>
                <div className="text-xs">日本語を見て英単語を答える</div>
              </div>
            </motion.label>
          </div>
        </motion.div>
      </div>

      {/* 開始ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartTest}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl"
        >
          <FcStart size={28} />
          トレーニング開始
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SettingTraining;
