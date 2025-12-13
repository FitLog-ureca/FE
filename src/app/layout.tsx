import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "@/app/providers";
import NavWrapper from "@/components/navbar/NavWrapper";

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
    <html lang="ko" className={`${nanumSquare.variable}`}>
      <body className="bg-fitlog-50 min-h-screen overscroll-none">
        <Providers>
          {/* 전역 네비바 (/login, /signup 도메인 제외) */}
          <NavWrapper />

          {/* 페이지 내용 */}
          <main className="h-[calc(100vh-72px)]">{children}</main>

          {/* 포탈 모달 자리 */}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
