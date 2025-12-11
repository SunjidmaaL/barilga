import { Suspense } from 'react'
import { getTrainings, getTrainingAnkets } from '@/lib/strapi'
import TrainingList from '@/components/TrainingList'

// Loading component
function TrainingLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </section>
  )
}

// Training content component
async function TrainingContent() {
  try {
    const trainingsData = await getTrainings() || []
    return <TrainingList trainings={Array.isArray(trainingsData) ? trainingsData : []} />
  } catch (error) {
    // If there's an error, show empty list
    return <TrainingList trainings={[]} />
  }
}

// Training Anket content component
async function TrainingAnketContent() {
  try {
    const anketData = await getTrainingAnkets()
    
    let fileUrl = ''
    
    if (anketData) {
      // Handle different Strapi data structures
      const attrs = anketData.attributes || anketData
      
      // Try multiple possible field names for the file
      const file = attrs?.file || attrs?.anket || attrs?.form || attrs?.document || attrs?.pdf
      
      // Get file URL - handle various Strapi response structures
      if (file) {
        // Case 1: file.data.attributes.url (Strapi v4 standard)
        if (file?.data?.attributes?.url) {
          fileUrl = file.data.attributes.url
        }
        // Case 2: file.data.url (alternative structure)
        else if (file?.data?.url) {
          fileUrl = file.data.url
        }
        // Case 3: file.attributes.url (nested attributes)
        else if (file?.attributes?.url) {
          fileUrl = file.attributes.url
        }
        // Case 4: file.url (direct URL)
        else if (file?.url) {
          fileUrl = file.url
        }
        // Case 5: Array of files (take first)
        else if (Array.isArray(file?.data) && file.data.length > 0) {
          const firstFile = file.data[0]
          fileUrl = firstFile?.attributes?.url || firstFile?.url || ''
        }
        // Case 6: Direct array
        else if (Array.isArray(file) && file.length > 0) {
          const firstFile = file[0]
          fileUrl = firstFile?.attributes?.url || firstFile?.data?.attributes?.url || firstFile?.url || ''
        }
        
        // Prepend Strapi URL if relative path
        if (fileUrl && !fileUrl.startsWith('http')) {
          fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${fileUrl}`
        }
      }
    }
    
    // Build download URL using the API route
    const downloadUrl = fileUrl ? `/api/download?url=${encodeURIComponent(fileUrl)}` : '#'
    
    // Debug logging in development (simplified)
    if (process.env.NODE_ENV === 'development') {
      if (!anketData) {
        console.warn('[Training Page] No anket data received from API')
      } else if (!fileUrl) {
        console.warn('[Training Page] Anket data received but no file URL found')
      }
    }
    
    // If no file URL, return disabled button
    if (!fileUrl) {
      return (
        <button
          disabled
          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Анкет байхгүй байна</span>
        </button>
      )
    }
    
    return (
      <a
        href={downloadUrl}
        download
        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Анкет татаж авах</span>
      </a>
    )
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Training Page] Error in TrainingAnketContent:', error)
    }
    
    // If there's an error, return disabled button
    return (
      <button
        disabled
        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Анкет байхгүй байна</span>
      </button>
    )
  }
}

export default function TrainingPage() {
  return (
    <>
      {/* BMUS Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10">
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" />
              </svg>
            </div>
            МБМҮХолбооны дэргэдэх сургалтын "БМҮС" ХХК
          </h2>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700 text-justify leading-relaxed">
            <p>
              МБМҮХолбооны сургалтын төв нь "БМҮС" ХХК нь 2010 оноос эхлэн барилгын материалын үйлдвэрийн
              мэргэжилтэй ажилчин бэлтгэх сургалтыг зохион байгуулж байна. Тус сургалтын төв нь хот, хөдөөгийн
              ажил олгогч байгууллага, хөдөлмөрийн хэлтэсүүдтэй хамтран чадамжинд суурилсан сургалтын хөтөлбөрийг Барилгын материалын үйлдвэрлэлийн мэргэжлийн чиглэлээр боловсруулан хэрэгжүүлж байна.
            </p>

            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-blue-500">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Үндсэн мэргэжлүүд</h3>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-700">
                <li>БМҮ-ийн тоног төхөөрөмжийн оператор</li>
                <li>БМҮ-ийн тоног төхөөрөмжийн засварчин</li>
                <li>БМҮ-ийн техник лаборант</li>
                <li>Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн сургалт</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<TrainingLoading />}>
        <TrainingContent />
      </Suspense>

      {/* Training Application Form Download Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 pb-6 sm:pb-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 border border-blue-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Сургалтын анкет
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Сургалтад бүртгүүлэхийн тулд анкетыг татаж аваад бөглөнө үү.
                </p>
              </div>
            </div>
            <Suspense fallback={
              <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            }>
              <TrainingAnketContent />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
