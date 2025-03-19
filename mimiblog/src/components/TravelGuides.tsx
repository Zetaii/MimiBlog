"use client"
import React from "react"
import Image from "next/image"

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
  return (
    <div className="bg-white overflow-hidden shadow-md">
      <div className="relative h-64">
        <Image
          src={post.imageUrls[0]}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-serif text-center">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 font-serif text-center">
          {post.description}
        </p>
      </div>
    </div>
  )
}
