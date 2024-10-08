import { useMemo } from "react";
import { FaStar } from "react-icons/fa";

interface DMATProgressBarProps {
  totalQuestions: number;
  completedQuestions: number;
  showIcon?: boolean;
}

const DMATProgressBar: React.FC<DMATProgressBarProps> = ({
  totalQuestions,
  completedQuestions,
  showIcon = true,
}) => {
  // 割合を計算
  const percentage = useMemo(() => {
    return (completedQuestions / totalQuestions) * 100;
  }, [completedQuestions, totalQuestions]);

  return (
    <div className="w-full">
      {showIcon && (
        <div className="flex items-center mb-1">
          <FaStar color="#FFD700" size={20} />
          <p className="text-white-1">
            {`${percentage.toFixed(
              0
            )}% (${completedQuestions}/${totalQuestions})`}
          </p>
        </div>
      )}
      <div className="h-[25px] w-full bg-[#e0e0e0] rounded-md overflow-hidden">
        <div
          className={`h-full bg-yellow-1 rounded-md`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default DMATProgressBar;
