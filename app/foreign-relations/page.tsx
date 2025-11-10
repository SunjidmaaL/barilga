import { getForeignRelationsImages, getImageUrl } from '@/lib/strapi'
import ForeignRelationsGallery from './ForeignRelationsGallery'

export default async function ForeignRelationsPage() {
  try {
    // Fetch images from Strapi
    const strapiImages = await getForeignRelationsImages() || []
    
    // Debug logging in development (simplified)
    if (process.env.NODE_ENV === 'development') {
      if (!strapiImages || strapiImages.length === 0) {
        console.warn('[Foreign Relations Page] No foreign relations data received from Strapi API')
      } else {
        console.log(`[Foreign Relations Page] Foreign relations data received: ${strapiImages.length} items`)
      }
    }

  // Process Strapi images - extract all images from foreign-relations items
  const processedImages: any[] = []
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  strapiImages.forEach((item: any, itemIndex: number) => {
    // Try to find image in various locations (Strapi v5 direct structure or v4 attributes structure)
    const picture = 
      item?.picture ||
      item?.attributes?.picture ||
      item?.attributes?.image ||
      item?.image ||
      item?.attributes?.images ||
      item?.images
    
    // Check if picture is an array (multiple images)
    if (Array.isArray(picture) && picture.length > 0) {
      picture.forEach((imgItem: any, imgIndex: number) => {
        let imageUrl = getImageUrl(imgItem)
        
        // If getImageUrl returns null, try direct extraction
        if (!imageUrl) {
          const url = 
            imgItem?.url ||
            imgItem?.attributes?.url ||
            imgItem?.data?.attributes?.url ||
            imgItem?.data?.url
          
          if (url) {
            imageUrl = url.startsWith('http') ? url : `${API_URL}${url}`
          }
        }
        
        if (imageUrl) {
          const altText = 
            imgItem?.alternativeText ||
            imgItem?.attributes?.alternativeText ||
            imgItem?.alt ||
            imgItem?.attributes?.alt ||
            item?.title ||
            item?.attributes?.title ||
            `Гадаад харилцааны зураг ${processedImages.length + 1}`
          
          const title = 
            item?.title ||
            item?.attributes?.title ||
            item?.name ||
            item?.attributes?.name ||
            altText
          
          processedImages.push({
            url: imageUrl,
            alt: altText,
            title: title,
            original: imgItem
          })
        }
      })
    } 
    // Single picture object (Strapi v5 structure: item.picture.url)
    else if (picture && typeof picture === 'object' && !Array.isArray(picture)) {
      let imageUrl = getImageUrl(picture)
      
      // If getImageUrl returns null, try direct URL extraction
      if (!imageUrl) {
        const url = 
          picture?.url ||
          picture?.data?.url ||
          picture?.data?.attributes?.url ||
          picture?.attributes?.url
        
        if (url) {
          imageUrl = url.startsWith('http') ? url : `${API_URL}${url}`
        }
      }
      
      if (imageUrl) {
        const altText = 
          picture?.alternativeText ||
          picture?.alt ||
          picture?.data?.attributes?.alternativeText ||
          picture?.data?.alternativeText ||
          item?.title ||
          item?.attributes?.title ||
          `Гадаад харилцааны зураг ${processedImages.length + 1}`
        
        const title = 
          item?.title ||
          item?.attributes?.title ||
          item?.name ||
          item?.attributes?.name ||
          altText
        
        processedImages.push({
          url: imageUrl,
          alt: altText,
          title: title,
          original: picture
        })
      }
    }
  })
  
  // Filter out invalid images
  const validImages = processedImages.filter((img: any) => {
    return img.url && 
           img.url !== null && 
           img.url !== undefined && 
           img.url !== '' &&
           !img.url.includes('undefined') &&
           !img.url.includes('null')
  })

  // Debug logging for processed images (simplified)
  if (process.env.NODE_ENV === 'development') {
    if (validImages.length === 0) {
      console.warn(`[Foreign Relations Page] No valid images found from ${strapiImages.length} items`)
    } else {
      console.log(`[Foreign Relations Page] Processed ${validImages.length} valid images from ${strapiImages.length} items`)
    }
  }

  // Use Strapi images if available, otherwise use empty array (no fallback)
  // Fallback images are removed to avoid showing broken images
  const images = validImages

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* International Partnerships */}
        </div>

        {/* BNSNU Cooperation */}
        <div className="mt-6 sm:mt-4 md:mt-2">
          <div className="rounded-xl bg-white p-6 sm:p-8 md:p-10 shadow-lg ring-1 ring-gray-200 border-l-4 border-indigo-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-1 h-8 sm:h-10 bg-indigo-500 rounded-full mr-3 sm:mr-4"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">БНСУ-тай хамтран ажиллах</h2>
            </div>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                Манай холбоо БНСУ-ын "ДАЭ КВАНГ ХХК"-тай байгуулсан "ХАМТЫН АЖИЛЛАГААНЫ САНАМЖ БИЧИГ"-н хүрээнд өөрийн гишүүн - барилгын материалын үйлдвэрлэл эрхлэгч аж ахуй нэгжүүдийн төлөөлөлтэйгээр БНСУ-ын бетон зуурмаг, бетоны химийн нэмэлт, чулуу бутлан ангилах, асфальт бетоны үйлдвэр, лабораторийн үйл ажиллагаатай танилцах аялалыг 2024 оноос эхлээд жил бүр зохион байгуулж байна.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <span className="inline-flex items-center text-sm sm:text-base text-indigo-600 font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Хэрэгжиж байна: 2024 оноос эхлээд жил бүр
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <ForeignRelationsGallery images={images} />
      </section>
    </div>
  )
  } catch (error) {
    // If there's an error, show page with empty gallery
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-16">
          <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-lg ring-1 ring-gray-200">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Гадаад харилцаа
            </h2>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">Зургийн мэдээллийг ачаалахад алдаа гарлаа. Дахин оролдоно уу.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
