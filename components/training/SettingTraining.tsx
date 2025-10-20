import { getRandomItems, getRandomIncompleteItems } from "@/common/utils";
import {
  trainingDisplayTypeState,
  testDataState,
} from "@/states/trainingState";
import { Option, Status } from "@/types/types";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { FcStart } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TestData } from "@/types/types";
import DMATCloseButton from "../elements/DMATCloseButton";
import { motion } from "framer-motion";
import {
  MdShuffle,
  MdSort,
  MdHeadset,
  MdQuiz,
  MdNumbers,
  MdLanguage,
  MdPlayArrow,
  MdCheckCircle,
} from "react-icons/md";
import { cn } from "@/lib/utils";

const SettingTraining = ({
  handleChangeStatus,
  targetData,
  options,
  fromOptions,
}: {
  handleChangeStatus: (status: Status) => void;
  targetData: TestData[];
  options: Option[];
  fromOptions: Option[];
}) => {
  // testデータ
  const setTestData: (testData: TestData[]) => void =
    useSetRecoilState(testDataState);

  //問題数
  const [selectedValue, setSelectedValue] = useState<string>("10");
  const [selectedFromValue, setSelectedFromValue] = useState<string>("1");
  const [selectedToValue, setSelectedToValue] = useState<string>("10");

  // 画面切り替え時,先頭10個表示
  useEffect(() => {
    setTestData(targetData.slice(0, 10));
    // eslint-disable-next-line
  }, []);

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    if (orderType === "random") {
      if (onlyIncomplete) {
        setTestData(
          getRandomIncompleteItems(targetData, Number(event.target.value))
        );
      } else {
        setTestData(getRandomItems(targetData, Number(event.target.value)));
      }
    }
  };

  // from select変更時
  const handleChangeFromOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromValue(event.target.value);
    if (Number(event.target.value) >= Number(selectedToValue)) {
      setSelectedToValue(String(Number(event.target.value) + 10));
      setTestData(
        targetData.slice(
          Number(event.target.value),
          Number(event.target.value) + 10
        )
      );
    } else {
      setTestData(
        targetData.slice(Number(event.target.value), Number(selectedToValue))
      );
    }
  };

  // from select変更時
  const handleChangeToOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedToValue(event.target.value);
    setTestData(
      targetData.slice(
        selectedFromValue === "1" ? 0 : Number(selectedFromValue),
        Number(event.target.value)
      )
    );
  };

  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

  // ランダムモード時の未完了のみフィルタ
  const [onlyIncomplete, setOnlyIncomplete] = useState<boolean>(false);

  // 開始ボタン押下時
  const handleClickStartButton = () => {
    if (orderType === "listening") {
      handleChangeStatus("listening");
    } else {
      handleChangeStatus("in_progress");
    }
    setSelectedFromValue("1");
    setSelectedValue("10");
    setSelectedToValue("10");
    setOrderType("");
    setOnlyIncomplete(false);
  };

  //閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  // ランダムor順番radioボタンchangeイベント
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(event.target.value);
    if (event.target.value === "random") {
      if (onlyIncomplete) {
        setTestData(
          getRandomIncompleteItems(targetData, Number(selectedValue))
        );
      } else {
        setTestData(getRandomItems(targetData, Number(selectedValue)));
      }
    } else {
      setTestData(
        targetData.slice(
          selectedFromValue === "1" ? 0 : Number(selectedFromValue),
          Number(selectedToValue)
        )
      );
    }
  };

  // テスト表示種類
  const [displayType, setDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );

  // テスト表示種類radioボタン変更
  const handleChangeDisplayRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayType(event.target.value);
  };

  // 未完了のみチェックボックス変更
  const handleChangeOnlyIncomplete = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnlyIncomplete(event.target.checked);
    if (orderType === "random") {
      if (event.target.checked) {
        setTestData(
          getRandomIncompleteItems(targetData, Number(selectedValue))
        );
      } else {
        setTestData(getRandomItems(targetData, Number(selectedValue)));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center p-4 gap-4"
    >
      <DMATCloseButton handleClick={handleClickCloseButton} />

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
        {/* 学習モード選択 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
        >
          <h2 className="text-lg font-semibold text-white-1 mb-4 flex items-center gap-2">
            <MdPlayArrow className="text-green-400" size={24} />
            学習モード
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                orderType === "order"
                  ? "border-blue-400 bg-blue-400/20 text-blue-200"
                  : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
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
                指定範囲を順番通り
              </span>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                orderType === "random"
                  ? "border-purple-400 bg-purple-400/20 text-purple-200"
                  : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
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

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                orderType === "listening"
                  ? "border-orange-400 bg-orange-400/20 text-orange-200"
                  : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
              )}
            >
              <MdHeadset size={32} className="mb-2" />
              <input
                type="radio"
                value="listening"
                name="order"
                onChange={handleChangeRadio}
                checked={orderType === "listening"}
                className="sr-only"
              />
              <span className="font-medium">リスニング</span>
              <span className="text-xs mt-1 text-center">音声で学習</span>
            </motion.label>
          </div>
        </motion.div>

        {/* 範囲設定 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
        >
          <h2 className="text-lg font-semibold text-white-1 mb-4 flex items-center gap-2">
            <MdNumbers className="text-cyan-400" size={24} />
            出題範囲
          </h2>

          {orderType !== "random" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-2 items-center bg-white-1/10 p-4 rounded-xl border border-white-1/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-white-1 font-medium min-w-[3rem]">
                  From:
                </span>
                <select
                  value={selectedFromValue}
                  onChange={handleChangeFromOption}
                  className="px-4 py-2 rounded-lg bg-white-1/10 border border-white-1/30 text-white-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  {fromOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white-1 font-medium min-w-[2rem]">
                  To:
                </span>
                <select
                  value={selectedToValue}
                  onChange={handleChangeToOption}
                  className="px-4 py-2 rounded-lg bg-white-1/10 border border-white-1/30 text-white-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  {options.map((option) => (
                    <option
                      disabled={Number(selectedFromValue) >= option.value}
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white disabled:text-gray-500"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {orderType === "random" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 bg-white-1/10 p-4 rounded-xl border border-white-1/20">
                <span className="text-white-1 font-medium">問題数:</span>
                <select
                  value={selectedValue}
                  onChange={handleChangeNumber}
                  className="px-4 py-2 rounded-lg bg-white-1/10 border border-white-1/30 text-white-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white-1"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  onlyIncomplete
                    ? "border-emerald-400 bg-emerald-400/20 text-emerald-200"
                    : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
                )}
              >
                <input
                  type="checkbox"
                  checked={onlyIncomplete}
                  onChange={handleChangeOnlyIncomplete}
                  className="sr-only"
                />
                <MdCheckCircle
                  size={24}
                  className={cn(
                    "transition-colors duration-200",
                    onlyIncomplete ? "text-emerald-400" : "text-white/40"
                  )}
                />
                <div>
                  <div className="font-medium">未完了のみ出題</div>
                  <div className="text-xs">
                    まだ覚えていない単語だけを出題します
                  </div>
                </div>
              </motion.label>
            </motion.div>
          )}
        </motion.div>

        {/* 表示設定 */}
        {orderType !== "listening" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
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
                    : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
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
                    : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
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
        )}
      </div>
      {/* 開始ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClickStartButton}
          disabled={orderType === ""}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg",
            orderType === ""
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl"
          )}
        >
          <FcStart size={28} />
          トレーニング開始
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default memo(SettingTraining);
