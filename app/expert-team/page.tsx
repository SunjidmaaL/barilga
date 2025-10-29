import { getExpertTeams, getExpertTeamImages, getImageUrl } from '@/lib/strapi'

export default async function ExpertTeamPage() {
  // Try to fetch from expert-teams first, then fallback to expert-team-images
  let imagesData = await getExpertTeams()
  
  // If expert-teams doesn't have image data, try expert-team-images
  if (!imagesData || imagesData.length === 0) {
    imagesData = await getExpertTeamImages()
  }
  
  // Get the first 3 images
  const images = imagesData?.slice(0, 3) || []
  
  // Process images to extract URL and alt text
  const processedImages = images.map((item: any, index: number) => {
    // Strapi v4 structure: image is directly in the item, not in attributes
    const imageData = item.image
    const imageUrl = getImageUrl(imageData)
    const altText = item.alt || `Expert Team Image ${index + 1}`
    
    // console.log(`Image ${index + 1}:`, { imageData, imageUrl, altText })
    
    return {
      url: imageUrl,
      alt: altText,
      original: item
    }
  })
  
  // Fallback images if Strapi data is not available
  const fallbackImages = [
    { url: '/img/background1.jpg', alt: 'Процессийн хяналт' },
    { url: '/img/background.jpg', alt: 'Багийн бүрэлдэхүүн' },
    { url: '/img/background.jpg', alt: 'Үйл ажиллагааны чиглэл' }
  ]
  
  // Use Strapi images if available, otherwise use fallback
  const displayImages = processedImages.filter((img: any) => img.url).length >= 3 ? processedImages : fallbackImages
  
  // console.log('Display images:', displayImages)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-indigo-50 border-y border-indigo-100">
        <div className="absolute inset-0">
          <img 
            src="/img/background.jpg" 
            alt="Экспертийн багийн ажил" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-indigo-50/80"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Control Section */}
        <div className="bg-white rounded-xl p-8 shadow ring-1 ring-gray-200 mb-8">
          <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            ПРОЦЕССИЙН ХЯНАЛТ
          </h2>

          {/* Introduction */}
          <div className="bg-indigo-50 rounded-xl p-6 mb-8 border-l-4 border-indigo-500">
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              <span className="font-semibold text-indigo-900">МБМҮХолбоо</span> нь 
              <span className="font-semibold text-indigo-700"> 2012 оноос хойш</span> барилгын материалын үйлдвэрлэлд 
              тусгай зөвшөөрөл олгох эс олгох ажлын хүрээнд хамгийн үр дүнтэй зохион байгуулалтанд 
              оруулж үйлдвэрүүдээр{" "}
              <span className="font-semibold text-indigo-800 bg-indigo-100 px-2 py-1 rounded">"ЗӨВЛӨХ МЭРГЭЖЛИЙН БАГ"</span>{" "}
              ажиллуулж эхлэсэн болно.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Working Process */}
            <div className="space-y-6 h-96 flex flex-col justify-center">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Ажиллах журам</h3>
                    <p className="text-gray-700 leading-relaxed">
                      "Экспертийн мэргэжлийн баг"-ийн ажиллах журмыг дотооддоо батлуулан 
                      мэргэжлийн инженер, зөвлөхүүдийг ажиллуулдаг.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">Хамтын ажиллагаа</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Үйлдвэрүүдэд мэргэжлийн зөвлөгөө өгөх, зөвлөмж өгч хамтын ажиллагаа, 
                      эргэх холбоог бий болгодог.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div>
              <img 
                src={displayImages[0]?.url || '/img/background1.jpg'} 
                alt={displayImages[0]?.alt || 'Процессийн хяналт'} 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-xl p-8 shadow ring-1 ring-gray-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                Багийн бүрэлдэхүүн
              </h2>

              <p className="text-gray-600 mb-6">
                Мэргэжлийн инженер, зөвлөхүүдийн бүрэлдэхүүн:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-96 content-center">
            {[
              { 
                title: "Технологич инженер",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                color: "bg-blue-100 text-blue-700"
              },
              { 
                title: "Механик инженер",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                color: "bg-green-100 text-green-700"
              },
              { 
                title: "Цахилгааны инженер",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: "bg-yellow-100 text-yellow-700"
              },
              { 
                title: "Холбооны төлөөлөл",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-purple-100 text-purple-700"
              },
              { 
                title: "Цахим мэдээлэлийн инженер",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-indigo-100 text-indigo-700"
              },
              { 
                title: "Бусад мэргэжлийн баг",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                color: "bg-pink-100 text-pink-700"
              },
            ].map((member, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${member.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {member.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {member.title}
                </h3>
              </div>
            ))}
              </div>
            </div>
            
            {/* Image Section */}
            <div>
              <img 
                src={displayImages[1]?.url || '/img/background.jpg'} 
                alt={displayImages[1]?.alt || 'Багийн бүрэлдэхүүн'} 
                className="w-full mt-32 lg:mt-28 h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            Үйл ажиллагааны чиглэл
          </h2>

          <p className="text-gray-600 mb-8">
            Тус мэргэжлийн баг нь үйлдвэрүүдэд дараах үйл ажиллагаа, үйлчилгээг үзүүлдэг:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4 h-96 content-center">
            {[
              {
                title: "Мэргэжлийн зөвлөгөө",
                desc: "Үйлдвэрүүдэд мэргэжлийн болон технологийн зөвлөгөө өгөх",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Технологийн дэмжлэг",
                desc: "Тоног төхөөрөмжийн үйл ажиллагаанд зөвлөмж өгөх",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Төрийн бодлогын хэрэгжилт",
                desc: "Төрийн бодлогын хэрэгжилтийг хангуулах",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Лабораторийн хяналт",
                desc: "Лабораторийн хяналтын ажлыг эрчимжүүлэх",
                color: "from-orange-500 to-orange-600"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
            </div>
            
            {/* Image Section */}
            <div>
              <img 
                src={displayImages[2]?.url || '/img/background.jpg'} 
                alt={displayImages[2]?.alt || 'Үйл ажиллагааны чиглэл'} 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}