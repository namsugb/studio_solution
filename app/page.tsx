import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Link2, Instagram, Layout, Gift } from "lucide-react"
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">주요 서비스</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오와 사진작가를 위한 다양한 웹 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                src="/hub_image.png"
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
                src="/homepage_image.png"
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

            {/* Admin Page Service */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">관리자 페이지</h3>
              <p className="mb-4 text-gray-600">
                홈페이지, 이벤트페이지, 허브페이지등 다양한 경로로 부터 들어오는 예약문의를 확인하고 관리할 수 있습니다.
              </p>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  예약 문의하신 고객 관리를 통해 촬영확정 전환율을 높일 수 있습니다.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  모바일 최적화 ui로 모바일에서도 실시간으로 예약문의를 확인할 수 있습니다.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  다양한 경로로 오는 예약 문의를 한 곳에서 확인할 수 있습니다.
                </li>
              </ul>
              <Image
                src="/admin_image.png"
                alt="관리자 페이지 예시"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <Button asChild>
                  <Link href="/manage">
                    자세히 알아보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Event Page Service */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">이벤트 페이지</h3>
              <p className="mb-4 text-gray-600">
                스튜디오의 이벤트 상품을 홍보하고 예약문의를 받을 수 있는 이벤트 페이지를 제공합니다.
              </p>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  이벤트 상품 홍보
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-rose-500" />
                  예약 정보 관리
                </li>
              </ul>
              <Image
                src="/event_image.png"
                alt="이벤트 페이지 예시"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <Button asChild>
                  <Link href="/event-page">
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
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">스튜디오 웹 솔루션 제작 신청</h2>
              <p className="text-lg text-gray-600">아래 양식을 작성하여 스튜디오 웹 솔루션 제작을 신청해 주세요.</p>
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
            {/* 후기 1 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/portrait-photo.png?height=48&width=48&query=portrait photo 1"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">아침햇살 스튜디오</h4>
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
                "홈페이지 리뉴얼 후 고객 문의가 눈에 띄게 늘었어요! 특히 모바일에서도 너무 예쁘게 잘 보여서, 젊은 고객층에게도 반응이 좋습니다. 예약 관리도 훨씬 편해졌고, 무엇보다 저희만의 감성을 잘 살려주셔서 정말 만족합니다."
              </p>
            </div>
            {/* 후기 2 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/portrait-photo.png?height=48&width=48&query=portrait photo 2"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">포토앤유</h4>
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
                "저희는 SNS 채널이 많아서 관리가 힘들었는데, 허브 페이지 덕분에 고객들이 한 번에 원하는 곳으로 이동할 수 있어 정말 편리해졌어요. 문의도 한 곳으로 모여서 응대가 훨씬 수월해졌습니다. 적극 추천합니다!"
              </p>
            </div>
            {/* 후기 3 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/portrait-photo.png?height=48&width=48&query=portrait photo 3"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">스튜디오 봄날</h4>
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
                "처음엔 홈페이지가 필요할까 고민했는데, 막상 만들고 나니 고객 응대가 훨씬 체계적으로 바뀌었어요. 특히 예약 시스템이 자동화되어 시간도 절약되고, 고객분들도 만족도가 높아졌습니다. 덕분에 저희 스튜디오가 한 단계 성장한 느낌이에요!"
              </p>
            </div>
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
              <p className="mb-2 text-gray-400">이메일: namsugb@naver.com</p>
              <p className="mb-2 text-gray-400">전화: 010-3941-2259</p>
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
