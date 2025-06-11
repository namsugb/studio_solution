"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CUSTOMER_FIELDS = [
    { key: "name", label: "이름" },
    { key: "phone", label: "전화번호" },
    { key: "type", label: "촬영 종류" },
    { key: "date", label: "촬영 희망 날짜" },
    { key: "people", label: "인원수" },
    { key: "etc", label: "기타 요청사항" },
]

export default function NewEventPage() {
    const router = useRouter()
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [fieldsToAsk, setFieldsToAsk] = useState<string[]>(["name", "phone", "type", "date", "people"])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [productInput, setProductInput] = useState("")
    const [productList, setProductList] = useState<string[]>([])
    const [studio, setStudio] = useState({
        name: "",
        location: "",
        contact: "",
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleFieldCheck = (key: string) => {
        setFieldsToAsk((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        )
    }

    const handleProductAdd = () => {
        const value = productInput.trim()
        if (value && !productList.includes(value)) {
            setProductList([...productList, value])
            setProductInput("")
        }
    }

    const handleProductRemove = (item: string) => {
        setProductList(productList.filter((p) => p !== item))
    }

    const handleStudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudio({ ...studio, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // TODO: 실제 제출 로직 구현
        setTimeout(() => {
            alert("이벤트 신청 항목 설정이 완료되었습니다!\n선택된 항목: " + fieldsToAsk.map(k => CUSTOMER_FIELDS.find(f => f.key === k)?.label).join(", "))
            setIsSubmitting(false)
            router.push("/admin/projects/new")
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>이벤트 페이지 생성</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4 p-4 bg-gray-50 rounded border">
                                <div className="font-semibold mb-2">스튜디오 정보</div>
                                <div>
                                    <Label htmlFor="studioName">스튜디오 이름</Label>
                                    <Input id="studioName" name="name" value={studio.name} onChange={handleStudioChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="studioLocation">위치</Label>
                                    <Input id="studioLocation" name="location" value={studio.location} onChange={handleStudioChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="studioContact">연락처</Label>
                                    <Input id="studioContact" name="contact" value={studio.contact} onChange={handleStudioChange} required />
                                </div>
                            </div>
                            <div>
                                <Label>상세페이지 이미지</Label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
                                {imagePreview && (
                                    <img src={imagePreview} alt="미리보기" className="mt-4 rounded border w-full max-w-xs" />
                                )}
                            </div>
                            <div>
                                <Label className="mb-2 block">고객에게 입력받을 항목 선택</Label>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {CUSTOMER_FIELDS.map((field) => (
                                        <label key={field.key} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={fieldsToAsk.includes(field.key)}
                                                onChange={() => handleFieldCheck(field.key)}
                                            />
                                            <span>{field.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {fieldsToAsk.includes("type") && (
                                    <div>
                                        <div className="mb-2 font-medium">촬영 종류(상품명) 목록</div>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                value={productInput}
                                                onChange={e => setProductInput(e.target.value)}
                                                placeholder="예: 가족사진, 돌촬영, 프로필 등"
                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleProductAdd(); } }}
                                            />
                                            <Button type="button" onClick={handleProductAdd} disabled={!productInput.trim()}>추가</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {productList.map((item) => (
                                                <span key={item} className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-sm">
                                                    {item}
                                                    <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleProductRemove(item)}>
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                            {productList.length === 0 && <span className="text-gray-400 text-sm">아직 추가된 상품이 없습니다.</span>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                                {isSubmitting ? "제출 중..." : "이벤트 신청 항목 저장"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 