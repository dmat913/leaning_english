import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdWarning,
  MdInfo,
  MdError,
  MdCheckCircle,
  MdHelp,
} from "react-icons/md";
import { cn } from "@/lib/utils";

interface DMATDialogProps {
  rightButtonText: string;
  leftButtonText: string;
  mainText: string;
  handleClickLeftButton?: () => void;
  handleClickRightButton?: () => void;
  type?: "warning" | "info" | "error" | "success" | "question";
  isOpen?: boolean;
  onClose?: () => void;
}

const DMATDialog = ({
  rightButtonText,
  leftButtonText,
  mainText,
  handleClickLeftButton,
  handleClickRightButton,
  type = "info",
  isOpen = true,
}: DMATDialogProps) => {
  const getIconAndColor = () => {
    switch (type) {
      case "warning":
        return {
          icon: <MdWarning size={32} />,
          color: "text-orange-400",
          bgColor: "from-orange-500/20 to-amber-500/20",
          borderColor: "border-orange-400/30",
        };
      case "error":
        return {
          icon: <MdError size={32} />,
          color: "text-red-400",
          bgColor: "from-red-500/20 to-pink-500/20",
          borderColor: "border-red-400/30",
        };
      case "success":
        return {
          icon: <MdCheckCircle size={32} />,
          color: "text-green-400",
          bgColor: "from-green-500/20 to-emerald-500/20",
          borderColor: "border-green-400/30",
        };
      case "question":
        return {
          icon: <MdHelp size={32} />,
          color: "text-purple-400",
          bgColor: "from-purple-500/20 to-indigo-500/20",
          borderColor: "border-purple-400/30",
        };
      default:
        return {
          icon: <MdInfo size={32} />,
          color: "text-blue-400",
          bgColor: "from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-400/30",
        };
    }
  };

  const { icon, color, bgColor, borderColor } = getIconAndColor();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black-2/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClickLeftButton}
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
            className="fixed top-1/2 left-1/2 !transform -translate-x-1/2 -translate-y-1/2 !m-0 z-[60] w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "bg-white-1/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 overflow-hidden",
                borderColor
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "p-5 bg-gradient-to-r border-b border-white-1/20 text-center",
                  bgColor
                )}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: 0.1,
                  }}
                  className={cn("mx-auto mb-3 flex justify-center", color)}
                >
                  {icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-base font-semibold text-black-1 leading-relaxed px-2"
                >
                  {mainText}
                </motion.h3>
              </div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="p-4 bg-gray-50/80 flex flex-col gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClickRightButton}
                  className={cn(
                    "w-full h-12 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-white-1",
                    type === "error" || type === "warning"
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      : type === "success"
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  )}
                >
                  {rightButtonText}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClickLeftButton}
                  className="w-full h-12 rounded-xl bg-white-1/80 hover:bg-white-1 border border-gray-300/50 text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                >
                  {leftButtonText}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DMATDialog;
