import { motion } from "framer-motion";
import { MdLibraryBooks, MdCheck } from "react-icons/md";
import { GrammarExpress } from "@/models/grammarExpressModel";
import { cn } from "@/lib/utils";

interface GrammarListCardProps {
  grammars: GrammarExpress[];
  onCardClick: (grammar: GrammarExpress) => void;
}

const GrammarListCard = ({ grammars, onCardClick }: GrammarListCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="flex-1 overflow-hidden"
    >
      <div className="h-full overflow-y-auto space-y-2 pr-2">
        {grammars.map((item, index) => (
          <motion.div
            key={item.grammar_id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCardClick(item)}
            className={cn(
              "group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg",
              item.isCompleted
                ? "bg-green-400/10 border-green-400/30 hover:bg-green-400/15"
                : "bg-white-1/10 border-white-1/20 hover:bg-white-1/15"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-white-1/20 text-xs font-bold text-white-1">
                    {item.grammar_id.slice(-2)}
                  </span>
                  <span className="text-lg font-semibold text-white-1 group-hover:text-blue-300 transition-colors duration-200">
                    {item.navigation}
                  </span>
                  {item.isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center shrink-0 justify-center w-6 h-6 rounded-full bg-green-400 shadow-lg"
                    >
                      <MdCheck size={16} className="text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <MdLibraryBooks size={16} className="text-blue-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GrammarListCard;
