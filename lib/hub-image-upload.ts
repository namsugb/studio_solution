import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// 허브 프로젝트 이미지 업로드 함수
export async function uploadHubFileToSupabase(
  file: File,
  projectId: string,
  imageType: "logo" | "slider",
): Promise<{
  success: boolean
  data?: { publicUrl: string; fileName: string }
  error?: string
}> {
  try {
    // 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase 환경 변수가 설정되지 않았습니다.")
      return {
        success: false,
        error: "Supabase 환경 변수가 설정되지 않았습니다.",
      }
    }

    // Supabase 클라이언트 생성
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // 파일 확장자 추출
    const fileExt = file.name.split(".").pop()
    // 고유한 파일 이름 생성
    const fileName = `${imageType}-${projectId}-${uuidv4()}.${fileExt}`
    // 저장 경로 설정
    const filePath = `hub-projects/${projectId}/${fileName}`

    // 파일 업로드
    const { data, error } = await supabase.storage.from("hub-project-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("파일 업로드 오류:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    // 업로드된 파일의 공개 URL 가져오기
    const { data: publicUrlData } = supabase.storage.from("hub-project-images").getPublicUrl(filePath)

    return {
      success: true,
      data: {
        publicUrl: publicUrlData.publicUrl,
        fileName: fileName,
      },
    }
  } catch (error: any) {
    console.error("이미지 업로드 중 예외 발생:", error)
    return {
      success: false,
      error: error.message || "이미지 업로드 중 오류가 발생했습니다.",
    }
  }
}
