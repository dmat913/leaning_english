import useCloseAudio from "@/hooks/useCloseAudio";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

const DMATCloseButton = ({ handleClick }: { handleClick: () => void }) => {
  const { playInterrupt } = useCloseAudio();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
      whileHover={{
        scale: 1.1,
        rotate: 90,
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        rotate: { duration: 0.2 },
      }}
      onClick={() => {
        playInterrupt();
        handleClick();
      }}
      className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white-1/10 backdrop-blur-md border-2 border-white-1/20 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 group"
      aria-label="閉じる"
    >
      <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
        <MdClose
          size={24}
          className="text-white-1 group-hover:text-red-300 transition-colors duration-200"
        />
      </motion.div>

      {/* Hover ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-400 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      {/* Tooltip */}
      <div className="absolute top-14 right-0 bg-black-2/90 backdrop-blur-sm border border-white-1/20 rounded-lg px-3 py-2 text-xs text-white-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        設定を閉じる
        <div className="absolute -top-1 right-3 w-2 h-2 bg-black-2 border-l border-t border-white-1/20 rotate-45"></div>
      </div>
    </motion.button>
  );
};

export default DMATCloseButton;
