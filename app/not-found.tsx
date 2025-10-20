"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdHome, MdError, MdSearch, MdArrowBack } from "react-icons/md";
import { PATHS } from "@/lib/paths";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(PATHS.GOLD_PHRASE_HOME);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="h-svh w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: 180,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col gap-4 items-center justify-around p-6">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-2xl border-4 border-white/20"
          >
            <MdError size={48} className="text-white-1" />
          </motion.div>
        </motion.div>

        {/* Error Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/10 flex flex-col gap-4 justify-center items-center flex-1 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xl md:text-4xl font-bold bg-gradient-to-r text-white-1 to-blue-200 bg-clip-text text-transparent"
          >
            ページが見つかりません
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="text-gray-300 text-lg mb-6 flex items-center justify-center gap-2"
          >
            <MdSearch size={20} />
            お探しのページは存在しないか、移動された可能性があります
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-gray-400 text-sm"
          >
            URLを確認するか、ホームページから再度お探しください
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white-1 font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <MdHome size={20} />
            ホームに戻る
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white-1 font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <MdArrowBack size={20} />
            前のページに戻る
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-r from-pink-400/30 to-purple-500/30 rounded-full blur-sm"
        />
      </div>
    </div>
  );
};

export default NotFound;
