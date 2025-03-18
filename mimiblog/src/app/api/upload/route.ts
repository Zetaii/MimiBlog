import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary/config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, folder } = body

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        data,
        {
          folder: folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    )
  }
}
