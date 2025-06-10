"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitInquiry } from "@/app/actions/submit-inquiry"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      // 서비스 배열을 formData에 추가
      formData.set("service", selectedServices.join(", "))

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
        setOpen(true)
        // Reset form
        const form = document.getElementById("inquiry-form") as HTMLFormElement
        form?.reset()
        setSelectedServices([])
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "허브 페이지",
                "메인 홈페이지",
                "관리자 페이지",
                "이벤트 페이지",
                "기타",
              ].map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={(checked) => {
                      setSelectedServices((prev) =>
                        checked
                          ? [...prev, service]
                          : prev.filter((s) => s !== service)
                      )
                    }}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
            {selectedServices.length === 0 && (
              <div className="text-sm text-red-500 mt-1">한 가지 이상 선택해주세요.</div>
            )}
          </div>

          <div>
            <Label htmlFor="message">메시지 *</Label>
            <Textarea id="message" name="message" placeholder="문의 내용을 입력해주세요" required />
          </div>

          {message && message.type === "error" && (
            <div
              className={`p-3 rounded-md bg-red-50 text-red-700 border border-red-200`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "접수 중..." : "문의 접수"}
          </Button>
        </form>

        {/* 성공 모달 */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>문의 완료</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center text-lg">문의가 성공적으로 접수되었습니다!</div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)} className="w-full">닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
