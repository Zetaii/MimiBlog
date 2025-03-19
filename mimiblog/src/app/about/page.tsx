import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-200">
      <div className="max-w-[1850px] mx-auto bg-white shadow-lg mt-8 border border-black">
        <div className="px-12 py-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Content Section */}
            <div className="md:col-span-2 flex justify-center">
              <div className="max-w-sm">
                <h1 className="text-4xl font-bold mb-12 font-serif text-left">
                  About Me
                </h1>
                <p className="text-base text-gray-700 mb-6 font-serif">
                  Welcome to my blog! I&apos;m passionate about sharing my
                  travel experiences, lifestyle tips, and adventures with you.
                  Through this platform, I hope to inspire others to explore the
                  world and embrace new experiences.
                </p>
                <p className="text-base text-gray-700 mb-6 font-serif">
                  My journey began with a simple desire to document my travels
                  and share them with friends and family. What started as a
                  personal project has grown into a community of like-minded
                  individuals who share a passion for exploration and discovery.
                </p>
                <p className="text-base text-gray-700 font-serif">
                  When I&apos;m not traveling, you can find me exploring local
                  cafes, practicing photography, or planning my next adventure.
                  I believe that every day is an opportunity to learn something
                  new and make meaningful connections with people from different
                  cultures and backgrounds.
                </p>
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="md:col-span-1">
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-md border-2 border-black">
                <Image
                  src="/profile-image.jpg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
