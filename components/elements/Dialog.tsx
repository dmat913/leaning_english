import React from "react";

const Dialog = ({
  rightButtonText,
  leftButtonText,
  mainText,
  handleClickLeftButton,
  handleClickRightButton,
}: {
  rightButtonText: string;
  leftButtonText: string;
  mainText: string;
  handleClickLeftButton?: () => void;
  handleClickRightButton?: () => void;
}) => {
  return (
    <div
      className="w-[270px] flex flex-col bg-[#F2F2F2CC] top-[50%] left-[50%] fixed"
      style={{
        borderRadius: "14px",
        backdropFilter: "blur(20px)",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div
        className="h-[72px] w-full flex items-center justify-center"
        style={{
          borderBottom: "1px solid #3C3C435C",
        }}
      >
        {mainText}
      </div>
      <div className="flex w-full h-[44px]">
        <button
          className="w-[50%] text-[#007AFF]"
          style={{ borderRight: "1px solid #3C3C435C" }}
          onClick={handleClickLeftButton}
        >
          {leftButtonText}
        </button>
        <button
          className="w-[50%] text-[#007AFF]"
          onClick={handleClickRightButton}
        >
          {rightButtonText}
        </button>
      </div>
    </div>
  );
};

export default Dialog;
