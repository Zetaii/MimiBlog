import React from "react"
import { getBlogPosts } from "@/lib/firebase/blogPosts"
import { getTravelGuides } from "@/lib/firebase/travelGuides"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Timestamp } from "firebase/firestore"
import Hero from "@/components/Hero"
import Blogs from "@/components/Blogs"
import TravelGuides from "@/components/TravelGuides"
import HomeContent from "@/components/HomeContent"

type CombinedPost = {
  id: string
  type: "blog" | "guide"
  title: string
  description: string
  imageUrls: string[]
  createdAt: Timestamp
  location?: string
  duration?: string
}

// Server Component
export default async function HomePage() {
  const [blogPosts, travelGuides] = await Promise.all([
    getBlogPosts(),
    getTravelGuides(),
  ])

  // Convert Firestore Timestamps to plain Date objects and ensure id is string
  const serializedBlogPosts = blogPosts.map((post) => ({
    ...post,
    id: post.id || "", // Ensure id is string
    createdAt: new Date(post.createdAt.toDate().toISOString()),
  }))

  const serializedTravelGuides = travelGuides.map((guide) => ({
    ...guide,
    id: guide.id || "", // Ensure id is string
    createdAt: new Date(guide.createdAt.toDate().toISOString()),
  }))

  // Get the three most recent posts
  const recentBlogs = serializedBlogPosts.slice(0, 3)
  const recentGuides = serializedTravelGuides.slice(0, 3)

  return <HomeContent recentBlogs={recentBlogs} recentGuides={recentGuides} />
}
