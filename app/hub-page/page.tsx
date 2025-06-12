import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Instagram, Link2, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HubPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              스튜디오 <span className="text-rose-400">허브 페이지</span>
            </h1>
            <p className="mb-8 text-lg text-gray-200 sm:text-xl">
              모든 온라인 채널을 한 곳에 모아 고객들이 쉽게 접근할 수 있는 링크 허브 페이지를 제작해 드립니다. 블로그,
              인스타그램, 홈페이지 등 스튜디오의 모든 온라인 채널을 한 곳에서 관리하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">허브 페이지 특징</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오의 모든 온라인 채널을 한 곳에 모아 고객들이 쉽게 접근할 수 있는 링크 허브 페이지의 특징을
              알아보세요.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Link2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">모든 링크 통합</h3>
              <p className="text-gray-600">
                블로그, 인스타그램, 홈페이지, 네이버, 카카오톡 등 스튜디오의 모든 온라인 채널을 한 곳에 모아 고객들이
                쉽게 접근할 수 있습니다.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">모바일 최적화</h3>
              <p className="text-gray-600">
                모바일에서도 완벽하게 작동하는 반응형 디자인으로 고객들이 어떤 기기에서든 쉽게 접근할 수 있습니다.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Instagram className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">네이버 플레이스 지수 상승</h3>
              <p className="text-gray-600">
                네이버 링크들을 다수 노출시켜 네이버 플레이스 지수를 높이는데 도움이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">허브 페이지 템플릿</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              스튜디오에 최적화된 허브 페이지 템플릿으로 모든 온라인 채널을 한 곳에 모아보세요.
            </p>
          </div>

          <div className="mx-auto max-w-md">
            {/* Standard Template */}
            <a
              href="https://studio-hub.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border-2 border-rose-500 bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src="https://sjc.microlink.io/GN1Ye3p5LBI3rXa6JwA-wq9g46V5swIxKP0s5bGg8Tm0tcrJzYfAGldgAqvOJ1zUwBm9zzEQ0j58pxZVl3Y2cw.jpeg"
                  alt="스튜디오 허브 템플릿 미리보기"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">스튜디오 허브</h3>
                <p className="mb-4 text-gray-600">
                  스튜디오에 최적화된 허브 페이지입니다. 모든 온라인 채널을 한 곳에 모아 고객들이 쉽게 접근할 수
                  있습니다.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">₩100,000</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-rose-500" />
                    <span>모바일 최적화</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-rose-500" />
                    <span>무제한 링크</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-rose-500" />
                    <span>소셜 미디어 통합</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-rose-500" />
                    <span>이벤트 및 프로모션 섹션</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <span>
                    템플릿 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">자주 묻는 질문</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">허브 페이지에 대한 궁금증을 해결해 드립니다.</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>허브 페이지란 무엇인가요?</AccordionTrigger>
                <AccordionContent>
                  허브 페이지는 스튜디오의 모든 온라인 채널(블로그, 인스타그램, 홈페이지 등)을 한 곳에 모아
                  고객들이 쉽게 접근할 수 있도록 하는 페이지입니다. 하나의 URL로 모든 채널에 접근할 수 있어 명함이나
                  홍보물에 여러 링크를 나열할 필요가 없습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>제작 기간은 얼마나 걸리나요?</AccordionTrigger>
                <AccordionContent>
                  기본적인 허브 페이지는 약 1~2주 내에 완성됩니다. 커스텀 디자인이나 추가 기능이 필요한 경우 2~3주 정도
                  소요될 수 있습니다. 정확한 일정은 상담 후 결정됩니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>허브 페이지를 직접 수정할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네, 페이지 제작시 제공해주시는 정보(로고, 이미지, 링크, 텍스트, 메인 컬러)를 바탕으로 제작됩니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>유지보수 비용은 얼마인가요?</AccordionTrigger>
                <AccordionContent>
                  이미지 교체, 링크 교체와 같은 간단한 수정은 무료로 지원합니다. 복잡한 수정은 유지보수 서비스를 통해 지원해 드립니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>도메인은 어떻게 설정하나요?</AccordionTrigger>
                <AccordionContent>
                  기존에 보유하신 도메인이 있다면 그대로 사용 가능합니다. 도메인이 없으신 경우, 저희가 도메인 구매 및
                  설정을 도와드립니다(별도 비용 발생).
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
              지금 바로 허브 페이지를 시작하세요
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              스튜디오의 모든 온라인 채널을 한 곳에 모아 고객들에게 더 효과적으로 다가가세요.
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
