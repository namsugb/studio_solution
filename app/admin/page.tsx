"use client"

import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Calendar, Clock, CheckCircle, AlertCircle, Search, MoreHorizontal, Edit, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// 예약 상태 타입
type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled"

// 예약 정보 타입
interface Reservation {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  date: string
  time: string
  service: string
  status: ReservationStatus
  notes?: string
  createdAt: string
}

// 문의 상태 타입
type InquiryStatus = "new" | "reviewing" | "quoted" | "contracted" | "completed" | "cancelled"

// 문의 정보 타입
interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: InquiryStatus
  createdAt: string
  updatedAt: string
  notes?: string
}

// 예약 상태별 색상 및 라벨
const reservationStatusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", label: "대기중" },
  confirmed: { color: "bg-blue-100 text-blue-800", label: "확정" },
  completed: { color: "bg-green-100 text-green-800", label: "완료" },
  cancelled: { color: "bg-red-100 text-red-800", label: "취소" },
}

// 문의 상태별 색상 및 라벨
const inquiryStatusConfig = {
  new: { color: "bg-blue-100 text-blue-800", label: "신규 문의" },
  reviewing: { color: "bg-yellow-100 text-yellow-800", label: "검토중" },
  quoted: { color: "bg-purple-100 text-purple-800", label: "견적 발송" },
  contracted: { color: "bg-indigo-100 text-indigo-800", label: "계약 완료" },
  completed: { color: "bg-green-100 text-green-800", label: "제작 완료" },
  cancelled: { color: "bg-red-100 text-red-800", label: "취소" },
}

// 샘플 예약 데이터
const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    customerName: "김지민",
    customerPhone: "010-1234-5678",
    customerEmail: "jimin@example.com",
    date: "2025-05-20",
    time: "13:00",
    service: "웨딩 촬영",
    status: "confirmed",
    notes: "야외 촬영 선호",
    createdAt: "2025-05-15T09:30:00",
  },
  {
    id: "RES-002",
    customerName: "이서연",
    customerPhone: "010-2345-6789",
    customerEmail: "seoyeon@example.com",
    date: "2025-05-21",
    time: "11:00",
    service: "가족 촬영",
    status: "pending",
    createdAt: "2025-05-16T14:20:00",
  },
  {
    id: "RES-003",
    customerName: "박준호",
    customerPhone: "010-3456-7890",
    customerEmail: "junho@example.com",
    date: "2025-05-19",
    time: "15:30",
    service: "프로필 촬영",
    status: "completed",
    notes: "흑백 사진 요청",
    createdAt: "2025-05-14T11:15:00",
  },
  {
    id: "RES-004",
    customerName: "최유진",
    customerPhone: "010-4567-8901",
    customerEmail: "yujin@example.com",
    date: "2025-05-22",
    time: "10:00",
    service: "웨딩 촬영",
    status: "cancelled",
    notes: "일정 변경으로 취소",
    createdAt: "2025-05-17T16:45:00",
  },
  {
    id: "RES-005",
    customerName: "정민수",
    customerPhone: "010-5678-9012",
    customerEmail: "minsu@example.com",
    date: "2025-05-23",
    time: "14:00",
    service: "프로필 촬영",
    status: "confirmed",
    createdAt: "2025-05-18T10:30:00",
  },
]

// 샘플 문의 데이터
const mockInquiries: Inquiry[] = [
  {
    id: "INQ-001",
    name: "김민준",
    email: "minjun@example.com",
    phone: "010-1234-5678",
    service: "허브 페이지",
    message: "스튜디오 허브 페이지 제작 문의드립니다. 베이직 플랜으로 문의합니다.",
    status: "new",
    createdAt: "2025-05-15T09:30:00",
    updatedAt: "2025-05-15T09:30:00",
  },
  {
    id: "INQ-002",
    name: "이지현",
    email: "jihyun@example.com",
    phone: "010-2345-6789",
    service: "메인 홈페이지",
    message: "웨딩 스튜디오 홈페이지를 제작하고 싶습니다. 포트폴리오 갤러리 기능이 중요합니다.",
    status: "reviewing",
    createdAt: "2025-05-14T14:20:00",
    updatedAt: "2025-05-15T10:15:00",
    notes: "포트폴리오 갤러리 중요, 예산 협의 필요",
  },
  {
    id: "INQ-003",
    name: "박서준",
    email: "seojun@example.com",
    phone: "010-3456-7890",
    service: "둘 다",
    message: "허브 페이지와 메인 홈페이지 모두 필요합니다. 프리미엄 옵션으로 문의드립니다.",
    status: "quoted",
    createdAt: "2025-05-13T11:15:00",
    updatedAt: "2025-05-16T09:45:00",
    notes: "프리미엄 플랜 견적 발송 완료, 결정 대기중",
  },
]

export default function AdminDashboard() {
  // 관리자 페이지 접근 시 프로젝트 생성 페이지로 리다이렉트
  redirect("/admin/projects/new")

  const [reservations] = useState<Reservation[]>(mockReservations)
  const [inquiries] = useState<Inquiry[]>(mockInquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 예약 상태별 카운트
  const reservationCounts = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    completed: reservations.filter((r) => r.status === "completed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  }

  // 문의 상태별 카운트
  const inquiryCounts = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    reviewing: inquiries.filter((i) => i.status === "reviewing").length,
    quoted: inquiries.filter((i) => i.status === "quoted").length,
    contracted: inquiries.filter((i) => i.status === "contracted").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
    cancelled: inquiries.filter((i) => i.status === "cancelled").length,
  }

  // 필터링된 예약 목록
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerPhone.includes(searchTerm) ||
      reservation.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // 예약 상세 정보 열기
  const openReservationDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setIsDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">관리자 대시보드</h1>
        <p className="text-muted-foreground">스튜디오 예약 및 문의 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">전체 예약</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservationCounts.total}</div>
            <p className="text-xs text-muted-foreground">최근 30일 예약 건수</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">대기중 예약</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservationCounts.pending}</div>
            <p className="text-xs text-muted-foreground">확인 필요한 예약</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">신규 문의</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.new}</div>
            <p className="text-xs text-muted-foreground">응답 대기중인 문의</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">진행중 문의</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.reviewing + inquiryCounts.quoted}</div>
            <p className="text-xs text-muted-foreground">검토중/견적발송 문의</p>
          </CardContent>
        </Card>
      </div>

      {/* 최근 예약 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 예약 목록</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="이름, 전화번호, 서비스로 검색..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="confirmed">확정</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                  <SelectItem value="cancelled">취소</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button asChild>
              <Link href="/admin/reservations">모든 예약 보기</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>예약 ID</TableHead>
                <TableHead>고객명</TableHead>
                <TableHead>날짜 및 시간</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <p>예약 정보가 없습니다</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.slice(0, 5).map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openReservationDetail(reservation)}
                  >
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell>
                      <div>{reservation.customerName}</div>
                      <div className="text-sm text-muted-foreground">{reservation.customerPhone}</div>
                    </TableCell>
                    <TableCell>
                      <div>{reservation.date}</div>
                      <div className="text-sm text-muted-foreground">{reservation.time}</div>
                    </TableCell>
                    <TableCell>{reservation.service}</TableCell>
                    <TableCell>
                      <Badge className={reservationStatusConfig[reservation.status].color}>
                        {reservationStatusConfig[reservation.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openReservationDetail(reservation)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            상세 보기
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 최근 문의 목록 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>최근 웹페이지 제작 문의</CardTitle>
            <Button asChild>
              <Link href="/admin/inquiries">모든 문의 보기</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>문의 ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>문의일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <p>문의 정보가 없습니다</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>{inquiry.id}</TableCell>
                    <TableCell>
                      <div>{inquiry.name}</div>
                      <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                    </TableCell>
                    <TableCell>{inquiry.service}</TableCell>
                    <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={inquiryStatusConfig[inquiry.status].color}>
                        {inquiryStatusConfig[inquiry.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/inquiries?id=${inquiry.id}`}>상세 보기</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 예약 상세 정보 다이얼로그 */}
      {selectedReservation && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>예약 ID: {selectedReservation.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">고객명</div>
                <div className="col-span-3">{selectedReservation.customerName}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">연락처</div>
                <div className="col-span-3">{selectedReservation.customerPhone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">이메일</div>
                <div className="col-span-3">{selectedReservation.customerEmail}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">날짜</div>
                <div className="col-span-3">{selectedReservation.date}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">시간</div>
                <div className="col-span-3">{selectedReservation.time}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">서비스</div>
                <div className="col-span-3">{selectedReservation.service}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">상태</div>
                <div className="col-span-3">
                  <Badge className={reservationStatusConfig[selectedReservation.status].color}>
                    {reservationStatusConfig[selectedReservation.status].label}
                  </Badge>
                </div>
              </div>
              {selectedReservation.notes && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-sm font-medium">메모</div>
                  <div className="col-span-3">{selectedReservation.notes}</div>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">예약 생성일</div>
                <div className="col-span-3">{new Date(selectedReservation.createdAt).toLocaleString("ko-KR")}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                닫기
              </Button>
              <Button asChild>
                <Link href="/admin/reservations">예약 관리로 이동</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
