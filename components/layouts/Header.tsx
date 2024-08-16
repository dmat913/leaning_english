import { userState } from "@/states/userState";
import React from "react";
import { useRecoilValue } from "recoil";

const Header = () => {
  const user = useRecoilValue(userState);
  return (
    <header className="relative z-10 bg-gray-900 h-[56px] w-full flex items-center pl-5 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-pink-400 drop-shadow-lg">
          Hello! {user?.name}! Let's training!
        </h1>
      </div>
    </header>
  );
};

export default Header;
