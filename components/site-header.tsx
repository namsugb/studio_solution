"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Site Name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-rose-600">스튜디오 웹 솔루션</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-rose-600">
            홈
          </Link>
          <Link href="/hub-page" className="text-sm font-medium text-gray-700 hover:text-rose-600">
            허브 페이지
          </Link>
          <Link href="/main-page" className="text-sm font-medium text-gray-700 hover:text-rose-600">
            메인 홈페이지
          </Link>
          <Button asChild>
            <Link href="/#apply">신청하기</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-rose-600"
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link
              href="/hub-page"
              className="text-sm font-medium text-gray-700 hover:text-rose-600"
              onClick={() => setIsMenuOpen(false)}
            >
              허브 페이지
            </Link>
            <Link
              href="/main-page"
              className="text-sm font-medium text-gray-700 hover:text-rose-600"
              onClick={() => setIsMenuOpen(false)}
            >
              메인 홈페이지
            </Link>
            <Button asChild className="w-full">
              <Link href="/#apply" onClick={() => setIsMenuOpen(false)}>
                신청하기
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
