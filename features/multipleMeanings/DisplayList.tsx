import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { IoPlayCircleOutline } from "react-icons/io5";
import { playEnglish } from "@/common/audioPlayer";
import { multipleMeaningsData } from "@/data/multipleMeanings";
import { useRouter } from "next/navigation";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { motion } from "framer-motion";
import { Background } from "@/components/aceternity/Background";

const DisplayList = () => {
  const router = useRouter();

  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    router.push("/home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Background>
      <div className="flex flex-col gap-6 w-full h-full overflow-auto p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              多義語
            </h1>
            <p className="text-gray-300 text-lg mt-1">
              88 Words with Multiple Meanings
            </p>
          </div>
          <DMATCloseButton handleClick={handleClickCloseButton} />
        </motion.div>

        {/* Words List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {multipleMeaningsData.map((data, index) => (
            <motion.div
              key={data.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Glass Card Container */}
              <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                {/* Word Header */}
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg">
                      {data.id}
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          playEnglish(data.word, { quality: "high" })
                        }
                        className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                      >
                        <IoPlayCircleOutline size={28} color="white" />
                      </motion.button>
                      <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-white">
                          {data.word}
                        </h2>
                        <p className="text-gray-300 text-sm">
                          {data.wordMeaning}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meanings List */}
                <div className="p-6 space-y-4">
                  {data.meanings.map((meaning, meaningIndex) => (
                    <motion.div
                      key={meaningIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: meaningIndex * 0.1 }}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300 hover:shadow-lg",
                        meaningIndex % 2 === 0
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-400/40"
                          : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40"
                      )}
                    >
                      {/* Part of Speech and Meaning */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {meaning.portOfSpeech.map((item, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <span className="text-white font-medium text-lg">
                          {meaning.meaning}
                        </span>
                      </div>

                      {/* Example Sentence */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              playEnglish(meaning.sentence, { quality: "high" })
                            }
                            className="mt-1 p-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md"
                          >
                            <IoPlayCircleOutline size={24} color="white" />
                          </motion.button>
                          <div className="flex-1">
                            <p className="text-white font-medium mb-1">
                              &ldquo;{meaning.sentence}&rdquo;
                            </p>
                            <p className="text-gray-300 text-sm italic">
                              {meaning.sentenceMeaning}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover Effect - Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-20" />
      </div>
    </Background>
  );
};

export default memo(DisplayList);
