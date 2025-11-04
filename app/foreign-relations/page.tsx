import { getForeignRelationsImages, getImageUrl } from '@/lib/strapi'
import ForeignRelationsGallery from './ForeignRelationsGallery'

export default async function ForeignRelationsPage() {
  // Fetch images from Strapi
  const strapiImages = await getForeignRelationsImages()

  // Debug: Log Strapi images
  if (process.env.NODE_ENV === 'development') {
    console.log('Foreign Relations Images Debug:', {
      strapiImagesLength: strapiImages?.length || 0,
      strapiImages: strapiImages
    })
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
      picture.forEach((imgItem: any) => {
        let imageUrl = getImageUrl(imgItem)
        
        // If getImageUrl returns null, try direct extraction
        if (!imageUrl) {
          const url = 
            imgItem?.url ||
            imgItem?.attributes?.url ||
            imgItem?.data?.attributes?.url
          
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
            `Үйлдвэрийн зураг ${processedImages.length + 1}`
          
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
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`Image ${processedImages.length}:`, { 
              imageUrl, 
              altText, 
              title
            })
          }
        }
      })
    } 
    // Single picture object (Strapi v5 structure: item.picture.url)
    else if (picture && typeof picture === 'object' && !Array.isArray(picture)) {
      let imageUrl = getImageUrl(picture)
      
      // If getImageUrl returns null, try direct URL extraction
      if (!imageUrl && picture.url) {
        imageUrl = picture.url.startsWith('http') ? picture.url : `${API_URL}${picture.url}`
      }
      
      if (imageUrl) {
        const altText = 
          picture?.alternativeText ||
          picture?.alt ||
          item?.title ||
          item?.attributes?.title ||
          `Үйлдвэрийн зураг ${processedImages.length + 1}`
        
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
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Image ${processedImages.length}:`, { 
            imageUrl, 
            altText, 
            title
          })
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`No image URL found for item ${itemIndex + 1}:`, {
            picture,
            item
          })
        }
      }
    }
    else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`No picture found for item ${itemIndex + 1}:`, {
          itemKeys: Object.keys(item || {}),
          item
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

  // Debug: Log processed images
  if (process.env.NODE_ENV === 'development') {
    console.log('Processed Images:', validImages)
    console.log('Processed Images Count:', validImages.length)
    console.log('All processed images (including invalid):', processedImages)
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
}
