"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
  bgColor,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
        />

        <div className="relative p-6 space-y-4">
          {/* Icon */}
          <div
            className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center`}
          >
            <div className={color}>{icon}</div>
          </div>

          {/* Content */}
          <div className="space-y-1">
            <p className="text-sm text-slate-400 font-medium">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
