import { createClient } from "@/lib/supabase"

/**
 * Supabase Storage에 파일을 업로드하는 함수
 * @param file 업로드할 파일
 * @param projectId 프로젝트 ID
 * @param fileType 파일 타입 (logo, background, sample 등)
 * @returns 업로드 결과 (성공 시 publicUrl 포함)
 */
export async function uploadFileToSupabase(file: File, projectId: string, fileType: string) {
  try {
    const supabase = createClient()

    // 파일 이름 생성 (프로젝트ID_타입_타임스탬프.확장자)
    const fileExt = file.name.split(".").pop()
    const fileName = `${projectId}_${fileType}_${Date.now()}.${fileExt}`
    const filePath = `projects/${projectId}/${fileName}`

    // Supabase Storage에 파일 업로드
    const { data, error } = await supabase.storage.from("project-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw new Error(`파일 업로드 실패: ${error.message}`)
    }

    // 업로드된 파일의 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from("project-images").getPublicUrl(filePath)

    return {
      success: true,
      data: {
        path: data.path,
        publicUrl,
        fileName,
      },
    }
  } catch (error: any) {
    console.error("파일 업로드 오류:", error)
    return {
      success: false,
      error: error.message || "파일 업로드 중 오류가 발생했습니다.",
    }
  }
}
