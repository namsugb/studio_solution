import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Smartphone, Users, CalendarCheck, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function EventPage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative bg-black text-white">
                <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            스튜디오 <span className="text-rose-400">이벤트 예약 페이지</span>
                        </h1>
                        <p className="mb-8 text-lg text-gray-200 sm:text-xl">
                            스튜디오의 다양한 이벤트 상품에 대한 예약문의를 간편하게 받을 수 있는 전용 페이지입니다. 인스타그램, 카카오톡 등 SNS에서 바로 연결해 고객의 예약 신청을 쉽고 빠르게 받아보세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이벤트 예약 페이지 주요 기능</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            이벤트별 예약문의, 실시간 신청 현황, 모바일 최적화 등 SNS와 연동해 누구나 쉽게 사용할 수 있습니다.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <CalendarCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">이벤트별 예약문의 관리</h3>
                            <p className="text-gray-600">
                                각 이벤트 상품별로 예약문의 내역을 구분해 관리할 수 있어, 신청 현황을 한눈에 파악할 수 있습니다.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <Smartphone className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">SNS 연동 & 모바일 최적화</h3>
                            <p className="text-gray-600">
                                인스타그램, 카카오톡 등 SNS 프로필/스토리/게시글에 링크를 연결해, 고객이 모바일에서 바로 예약 신청할 수 있습니다.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">간편한 신청서 & 실시간 확인</h3>
                            <p className="text-gray-600">
                                고객이 간단한 폼을 작성하면, 실시간으로 신청 내역을 확인하고 관리할 수 있습니다. 신청 내역은 엑셀로 다운로드도 가능합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Preview Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이벤트 예약 페이지 미리보기</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            실제 이벤트 예약 페이지 화면을 미리 확인해보세요. 모바일에서도 깔끔하게 보입니다.
                        </p>
                    </div>

                    <div className="mx-auto max-w-md">
                        <div className="block overflow-hidden rounded-lg border-2 border-rose-500 bg-white shadow-md transition-all hover:shadow-lg">
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                <Image
                                    src="/event_image.png"
                                    alt="이벤트 예약 페이지 미리보기"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-bold text-gray-900">이벤트 예약·문의</h3>
                                <p className="mb-4 text-gray-600">
                                    원하는 이벤트 상품을 선택해 간단한 폼으로 예약 신청을 받고, 신청 내역을 실시간으로 관리할 수 있습니다.
                                </p>
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">₩100,000~</span>
                                </div>
                                <ul className="mb-6 space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>이벤트별 예약문의 관리</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>SNS 연동 & 모바일 최적화</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>간편 신청서 & 실시간 확인</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>엑셀 다운로드 지원</span>
                                    </li>
                                </ul>
                                <a href="https://v0-single-event-page-maker.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full" asChild>
                                        <span>
                                            자세히 보기
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">자주 묻는 질문</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">이벤트 예약 페이지에 대한 궁금증을 해결해 드립니다.</p>
                    </div>

                    <div className="mx-auto max-w-3xl">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>이벤트 예약 페이지란 무엇인가요?</AccordionTrigger>
                                <AccordionContent>
                                    스튜디오의 다양한 이벤트 상품에 대한 예약문의를 간편하게 받을 수 있는 전용 페이지입니다. 인스타그램, 카카오톡 등 SNS에서 바로 연결해 고객의 예약 신청을 쉽고 빠르게 받을 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>어떻게 활용하면 좋나요?</AccordionTrigger>
                                <AccordionContent>
                                    SNS 프로필, 스토리, 게시글 등에 이벤트 예약 페이지 링크를 연결해두면, 고객이 모바일에서 바로 예약 신청을 할 수 있습니다. 신청 내역은 실시간으로 확인하고, 엑셀로 다운로드할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>이벤트별로 신청 내역을 구분할 수 있나요?</AccordionTrigger>
                                <AccordionContent>
                                    네, 각 이벤트 상품별로 예약문의 내역이 자동으로 구분되어 관리됩니다. 어떤 이벤트에 신청이 많은지 한눈에 파악할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>모바일에서도 잘 보이나요?</AccordionTrigger>
                                <AccordionContent>
                                    네, 모바일에 최적화된 반응형 디자인으로, 고객이 스마트폰에서 바로 신청할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>신청 내역은 어떻게 관리하나요?</AccordionTrigger>
                                <AccordionContent>
                                    신청 내역은 관리 페이지에서 실시간으로 확인할 수 있고, 필요시 엑셀로 다운로드하여 오프라인 관리도 가능합니다.
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
                            지금 바로 이벤트 예약 페이지를 시작하세요
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">
                            스튜디오 이벤트 상품에 대한 예약문의를 쉽고 체계적으로 관리해보세요.
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
