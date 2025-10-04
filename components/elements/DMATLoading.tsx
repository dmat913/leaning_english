import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DMATLoadingProps {
  otherClass?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "wave";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

const DMATLoading = ({
  otherClass,
  size = "md",
  variant = "spinner",
  color = "primary",
}: DMATLoadingProps) => {
  // Size variations
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // Color variations
  const colorClasses = {
    primary: "border-blue-400",
    secondary: "border-purple-400",
    success: "border-green-400",
    warning: "border-yellow-400",
    error: "border-red-400",
  };

  const dotColors = {
    primary: "bg-blue-400",
    secondary: "bg-purple-400",
    success: "bg-green-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
  };

  if (variant === "spinner") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={cn("relative", sizeClasses[size], otherClass)}
      >
        {/* Outer Ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 border-transparent animate-spin",
            `border-t-4 ${colorClasses[color]}`
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${
              color === "primary"
                ? "rgb(96 165 250)"
                : color === "secondary"
                ? "rgb(196 181 253)"
                : color === "success"
                ? "rgb(74 222 128)"
                : color === "warning"
                ? "rgb(251 191 36)"
                : "rgb(248 113 113)"
            })`,
          }}
        />

        {/* Inner Ring */}
        <div
          className={cn(
            "absolute inset-2 rounded-full border-2 border-transparent animate-spin",
            `border-t-2 ${colorClasses[color]}`
          )}
          style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
          }}
        />

        {/* Center Dot */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
            dotColors[color],
            "animate-pulse"
          )}
        />
      </motion.div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex space-x-2", otherClass)}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn("w-3 h-3 rounded-full", dotColors[color])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn(
          "rounded-full",
          sizeClasses[size],
          dotColors[color],
          otherClass
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (variant === "wave") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex space-x-1", otherClass)}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className={cn("w-2 h-8 rounded-full", dotColors[color])}
            animate={{
              scaleY: [1, 0.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
    );
  }

  // Default fallback to spinner
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-transparent",
        `border-t-4 ${colorClasses[color]}`,
        sizeClasses[size],
        otherClass
      )}
    />
  );
};

export default DMATLoading;
