"use client";
import DMATGlassLoadingSpinner from "@/components/elements/DMATGlassLoadingSpinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PATHS } from "@/lib/paths";
import {
  MdPerson,
  MdLogin,
  MdSchool,
  MdLanguage,
  MdError,
} from "react-icons/md";
import Image from "next/image";
import Logo from "@/public/logo.png";

const LoginPage = () => {
  const router = useRouter();

  // username
  const [username, setUsername] = useState<string>("");
  // error Message
  const [error, setError] = useState<string | null>(null);
  // ローディング状態
  const [loading, setLoading] = useState<boolean>(false);
  // ログイン済み判定
  const [isSuccessLogin, setIsSuccessLogin] = useState<boolean>(false);

  // sessionStorageをチェックして、既にログイン済みの場合は/homeに遷移
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user) {
            router.push(PATHS.HOME);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        // セッションデータが不正な場合は削除
        sessionStorage.removeItem("user");
      }
    };

    checkUserSession();
  }, [router]);

  // ログインボタン押下時
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // user取得
    setLoading(true);
    setIsSuccessLogin(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?name=${encodeURIComponent(
          username
        )}`
      );

      // response data
      const data = await response.json();

      // successful
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        router.push(PATHS.HOME);
      } else {
        setError(data.message);
        setIsSuccessLogin(false);
      }
    } catch (err) {
      setError("エラーが発生しました。");
      setIsSuccessLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full flex items-center justify-center"
            >
              <DMATGlassLoadingSpinner />
            </motion.div>
          ) : (
            !isSuccessLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center min-h-screen p-6 w-full"
              >
                <div className="w-full max-w-md">
                  {/* Logo and Header */}
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white/20"
                    >
                      <Image
                        src={Logo}
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-xl"
                      />
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2"
                    >
                      英語学習アプリ
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="text-gray-300 text-sm flex items-center justify-center gap-2"
                    >
                      <MdSchool size={16} />
                      学習を始めましょう
                    </motion.p>
                  </motion.div>

                  {/* Login Card */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  >
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="text-xl font-semibold mb-6 text-center text-white-1 flex items-center justify-center gap-2"
                    >
                      <MdLogin size={24} />
                      ログイン
                    </motion.h2>

                    {/* Username Input */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      className="mb-6"
                    >
                      <label
                        className="flex items-center gap-2 text-gray-200 text-sm font-medium mb-3"
                        htmlFor="username"
                      >
                        <MdPerson size={16} />
                        ユーザー名
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 text-white placeholder-gray-400 transition-all duration-200"
                          placeholder="DMAT"
                          disabled={loading}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <MdLanguage size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Login Button */}
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                      type="submit"
                      disabled={username.length === 0 || loading}
                    >
                      <MdLogin size={20} />
                      ログイン
                    </motion.button>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2"
                        >
                          <MdError size={20} className="text-red-400" />
                          <p className="text-red-300 text-sm">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-gray-400 text-xs">
                      英語学習の新しい体験を始めましょう 🚀
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default LoginPage;
