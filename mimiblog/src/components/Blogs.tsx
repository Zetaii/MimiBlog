"use client"
import React from "react"
import Image from "next/image"

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
        <div className="flex justify-between items-center"></div>
      </div>
    </div>
  )
}
