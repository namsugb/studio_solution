import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FolderPlus, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

// 실제 앱에서는 서버 컴포넌트에서 세션 확인 로직 구현 필요
const checkAuth = () => {
  // 임시 인증 체크 (실제로는 세션/쿠키 확인 등의 로직 필요)
  return true
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  // 인증 확인 (실제 앱에서는 서버 컴포넌트에서 세션 확인)
  const isAuthenticated = checkAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 (데스크톱) */}
      <aside className="hidden w-64 flex-col bg-white shadow-sm md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/projects/new" className="flex items-center">
            <span className="text-xl font-bold text-rose-600">스튜디오 관리자</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col p-4">
          <div className="space-y-1">
            <Link
              href="/admin/projects/new"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-rose-600 bg-rose-50"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              프로젝트 생성
            </Link>
          </div>
          <div className="mt-auto pt-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Link>
            </Button>
          </div>
        </nav>
      </aside>

      {/* 모바일 헤더 */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <Link href="/admin/projects/new" className="flex items-center">
          <span className="text-lg font-bold text-rose-600">스튜디오 관리자</span>
        </Link>
        <MobileNav />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6 pt-20 md:pt-6">{children}</main>
    </div>
  )
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <details className="dropdown dropdown-end">
        <summary className="btn btn-ghost">
          <Menu className="h-6 w-6" />
        </summary>
        <div className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/admin/projects/new"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              프로젝트 생성
            </Link>
            <hr className="my-2" />
            <Link
              href="/"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Link>
          </nav>
        </div>
      </details>
    </div>
  )
}
