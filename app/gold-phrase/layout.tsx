"use client";

import { Background } from "@/components/aceternity/Background";
import Header from "@/components/layouts/Header";
import { PATHS } from "@/lib/paths";
import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  // user data
  const [user, setUser] = useRecoilState(userState);
  // 表示可能 flag
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  // get user data from session storage
  useEffect(() => {
    const user: string | null = sessionStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setIsDisplay(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Background className="h-[100svh] w-[100vw]">
      {user && (
        <div className="w-full h-full">
          <Header />
          <div className="pt-[64px] h-full w-full overflow-hidden">
            {children}
          </div>
        </div>
      )}
      {!user && isDisplay && (
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl"></div>

              {/* Glass effect overlay */}
              <div className="relative backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl rounded-2xl p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl font-bold mb-2 text-center text-gray-800">
                  認証が必要です
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-gray-600 mb-8 text-center leading-relaxed">
                  このページにアクセスするには
                  <br />
                  ログインが必要です
                </p>

                {/* Button */}
                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white-1 font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transform hover:scale-[1.02] transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => router.push(PATHS.LOGIN)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>ログイン画面へ</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};

export default Layout;
