import { motion } from "framer-motion";
import { MdHeadset, MdVisibility } from "react-icons/md";
import { FcStart } from "react-icons/fc";

interface NotStartedProps {
  onStartTest: () => void;
}

const NotStarted = ({ onStartTest }: NotStartedProps) => {
  return (
    <div className="flex flex-1 items-center justify-center w-full h-full p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <MdHeadset className="text-orange-400" size={80} />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-white-1">
          リスニング
        </h1>

        <p className="text-lg text-white-1/80">Part 3 対策</p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
        >
          <h2 className="text-xl font-semibold text-white-1 mb-4">
            テストについて
          </h2>
          <ul className="text-left text-white-1/90 space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">📝</span>
              <span>全13問の会話形式問題</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">🔀</span>
              <span>問題はランダムに出題されます</span>
            </li>
            <li className="flex items-center gap-2">
              <MdVisibility size={18} />
              <span>問題文を表示することが出来ます</span>
            </li>
          </ul>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartTest}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl mx-auto"
        >
          <FcStart size={28} />
          テストを開始する
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotStarted;
