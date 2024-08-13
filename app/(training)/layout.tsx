import { Background } from "@/components/aceternity/Background";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Background className="h-[100svh] w-[100vw] overflow-hidden p-5">
      {children}
    </Background>
  );
};

export default layout;
