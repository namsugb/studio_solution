"use server"

import { supabaseServer, checkEnvironmentVariables } from "@/lib/supabase-server"

// 웹사이트 프로젝트 생성 서버 액션
export async function createWebsiteProject(projectData: any) {
  if (!supabaseServer) {
    return { success: false, error: "Supabase client not initialized." }
  }
  const { data, error } = await supabaseServer.from("website_projects").insert([projectData]).select()

  if (error) {
    console.error("프로젝트 생성 오류:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 프로젝트 이미지 생성 서버 액션
export async function createProjectImages(imageData: any[]) {
  try {
    if (!imageData || imageData.length === 0) {
      return { success: true, data: [] }
    }

    if (!supabaseServer) {
      return { success: false, error: "Supabase client not initialized." }
    }

    const { data, error } = await supabaseServer.from("website_project_images").insert(imageData).select()

    if (error) {
      console.error("이미지 저장 오류:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("서버 액션 오류:", error)
    return { success: false, error: error.message || "알 수 없는 오류가 발생했습니다." }
  }
}

// 허브 페이지 프로젝트 생성 서버 액션 (RLS 우회)
export async function createHubProject(projectData: any) {
  try {
    console.log("허브 프로젝트 생성 시작:", projectData)

    const { hasEnvVars } = checkEnvironmentVariables()

    if (!hasEnvVars || !supabaseServer) {
      console.log("데모 모드: 허브 프로젝트 생성", projectData)
      // 데모 모드에서는 mock 데이터 반환
      return {
        success: true,
        data: [
          {
            id: `demo-hub-${Date.now()}`,
            ...projectData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      }
    }

    // 서버 측 Supabase 클라이언트 사용 (RLS 우회)
    const { data, error } = await supabaseServer.from("hub_projects").insert([projectData]).select()

    if (error) {
      console.error("허브 프로젝트 생성 오류:", error)
      return { success: false, error: error.message }
    }

    console.log("허브 프로젝트 생성 성공:", data)
    return { success: true, data }
  } catch (error: any) {
    console.error("허브 프로젝트 서버 액션 오류:", error)
    return { success: false, error: error.message || "알 수 없는 오류가 발생했습니다." }
  }
}

// 허브 프로젝트 이미지 생성 서버 액션 (RLS 우회)
export async function createHubProjectImages(imageData: any[]) {
  try {
    if (!imageData || imageData.length === 0) {
      return { success: true, data: [] }
    }

    console.log("허브 이미지 저장 시작:", imageData)

    if (!supabaseServer) {
      return { success: false, error: "Supabase client not initialized." }
    }

    const { data, error } = await supabaseServer.from("hub_project_images").insert(imageData).select()

    if (error) {
      console.error("허브 이미지 저장 오류:", error)
      return { success: false, error: error.message }
    }

    console.log("허브 이미지 저장 성공:", data)
    return { success: true, data }
  } catch (error: any) {
    console.error("허브 이미지 서버 액션 오류:", error)
    return { success: false, error: error.message || "알 수 없는 오류가 발생했습니다." }
  }
}

// 허브 프로젝트 링크 생성 서버 액션 (RLS 우회)
export async function createHubProjectLinks(linkData: any[]) {
  try {
    if (!linkData || linkData.length === 0) {
      return { success: true, data: [] }
    }

    console.log("허브 링크 저장 시작:", linkData)

    const { hasEnvVars } = checkEnvironmentVariables()

    if (!hasEnvVars || !supabaseServer) {
      console.log("데모 모드: 허브 링크 저장", linkData)
      // 데모 모드에서는 mock 데이터 반환
      return {
        success: true,
        data: linkData.map((link, index) => ({
          id: `demo-hub-link-${Date.now()}-${index}`,
          ...link,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })),
      }
    }

    const { data, error } = await supabaseServer.from("hub_project_links").insert(linkData).select()

    if (error) {
      console.error("허브 링크 저장 오류:", error)
      return { success: false, error: error.message }
    }

    console.log("허브 링크 저장 성공:", data)
    return { success: true, data }
  } catch (error: any) {
    console.error("허브 링크 서버 액션 오류:", error)
    return { success: false, error: error.message || "알 수 없는 오류가 발생했습니다." }
  }
}
