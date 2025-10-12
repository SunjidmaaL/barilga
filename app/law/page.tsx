import { Suspense } from 'react'
import { getLaws } from '@/lib/strapi'

interface LawData {
  id: number
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  document?: {
    url: string
    name?: string
    mime?: string
  }
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    date?: string
    document?: {
      data?: {
        attributes?: {
          url: string
          name?: string
          mime?: string
        }
      }
    }
  }
}

// Loading component
function LawLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Desktop Loading */}
      <div className="hidden md:block rounded-xl bg-white shadow ring-1 ring-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                  Хуулийн нэр
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Огноо
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Loading */}
      <div className="md:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow ring-1 ring-gray-200 p-4 animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="mt-3">
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Law content component
async function LawContent() {
  const lawsData: LawData[] = await getLaws()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {lawsData && lawsData.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-xl bg-white shadow ring-1 ring-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                      Хуулийн нэр
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Огноо
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lawsData.map((law, index) => {
                    // Get document URL from Strapi structure
                    const documentUrl = law.attributes?.document?.data?.attributes?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.attributes.document.data.attributes.url}`
                      : law.document?.url 
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.document.url}`
                      : '#'

                    const title = law.attributes?.title || law.title || 'Хууль эрх зүйн баримт'
                    // Strapi-ийн date талбарыг ашиглах (publishedAt биш)
                    const publishedDate = law.attributes?.date
                    
                    // Debug огноо
                    console.log('Law data:', law)
                    console.log('Published date raw:', publishedDate)
                    
                    let formattedDate = 'Тодорхойгүй'
                    if (publishedDate) {
                      try {
                        let date
                        
                        // Strapi-аас ирж байгаа огноо "MM/DD/YYYY" форматаар байж болно
                        if (typeof publishedDate === 'string' && publishedDate.includes('/')) {
                          // "08/08/2024" форматыг parse хийх
                          const parts = publishedDate.split('/')
                          if (parts.length === 3) {
                            // MM/DD/YYYY -> YYYY-MM-DD болгож ISO форматаар parse хийх
                            const [month, day, year] = parts
                            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
                          } else {
                            date = new Date(publishedDate)
                          }
                        } else {
                          // ISO форматаар байвал шууд parse хийх
                          date = new Date(publishedDate)
                        }
                        
                        if (!isNaN(date.getTime())) {
                          formattedDate = date.toLocaleDateString('mn-MN')
                          console.log('Successfully formatted date:', formattedDate)
                        } else {
                          console.log('Invalid date, showing raw value:', publishedDate)
                          formattedDate = publishedDate.toString()
                        }
                      } catch (error) {
                        console.error('Date formatting error:', error)
                        formattedDate = publishedDate.toString()
                      }
                    }
                    
                    return (
                      <tr key={law.id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formattedDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <a 
                            href={documentUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Татаж авах
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {lawsData.map((law, index) => {
              // Get document URL from Strapi structure
              const documentUrl = law.attributes?.document?.data?.attributes?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.attributes.document.data.attributes.url}`
                : law.document?.url 
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.document.url}`
                : '#'

              const title = law.attributes?.title || law.title || 'Хууль эрх зүйн баримт'
              // Strapi-ийн date талбарыг ашиглах (publishedAt биш)
              const publishedDate = law.attributes?.date
              
              // Debug огноо
              console.log('Mobile Law data:', law)
              console.log('Mobile Published date raw:', publishedDate)
              
              let formattedDate = 'Тодорхойгүй'
              if (publishedDate) {
                try {
                  let date
                  
                  // Strapi-аас ирж байгаа огноо "MM/DD/YYYY" форматаар байж болно
                  if (typeof publishedDate === 'string' && publishedDate.includes('/')) {
                    // "08/08/2024" форматыг parse хийх
                    const parts = publishedDate.split('/')
                    if (parts.length === 3) {
                      // MM/DD/YYYY -> YYYY-MM-DD болгож ISO форматаар parse хийх
                      const [month, day, year] = parts
                      date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
                    } else {
                      date = new Date(publishedDate)
                    }
                  } else {
                    // ISO форматаар байвал шууд parse хийх
                    date = new Date(publishedDate)
                  }
                  
                  if (!isNaN(date.getTime())) {
                    formattedDate = date.toLocaleDateString('mn-MN')
                    console.log('Mobile Successfully formatted date:', formattedDate)
                  } else {
                    console.log('Mobile Invalid date, showing raw value:', publishedDate)
                    formattedDate = publishedDate.toString()
                  }
                } catch (error) {
                  console.error('Mobile Date formatting error:', error)
                  formattedDate = publishedDate.toString()
                }
              }
              
              return (
                <div key={law.id || index} className="bg-white rounded-lg shadow ring-1 ring-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2">
                      {title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="mt-3">
                    <a 
                      href={documentUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Татаж авах
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional Information Section */}
          <div className="mt-12">
            <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Хууль эрх зүйн актын зохицуулалт</h2>
            </div>
          </div>

        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-6xl">📄</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Хууль эрх зүйн баримт олдсонгүй</h3>
          <p className="text-gray-600">Одоогоор харуулах хууль эрх зүйн баримт байхгүй байна.</p>
        </div>
      )}
    </section>
  )
}

export default function LawPage() {
  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Хууль эрх зүйн орчин</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Барилгын салбарт мөрдөх хууль, журам, стандарт, дүрэм.
          </p>
        </div>
      </section>

      <Suspense fallback={<LawLoading />}>
        <LawContent />
      </Suspense>
    </>
  )
}
