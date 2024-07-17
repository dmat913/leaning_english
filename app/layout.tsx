"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[100vw] h-[100svh]">
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
