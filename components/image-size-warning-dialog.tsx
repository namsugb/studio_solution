"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ImageSizeWarningDialogProps {
  open: boolean
  onClose: () => void
  onCompress: () => void
  onUseOriginal: () => void
  isCompressing: boolean
  compressionProgress: number
  imageCount: number
  totalSize: number
}

export function ImageSizeWarningDialog({
  open,
  onClose,
  onCompress,
  onUseOriginal,
  isCompressing,
  compressionProgress,
  imageCount,
  totalSize,
}: ImageSizeWarningDialogProps) {
  // 파일 크기를 읽기 쉬운 형식으로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>큰 이미지 파일 감지됨</DialogTitle>
          <DialogDescription>
            {imageCount}개의 이미지 파일({formatFileSize(totalSize)})이 2MB보다 큽니다. 이미지를 압축하여 업로드 속도를
            향상시키고 저장 공간을 절약할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {isCompressing ? (
          <div className="space-y-4 py-4">
            <p>이미지 압축 중... {compressionProgress}%</p>
            <Progress value={compressionProgress} className="w-full" />
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <p className="text-sm">
              압축을 선택하면 이미지 품질을 유지하면서 파일 크기를 줄입니다. 원본 사용을 선택하면 이미지가 원본 크기로
              업로드됩니다.
            </p>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={onUseOriginal} disabled={isCompressing} className="mb-2 sm:mb-0">
            원본 사용
          </Button>
          <Button onClick={onCompress} disabled={isCompressing}>
            {isCompressing ? "압축 중..." : "이미지 압축"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
