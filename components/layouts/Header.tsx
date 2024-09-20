import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resetState } from "@/states/testDataState";
import useAudio from "@/hooks/useAudio";
import Image from "next/image";
import Logo from "@/public/logo.png";
import DMATDialog from "../elements/DMATDialog";

const Header = () => {
  const router = useRouter();
  const { playInterrupt } = useAudio();

  // ユーザー情報
  const user = useRecoilValue(userState);
  const [_, setReset] = useRecoilState(resetState);
  // display sign out dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  // click sign out button
  const handleSignOut = () => {
    playInterrupt();
    sessionStorage.clear();
    setReset();
    router.push("/");
  };

  return (
    <>
      <header className="relative z-10 bg-gray-900 h-[56px] w-full flex items-center justify-between px-5 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt=""
              width={40}
              height={40}
              className="rounded-md"
            />
            <h1 className="text-xl font-bold text-yellow-400 drop-shadow-lg">
              {`Hello! ${user?.name}!`}
            </h1>
          </div>

          <Image
            src={String(user?.thumbnail)}
            alt=""
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
            onClick={() => {
              playInterrupt();
              setIsOpenDialog(true);
            }}
          />
        </div>
      </header>
      {isOpenDialog && (
        <DMATDialog
          mainText="サインアウトしますか？"
          leftButtonText="キャンセル"
          rightButtonText="サインアウト"
          handleClickLeftButton={() => {
            setIsOpenDialog(false);
          }}
          handleClickRightButton={handleSignOut}
        />
      )}
    </>
  );
};

export default Header;
