export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">로딩 중...</p>
      </div>
    </div>
  )
}
