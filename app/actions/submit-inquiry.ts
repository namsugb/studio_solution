"use server"

import { createClient } from "@/lib/supabase"

export async function submitInquiry(formData: FormData) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Return mock success for demo
    return {
      success: true,
      data: {
        id: "demo-" + Date.now(),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      },
    }
  }

  const supabase = createClient()

  const inquiry = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
    status: "new",
  }

  const { data, error } = await supabase.from("inquiries").insert([inquiry]).select()

  if (error) {
    console.error("Supabase error:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
