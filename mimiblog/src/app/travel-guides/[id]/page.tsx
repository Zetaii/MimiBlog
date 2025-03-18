"use client"
import { useEffect, useState } from "react"
import { getTravelGuide, type TravelGuide } from "@/lib/firebase/travelGuides"
import { useParams } from "next/navigation"
import Image from "next/image"

export default function TravelGuidePage() {
  const params = useParams()
  const [guide, setGuide] = useState<TravelGuide | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const guideData = await getTravelGuide(params.id as string)
        setGuide(guideData)
      } catch (err) {
        setError("Failed to fetch travel guide")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [params.id])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error || !guide) {
    return (
      <div className="text-red-500 text-center py-12">
        {error || "Guide not found"}
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>

        <div className="flex items-center text-gray-500 mb-8 space-x-4">
          <span>📍 {guide.location}</span>
          <span>⏱ {guide.duration}</span>
          <span>{guide.createdAt.toDate().toLocaleDateString()}</span>
        </div>

        {guide.imageUrls[0] && (
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={guide.imageUrls[0]}
              alt={guide.title}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}

        <p className="text-xl text-gray-600 mb-8">{guide.description}</p>

        <div className="prose max-w-none">
          {guide.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {guide.imageUrls.slice(1).length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {guide.imageUrls.slice(1).map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`Image ${index + 2}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
