"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { uploadHubFileToSupabase } from "@/lib/hub-image-upload"
import { compressImage, checkImageSize } from "@/utils/image-compressor"
import { ImageSizeWarningDialog } from "@/components/image-size-warning-dialog"
import { LinkRequiredDialog } from "@/components/link-required-dialog"
import { RequiredFieldDialog } from "@/components/link-required-dialog"

// 링크 정보 타입
interface LinkInfo {
  id: string
  name: string
  url: string
  icon?: string
  category: "header" | "floating" | "main"
}

// 이미지 파일 타입
interface ImageFile {
  id: string
  file: File
  preview: string
  type: "logo" | "slider"
  imageUrl?: string
  uploading?: boolean
  uploadError?: string
}

// 프로젝트 정보 타입 (허브 페이지용)
interface HubProjectFormData {
  studio_name: string
  description: string
  phone: string
  email: string
  address: string
  primary_color: string
  secondary_color: string
  font_preference: string
  links: LinkInfo[]
  images: ImageFile[]
  special_requests: string
}

const initialProjectInfo: HubProjectFormData = {
  studio_name: "",
  description: "",
  phone: "",
  email: "",
  address: "",
  primary_color: "#f43f5e",
  secondary_color: "#64748b",
  font_preference: "modern",
  links: [],
  images: [],
  special_requests: "",
}

const steps = [
  { id: 1, title: "기본 정보", description: "스튜디오 기본 정보를 입력해주세요" },
  { id: 2, title: "연락처 정보", description: "연락처 및 위치 정보를 입력해주세요" },
  { id: 3, title: "브랜딩", description: "색상, 폰트 등 브랜딩 정보를 설정해주세요" },
  { id: 4, title: "이미지 업로드", description: "로고, 슬라이더 이미지 등을 업로드해주세요" },
  { id: 5, title: "링크 설정", description: "허브 페이지에 포함할 링크들을 추가해주세요" },
  { id: 6, title: "추가 요청사항", description: "추가 요청사항을 입력해주세요" },
  { id: 7, title: "완료", description: "입력한 정보를 확인하고 제출해주세요" },
]

export default function NewHubProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectInfo, setProjectInfo] = useState<HubProjectFormData>(initialProjectInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasEnvVars, setHasEnvVars] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [showRequiredField, setShowRequiredField] = useState(false)
  const [requiredFieldMessage, setRequiredFieldMessage] = useState({ title: "", description: "" })

  // 이미지 압축 관련 상태
  const [largeImages, setLargeImages] = useState<ImageFile[]>([])
  const [showSizeWarning, setShowSizeWarning] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 환경 변수 확인
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("환경 변수 확인:")
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "설정됨" : "없음")
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "설정됨" : "없음")

    const hasVars = Boolean(supabaseUrl && supabaseAnonKey)
    setHasEnvVars(hasVars)
    setIsDemo(!hasVars)
  }, [])

  const progress = (currentStep / steps.length) * 100

  // 다음 단계로 이동
  const nextStep = () => {
    // 각 단계별 필수 입력값 체크
    switch (currentStep) {
      case 1: // 기본 정보
        if (!projectInfo.studio_name.trim() || !projectInfo.description.trim()) {
          setRequiredFieldMessage({
            title: "기본 정보 입력 필요",
            description: "스튜디오 이름과 소개를 모두 입력해주세요."
          })
          setShowRequiredField(true)
          return
        }
        break

      case 2: // 연락처 정보
        if (!projectInfo.phone.trim() || !projectInfo.email.trim()) {
          setRequiredFieldMessage({
            title: "연락처 정보 입력 필요",
            description: "전화번호와 이메일을 모두 입력해주세요."
          })
          setShowRequiredField(true)
          return
        }
        break

      case 3: // 브랜딩
        if (!projectInfo.primary_color || !projectInfo.secondary_color || !projectInfo.font_preference) {
          setRequiredFieldMessage({
            title: "브랜딩 정보 입력 필요",
            description: "메인 컬러, 서브 컬러, 폰트 선호도를 모두 선택해주세요."
          })
          setShowRequiredField(true)
          return
        }
        break

      case 5: // 링크 설정
        const validLinks = projectInfo.links.filter(link =>
          link.name.trim() !== "" && link.url.trim() !== ""
        )
        if (validLinks.length === 0) {
          setRequiredFieldMessage({
            title: "링크 추가 필요",
            description: "허브 페이지에는 최소 하나 이상의 링크가 필요합니다. 링크를 추가해주세요."
          })
          setShowRequiredField(true)
          return
        }
        break
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  // 이전 단계로 이동
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 링크 추가
  const addLink = () => {
    const newLink: LinkInfo = {
      id: Date.now().toString(),
      name: "",
      url: "",
      category: "header",
    }
    setProjectInfo({ ...projectInfo, links: [...projectInfo.links, newLink] })
  }

  // 링크 업데이트
  const updateLink = (linkId: string, field: "name" | "url" | "category", value: string) => {
    setProjectInfo({
      ...projectInfo,
      links: projectInfo.links.map((link) => (link.id === linkId ? { ...link, [field]: value } : link)),
    })
  }

  // 링크 삭제
  const removeLink = (linkId: string) => {
    setProjectInfo({
      ...projectInfo,
      links: projectInfo.links.filter((link) => link.id !== linkId),
    })
  }

  // 이미지 파일 추가
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "slider") => {
    const files = event.target.files
    if (!files || files.length === 0) return


    // 정상 크기 이미지와 큰 이미지 분류
    const normalSizeImages: ImageFile[] = []
    const oversizedImages: ImageFile[] = []

    // 모든 파일 처리
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith("image/")) continue

      const reader = new FileReader()
      const isLargeImage = await checkImageSize(file)

      const newImage: ImageFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type,
      }

      if (isLargeImage) {
        oversizedImages.push(newImage)
      } else {
        normalSizeImages.push(newImage)
      }
    }

    // 정상 크기 이미지는 바로 추가
    if (normalSizeImages.length > 0) {
      setProjectInfo((prev) => ({
        ...prev,
        images: [...prev.images, ...normalSizeImages],
      }))
    }

    // 큰 이미지가 있으면 경고 다이얼로그 표시
    if (oversizedImages.length > 0) {
      setLargeImages(oversizedImages)
      setShowSizeWarning(true)
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 이미지 압축 처리
  const handleCompressImages = async () => {
    setIsCompressing(true)
    setCompressionProgress(0)

    const compressedImages: ImageFile[] = []

    for (let i = 0; i < largeImages.length; i++) {
      try {
        const image = largeImages[i]
        const compressedFile = await compressImage(image.file)

        compressedImages.push({
          ...image,
          file: compressedFile,
          preview: URL.createObjectURL(compressedFile),
        })

        // 진행률 업데이트
        setCompressionProgress(Math.round(((i + 1) / largeImages.length) * 100))
      } catch (error) {
        console.error("이미지 압축 실패:", error)
      }
    }

    // 압축된 이미지 추가
    setProjectInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...compressedImages],
    }))

    setIsCompressing(false)
    setShowSizeWarning(false)
    setLargeImages([])
  }

  // 압축 없이 원본 이미지 사용
  const handleUseOriginalImages = () => {
    setProjectInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...largeImages],
    }))

    setShowSizeWarning(false)
    setLargeImages([])
  }

  // 이미지 삭제
  const removeImage = (imageId: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  // 이미지 업로드 처리
  const uploadImages = async (projectId: string) => {
    if (projectInfo.images.length === 0) return []



    const totalImages = projectInfo.images.length
    let uploadedCount = 0
    let failedCount = 0

    // 이미지 업로드 상태 초기화
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
        // 허브 프로젝트 전용 이미지 업로드 함수 사용
        const result = await uploadHubFileToSupabase(image.file, projectId, image.type)

        if (!result.success) {
          throw new Error(result.error)
        }

        // 업로드 진행 상황 업데이트
        uploadedCount++
        setUploadProgress(Math.round((uploadedCount / totalImages) * 100))

        // 이미지 상태 업데이트
        setProjectInfo((prev) => ({
          ...prev,
          images: prev.images.map((img) =>
            img.id === image.id ? { ...img, imageUrl: result.data!.publicUrl, uploading: false } : img,
          ),
        }))

        return {
          project_id: projectId,
          image_url: result.data!.publicUrl,
          image_type: image.type,
          file_name: result.data!.fileName,
          file_size: image.file.size,
          mime_type: image.file.type,
          sort_order: index,
        }
      } catch (error: any) {
        console.error(`이미지 업로드 실패 (${image.file.name}):`, error)
        failedCount++

        // 이미지 오류 상태 업데이트
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
        console.warn(`${totalImages}개 중 ${failedCount}개 이미지 업로드에 실패했습니다.`)
      }

      return results.filter(Boolean) // null 값 제거
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error)
      return []
    }
  }

  // 프로젝트 제출
  const submitProject = async () => {
    setIsSubmitting(true)
    setUploadProgress(0)
    setSubmitError(null)

    try {
      // 프로젝트 데이터 준비
      const projectData = {
        studio_name: projectInfo.studio_name,
        description: projectInfo.description,
        phone: projectInfo.phone,
        email: projectInfo.email,
        address: projectInfo.address || null,
        primary_color: projectInfo.primary_color,
        secondary_color: projectInfo.secondary_color,
        font_preference: projectInfo.font_preference,
        special_requests: projectInfo.special_requests || null,
        status: "planning" as const,
      }

      console.log("=== 허브 프로젝트 생성 시작 ===")
      console.log("데모 모드:", isDemo)
      console.log("프로젝트 데이터:", projectData)
      console.log("이미지 개수:", projectInfo.images.length)
      console.log("링크 개수:", projectInfo.links.length)


      // 허브 프로젝트 생성을 위한 서버 액션 사용
      console.log("서버 액션 import 시작...")
      const { createHubProject, createHubProjectImages, createHubProjectLinks } = await import(
        "@/app/actions/project-actions"
      )
      console.log("서버 액션 import 완료")

      console.log("허브 프로젝트 생성 호출...")
      const result = await createHubProject(projectData)
      console.log("허브 프로젝트 생성 결과:", result)

      if (!result.success) {
        throw new Error(result.error || "프로젝트 생성에 실패했습니다.")
      }

      const projectId = result.data[0].id
      console.log("생성된 프로젝트 ID:", projectId)

      // 이미지 업로드 및 데이터베이스 저장
      if (hasEnvVars && projectInfo.images.length > 0) {
        console.log("이미지 업로드 시작...")
        const imageData = await uploadImages(projectId)
        console.log("업로드된 이미지 데이터:", imageData)

        if (imageData.length > 0) {
          console.log("이미지 메타데이터 저장 시작...")
          const imageResult = await createHubProjectImages(imageData)
          console.log("이미지 메타데이터 저장 결과:", imageResult)

          if (!imageResult.success) {
            console.error("이미지 저장 실패:", imageResult.error)
            setSubmitError(`이미지 저장 실패: ${imageResult.error}`)
          }
        }
      }

      // 링크 데이터 처리
      const validLinks = projectInfo.links.filter((link) => link.name.trim() && link.url.trim())
      if (validLinks.length > 0) {
        const linkData = validLinks.map((link, index) => ({
          project_id: projectId,
          name: link.name,
          url: link.url,
          icon: link.icon || null,
          category: link.category,
          sort_order: index,
        }))

        console.log("링크 데이터 저장 시작:", linkData)
        const linkResult = await createHubProjectLinks(linkData)
        console.log("링크 데이터 저장 결과:", linkResult)

        if (!linkResult.success) {
          console.error("링크 저장 실패:", linkResult.error)
          setSubmitError(`링크 저장 실패: ${linkResult.error}`)
        }
      }

      console.log("=== 허브 프로젝트 생성 완료 ===")
      alert("허브 페이지 프로젝트가 성공적으로 생성되었습니다!")
      router.push("/admin/projects/new")
    } catch (error: any) {
      console.error("=== 프로젝트 생성 실패 ===", error)
      const errorMessage = error.message || "알 수 없는 오류가 발생했습니다."
      setSubmitError(errorMessage)
      alert(`프로젝트 생성에 실패했습니다: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
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
                required
              />
            </div>
            <div>
              <Label htmlFor="description">스튜디오 소개 *</Label>
              <Textarea
                id="description"
                value={projectInfo.description}
                onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                placeholder="스튜디오에 대한 간단한 소개를 작성해주세요"
                rows={4}
                required
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
                  required
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
                  required
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
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">메인 컬러</Label>
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
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">서브 컬러</Label>
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
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="fontPreference">폰트 선호도</Label>
              <select
                id="fontPreference"
                value={projectInfo.font_preference}
                onChange={(e) => setProjectInfo({ ...projectInfo, font_preference: e.target.value })}
                className="w-full rounded border p-2"
              >
                <option value="modern">모던</option>
                <option value="classic">클래식</option>
                <option value="minimalist">미니멀리스트</option>
              </select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            {isDemo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-medium mb-2">데모 모드</h4>
                <p className="text-blue-700 text-sm">
                  현재 데모 모드로 실행 중입니다. 이미지 업로드 기능은 제한되지만 프로젝트 생성은 가능합니다.
                </p>
              </div>
            )}

            <div>
              <Label>로고 이미지</Label>
              <p className="text-sm text-gray-500 mb-4">
                허브 페이지에 표시될 스튜디오 로고를 업로드해주세요 (권장: 정사각형 생략 가능)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "logo")}
                disabled={!hasEnvVars}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 disabled:opacity-50"
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
                          <div className="text-white text-xs">업로드 중...</div>
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
                허브 페이지 상단에 표시될 슬라이더 이미지들을 업로드해주세요 (권장: 가로 16:9 비율)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "slider")}
                disabled={!hasEnvVars}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
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
                          <div className="text-white text-xs">업로드 중...</div>
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
              <div className="grid grid-cols-2 gap-4 text-sm">
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
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">링크 위치 안내</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>헤더</b>: 페이지 상단(로고 옆)에 노출됩니다. 예시: <span className="font-mono">Blog, Instagram</span>
                </li>
                <li>
                  <b>플로팅버튼</b>: 이미지 오른쪽에 동그란 버튼 형태로 고정 노출됩니다. 예시: <span className="font-mono">전화, 톡톡, 카카오</span>
                </li>
                <li>
                  <b>메인</b>: 이미지 아래 주요 버튼 영역에 노출됩니다. 예시: <span className="font-mono">이달의 이벤트, 의상정보, 리뷰, 네이버 예약, 홈페이지, 오시는 길</span>
                </li>
              </ul>
              <div className="mt-2">
                <img src="/image.png" alt="위치 안내 예시" className="rounded border w-full max-w-xs mx-auto" />
                <div className="text-xs text-gray-500 text-center mt-1">* 실제 화면 예시</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              허브 페이지에 표시할 소셜 미디어 링크나 웹사이트 링크를 추가해주세요.<br />
              <span className="text-xs text-gray-400">카테고리를 선택해 링크를 구분할 수 있습니다.</span>
            </div>
            {projectInfo.links.map((link) => (
              <div key={link.id} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor={`linkCategory-${link.id}`}>위치</Label>
                    <select
                      id={`linkCategory-${link.id}`}
                      value={link.category}
                      onChange={(e) => updateLink(link.id, "category", e.target.value)}
                      className="w-full rounded border p-2"
                    >
                      <option value="header">헤더</option>
                      <option value="floating">플로팅버튼</option>
                      <option value="main">메인</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor={`linkName-${link.id}`}>링크 이름</Label>
                    <Input
                      id={`linkName-${link.id}`}
                      value={link.name}
                      onChange={(e) => updateLink(link.id, "name", e.target.value)}
                      placeholder="예: 인스타그램"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`linkUrl-${link.id}`}>링크 URL</Label>
                    <Input
                      id={`linkUrl-${link.id}`}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, "url", e.target.value)}
                      placeholder="https://instagram.com/studio"
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-end items-end h-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLink(link.id)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0 flex items-center justify-center rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addLink} variant="outline" className="w-full">
              + 링크 추가
            </Button>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="specialRequests">추가 요청사항</Label>
              <Textarea
                id="specialRequests"
                value={projectInfo.special_requests}
                onChange={(e) => setProjectInfo({ ...projectInfo, special_requests: e.target.value })}
                placeholder="특정 요청사항이 있으시면 여기에 작성해주세요"
                rows={4}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">정보 입력이 완료되었습니다!</h3>
              <p className="text-gray-600">입력하신 정보를 검토한 후 제출해주세요.</p>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-red-800 font-medium mb-2">오류 발생</h4>
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            {isDemo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-medium mb-2">데모 모드</h4>
                <p className="text-blue-700 text-sm">
                  현재 데모 모드로 실행 중입니다. 프로젝트는 생성되지만 실제 데이터베이스에는 저장되지 않습니다.
                </p>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>입력 정보 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <strong>스튜디오 이름:</strong> {projectInfo.studio_name}
                </div>
                <div>
                  <strong>프로젝트 타입:</strong> 허브 페이지
                </div>
                <div>
                  <strong>연락처:</strong> {projectInfo.phone} / {projectInfo.email}
                </div>
                {projectInfo.address && (
                  <div>
                    <strong>주소:</strong> {projectInfo.address}
                  </div>
                )}
                <div>
                  <strong>브랜딩:</strong>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: projectInfo.primary_color }}
                      ></div>
                      <span className="text-sm">{projectInfo.primary_color}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: projectInfo.secondary_color }}
                      ></div>
                      <span className="text-sm">{projectInfo.secondary_color}</span>
                    </div>
                    <span className="text-sm">({projectInfo.font_preference})</span>
                  </div>
                </div>
                <div>
                  <strong>업로드된 이미지:</strong>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>로고: {projectInfo.images.filter((img) => img.type === "logo").length}개</div>
                    <div>슬라이더: {projectInfo.images.filter((img) => img.type === "slider").length}개</div>
                  </div>
                </div>
                <div>
                  <strong>링크:</strong>{" "}
                  {projectInfo.links.filter((link) => link.name.trim() && link.url.trim()).length}개
                  {projectInfo.links.filter((link) => link.name.trim() && link.url.trim()).length > 0 && (
                    <div className="mt-1 text-sm text-gray-600">
                      {projectInfo.links
                        .filter((link) => link.name.trim() && link.url.trim())
                        .map((link) => link.name)
                        .join(", ")}
                    </div>
                  )}
                </div>
                {projectInfo.special_requests && (
                  <div>
                    <strong>추가 요청사항:</strong>
                    <div className="mt-1 text-sm text-gray-600">{projectInfo.special_requests}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={submitProject}
                disabled={
                  isSubmitting ||
                  !projectInfo.studio_name ||
                  !projectInfo.description ||
                  !projectInfo.phone ||
                  !projectInfo.email
                }
                size="lg"
              >
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

  // 다음 단계 버튼 활성화 조건
  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return projectInfo.studio_name.trim() && projectInfo.description.trim()
      case 2:
        return projectInfo.phone.trim() && projectInfo.email.trim()
      default:
        return true
    }
  }

  return (
    <>
      {/* 이미지 크기 경고 다이얼로그 */}
      {showSizeWarning && (
        <ImageSizeWarningDialog
          open={showSizeWarning}
          onClose={() => {
            setShowSizeWarning(false)
            setLargeImages([])
          }}
          onCompress={handleCompressImages}
          onUseOriginal={handleUseOriginalImages}
          isCompressing={isCompressing}
          compressionProgress={compressionProgress}
          imageCount={largeImages.length}
          totalSize={largeImages.reduce((sum, img) => sum + img.file.size, 0)}
        />
      )}

      {/* 필수 입력값 다이얼로그 */}
      <RequiredFieldDialog
        open={showRequiredField}
        onClose={() => setShowRequiredField(false)}
        title={requiredFieldMessage.title}
        description={requiredFieldMessage.description}
      />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">새 허브 페이지 프로젝트 생성</h1>
              <Button variant="outline" asChild>
                <Link href="/admin/projects/new">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  프로젝트 유형 선택
                </Link>
              </Button>
            </div>

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
              <Button onClick={nextStep} disabled={!canProceedToNext()}>
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
