import { supabase } from '@/lib/supabase'

/**
 * Upload gambar base64 ke Supabase Storage
 * Return: public URL atau null jika gagal
 */
export async function uploadImageToStorage(
  base64String,
  userId,
  scanId,
  imageType  // 'original' | 'heatmap' | 'overlay'
) {
  if (!base64String) return null

  try {
    // Konversi base64 ke Blob
    const byteString  = atob(base64String)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array  = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }

    const blob = new Blob([uint8Array], { type: 'image/png' })
    const path = `${userId}/${scanId}/${imageType}.png`

    const { error } = await supabase.storage
      .from('scan-images')
      .upload(path, blob, {
        contentType : 'image/png',
        upsert      : true,
      })

    if (error) {
      console.error(`Upload ${imageType} error:`, error)
      return null
    }

    // Ambil public URL
    const { data } = supabase.storage
      .from('scan-images')
      .getPublicUrl(path)

    return data.publicUrl

  } catch (err) {
    console.error(`Upload ${imageType} failed:`, err)
    return null
  }
}