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
      <body>
        <RecoilRoot>
          <div style={{ height: "100svh", width: "100vw" }}>{children}</div>
        </RecoilRoot>
      </body>
    </html>
  );
}
