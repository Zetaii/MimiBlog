import React from "react"
import { getTravelGuides } from "@/lib/firebase/travelGuides"
import TravelGuides from "@/components/TravelGuides"

export default async function TravelGuidesPage() {
  // Fetch all travel guides
  const travelGuides = await getTravelGuides()

  // Convert Firestore Timestamps to plain Date objects
  const serializedGuides = travelGuides.map((guide) => ({
    ...guide,
    id: guide.id || "",
    createdAt: new Date(guide.createdAt.toDate().toISOString()),
  }))

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="max-w-[1850px] mx-auto bg-white shadow-lg mt-8 border border-black">
        <div className="px-12 py-8">
          <h1 className="text-4xl font-bold mb-8">Travel Guides</h1>
          <div className="relative mb-8">
            <div className="w-full h-[2px] bg-black"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serializedGuides.map((guide) => (
              <div key={guide.id} className="h-full">
                <TravelGuides post={guide} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
