import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/navbar/Navbar";

const nanumSquare = localFont({
  src: [
    {
      path: "../assets/fonts/NanumSquareL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/NanumSquareR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NanumSquareB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/NanumSquareEB.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum-square",
});

export const metadata: Metadata = {
  title: "Fitlog",
  description: "Fitlog 메인 페이지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-fitlog-50">
        {/* 전역 네비바 */}
        <Navbar />

        {/* 페이지 내용 */}
        <main>{children}</main>

        {/* 포탈 모달 자리 */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
