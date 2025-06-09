import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "스튜디오 웹 솔루션",
  description: "스튜디오를 위한 허브 페이지와 메인 홈페이지 템플릿",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
