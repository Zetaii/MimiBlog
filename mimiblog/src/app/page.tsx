import React from "react"
import { getBlogPosts } from "@/lib/firebase/blogPosts"
import { getTravelGuides } from "@/lib/firebase/travelGuides"
import HomeContent from "@/components/HomeContent"

export default async function HomePage() {
  // Fetch recent blog posts and travel guides
  const blogPosts = await getBlogPosts()
  const travelGuides = await getTravelGuides()

  // Convert Firestore Timestamps to plain Date objects and ensure id is present
  const serializedBlogs = blogPosts
    .filter((post) => post.id) // Only include posts with an id
    .map((post) => ({
      ...post,
      id: post.id!, // Non-null assertion since we filtered
      createdAt: new Date(post.createdAt.toDate().toISOString()),
    }))

  const serializedGuides = travelGuides
    .filter((guide) => guide.id) // Only include guides with an id
    .map((guide) => ({
      ...guide,
      id: guide.id!, // Non-null assertion since we filtered
      createdAt: new Date(guide.createdAt.toDate().toISOString()),
    }))

  return (
    <HomeContent
      recentBlogs={serializedBlogs}
      recentGuides={serializedGuides}
    />
  )
}
