/**
 * 이미지 파일 크기가 2MB를 초과하는지 확인하는 함수
 * @param file 확인할 이미지 파일
 * @returns 2MB 초과 여부 (true: 초과, false: 이하)
 */
export async function checkImageSize(file: File): Promise<boolean> {
  const MAX_SIZE = 2 * 1024 * 1024 // 2MB
  return file.size > MAX_SIZE
}

/**
 * 이미지 파일을 압축하는 함수
 * @param file 압축할 이미지 파일
 * @param maxWidth 최대 너비 (기본값: 1920px)
 * @param maxHeight 최대 높이 (기본값: 1080px)
 * @param quality 초기 품질 (기본값: 0.8)
 * @returns 압축된 이미지 파일
 */
export async function compressImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        // 이미지 크기 계산
        let width = img.width
        let height = img.height

        // 이미지가 최대 크기보다 큰 경우 비율 유지하며 리사이징
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.floor(width * ratio)
          height = Math.floor(height * ratio)
        }

        // 캔버스 생성 및 이미지 그리기
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // 압축 및 변환
        const compressAndConvert = (currentQuality: number) => {
          // 이미지 압축
          const dataUrl = canvas.toDataURL(file.type, currentQuality)

          // Base64 데이터를 Blob으로 변환
          const byteString = atob(dataUrl.split(",")[1])
          const mimeType = dataUrl.split(",")[0].split(":")[1].split(";")[0]
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          const blob = new Blob([ab], { type: mimeType })

          // 압축된 파일이 여전히 2MB보다 크면 품질을 더 낮춰서 재시도
          if (blob.size > 2 * 1024 * 1024 && currentQuality > 0.3) {
            compressAndConvert(currentQuality - 0.1)
          } else {
            // 최종 압축 파일 생성
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })

            resolve(compressedFile)
          }
        }

        // 압축 시작
        compressAndConvert(quality)
      }

      img.onerror = (error) => {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}
