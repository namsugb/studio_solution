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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="스튜디오를 위한 허브 페이지와 메인 홈페이지 템플릿" />
        <meta property="og:title" content="스튜디오 웹 솔루션" />
        <meta property="og:description" content="스튜디오를 위한 허브 페이지와 메인 홈페이지 템플릿" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="스튜디오 웹 솔루션" />
        <meta name="twitter:description" content="스튜디오를 위한 허브 페이지와 메인 홈페이지 템플릿" />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://your-domain.com/" />
        <link rel="icon" href="/favicon.ico" />
        <title>스튜디오 웹 솔루션</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "스튜디오 웹 솔루션",
            "url": "https://your-domain.com/",
            "description": "스튜디오를 위한 허브 페이지와 메인 홈페이지 템플릿"
          })
        }} />
      </head>
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
