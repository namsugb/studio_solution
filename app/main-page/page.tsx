import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, ExternalLink, Camera, Layout, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function MainPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-rose-600 text-white">
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              스튜디오 <span className="text-rose-200">메인 홈페이지</span>
            </h1>
            <p className="mb-8 text-lg text-gray-200 sm:text-xl">
              스튜디오의 작품과 서비스를 효과적으로 보여주는 전문적인 홈페이지를 제작합니다. 사진 포트폴리오와 스튜디오
              정보를 아름답게 전시할 수 있습니다.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link href="#features">자세히 알아보기</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-black/50 text-white hover:bg-black/70" asChild>
                <Link href="/#apply">신청하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">메인 홈페이지 특징</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오의 작품과 서비스를 효과적으로 보여주는 전문적인 홈페이지의 특징을 알아보세요.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">포트폴리오 갤러리</h3>
              <p className="text-gray-600">
                스튜디오의 작품을 아름답게 전시할 수 있는 다양한 갤러리 레이아웃을 제공합니다. 고객들이 작품을 쉽게
                감상할 수 있습니다.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">반응형 디자인</h3>
              <p className="text-gray-600">
                모든 기기에서 완벽하게 작동하는 반응형 디자인으로 고객들이 어떤 기기에서든 쉽게 접근할 수 있습니다.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">SEO 최적화</h3>
              <p className="text-gray-600">
                검색 엔진 최적화를 통해 스튜디오의 홈페이지가 검색 결과에서 상위에 노출될 수 있도록 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">포트폴리오 갤러리</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">다양한 스타일의 포트폴리오 갤러리를 제공합니다.</p>
          </div>

          <Tabs defaultValue="gallery1" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gallery1">그리드 갤러리</TabsTrigger>
              <TabsTrigger value="gallery2">슬라이더 갤러리</TabsTrigger>
              <TabsTrigger value="gallery3">마소닉 갤러리</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery1" className="mt-6">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                <div className="relative aspect-[16/9]">
                  <Image src="/gallery-grid.png" alt="그리드 갤러리 예시" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">그리드 갤러리</h3>
                  <p className="mb-4 text-gray-600">
                    균일한 크기의 이미지를 그리드 형태로 배치하는 갤러리입니다. 깔끔하고 정돈된 느낌을 주며, 모든 작품을
                    동등하게 보여줍니다.
                  </p>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="mr-2" asChild>
                      <Link href="/#apply">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        데모 보기
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/#apply">이 스타일로 신청하기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gallery2" className="mt-6">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                <div className="relative aspect-[16/9]">
                  <Image src="/gallery-slider.png" alt="슬라이더 갤러리 예시" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">슬라이더 갤러리</h3>
                  <p className="mb-4 text-gray-600">
                    이미지를 슬라이드 형태로 보여주는 갤러리입니다. 한 번에 하나의 작품에 집중할 수 있으며, 큰 화면에서
                    작품을 감상할 수 있습니다.
                  </p>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="mr-2" asChild>
                      <Link href="/#apply">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        데모 보기
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/#apply">이 스타일로 신청하기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gallery3" className="mt-6">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                <div className="relative aspect-[16/9]">
                  <Image src="/gallery-masonry.png" alt="마소닉 갤러리 예시" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">마소닉 갤러리</h3>
                  <p className="mb-4 text-gray-600">
                    다양한 크기의 이미지를 벽돌 쌓듯이 배치하는 갤러리입니다. 이미지의 원래 비율을 유지하면서 공간을
                    효율적으로 활용할 수 있습니다.
                  </p>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="mr-2" asChild>
                      <Link href="/#apply">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        데모 보기
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/#apply">이 스타일로 신청하기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">주요 구성 요소</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오 메인 홈페이지에 포함되는 주요 구성 요소입니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "소개 섹션",
                description: "스튜디오의 역사, 철학, 팀원 등을 소개하는 섹션입니다.",
                image: "/component-about.png",
              },
              {
                title: "포트폴리오 갤러리",
                description: "스튜디오의 작품을 다양한 형태로 전시하는 갤러리입니다.",
                image: "/component-portfolio.png",
              },
              {
                title: "서비스 및 가격",
                description: "스튜디오에서 제공하는 서비스와 가격을 안내하는 섹션입니다.",
                image: "/component-pricing.png",
              },
              {
                title: "예약 시스템",
                description: "고객이 직접 촬영 일정을 예약할 수 있는 시스템입니다.",
                image: "/component-booking.png",
              },
              {
                title: "고객 후기",
                description: "이전 고객들의 후기를 보여주는 섹션입니다.",
                image: "/component-testimonials.png",
              },
              {
                title: "연락처 및 위치",
                description: "스튜디오의 연락처와 위치 정보를 제공하는 섹션입니다.",
                image: "/component-contact.png",
              },
            ].map((component, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={component.image || "/placeholder.svg"}
                    alt={component.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{component.title}</h3>
                  <p className="text-gray-600">{component.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">메인 홈페이지 가격</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              합리적인 가격으로 스튜디오의 전문적인 홈페이지를 제작해 드립니다.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Basic Plan */}
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-bold text-gray-900">베이직</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">₩599,000</span>
                  <span className="text-gray-500"> / 1회</span>
                </div>
                <p className="mb-6 text-gray-600">기본적인 홈페이지를 원하는 스튜디오에 적합합니다.</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">5개 페이지 구성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">반응형 디자인</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">기본 포트폴리오 갤러리</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">1개월 무료 유지보수</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">기본 SEO 설정</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/#apply">신청하기</Link>
                </Button>
              </div>

              {/* Standard Plan */}
              <div className="relative rounded-lg border-2 border-rose-500 bg-white p-8 shadow-md">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-4 py-1 text-sm font-semibold text-white">
                  인기 상품
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">스탠다드</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">₩999,000</span>
                  <span className="text-gray-500"> / 1회</span>
                </div>
                <p className="mb-6 text-gray-600">대부분의 스튜디오에 적합한 표준 홈페이지입니다.</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">10개 페이지 구성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">반응형 디자인</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">고급 포트폴리오 갤러리</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">3개월 무료 유지보수</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">고급 SEO 최적화</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">기본 예약 시스템</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">소셜 미디어 통합</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/#apply">신청하기</Link>
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-bold text-gray-900">프리미엄</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">₩1,499,000</span>
                  <span className="text-gray-500"> / 1회</span>
                </div>
                <p className="mb-6 text-gray-600">고급 기능이 필요한 전문 스튜디오에 적합합니다.</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">무제한 페이지 구성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">반응형 디자인</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">맞춤형 포트폴리오 갤러리</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">6개월 무료 유지보수</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">전문 SEO 최적화</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">고급 예약 시스템</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">소셜 미디어 통합</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">고객 관리 시스템</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-rose-500" />
                    <span className="text-gray-600">결제 시스템 연동</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/#apply">신청하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">자주 묻는 질문</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">메인 홈페이지에 대한 궁금증을 해결해 드립니다.</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>홈페이지 제작 기간은 얼마나 걸리나요?</AccordionTrigger>
                <AccordionContent>
                  기본적인 홈페이지는 약 3~4주 내에 완성됩니다. 복잡한 기능이나 맞춤형 디자인이 필요한 경우 6~8주 정도
                  소요될 수 있습니다. 정확한 일정은 상담 후 결정됩니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>홈페이지 콘텐츠는 어떻게 준비해야 하나요?</AccordionTrigger>
                <AccordionContent>
                  기본적인 텍스트 콘텐츠(소개, 서비스 설명 등)와 고품질 이미지를 준비해 주시면 됩니다. 필요한 경우
                  콘텐츠 작성 및 사진 촬영 서비스도 제공해 드립니다(별도 비용 발생).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>홈페이지를 직접 수정할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네, 관리자 페이지를 통해 텍스트, 이미지, 갤러리 등을 직접 수정할 수 있습니다. 사용법에 대한 교육도
                  제공해 드립니다. 더 복잡한 수정은 유지보수 서비스를 통해 지원해 드립니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>유지보수 비용은 얼마인가요?</AccordionTrigger>
                <AccordionContent>
                  무료 유지보수 기간 이후에는 월 50,000원부터 시작하는 유지보수 플랜을 제공합니다. 유지보수에는 호스팅
                  비용, 보안 업데이트, 기술 지원, 콘텐츠 업데이트 등이 포함됩니다. 자세한 내용은 상담을 통해 안내해
                  드립니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>예약 시스템은 어떻게 작동하나요?</AccordionTrigger>
                <AccordionContent>
                  고객이 직접 촬영 일정을 예약할 수 있는 시스템을 제공합니다. 스튜디오의 가용 시간을 설정하면 고객이
                  원하는 날짜와 시간을 선택하여 예약할 수 있습니다. 예약 확인 이메일이 자동으로 발송되며, 관리자
                  페이지에서 모든 예약을 확인하고 관리할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              지금 바로 메인 홈페이지를 시작하세요
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              스튜디오의 작품과 서비스를 효과적으로 보여주는 전문적인 홈페이지로 고객들에게 더 효과적으로 다가가세요.
            </p>
            <Button size="lg" asChild>
              <Link href="/#apply">
                무료 상담 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
