"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitInquiry } from "@/app/actions/submit-inquiry"

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Mock success for demo
        console.log("Demo mode: Inquiry would be submitted with data:", {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        })
        setMessage({
          type: "success",
          text: "데모 모드: 문의가 성공적으로 접수되었습니다! (실제 데이터베이스에는 저장되지 않음)",
        })
        // Reset form
        const form = document.getElementById("inquiry-form") as HTMLFormElement
        form?.reset()
        return
      }

      const result = await submitInquiry(formData)

      if (result.success) {
        setMessage({ type: "success", text: "문의가 성공적으로 접수되었습니다!" })
        // Reset form
        const form = document.getElementById("inquiry-form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({ type: "error", text: result.error || "문의 접수 중 오류가 발생했습니다." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "문의 접수 중 오류가 발생했습니다." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>문의하기</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="inquiry-form" action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">이메일 *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">전화번호</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div>
            <Label htmlFor="service">서비스 *</Label>
            <Select name="service" required>
              <SelectTrigger>
                <SelectValue placeholder="서비스를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="허브 페이지">허브 페이지</SelectItem>
                <SelectItem value="스튜디오 예약">스튜디오 예약</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">메시지 *</Label>
            <Textarea id="message" name="message" placeholder="문의 내용을 입력해주세요" required />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "접수 중..." : "문의 접수"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
