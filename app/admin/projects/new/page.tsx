"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectTypeSelection() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">새 프로젝트 생성</h1>
            <Button variant="outline" asChild>
              <Link href="/admin/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                프로젝트 목록
              </Link>
            </Button>
          </div>
          <p className="text-gray-600">생성할 프로젝트 유형을 선택하세요</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 허브 페이지 카드 */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>허브 페이지</CardTitle>
              <CardDescription>
                블로그, 인스타그램, 홈페이지 등 스튜디오의 모든 온라인 채널을 한 곳에 모아 고객들이 쉽게 접근할 수 있는
                링크 허브 페이지
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>모든 SNS 및 웹 채널 통합</div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>맞춤형 디자인 및 브랜딩</div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>모바일 최적화</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/admin/projects/new/hub">허브 페이지 생성하기</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* 메인 홈페이지 카드 */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>메인 홈페이지</CardTitle>
              <CardDescription>
                스튜디오의 작품과 서비스를 효과적으로 보여주는 전문적인 홈페이지. 사진 포트폴리오와 스튜디오 정보를
                아름답게 전시
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>포트폴리오 갤러리</div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>예약 시스템 연동</div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2">✓</div>
                  <div>SEO 최적화</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/admin/projects/new/website">메인 홈페이지 생성하기</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
