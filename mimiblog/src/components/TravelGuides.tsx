"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

interface TravelGuide {
  id: string
  title: string
  description: string
  content: string
  location: string
  duration: string
  imageUrls: string[]
  createdAt: Date
}

interface TravelGuidesProps {
  post: TravelGuide
}

export default function TravelGuides({ post }: TravelGuidesProps) {
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
    <Link href={`/travel-guides/${post.id}`} className="block">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-[600px] bg-white">
        {post.imageUrls[0] && (
          <div className="relative h-[500px]">
            <Image
              src={post.imageUrls[0]}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="p-6 flex flex-col h-[100px]">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-semibold line-clamp-1">
              {post.title}
            </h2>
            <div className="flex items-center text-sm text-gray-500 space-x-3">
              <span>📍 {post.location}</span>
              <span>⏱ {post.duration}</span>
            </div>
          </div>
          <p className="text-gray-600 line-clamp-2 mb-2 flex-grow">
            {post.description}
          </p>
          <div className="flex justify-between items-center">
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
