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
    // Try multiple possible locations of the image field (Strapi v4 variations)
    const imageData =
      item?.image ||
      item?.attributes?.image ||
      item?.attributes?.images ||
      item?.images ||
      item // as a last resort, pass the whole entity for deep extraction

    const imageUrl = getImageUrl(imageData)
    const altText = item.alt || `Expert Team Image ${index + 1}`
    
    // console.log(`Image ${index + 1}:`, { imageData, imageUrl, altText })
    
    return {
      url: imageUrl,
      alt: altText,
      original: item
    }
  })
  
  // Filter valid Strapi images
  const validStrapiImages = processedImages.filter((img: any) => img.url)
  
  // Debug: Log Strapi images
  if (process.env.NODE_ENV === 'development') {
    console.log('Expert Team Images Debug:', {
      imagesDataLength: imagesData?.length || 0,
      processedImagesLength: processedImages.length,
      validStrapiImagesLength: validStrapiImages.length,
      validStrapiImages: validStrapiImages.map((img: any) => ({ url: img.url, alt: img.alt }))
    })
  }
  
  // Fallback images if Strapi data is not available
  const fallbackImages = [
    { url: '/img/expert2.jpg', alt: 'Процессийн хяналт' },
    { url: '/img/expert.jpg', alt: 'Багийн бүрэлдэхүүн' },
    { url: '/img/expert1.jpg', alt: 'Үйл ажиллагааны чиглэл' }
  ]
  
  // Use Strapi images if available (even if less than 3), otherwise use fallback
  const displayImages = validStrapiImages.length > 0 ? validStrapiImages : fallbackImages
  
  // Get the image for "Багийн бүрэлдэхүүн" section - prefer Strapi image if available
  // If we have multiple Strapi images, use the second one (index 1), otherwise use the first or fallback
  const teamImage = validStrapiImages.length > 1 ? validStrapiImages[1] : 
                    validStrapiImages.length === 1 ? validStrapiImages[0] : 
                    fallbackImages[1]
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-indigo-50 border-y border-indigo-100">
        <div className="absolute inset-0">
          <img 
            src="/img/expert2.jpg" 
            alt="Экспертийн багийн ажил" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-indigo-50/80"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 sm:py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Control Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200 mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            ПРОЦЕССИЙН ХЯНАЛТ
          </h2>

          {/* Introduction */}
          <div className="bg-indigo-50 rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border-l-4 border-indigo-500">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 text-justify">
              <span className="font-semibold text-indigo-900">МБМҮХолбоо</span> нь 
              <span className="font-semibold text-indigo-700"> 2012 оноос хойш</span> барилгын материалын үйлдвэрлэлд 
              тусгай зөвшөөрөл олгох эс олгох ажлын хүрээнд хамгийн үр дүнтэй зохион байгуулалтанд 
              оруулж үйлдвэрүүдээр{" "}
              <span className="font-semibold text-indigo-800 bg-indigo-100 px-2 py-1 rounded">"ЗӨВЛӨХ МЭРГЭЖЛИЙН БАГ"</span>{" "}
              ажиллуулж эхлэсэн болно.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Working Process */}
            <div className="space-y-4 sm:space-y-6 h-auto lg:h-96 flex flex-col justify-center">
              <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">Ажиллах журам</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                      "Экспертийн мэргэжлийн баг"-ийн ажиллах журмыг дотооддоо батлуулан 
                      мэргэжлийн инженер, зөвлөхүүдийг ажиллуулдаг.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2">Хамтын ажиллагаа</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                      Үйлдвэрүүдэд мэргэжлийн зөвлөгөө өгөх, зөвлөмж өгч хамтын ажиллагаа, 
                      эргэх холбоог бий болгодог.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="mt-4 lg:mt-0">
              <img 
                src={displayImages[0]?.url || '/img/expert2.jpg'} 
                alt={displayImages[0]?.alt || 'Процессийн хяналт'} 
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200 mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            Багийн бүрэлдэхүүн
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Мэргэжлийн инженер, зөвлөхүүдийн бүрэлдэхүүн:
          </p>

          {/* Specialties List */}
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* All 8 specialties in a single column */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { 
                    desc: "Цемент, шохой гөлтгөнийн холбогч болон бетон, төмөр бетон, бэлэн бетон зуурмагийн үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Керамик тоосго, керамик хавтан, өнгөлгөөний тоосго, керамзит, алевролит, перлитийн хөнгөн дүүргэгч, материалын чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Хүдрийн бус ашигт малтмалын ашиглалт, олборлолт, бетоны дүүргэгч материал, барилгын чулуу боловсруулах үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Автоклавын ба автоклавын бус хөнгөнбетон /пено, газо бетон, полистирол бетон/ үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Дулаалгын эрдэс хөвөн EPS, XPS, PUR, /полиуретан/ хавтан, түүгээр үйлдвэрлэлийн сендвич хавтангийн үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Металл хийц, стандарт бус хийц, арматур, ган бөмбөлөг, прокатуудын үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Хуванцар хоолойн төрлүүд, хуванцар цонх, хаалга, барилгын химийн нэмэлт, будаг, эмульс,чулуун будаг, кабель утас, цахилгаан тусгаарлагчийн үйлдвэрлэлийн чиглэлийн технологи инженер"
                  },
                  { 
                    desc: "Барилгын силикат, хөнгөн бетон, дулаан тусгаарлагч материалын инженер"
                  },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="group bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                          {member.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image in the 2nd column */}
              <div className="mt-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start lg:h-[calc(100vh-8rem)]">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full">
                  <img 
                    src={teamImage?.url || '/img/expert.jpg'} 
                    alt={teamImage?.alt || 'Багийн бүрэлдэхүүн'} 
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            Үйл ажиллагааны чиглэл
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8">
            Тус мэргэжлийн баг нь үйлдвэрүүдэд дараах үйл ажиллагаа, үйлчилгээг үзүүлдэг:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-auto lg:h-96 content-center">
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
                className="group bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
            </div>
            
            {/* Image Section */}
            <div className="mt-4 lg:mt-0">
              <img 
                src={displayImages[2]?.url || '/img/expert1.jpg'}  
                alt={displayImages[2]?.alt || 'Үйл ажиллагааны чиглэл'} 
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}