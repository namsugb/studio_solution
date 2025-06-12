"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Download, Search, X, Trash2 } from "lucide-react"
import { format } from "date-fns"
import "./manage-client-modal.css"

// Reservation 타입의 status 필드 타입 변경
type Reservation = {
    id: number
    name: string
    phone: string
    email: string | null
    date: string
    time: string
    shooting_type: string
    people: number
    message: string | null
    created_at: string
    status?: "신규문의" | "상담중" | "예약확정" | "촬영완료" | "보류"
    memo?: string
}

// 더미 데이터 생성
const dummyReservations: Reservation[] = [
    {
        id: 1,
        name: "홍길동",
        phone: "010-1234-5678",
        email: "hong@test.com",
        date: "2024-07-01",
        time: "14:00",
        shooting_type: "가족사진",
        people: 4,
        message: "가족 모두 밝은 분위기로 부탁드려요.",
        created_at: new Date().toISOString(),
        status: "신규문의",
        memo: "첫 방문 고객"
    },
    {
        id: 2,
        name: "김영희",
        phone: "010-2222-3333",
        email: "kim@test.com",
        date: "2024-07-03",
        time: "11:00",
        shooting_type: "프로필",
        people: 1,
        message: "증명사진도 함께 촬영 원함.",
        created_at: new Date().toISOString(),
        status: "예약확정",
        memo: "이메일로 결과 전달"
    },
    {
        id: 3,
        name: "이철수",
        phone: "010-4444-5555",
        email: null,
        date: "2024-07-05",
        time: "16:00",
        shooting_type: "웨딩/리마인드",
        people: 2,
        message: null,
        created_at: new Date().toISOString(),
        status: "상담중",
        memo: "전화 상담 예정"
    },
    {
        id: 4,
        name: "박민수",
        phone: "010-6666-7777",
        email: "minsu@test.com",
        date: "2024-07-10",
        time: "10:00",
        shooting_type: "칠순/팔순",
        people: 8,
        message: "어르신이 휠체어 사용",
        created_at: new Date().toISOString(),
        status: "보류",
        memo: "날짜 조율 필요"
    },
    {
        id: 5,
        name: "최수정",
        phone: "010-8888-9999",
        email: null,
        date: "2024-07-12",
        time: "13:00",
        shooting_type: "촬영완료",
        people: 3,
        message: "가족사진 액자 추가",
        created_at: new Date().toISOString(),
        status: "촬영완료",
        memo: "후기 요청 예정"
    },
]

export default function DemoManageClientPage() {
    const [reservations, setReservations] = useState<Reservation[]>(dummyReservations)
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(dummyReservations)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("all")
    const [hasStatusColumn] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [editReservation, setEditReservation] = useState<Reservation | null>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [addForm, setAddForm] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
        shootingType: "family",
        people: "",
        message: "",
        memo: "",
    })
    const [addError, setAddError] = useState("")

    // 상세 모달 열릴 때 선택된 예약 정보 복사
    useEffect(() => {
        if (isModalOpen && selectedReservation) {
            setEditReservation({ ...selectedReservation })
        }
    }, [isModalOpen, selectedReservation])

    // 필터링 함수 (검색어, 상태, 날짜 범위 모두 적용)
    useEffect(() => {
        let filtered = [...reservations]
        if (hasStatusColumn && activeTab !== "all") {
            filtered = filtered.filter((reservation) => reservation.status === activeTab)
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(
                (reservation) =>
                    reservation.name.toLowerCase().includes(term) ||
                    reservation.phone.toLowerCase().includes(term) ||
                    (reservation.email && reservation.email.toLowerCase().includes(term)) ||
                    reservation.shooting_type.toLowerCase().includes(term) ||
                    (reservation.message && reservation.message.toLowerCase().includes(term)),
            )
        }
        setFilteredReservations(filtered)
    }, [activeTab, reservations, hasStatusColumn, searchTerm])

    // 통계 계산
    const getStats = () => {
        const total = reservations.length
        const 신규문의 = reservations.filter((r) => r.status === "신규문의").length
        const 상담중 = reservations.filter((r) => r.status === "상담중").length
        const 예약확정 = reservations.filter((r) => r.status === "예약확정").length
        const 촬영완료 = reservations.filter((r) => r.status === "촬영완료").length
        const 보류 = reservations.filter((r) => r.status === "보류").length
        return { total, 신규문의, 상담중, 예약확정, 촬영완료, 보류 }
    }

    // 로그인 처리 (더미)
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "demo1234") {
            setIsAuthenticated(true)
            setLoginError("")
        } else {
            setLoginError("비밀번호가 올바르지 않습니다.")
        }
    }

    // 로그아웃 처리
    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    // 예약 추가 핸들러 (더미)
    function handleAddReservation(e: React.FormEvent) {
        e.preventDefault()
        setAddError("")
        if (!addForm.name || !addForm.phone || !addForm.date || !addForm.time || !addForm.shootingType || !addForm.people) {
            setAddError("필수 항목을 모두 입력하세요.")
            return
        }
        const newId = Math.max(...reservations.map(r => r.id)) + 1
        const newReservation: Reservation = {
            id: newId,
            name: addForm.name,
            phone: addForm.phone,
            email: null,
            date: addForm.date,
            time: addForm.time,
            shooting_type: addForm.shootingType,
            people: Number(addForm.people),
            message: addForm.message,
            created_at: new Date().toISOString(),
            status: "예약확정",
            memo: addForm.memo,
        }
        setReservations(prev => [...prev, newReservation])
        setFilteredReservations(prev => [...prev, newReservation])
        setIsAddModalOpen(false)
        setAddForm({ name: "", phone: "", date: "", time: "", shootingType: "family", people: "", message: "", memo: "" })
    }

    // 예약 정보 저장 함수 (더미)
    function handleSaveEdit() {
        if (!editReservation) return
        setReservations(prev => prev.map(r => (r.id === editReservation.id ? { ...editReservation } : r)))
        setFilteredReservations(prev => prev.map(r => (r.id === editReservation.id ? { ...editReservation } : r)))
        setSelectedReservation({ ...editReservation })
        setIsModalOpen(false)
    }

    // 예약 삭제 함수 (더미)
    function handleDeleteReservation(id: number) {
        if (!window.confirm("정말로 이 예약을 삭제하시겠습니까?")) return
        setReservations(prev => prev.filter(r => r.id !== id))
        setFilteredReservations(prev => prev.filter(r => r.id !== id))
    }

    // CSV 내보내기 함수 (더미)
    const exportToCSV = () => {
        const headers = [
            "ID",
            "이름",
            "연락처",
            "이메일",
            "날짜",
            "시간",
            "촬영 유형",
            "인원",
            "메시지",
            "생성일",
            "상태",
        ]
        const csvData = filteredReservations.map((reservation) => [
            reservation.id,
            reservation.name,
            reservation.phone,
            reservation.email || "",
            reservation.date,
            reservation.time,
            reservation.shooting_type,
            reservation.people,
            reservation.message || "",
            reservation.created_at,
            reservation.status || "",
        ])
        const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n")
        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `예약_목록_${format(new Date(), "yyyy-MM-dd")}_demo.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const stats = getStats()

    // 상태에 따른 배지 색상
    function getStatusBadge(status: string) {
        switch (status) {
            case "예약확정":
                return <Badge className="bg-green-500">예약확정</Badge>
            case "신규문의":
                return <Badge className="bg-yellow-500">신규문의</Badge>
            case "상담중":
                return <Badge className="bg-blue-300">상담중</Badge>
            case "촬영완료":
                return <Badge className="bg-blue-500">촬영완료</Badge>
            case "보류":
                return <Badge className="bg-gray-400">보류</Badge>
            default:
                return <Badge className="bg-gray-500">{status}</Badge>
        }
    }

    // 로딩 중 표시
    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )

    // 오류 표시
    if (error && isAuthenticated)
        return (
            <div className="container mx-auto p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">오류:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        )

    // 로그인 화면
    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">관리자 데모 로그인</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="demo1234"
                                className="w-full"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                        <Button type="submit" className="w-full">
                            로그인
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-32 mx-auto p-4 md:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold mb-2 sm:mb-0">예약 관리 데모 시스템</h1>
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
                        예약 추가
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                        로그아웃
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">전체 예약</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">신규문의</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.신규문의}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">상담중</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">{stats.상담중}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">예약확정</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.예약확정}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">촬영완료</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{stats.촬영완료}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">보류</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-500">{stats.보류}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="mb-6 space-y-4">
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList className="flex w-full overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide">
                        <TabsTrigger value="all">전체 ({stats.total})</TabsTrigger>
                        <TabsTrigger value="신규문의">신규문의 ({stats.신규문의})</TabsTrigger>
                        <TabsTrigger value="상담중">상담중 ({stats.상담중})</TabsTrigger>
                        <TabsTrigger value="예약확정">예약확정 ({stats.예약확정})</TabsTrigger>
                        <TabsTrigger value="촬영완료">촬영완료 ({stats.촬영완료})</TabsTrigger>
                        <TabsTrigger value="보류">보류 ({stats.보류})</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="이름, 전화번호, 이메일 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
                        <Download size={16} />
                        CSV 내보내기
                    </Button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">촬영 유형</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">삭제</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                                        {searchTerm ? "검색 결과가 없습니다." : "예약 데이터가 없습니다."}
                                    </td>
                                </tr>
                            ) : (
                                filteredReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
                                        className="hover:bg-gray-50 cursor-pointer group"
                                        onClick={() => {
                                            setSelectedReservation(reservation)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.shooting_type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {reservation.status && getStatusBadge(reservation.status)}
                                        </td>
                                        <td className="px-3 py-4 text-right">
                                            <button
                                                className="text-red-500 hover:text-white hover:bg-red-500 rounded-full p-2 transition group-hover:scale-110"
                                                title="예약 삭제"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleDeleteReservation(reservation.id);
                                                }}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                총 {filteredReservations.length}개의 예약이 표시됨 (전체 {reservations.length}개 중)
            </div>
            {/* 예약 상세 모달 */}
            {selectedReservation && editReservation && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent
                        className="custom-dialog-content w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl"
                    >
                        <DialogHeader>
                            <DialogTitle>예약 상세 정보</DialogTitle>
                            <DialogDescription>예약 ID: {editReservation.id}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">이름:</span>
                                <input
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.name}
                                    onChange={e => setEditReservation({ ...editReservation, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">연락처:</span>
                                <input
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.phone}
                                    onChange={e => setEditReservation({ ...editReservation, phone: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">날짜:</span>
                                <input
                                    type="date"
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.date}
                                    onChange={e => setEditReservation({ ...editReservation, date: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">시간:</span>
                                <input
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.time}
                                    onChange={e => setEditReservation({ ...editReservation, time: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">촬영 유형:</span>
                                <input
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.shooting_type}
                                    onChange={e => setEditReservation({ ...editReservation, shooting_type: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">인원:</span>
                                <input
                                    type="number"
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.people}
                                    onChange={e => setEditReservation({ ...editReservation, people: Number(e.target.value) })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">메시지:</span>
                                <input
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.message || ""}
                                    onChange={e => setEditReservation({ ...editReservation, message: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">관리자 메모:</span>
                                <textarea
                                    className="col-span-3 border rounded px-2 py-1 min-h-[60px] resize-y"
                                    value={editReservation.memo || ""}
                                    onChange={e => setEditReservation({ ...editReservation, memo: e.target.value })}
                                    placeholder="관리자만 볼 수 있는 메모를 입력하세요"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">상태:</span>
                                <select
                                    className="col-span-3 border rounded px-2 py-1"
                                    value={editReservation.status}
                                    onChange={e => setEditReservation({ ...editReservation, status: e.target.value as any })}
                                >
                                    <option value="신규문의">신규문의</option>
                                    <option value="상담중">상담중</option>
                                    <option value="예약확정">예약확정</option>
                                    <option value="촬영완료">촬영완료</option>
                                    <option value="보류">보류</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">예약 생성일:</span>
                                <span className="col-span-3">{new Date(editReservation.created_at).toLocaleString("ko-KR")}</span>
                            </div>
                        </div>
                        <DialogFooter className="flex flex-row justify-between gap-2">
                            <Button onClick={handleSaveEdit} variant="default" className="w-1/2">저장</Button>
                            <Button onClick={() => setIsModalOpen(false)} className="w-1/2">닫기</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
            {/* 예약 추가 모달 */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>예약 추가</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddReservation} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">이름 *</label>
                            <input className="w-full border rounded px-2 py-1" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">연락처 *</label>
                            <input className="w-full border rounded px-2 py-1" value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">날짜 *</label>
                            <input type="date" className="w-full border rounded px-2 py-1" value={addForm.date} onChange={e => setAddForm(f => ({ ...f, date: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">시간 *</label>
                            <input className="w-full border rounded px-2 py-1" value={addForm.time} onChange={e => setAddForm(f => ({ ...f, time: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">촬영 유형 *</label>
                            <select className="w-full border rounded px-2 py-1" value={addForm.shootingType} onChange={e => setAddForm(f => ({ ...f, shootingType: e.target.value }))}>
                                <option value="family">가족사진</option>
                                <option value="wedding">웨딩/리마인드</option>
                                <option value="celebration">칠순/팔순</option>
                                <option value="profile">프로필/증명</option>
                                <option value="pet">반려동물</option>
                                <option value="event">행사스냅</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">인원 *</label>
                            <input type="number" className="w-full border rounded px-2 py-1" value={addForm.people} onChange={e => setAddForm(f => ({ ...f, people: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">요청사항/메모</label>
                            <textarea className="w-full border rounded px-2 py-1" value={addForm.message} onChange={e => setAddForm(f => ({ ...f, message: e.target.value }))} />
                        </div>
                        {addError && <div className="text-red-500 text-sm">{addError}</div>}
                        <DialogFooter>
                            <Button type="submit">저장</Button>
                            <Button type="button" onClick={() => setIsAddModalOpen(false)}>취소</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
} 