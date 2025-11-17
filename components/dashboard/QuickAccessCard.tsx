"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import useAudio from "@/hooks/useAudio";

interface QuickAccessCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  delay: number;
}

export default function QuickAccessCard({
  href,
  icon,
  title,
  subtitle,
  color,
  bgColor,
  delay,
}: QuickAccessCardProps) {
  const { playInterrupt } = useAudio();

  const handleClick = () => {
    playInterrupt();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className="block" onClick={handleClick}>
        <div className="relative h-full rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
          {/* Glow effect */}
          <div
            className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300`}
          />

          <div className="relative p-6 flex flex-col items-center text-center space-y-3">
            {/* Icon */}
            <div
              className={`${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <div className={`${color} text-3xl`}>{icon}</div>
            </div>

            {/* Text */}
            <div>
              <h3 className={`font-bold text-lg ${color}`}>{title}</h3>
              <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className={`w-5 h-5 ${color}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
