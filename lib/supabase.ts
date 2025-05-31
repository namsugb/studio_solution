import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// 웹사이트 프로젝트 타입 정의
export interface WebsiteProject {
  id: string
  studio_name: string
  description: string
  phone: string
  email: string
  address?: string
  business_hours?: string
  primary_color: string
  secondary_color: string
  font_preference: "modern" | "elegant" | "casual" | "classic"
  services: string[]
  features: string[]
  budget?: string
  deadline?: string
  special_requests?: string
  status: "planning" | "in_progress" | "review" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

// 웹사이트 프로젝트 이미지 타입 정의
export interface WebsiteProjectImage {
  id: string
  project_id: string
  image_url: string
  image_type: "logo" | "slider" | "product" | "gallery"
  file_name: string
  file_size?: number
  mime_type?: string
  width?: number
  height?: number
  alt_text?: string
  sort_order: number
  created_at: string
  updated_at: string
}

// 문의 타입 정의
export interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  service: string
  message: string
  status: "new" | "reviewing" | "quoted" | "contracted" | "completed" | "cancelled"
  notes?: string
  budget?: string
  created_at: string
  updated_at: string
}

// Mock data for demo mode
const mockWebsiteProjects: WebsiteProject[] = [
  {
    id: "proj-001",
    studio_name: "아름다운 스튜디오",
    description: "웨딩 전문 스튜디오입니다.",
    phone: "010-1234-5678",
    email: "beautiful@studio.com",
    address: "서울시 강남구",
    business_hours: "월-금 9:00-18:00",
    primary_color: "#f43f5e",
    secondary_color: "#64748b",
    font_preference: "modern",
    features: ["예약 시스템", "갤러리 슬라이더"],
    services: ["웨딩 촬영", "가족 촬영"],
    special_requests: "모바일 최적화 중요",
    budget: "1m-1.5m",
    deadline: "2025-06-30",
    status: "planning",
    created_at: "2025-05-20T10:00:00",
    updated_at: "2025-05-20T10:00:00",
  },
  {
    id: "proj-002",
    studio_name: "모던 포토",
    description: "프로필 전문 스튜디오입니다.",
    phone: "010-2345-6789",
    email: "modern@photo.com",
    primary_color: "#3b82f6",
    secondary_color: "#6b7280",
    font_preference: "elegant",
    features: ["포트폴리오 갤러리", "SEO 최적화"],
    services: ["프로필 촬영", "상품 촬영"],
    status: "in_progress",
    created_at: "2025-05-19T14:30:00",
    updated_at: "2025-05-20T09:15:00",
  },
]

// Create a mock client for demo mode
const createMockClient = () => {
  return {
    from: (table: string) => {
      return {
        select: (columns?: string) => {
          if (table === "website_projects") {
            return Promise.resolve({ data: mockWebsiteProjects, error: null })
          }
          if (table === "inquiries") {
            return Promise.resolve({ data: [], error: null })
          }
          return Promise.resolve({ data: [], error: null })
        },
        insert: (data: any) => {
          return {
            select: () =>
              Promise.resolve({
                data: [
                  {
                    ...data[0],
                    id: `mock-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                ],
                error: null,
              }),
          }
        },
        update: (data: any) => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
        eq: (column: string, value: any) => ({
          select: () => Promise.resolve({ data: [], error: null }),
          delete: () => Promise.resolve({ data: null, error: null }),
          update: (data: any) => Promise.resolve({ data: null, error: null }),
        }),
        order: (column: string, options?: any) => ({
          select: () => {
            if (table === "website_projects") {
              return Promise.resolve({ data: mockWebsiteProjects, error: null })
            }
            return Promise.resolve({ data: [], error: null })
          },
        }),
      }
    },
    auth: {
      signInWithOAuth: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ data: null, error: null }),
    },
  }
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for development without logging an error
    return createMockClient() as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Add this export at the end of the file
export const supabase = createClient()
