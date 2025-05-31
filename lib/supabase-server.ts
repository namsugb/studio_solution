import { createClient } from "@supabase/supabase-js"

// 환경 변수 확인 함수
function checkEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return {
    hasEnvVars: Boolean(supabaseUrl && supabaseServiceKey),
    supabaseUrl,
    supabaseServiceKey,
  }
}

// 서버 사이드에서 사용할 Supabase 클라이언트 (Service Role Key 사용)
function createSupabaseServerClient() {
  const { hasEnvVars, supabaseUrl, supabaseServiceKey } = checkEnvironmentVariables()

  if (!hasEnvVars) {
    console.warn("Supabase 환경 변수가 설정되지 않았습니다. 데모 모드로 작동합니다.")
    // 데모 모드용 mock 클라이언트 반환
    return null
  }

  return createClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const supabaseServer = createSupabaseServerClient()

// 환경 변수 확인 함수 export
export { checkEnvironmentVariables }
