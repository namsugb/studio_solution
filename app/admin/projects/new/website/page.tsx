"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ImageSizeWarningDialog } from "@/components/image-size-warning-dialog"

interface ImageFile {
  id: string
  file: File
  preview: string
  type: "logo" | "slider" | "product" | "gallery"
  imageUrl?: string
  uploading?: boolean
  uploadError?: string
}

interface WebsiteProjectFormData {
  studio_name: string
  description: string
  phone: string
  email: string
  address: string
  business_hours: string
  primary_color: string
  secondary_color: string
  font_preference: string
  gallery_categories: string[]
  product_categories: string[]
  features: string[]
  images: ImageFile[]
  special_requests: string
  budget: string
  deadline: string
}

const initialProjectInfo: WebsiteProjectFormData = {
  studio_name: "",
  description: "",
  phone: "",
  email: "",
  address: "",
  business_hours: "",
  primary_color: "#ffffff",
  secondary_color: "#f5e9da",
  font_preference: "modern",
  gallery_categories: [],
  product_categories: [],
  features: [],
  images: [],
  special_requests: "",
  budget: "",
  deadline: "",
}

const steps = [
  { id: 1, title: "기본 정보", description: "스튜디오 기본 정보를 입력해주세요" },
  { id: 2, title: "연락처 정보", description: "연락처 및 위치 정보를 입력해주세요" },
  { id: 3, title: "브랜딩", description: "색상, 폰트 등 브랜딩 정보를 설정해주세요" },
  { id: 4, title: "이미지 업로드", description: "로고, 슬라이더, 상품소개, 갤러리 이미지를 업로드해주세요" },
  { id: 5, title: "카테고리 설정", description: "갤러리와 상품 카테고리를 설정해주세요" },
  { id: 6, title: "기타 요구사항", description: "" },
  { id: 7, title: "완료", description: "입력한 정보를 확인하고 제출해주세요" },
]

const availableFeatures = [
  "예약 시스템",
  "갤러리 슬라이더",
  "고객 후기",
  "지도 연동",
  "소셜 미디어 피드",
  "블로그 연동",
  "이메일 문의 폼",
  "실시간 채팅",
  "다국어 지원",
  "SEO 최적화",
  "방문자 통계",
  "모바일 앱 연동",
]

const productCategories = [
  "촬영 패키지",
  "스튜디오 대여",
  "사진 편집",
  "영상 제작",
  "앨범 제작",
  "액자 제작",
  "디지털 파일",
  "인화 서비스",
  "보정 서비스",
  "컨설팅 서비스",
]

export default function NewWebsiteProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectInfo, setProjectInfo] = useState<WebsiteProjectFormData>(initialProjectInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDemo, setIsDemo] = useState(!process.env.NEXT_PUBLIC_SUPABASE_URL)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false)
  const [largeImages, setLargeImages] = useState<
    {
      file: File
      type: "logo" | "slider" | "product" | "gallery"
    }[]
  >([])
  const MAX_IMAGE_SIZE_MB = 2

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const [galleryInput, setGalleryInput] = useState("")
  const [productInput, setProductInput] = useState("")

  const addGalleryCategory = (category: string) => {
    const trimmedCategory = category.trim()
    if (trimmedCategory && !projectInfo.gallery_categories.includes(trimmedCategory)) {
      setProjectInfo((prev) => ({
        ...prev,
        gallery_categories: [...prev.gallery_categories, trimmedCategory],
      }))
    }
  }

  const removeGalleryCategory = (categoryToRemove: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      gallery_categories: prev.gallery_categories.filter((cat) => cat !== categoryToRemove),
    }))
  }

  const addProductCategory = (category: string) => {
    const trimmedCategory = category.trim()
    if (trimmedCategory && !projectInfo.product_categories.includes(trimmedCategory)) {
      setProjectInfo((prev) => ({
        ...prev,
        product_categories: [...prev.product_categories, trimmedCategory],
      }))
    }
  }

  const removeProductCategory = (categoryToRemove: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      product_categories: prev.product_categories.filter((cat) => cat !== categoryToRemove),
    }))
  }

  const handleGalleryInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addGalleryCategory(galleryInput)
      setGalleryInput("")
    }
  }

  const handleProductInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addProductCategory(productInput)
      setProductInput("")
    }
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "slider" | "product" | "gallery",
  ) => {
    const files = event.target.files
    if (!files) return

    const normalSizeImages: File[] = []
    const oversizedImages: { file: File; type: "logo" | "slider" | "product" | "gallery" }[] = []

    // 파일들을 크기에 따라 분류
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const fileSizeInMB = file.size / (1024 * 1024)
        if (fileSizeInMB > MAX_IMAGE_SIZE_MB) {
          oversizedImages.push({ file, type })
        } else {
          normalSizeImages.push(file)
        }
      }
    })

    // 정상 크기 이미지들 즉시 추가
    normalSizeImages.forEach((file) => {
      addImageToProject(file, type)
    })

    // 큰 이미지들이 있으면 다이얼로그 표시
    if (oversizedImages.length > 0) {
      setLargeImages(oversizedImages)
      setIsWarningDialogOpen(true)
    }

    // 파일 입력 초기화
    event.target.value = ""
  }

  const addImageToProject = (file: File, type: "logo" | "slider" | "product" | "gallery") => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newImage: ImageFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: e.target?.result as string,
        type,
      }
      setProjectInfo((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleConfirmLargeImages = (
    processedFiles: { file: File; type: "logo" | "slider" | "product" | "gallery" }[],
  ) => {
    // 처리된 모든 파일들을 프로젝트에 추가
    processedFiles.forEach(({ file, type }) => {
      addImageToProject(file, type)
    })

    setIsWarningDialogOpen(false)
    setLargeImages([])
  }

  const handleCancelLargeImages = () => {
    setIsWarningDialogOpen(false)
    setLargeImages([])
  }

  const uploadImageToServer = async (image: ImageFile, projectId: string) => {
    try {
      const formData = new FormData()
      formData.append("file", image.file)
      formData.append("projectId", projectId)
      formData.append("imageType", image.type)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error)
      }

      return result.data
    } catch (error: any) {
      console.error("이미지 업로드 실패:", error)
      throw error
    }
  }

  const uploadImages = async (projectId: string) => {
    if (projectInfo.images.length === 0) return []

    const totalImages = projectInfo.images.length
    let uploadedCount = 0
    let failedCount = 0

    setProjectInfo((prev) => ({
      ...prev,
      images: prev.images.map((img) => ({
        ...img,
        uploading: true,
        uploadError: undefined,
      })),
    }))

    const uploadPromises = projectInfo.images.map(async (image, index) => {
      try {
        const uploadedImage = await uploadImageToServer(image, projectId)

        uploadedCount++
        setUploadProgress(Math.round((uploadedCount / totalImages) * 100))

        setProjectInfo((prev) => ({
          ...prev,
          images: prev.images.map((img) =>
            img.id === image.id ? { ...img, imageUrl: uploadedImage.publicUrl, uploading: false } : img,
          ),
        }))

        return {
          project_id: projectId,
          image_url: uploadedImage.publicUrl,
          image_type: image.type,
          file_name: uploadedImage.fileName,
          file_size: image.file.size,
          mime_type: image.file.type,
          sort_order: index,
        }
      } catch (error: any) {
        console.error(`이미지 업로드 실패 (${image.file.name}):`, error)
        failedCount++

        setProjectInfo((prev) => ({
          ...prev,
          images: prev.images.map((img) =>
            img.id === image.id ? { ...img, uploading: false, uploadError: error.message || "업로드 실패" } : img,
          ),
        }))

        return null
      }
    })

    try {
      const results = await Promise.all(uploadPromises)

      if (failedCount > 0) {
        alert(`${totalImages}개 중 ${failedCount}개 이미지 업로드에 실패했습니다. 계속 진행하시겠습니까?`)
      }

      return results.filter(Boolean)
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error)
      return []
    }
  }

  const submitProject = async () => {
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      const projectData = {
        studio_name: projectInfo.studio_name,
        description: projectInfo.description,
        phone: projectInfo.phone,
        email: projectInfo.email,
        address: projectInfo.address || null,
        business_hours: projectInfo.business_hours || null,
        primary_color: projectInfo.primary_color,
        secondary_color: projectInfo.secondary_color,
        font_preference: projectInfo.font_preference,
        features: projectInfo.features,
        gallery_categories: projectInfo.gallery_categories,
        product_categories: projectInfo.product_categories,
        special_requests: projectInfo.special_requests || null,
        budget: projectInfo.budget || null,
        deadline: projectInfo.deadline || null,
        status: "planning" as const,
      }

      if (isDemo) {
        console.log("데모 모드: 웹사이트 프로젝트 생성 데이터", projectData)
        alert("데모 모드: 메인 홈페이지 프로젝트가 성공적으로 생성되었습니다! (실제 데이터베이스에 저장되지 않음)")
        router.push("/admin/projects/new")
        return
      }

      const { createWebsiteProject, createProjectImages } = await import("@/app/actions/project-actions")
      const result = await createWebsiteProject(projectData)

      if (!result.success) {
        throw new Error(result.error)
      }

      const projectId = result.data?.[0]?.id
      if (!projectId) throw new Error("프로젝트 ID를 가져올 수 없습니다.")

      if (projectInfo.images.length > 0) {
        try {
          const imageData = await uploadImages(projectId)

          if (imageData.length > 0) {
            const imageResult = await createProjectImages(imageData)

            if (!imageResult.success) {
              console.error("이미지 저장 실패:", imageResult.error)
            }
          }
        } catch (uploadError) {
          console.error("이미지 업로드 중 오류:", uploadError)
          alert("일부 이미지 업로드에 실패했습니다. 프로젝트는 생성되었습니다.")
        }
      }

      alert("메인 홈페이지 프로젝트가 성공적으로 생성되었습니다!")
      router.push("/admin/projects")
    } catch (error: any) {
      console.error("프로젝트 생성 실패:", error)
      alert(`프로젝트 생성에 실패했습니다: ${error.message || "알 수 없는 오류"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeImage = (imageId: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  const toggleFeature = (feature: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="studioName">스튜디오 이름 *</Label>
              <Input
                id="studioName"
                value={projectInfo.studio_name}
                onChange={(e) => setProjectInfo({ ...projectInfo, studio_name: e.target.value })}
                placeholder="예: 아름다운 스튜디오"
              />
            </div>
            <div>
              <Label htmlFor="description">스튜디오 소개 *</Label>
              <Textarea
                id="description"
                value={projectInfo.description}
                onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                placeholder="스튜디오와 작가에 대한 소개를 작성해주세요"
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">전화번호 *</Label>
                <Input
                  id="phone"
                  value={projectInfo.phone}
                  onChange={(e) => setProjectInfo({ ...projectInfo, phone: e.target.value })}
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={projectInfo.email}
                  onChange={(e) => setProjectInfo({ ...projectInfo, email: e.target.value })}
                  placeholder="studio@example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                value={projectInfo.address}
                onChange={(e) => setProjectInfo({ ...projectInfo, address: e.target.value })}
                placeholder="서울시 강남구 테헤란로 123"
              />
            </div>
            <div>
              <Label htmlFor="businessHours">영업시간</Label>
              <Textarea
                id="businessHours"
                value={projectInfo.business_hours}
                onChange={(e) => setProjectInfo({ ...projectInfo, business_hours: e.target.value })}
                placeholder="월-금: 09:00-18:00\n토: 09:00-15:00\n일: 휴무"
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">배경 컬러</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={projectInfo.primary_color}
                    onChange={(e) => setProjectInfo({ ...projectInfo, primary_color: e.target.value })}
                    className="h-10 w-20 rounded border"
                  />
                  <Input
                    value={projectInfo.primary_color}
                    onChange={(e) => setProjectInfo({ ...projectInfo, primary_color: e.target.value })}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">포인트 컬러</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={projectInfo.secondary_color}
                    onChange={(e) => setProjectInfo({ ...projectInfo, secondary_color: e.target.value })}
                    className="h-10 w-20 rounded border"
                  />
                  <Input
                    value={projectInfo.secondary_color}
                    onChange={(e) => setProjectInfo({ ...projectInfo, secondary_color: e.target.value })}
                    placeholder="#f5e9da"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="fontPreference">폰트 스타일</Label>
              <Select
                value={projectInfo.font_preference}
                onValueChange={(value) => setProjectInfo({ ...projectInfo, font_preference: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="폰트 스타일 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">모던 (깔끔한 산세리프)</SelectItem>
                  <SelectItem value="elegant">우아한 (세리프)</SelectItem>
                  <SelectItem value="casual">캐주얼 (둥근 산세리프)</SelectItem>
                  <SelectItem value="classic">클래식 (전통적인 세리프)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <Label>로고 이미지</Label>
              <p className="text-sm text-gray-500 mb-4">
                스튜디오 로고를 업로드해주세요 (권장: 정사각형 또는 가로형, PNG/JPG, 투명 배경 권장)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "logo")}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectInfo.images
                  .filter((img) => img.type === "logo")
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt="로고 미리보기"
                        className="w-full h-24 object-contain bg-gray-50 rounded-lg border p-2"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {image.uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <Upload className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      )}
                      {image.uploadError && (
                        <div className="absolute bottom-0 inset-x-0 bg-red-500 text-white text-xs p-1 text-center">
                          업로드 실패
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <Label>슬라이더 이미지</Label>
              <p className="text-sm text-gray-500 mb-4">
                홈페이지 메인 슬라이더에 사용할 대표 이미지들을 업로드해주세요 (권장: 가로 16:9 비율, 고해상도)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "slider")}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectInfo.images
                  .filter((img) => img.type === "slider")
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt="슬라이더 이미지 미리보기"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        슬라이더 {projectInfo.images.filter((img) => img.type === "slider").indexOf(image) + 1}
                      </div>
                      {image.uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <Upload className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      )}
                      {image.uploadError && (
                        <div className="absolute bottom-0 inset-x-0 bg-red-500 text-white text-xs p-1 text-center">
                          업로드 실패
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <Label>상품소개 이미지</Label>
              <p className="text-sm text-gray-500 mb-4">
                서비스나 상품을 소개하는 섹션에 사용할 이미지들을 업로드해주세요 (예: 촬영 패키지, 스튜디오 시설 등)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "product")}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {projectInfo.images
                  .filter((img) => img.type === "product")
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt="상품소개 이미지 미리보기"
                        className="w-full h-28 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        상품 {projectInfo.images.filter((img) => img.type === "product").indexOf(image) + 1}
                      </div>
                      {image.uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <Upload className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      )}
                      {image.uploadError && (
                        <div className="absolute bottom-0 inset-x-0 bg-red-500 text-white text-xs p-1 text-center">
                          업로드 실패
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <Label>갤러리 이미지</Label>
              <p className="text-sm text-gray-500 mb-4">
                포트폴리오 갤러리에 표시할 작품 이미지들을 업로드해주세요 (스튜디오의 대표 작품들)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "gallery")}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectInfo.images
                  .filter((img) => img.type === "gallery")
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt="갤러리 이미지 미리보기"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        작품 {projectInfo.images.filter((img) => img.type === "gallery").indexOf(image) + 1}
                      </div>
                      {image.uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <Upload className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      )}
                      {image.uploadError && (
                        <div className="absolute bottom-0 inset-x-0 bg-red-500 text-white text-xs p-1 text-center">
                          업로드 실패
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">업로드된 이미지 요약</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-rose-600">
                    {projectInfo.images.filter((img) => img.type === "logo").length}개
                  </div>
                  <div className="text-gray-600">로고</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-600">
                    {projectInfo.images.filter((img) => img.type === "slider").length}개
                  </div>
                  <div className="text-gray-600">슬라이더</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-green-600">
                    {projectInfo.images.filter((img) => img.type === "product").length}개
                  </div>
                  <div className="text-gray-600">상품소개</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-purple-600">
                    {projectInfo.images.filter((img) => img.type === "gallery").length}개
                  </div>
                  <div className="text-gray-600">갤러리</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="galleryInput">갤러리 카테고리</Label>
              <p className="text-sm text-gray-500 mb-4">
                갤러리에서 사용할 카테고리를 입력해주세요. 엔터키로 카테고리를 추가할 수 있습니다.
              </p>
              <p className="text-xs text-gray-400 mb-2">
                예시: 가족사진, 리마인드, 증명사진, 프로필사진
              </p>
              <Input
                id="galleryInput"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                onKeyDown={handleGalleryInputKeyDown}
                placeholder="갤러리 카테고리를 입력하고 엔터키를 누르세요"
                className="mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {projectInfo.gallery_categories.map((category, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{category}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-blue-200"
                      onClick={() => removeGalleryCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="productInput">상품 정보</Label>
              <p className="text-sm text-gray-500 mb-4">
                제공하는 상품/서비스 정보를 입력해주세요. 엔터키로 카테고리를 추가할 수 있습니다.
              </p>
              <p className="text-xs text-gray-400 mb-2">
                예시: 소가족/99,000원/28cm x 36cm 액자 1개, ...
              </p>
              <Input
                id="productInput"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                onKeyDown={handleProductInputKeyDown}
                placeholder="상품 카테고리를 입력하고 엔터키를 누르세요"
                className="mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {projectInfo.product_categories.map((category, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{category}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-green-200"
                      onClick={() => removeProductCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            {/* <div>
              <Label>필요한 기능</Label>
              <p className="text-sm text-gray-500 mb-4">웹사이트에 포함하고 싶은 기능들을 선택해주세요</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={projectInfo.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">예산 범위</Label>
                <Select
                  value={projectInfo.budget}
                  onValueChange={(value) => setProjectInfo({ ...projectInfo, budget: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="예산 범위 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">100만원 미만</SelectItem>
                    <SelectItem value="1m-1.5m">100만원 - 150만원</SelectItem>
                    <SelectItem value="1.5m-2m">150만원 - 200만원</SelectItem>
                    <SelectItem value="over-2m">200만원 이상</SelectItem>
                    <SelectItem value="negotiable">협의 가능</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">희망 완료일</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={projectInfo.deadline}
                  onChange={(e) => setProjectInfo({ ...projectInfo, deadline: e.target.value })}
                />
              </div>
            </div> */}

            <div>
              <Label htmlFor="specialRequests">특별 요청사항</Label>
              <Textarea
                id="specialRequests"
                value={projectInfo.special_requests}
                onChange={(e) => setProjectInfo({ ...projectInfo, special_requests: e.target.value })}
                placeholder="추가로 요청하고 싶은 사항이나 특별한 요구사항이 있다면 자세히 작성해주세요"
                rows={4}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">정보 입력이 완료되었습니다!</h3>
              <p className="text-gray-600">입력하신 정보를 검토한 후 제출해주세요.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>입력 정보 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <strong>스튜디오 이름:</strong> {projectInfo.studio_name}
                </div>
                <div>
                  <strong>프로젝트 타입:</strong> 메인 홈페이지
                </div>
                <div>
                  <strong>연락처:</strong> {projectInfo.phone} / {projectInfo.email}
                </div>
                <div>
                  <strong>업로드된 이미지:</strong>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>로고: {projectInfo.images.filter((img) => img.type === "logo").length}개</div>
                    <div>슬라이더: {projectInfo.images.filter((img) => img.type === "slider").length}개</div>
                    <div>상품소개: {projectInfo.images.filter((img) => img.type === "product").length}개</div>
                    <div>갤러리: {projectInfo.images.filter((img) => img.type === "gallery").length}개</div>
                  </div>
                </div>
                <div>
                  <strong>갤러리 카테고리:</strong> {projectInfo.gallery_categories.length}개 선택
                </div>
                <div>
                  <strong>상품 카테고리:</strong> {projectInfo.product_categories.length}개 선택
                </div>
                <div>
                  <strong>예산:</strong> {projectInfo.budget || "미선택"}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={submitProject} disabled={isSubmitting} size="lg">
                {isSubmitting ? "제출 중..." : "프로젝트 생성"}
              </Button>

              {isSubmitting && uploadProgress > 0 && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">이미지 업로드 중... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {largeImages.length > 0 && (
        <ImageSizeWarningDialog
          open={isWarningDialogOpen}
          onClose={handleCancelLargeImages}
          onCompress={() => handleConfirmLargeImages(largeImages)}
          onUseOriginal={handleCancelLargeImages}
          isCompressing={false}
          compressionProgress={0}
          imageCount={largeImages.length}
          totalSize={largeImages.reduce((sum, img) => sum + img.file.size, 0)}
        />
      )}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">새 메인 홈페이지 프로젝트 생성</h1>
              <Button variant="outline" asChild>
                <Link href="/admin/projects/new">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  프로젝트 유형 선택
                </Link>
              </Button>
            </div>
            {isDemo && (
              <div className="mb-4 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-md inline-flex items-center">
                데모 모드: 실제 데이터베이스에 저장되지 않습니다
              </div>
            )}
            <Progress value={progress} className="mb-4" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {currentStep} / {steps.length} 단계
              </span>
              <span>{Math.round(progress)}% 완료</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              이전
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={nextStep}>
                다음
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
