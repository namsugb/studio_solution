import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"
import { v4 as uuidv4 } from "uuid"

// 이미지 타입에 따른 저장 경로 설정
function getStoragePath(projectId: string, imageType: string) {
  const paths: Record<string, string> = {
    logo: "logos",
    slider: "sliders",
    product: "products",
    gallery: "gallery",
    background: "backgrounds",
    sample: "samples",
  }

  const folder = paths[imageType] || "others"
  return `projects/${projectId}/${folder}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const projectId = formData.get("projectId") as string
    const imageType = formData.get("imageType") as string

    if (!file || !projectId || !imageType) {
      return NextResponse.json(
        { success: false, error: "필수 정보가 누락되었습니다 (파일, 프로젝트 ID, 이미지 타입)" },
        { status: 400 },
      )
    }

    // 버킷 존재 여부 확인 및 생성
    const bucketName = "project-images"

    try {
      // 버킷 정보 가져오기 시도
      const { data: bucketData, error: bucketError } = await supabaseServer.storage.getBucket(bucketName)

      // 버킷이 없으면 생성
      if (bucketError && bucketError.message.includes("not found")) {
        const { data: newBucket, error: createError } = await supabaseServer.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800, // 50MB
          allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
        })

        if (createError) {
          throw new Error(`버킷 생성 실패: ${createError.message}`)
        }
      }
    } catch (bucketCheckError: any) {
      console.error("버킷 확인/생성 오류:", bucketCheckError)
      // 버킷 확인/생성 오류가 발생해도 업로드 시도
    }

    // 파일 확장자 추출
    const fileExt = file.name.split(".").pop()
    // 고유한 파일명 생성
    const uniqueFileName = `${uuidv4()}.${fileExt}`
    // 저장 경로 설정
    const filePath = `${getStoragePath(projectId, imageType)}/${uniqueFileName}`

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    // 파일 업로드
    const { data, error } = await supabaseServer.storage.from(bucketName).upload(filePath, fileBuffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

    if (error) {
      throw new Error(`파일 업로드 실패: ${error.message}`)
    }

    // 공개 URL 가져오기
    const { data: publicUrlData } = supabaseServer.storage.from(bucketName).getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      data: {
        path: filePath,
        publicUrl: publicUrlData.publicUrl,
        fileName: uniqueFileName,
        fileSize: file.size,
        mimeType: file.type,
      },
    })
  } catch (error: any) {
    console.error("API 라우트 이미지 업로드 오류:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "이미지 업로드 중 오류가 발생했습니다.",
      },
      { status: 500 },
    )
  }
}
