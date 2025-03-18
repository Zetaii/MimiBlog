"use client"
import React, { useEffect, useState } from "react"
import {
  getTravelGuides,
  deleteTravelGuide,
  type TravelGuide,
} from "@/lib/firebase/travelGuides"
import { useRouter } from "next/navigation"
import Image from "next/image"

const TravelGuides = () => {
  const router = useRouter()
  const [guides, setGuides] = useState<TravelGuide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const fetchGuides = async () => {
    try {
      const fetchedGuides = await getTravelGuides()
      setGuides(fetchedGuides)
    } catch (err) {
      setError("Failed to fetch travel guides")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  const handleDelete = async (guideId: string) => {
    if (!window.confirm("Are you sure you want to delete this travel guide?")) {
      return
    }

    setIsDeleting(guideId)
    try {
      await deleteTravelGuide(guideId)
      await fetchGuides()
    } catch (err) {
      console.error("Failed to delete guide:", err)
      setError("Failed to delete guide. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleCardClick = (guideId: string, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/travel-guides/${guideId}`)
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {guides.map((guide) => (
        <div
          key={guide.id}
          onClick={(e) => guide.id && handleCardClick(guide.id, e)}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-[600px] bg-white"
        >
          {guide.imageUrls[0] && (
            <div className="relative h-[500px]">
              <Image
                src={guide.imageUrls[0]}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-6 flex flex-col h-[100px]">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-semibold line-clamp-1">
                {guide.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 space-x-3">
                <span>📍 {guide.location}</span>
                <span>⏱ {guide.duration}</span>
              </div>
            </div>
            <p className="text-gray-600 line-clamp-2 mb-2 flex-grow">
              {guide.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {guide.createdAt.toDate().toLocaleDateString()}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (guide.id) {
                    handleDelete(guide.id)
                  }
                }}
                disabled={isDeleting === guide.id}
                className={`text-red-500 hover:text-red-700 font-medium text-sm transition-colors ${
                  isDeleting === guide.id ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting === guide.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TravelGuides
