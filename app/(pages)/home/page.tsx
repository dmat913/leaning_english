"use client";

import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { motion } from "framer-motion";
import {
  MdTrendingUp,
  MdCheckCircle,
  MdLocalFireDepartment,
} from "react-icons/md";
import { IoBookSharp, IoHeadset } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import StatsCard from "@/components/dashboard/StatsCard";
import CategoryProgress from "@/components/dashboard/CategoryProgress";
import GrammarProgress from "@/components/dashboard/GrammarProgress";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";
import { PATHS } from "@/lib/paths";
import DMATLoading from "@/components/elements/DMATLoading";
import { useDashboardData } from "@/hooks/useDashboardData";

const HomePage = () => {
  const user = useRecoilValue(userState);
  const { data: dashboardData, isLoading: loading } = useDashboardData(
    user?.name
  );

  const completionRate = dashboardData?.overall.completionRate || 0;
  const studyStreak = dashboardData?.overall.studyStreak || 0;
  const completedWords = dashboardData?.overall.completedWords || 0;
  const totalAttempts = dashboardData?.overall.totalAttempts || 0;

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-auto h-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <QuickAccessCard
              href={PATHS.GOLD_PHRASE_HOME}
              icon={<IoBookSharp />}
              title="金のフレーズ"
              subtitle="TOEIC 出る単特急"
              color="text-amber-400"
              bgColor="bg-amber-500/10"
              delay={0.5}
            />
            <QuickAccessCard
              href={PATHS.GRAMMAR_EXPRESS_HOME}
              icon={<FaBook />}
              title="文法特急"
              subtitle="1駅1題"
              color="text-cyan-400"
              bgColor="bg-cyan-500/10"
              delay={0.6}
            />
            <QuickAccessCard
              href={PATHS.LISTENING_HOME}
              icon={<IoHeadset />}
              title="リスニング"
              subtitle="聞き取り練習"
              color="text-purple-400"
              bgColor="bg-purple-500/10"
              delay={0.7}
            />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
            学習ダッシュボード
          </h1>
        </motion.div>

        {loading ? (
          /* Loading State - Skeleton */
          <div className="space-y-8">
            {/* Stats Cards Loading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 space-y-4"
                >
                  {/* Icon skeleton */}
                  <div className="w-12 h-12 rounded-xl bg-slate-700/50 animate-pulse" />

                  {/* Text skeletons */}
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-8 w-16 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-3 w-12 bg-slate-700/50 rounded animate-pulse" />
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
                </div>
              ))}
            </div>

            {/* Progress Section Loading */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Progress Skeleton */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6">
                <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
                        <div className="flex gap-4 items-center">
                          <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
                          <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-slate-600/50 rounded-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
              </div>

              {/* Recent Activity Skeleton */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6">
                <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse mb-6" />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-600/50 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-slate-600/50 rounded animate-pulse" />
                        <div className="h-2 w-16 bg-slate-600/50 rounded animate-pulse" />
                      </div>
                      <div className="h-2 w-12 bg-slate-600/50 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-700/20 to-transparent" />
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <>
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="達成率"
                value={`${completionRate}%`}
                icon={<MdTrendingUp size={24} />}
                color="text-cyan-400"
                bgColor="bg-cyan-500/10"
                delay={0.1}
              />
              <StatsCard
                title="連続学習日数"
                value={studyStreak}
                subtitle={studyStreak > 0 ? "日連続！" : "学習を始めよう"}
                icon={<MdLocalFireDepartment size={24} />}
                color="text-orange-400"
                bgColor="bg-orange-500/10"
                delay={0.2}
              />
              <StatsCard
                title="完了単語"
                value={completedWords}
                subtitle="単語"
                icon={<MdCheckCircle size={24} />}
                color="text-green-400"
                bgColor="bg-green-500/10"
                delay={0.3}
              />
            </div>

            {/* Progress and Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Progress */}
              {dashboardData && dashboardData.categories.length > 0 && (
                <CategoryProgress categories={dashboardData.categories} />
              )}

              {/* Recent Activity */}
              {/* {dashboardData && (
                <RecentActivity activities={dashboardData.recentActivity} />
              )} */}
            </div>

            {/* Grammar Express Progress Section */}
            {dashboardData && dashboardData.grammar?.chapters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <GrammarProgress chapters={dashboardData.grammar.chapters} />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
