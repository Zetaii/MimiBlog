"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  imageUrls: string[]
  createdAt: Date
}

interface BlogsProps {
  post: BlogPost
}

export default function Blogs({ post }: BlogsProps) {
  if (!post) return null

  const formatDate = (date: Date) => {
    try {
      return date.toLocaleDateString()
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Date unavailable"
    }
  }

  return (
    <Link href={`/blogs/${post.id}`} className="block h-full">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white h-full flex flex-col">
        {post.imageUrls[0] && (
          <div className="relative w-full" style={{ height: "350px" }}>
            <Image
              src={post.imageUrls[0]}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
              onError={(e) => {
                console.error(`Error loading blog image: ${post.imageUrls[0]}`)
                const imgElement = e.target as HTMLImageElement
                imgElement.src = "/placeholder-image.jpg"
              }}
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </div>
              <span className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
