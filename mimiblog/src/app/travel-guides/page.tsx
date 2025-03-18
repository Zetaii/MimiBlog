import TravelGuides from "@/components/TravelGuides"

export default function TravelGuidesPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Travel Guides</h1>
        <TravelGuides />
      </div>
    </main>
  )
}
