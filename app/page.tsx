import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Link2, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
// InquiryForm 컴포넌트 import 추가
import { InquiryForm } from "@/components/inquiry-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image src="/photography-studio.png" alt="Studio background" fill className="object-cover" priority />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              프로페셔널 스튜디오 <span className="text-rose-400">웹 솔루션</span>
            </h1>
            <p className="mb-8 text-lg text-gray-200 sm:text-xl">
              스튜디오와 사진작가를 위한 맞춤형 웹 솔루션을 제공합니다. 고객들에게 더 효과적으로 다가갈 수 있는 디지털
              공간을 만들어 드립니다.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link href="#services">서비스 알아보기</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-black/50 text-white hover:bg-black/70" asChild>
                <Link href="#apply">신청하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">주요 서비스</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오와 사진작가를 위한 두 가지 핵심 웹 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Hub Page Service */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Link2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">허브 페이지</h3>
              <p className="mb-4 text-gray-600">
                블로그, 인스타그램, 홈페이지 등 스튜디오의 모든 온라인 채널을 한 곳에 모아 고객들이 쉽게 접근할 수 있는
                링크 허브 페이지를 제작해 드립니다.
              </p>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  모든 SNS 및 웹 채널 통합
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  맞춤형 디자인 및 브랜딩
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  모바일 최적화
                </li>
              </ul>
              <Image
                src="/link-hub-social-icons.png"
                alt="허브 페이지 예시"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Button asChild>
                  <Link href="/hub-page">
                    자세히 알아보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main Homepage Service */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">메인 홈페이지</h3>
              <p className="mb-4 text-gray-600">
                스튜디오의 작품과 서비스를 효과적으로 보여주는 전문적인 홈페이지를 제작합니다. 사진 포트폴리오와
                스튜디오 정보를 아름답게 전시할 수 있습니다.
              </p>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  포트폴리오 갤러리
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  예약 시스템 연동
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  SEO 최적화
                </li>
              </ul>
              <Image
                src="/photography-portfolio-website.png"
                alt="메인 홈페이지 예시"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <Button asChild>
                  <Link href="/main-page">
                    자세히 알아보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">웹페이지 제작 신청</h2>
              <p className="text-lg text-gray-600">아래 양식을 작성하여 스튜디오 웹페이지 제작을 신청해 주세요.</p>
            </div>

            <InquiryForm />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">고객 후기</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              저희 서비스를 이용한 스튜디오의 생생한 후기를 확인하세요.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={`/portrait-photo.png?height=48&width=48&query=portrait photo ${i}`}
                      alt="Customer"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">스튜디오 {i}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "웹페이지 제작 후 온라인 예약이 30% 증가했습니다. 고객들이 저희 작품을 더 쉽게 볼 수 있게 되었고, SNS
                  채널도 한 곳에서 관리할 수 있어 매우 편리합니다."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">스튜디오 웹 솔루션</h3>
              <p className="text-gray-400">스튜디오와 사진작가를 위한 최고의 웹 솔루션을 제공합니다.</p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-medium">연락처</h4>
              <p className="mb-2 text-gray-400">이메일: contact@studio-web.com</p>
              <p className="mb-2 text-gray-400">전화: 02-123-4567</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-medium">빠른 링크</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#services" className="hover:text-white">
                    서비스
                  </Link>
                </li>
                <li>
                  <Link href="#apply" className="hover:text-white">
                    신청하기
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 스튜디오 웹 솔루션. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
