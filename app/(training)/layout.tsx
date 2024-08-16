"use client";

import { Background } from "@/components/aceternity/Background";
import Header from "@/components/layouts/Header";
import {
  level600State,
  level730State,
  level860State,
  level990State,
} from "@/states/testDataState";
import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

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

  // testData
  const setLevel600Data = useSetRecoilState(level600State);
  const setLevel730Data = useSetRecoilState(level730State);
  const setLevel860Data = useSetRecoilState(level860State);
  const setLevel990Data = useSetRecoilState(level990State);

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

  // set testData
  useEffect(() => {
    if (user) {
      setLevel600Data(user.level600_data);
      setLevel730Data(user.level730_data);
      setLevel860Data(user.level860_data);
      setLevel990Data(user.level990_data);
    }
  }, [user]);

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
