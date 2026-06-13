import { v2 as cloudinary } from "cloudinary"

function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  return cloudinary
}

export async function uploadImage(
  file: string,
  folder: string = "bone-fracture/scans"
): Promise<{ url: string; publicId: string }> {
  const result = await getCloudinary().uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [
      { quality: "auto", fetch_format: "auto" },
    ],
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}

export async function uploadAvatar(
  file: string,
  userId: string
): Promise<{ url: string; publicId: string }> {
  return uploadImage(file, `bone-fracture/avatars/${userId}`)
}

export async function deleteImage(publicId: string): Promise<void> {
  await getCloudinary().uploader.destroy(publicId)
}
