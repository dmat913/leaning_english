import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Dialog from "../elements/Dialog";
import { resetState } from "@/states/testDataState";

const Header = () => {
  const router = useRouter();

  // ユーザー情報
  const user = useRecoilValue(userState);
  const [_, setReset] = useRecoilState(resetState);
  // display sign out dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  // click sign out button
  const handleSignOut = () => {
    sessionStorage.clear();
    setReset()
    router.push("/");
  };

  return (
    <>
      <header className="relative z-10 bg-gray-900 h-[56px] w-full flex items-center justify-between px-5 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400 drop-shadow-lg">
            {`Hello! ${user?.name}!`}
          </h1>
          <button
            onClick={() => setIsOpenDialog(true)}
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition"
          >
            Sign Out
          </button>
        </div>
      </header>
      {isOpenDialog && (
        <Dialog
          mainText="サインアウトしますか？"
          leftButtonText="キャンセル"
          rightButtonText="サインアウト"
          handleClickLeftButton={() => setIsOpenDialog(false)}
          handleClickRightButton={handleSignOut}
        />
      )}
    </>
  );
};

export default Header;
