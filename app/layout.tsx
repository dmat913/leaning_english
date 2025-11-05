"use client";

import { Background } from "@/components/aceternity/Background";
import "./globals.css";
import { RecoilRoot } from "recoil";
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>Dmat English</title>
      </head>
      <body className="h-[100svh] w-[100vw]">
        <RecoilRoot>
          <QueryProvider>
            <Background>{children}</Background>
          </QueryProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
