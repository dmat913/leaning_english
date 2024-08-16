"use client";

import { Background } from "@/components/aceternity/Background";
import Header from "@/components/layouts/Header";
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
          <div className="p-5 h-[calc(100svh-56px)] w-full overflow-hidden">
            {children}
          </div>
        </div>
      )}
      {!user && isDisplay && (
        <div className="flex items-center justify-center min-h-screen p-5">
          <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg bg-white-1">
            <h1 className="text-md font-semibold mb-6 text-center">
              ユーザー情報がありません。
            </h1>
            <button
              className="w-full py-2 bg-blue-500 text-white-1 font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70"
              onClick={() => router.push("/")}
            >
              ログイン画面へ戻る
            </button>
          </div>
        </div>
      )}
    </Background>
  );
};

export default Layout;
