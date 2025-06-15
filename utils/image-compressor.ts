import imageCompression from "browser-image-compression"

const MAX_IMAGE_SIZE_MB = 2
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080
const QUALITY = 0.7

/**
 * 이미지 파일 크기가 2MB를 초과하는지 확인하는 함수
 * @param file 확인할 이미지 파일
 * @returns 2MB 초과 여부 (true: 초과, false: 이하)
 */
export async function checkImageSize(file: File): Promise<boolean> {
  const fileSizeInMB = file.size / (1024 * 1024)
  return fileSizeInMB > MAX_IMAGE_SIZE_MB
}

/**
 * 이미지 파일을 압축하는 함수
 * @param file 압축할 이미지 파일
 * @param maxWidth 최대 너비 (기본값: 1920px)
 * @param maxHeight 최대 높이 (기본값: 1080px)
 * @param quality 초기 품질 (기본값: 0.8)
 * @returns 압축된 이미지 파일
 */
export async function compressImage(file: File): Promise<File> {
  try {
    // 이미지 크기 체크
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB <= MAX_IMAGE_SIZE_MB) {
      return file
    }

    // 이미지 압축 옵션
    const options = {
      maxSizeMB: MAX_IMAGE_SIZE_MB,
      maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
      useWebWorker: true,
      quality: QUALITY,
      initialQuality: QUALITY,
      alwaysKeepResolution: true,
      fileType: file.type,
    }

    // 압축 시도
    const compressedFile = await imageCompression(file, options)

    // 압축 후 크기 체크
    const compressedSizeInMB = compressedFile.size / (1024 * 1024)
    if (compressedSizeInMB > MAX_IMAGE_SIZE_MB) {
      // 여전히 크기가 크다면 더 강력한 압축 시도
      const strongerOptions = {
        ...options,
        quality: 0.5,
        maxWidthOrHeight: Math.min(MAX_WIDTH, MAX_HEIGHT),
      }
      return await imageCompression(file, strongerOptions)
    }

    return compressedFile
  } catch (error) {
    console.error("이미지 압축 실패:", error)
    throw new Error("이미지 압축에 실패했습니다.")
  }
}

export async function compressImages(files: File[]): Promise<File[]> {
  const compressedFiles: File[] = []
  let totalSize = 0

  for (const file of files) {
    try {
      const compressedFile = await compressImage(file)
      compressedFiles.push(compressedFile)
      totalSize += compressedFile.size
    } catch (error) {
      console.error(`파일 압축 실패 (${file.name}):`, error)
      throw error
    }
  }

  return compressedFiles
}
