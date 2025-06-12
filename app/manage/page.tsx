import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Smartphone, Users, CalendarCheck, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DemoPage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative bg-black text-white">
                <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            스튜디오 <span className="text-rose-400">예약·문의 관리</span>
                        </h1>
                        <p className="mb-8 text-lg text-gray-200 sm:text-xl">
                            고객의 예약신청, 문의 요청 등 모든 정보를 한 곳에서 체계적으로 관리할 수 있는 전용 관리 페이지입니다. 예약 현황, 문의 내역, 고객 정보까지 한눈에 확인하고, 효율적으로 스튜디오를 운영하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">예약·문의 관리 주요 기능</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            고객의 예약신청, 문의 요청을 쉽고 빠르게 관리할 수 있는 다양한 기능을 제공합니다.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <CalendarCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">예약 문의 실시간 관리리</h3>
                            <p className="text-gray-600">
                                홈페이지, 이벤트페이지 등 다양한 채널에서 들어오는 문의와 상담 요청을 pc, 모바일에서 실시간으로 확인할 수 있습니다.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">문의 고객 관리</h3>
                            <p className="text-gray-600">
                                예약문의를 한 고객에게 카카오톡 템플릿 메시지를 보내 후속관리를 할 수 있습니다.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">체계적인 고객 정보 관리</h3>
                            <p className="text-gray-600">
                                신규문의, 상담중, 예약확정, 촬영완료, 보류 등 고객의 상태를 손쉽게 정리할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Preview Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">예약·문의 관리 페이지 미리보기</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            예약신청, 문의, 고객정보를 한눈에 볼 수 있는 직관적인 관리 화면을 경험해보세요.
                        </p>
                    </div>

                    <div className="mx-auto max-w-md">
                        <div className="block overflow-hidden rounded-lg border-2 border-rose-500 bg-white shadow-md transition-all hover:shadow-lg">
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                <Image
                                    src="/admin_image.png"
                                    alt="예약·문의 관리 페이지 미리보기"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-bold text-gray-900">예약·문의 통합 관리</h3>
                                <p className="mb-4 text-gray-600">
                                    고객의 예약신청, 문의, 상담 요청을 한 곳에서 관리하고, 스케줄과 고객정보를 자동으로 정리할 수 있습니다.
                                </p>
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">₩200,000~</span>
                                </div>
                                <ul className="mb-6 space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>실시간 예약 현황 확인</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>문의/상담 내역 자동 정리</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>고객별 이력 관리</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-rose-500" />
                                        <span>엑셀 다운로드 및 데이터 백업</span>
                                    </li>
                                </ul>
                                <Link href="/manage/demo-page">
                                    <Button className="w-full" asChild>
                                        <span>
                                            자세히 보기
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    </Button>
                                </Link>
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
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">예약·문의 관리 페이지에 대한 궁금증을 해결해 드립니다.</p>
                    </div>

                    <div className="mx-auto max-w-3xl">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>예약·문의 관리 페이지란 무엇인가요?</AccordionTrigger>
                                <AccordionContent>
                                    고객의 예약신청, 문의, 상담 요청 등 모든 정보를 한 곳에서 체계적으로 관리할 수 있는 전용 관리 페이지입니다. 예약 현황, 문의 내역, 고객 정보까지 한눈에 확인할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>예약 관리 기능은 어떻게 활용하나요?</AccordionTrigger>
                                <AccordionContent>
                                    고객이 홈페이지, SNS, 이벤트 등 다양한 채널을 통해 예약을 신청하면, 모든 내역이 자동으로 정리되어 실시간으로 확인할 수 있습니다. 스케줄 관리, 예약 승인/거절, 일정 조율 등이 가능합니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>문의/상담 내역도 함께 관리할 수 있나요?</AccordionTrigger>
                                <AccordionContent>
                                    네, 홈페이지, 허브페이지, 이벤트 등 다양한 채널에서 들어오는 문의와 상담 요청을 한 곳에서 통합 관리할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>고객 정보는 어떻게 활용할 수 있나요?</AccordionTrigger>
                                <AccordionContent>
                                    예약, 문의, 이벤트 참여 등 고객별 이력을 자동으로 정리하여, 맞춤 소통, 마케팅, 재방문 유도 등에 활용할 수 있습니다.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>데이터 백업 및 다운로드가 가능한가요?</AccordionTrigger>
                                <AccordionContent>
                                    모든 예약/문의/고객 정보는 안전하게 저장되며, 엑셀 파일로 다운로드하거나 백업할 수 있습니다.
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
                            지금 바로 예약·문의 관리를 시작하세요
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">
                            고객의 예약신청과 문의를 체계적으로 관리하여, 스튜디오 운영을 더 효율적으로 만들어보세요.
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
