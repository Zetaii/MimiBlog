import TravelGuides from "@/components/TravelGuides"
import { getTravelGuides } from "@/lib/firebase/travelGuides"

export default async function TravelGuidesPage() {
  const guides = await getTravelGuides()

  // Convert Firestore Timestamps to plain Date objects and ensure id is present
  const serializedGuides = guides
    .filter((guide) => guide.id) // Only include guides with an id
    .map((guide) => ({
      ...guide,
      id: guide.id!, // The '!' tells TypeScript that we know id exists (due to the filter)
      createdAt: new Date(guide.createdAt.toDate().toISOString()),
    }))

  return (
    <main className="min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Travel Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serializedGuides.map((guide) => (
            <TravelGuides key={guide.id} post={guide} />
          ))}
        </div>
      </div>
    </main>
  )
}
