"use client";

import { Background } from "@/components/aceternity/Background";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  title?: string;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  title = "データを読み込み中",
  message = "しばらくお待ちください...",
}) => {
  // Floating particles animation
  const particles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.3, 0.8, 0.3, 0.3],
      }}
      transition={{
        duration: 3 + i * 0.5,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeInOut",
      }}
      style={{
        left: `${20 + i * 10}%`,
        top: `${30 + (i % 3) * 20}%`,
      }}
    />
  ));

  return (
    <Background>
      <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
        {/* Background particles */}
        {particles}

        {/* Backdrop blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm"
        />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center p-8"
        >
          {/* Advanced Spinner with multiple rings */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-r-purple-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 border-4 border-transparent border-b-pink-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Glass card effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="backdrop-blur-md bg-white-1/10 rounded-2xl border border-white-1/20 p-6 shadow-2xl"
          >
            {/* Title with gradient text */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
            >
              {title}
            </motion.h2>

            {/* Message with typing effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-300 text-lg"
            >
              {message}
            </motion.p>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
            animate={{
              y: [10, -10, 10],
              x: [5, -5, 5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Ambient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </Background>
  );
};

export default LoadingScreen;
