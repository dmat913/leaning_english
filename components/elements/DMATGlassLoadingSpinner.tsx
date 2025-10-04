import React from "react";
import { motion } from "framer-motion";
import { MdAutorenew, MdSchool } from "react-icons/md";

interface DMATGlassLoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  showIcon?: boolean;
  variant?: "glass" | "modern" | "minimal";
  fullScreen?: boolean;
}

const DMATGlassLoadingSpinner = ({
  size = "md",
  message = "Loading...",
  showIcon = true,
  variant = "glass",
  fullScreen = true,
}: DMATGlassLoadingSpinnerProps) => {
  const sizeClasses = {
    sm: {
      container: "p-4",
      spinner: "w-12 h-12",
      text: "text-sm",
      icon: 20,
    },
    md: {
      container: "p-6",
      spinner: "w-16 h-16",
      text: "text-base",
      icon: 24,
    },
    lg: {
      container: "p-8",
      spinner: "w-20 h-20",
      text: "text-lg",
      icon: 28,
    },
  };

  const currentSize = sizeClasses[size];

  // フルスクリーンラッパーコンポーネント
  const FullScreenWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!fullScreen) return <>{children}</>;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        {children}
      </div>
    );
  };

  if (variant === "minimal") {
    const content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className={`${currentSize.spinner} border-4 border-blue-200 rounded-full border-t-blue-500`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-2 border-2 border-purple-200 rounded-full border-t-purple-500`}
          />
        </div>
      </motion.div>
    );

    return <FullScreenWrapper>{content}</FullScreenWrapper>;
  }

  if (variant === "modern") {
    const content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative flex flex-col items-center justify-center ${currentSize.container} rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 shadow-2xl`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center">
          {showIcon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="mb-4 p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
            >
              <MdSchool size={currentSize.icon} className="text-white-1" />
            </motion.div>
          )}

          {/* Multi-layer Spinner */}
          <div className="relative mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`${currentSize.spinner} border-4 border-transparent rounded-full`}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgb(96 165 250), transparent)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-3 border-transparent rounded-full"
              style={{
                background:
                  "conic-gradient(from 90deg, transparent, rgb(168 85 247), transparent)",
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`${currentSize.text} text-white-1 font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent`}
          >
            {message}
          </motion.p>

          {/* Progress Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex space-x-1 mt-3"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    );

    return <FullScreenWrapper>{content}</FullScreenWrapper>;
  }

  // Default glass variant
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      className={`relative flex flex-col items-center justify-center ${currentSize.container} rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl`}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

      {/* Top highlight */}
      <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />

      <div className="relative z-10 flex flex-col items-center">
        {showIcon && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="mb-4 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          >
            <MdAutorenew size={currentSize.icon} className="text-white-1" />
          </motion.div>
        )}

        {/* Enhanced Spinner */}
        <div className="relative mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className={`${currentSize.spinner} border-4 border-white/30 rounded-full border-t-white shadow-lg`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 border-2 border-white/20 rounded-full border-r-white/80"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className={`${currentSize.text} text-white-1 font-semibold drop-shadow-sm`}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );

  return <FullScreenWrapper>{content}</FullScreenWrapper>;
};

export default DMATGlassLoadingSpinner;
