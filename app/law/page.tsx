import { Suspense } from 'react'
import { getLaws } from '@/lib/strapi'
import ComparisonTable from '@/components/ComparisonTable'

interface LawData {
  id: number
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  documentId?: string
  document?: {
    url?: string
    name?: string
    mime?: string
    data?: {
      url?: string
      attributes?: {
        url: string
        name?: string
        mime?: string
      }
    }
  }
  file?: {
    url?: string
    name?: string
    mime?: string
    id?: number
    documentId?: string
    data?: {
      url?: string
      attributes?: {
        url: string
        name?: string
        mime?: string
      }
    }
  }
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    date?: string
    documentId?: string
    document?: {
      url?: string
      data?: {
        url?: string
        attributes?: {
          url: string
          name?: string
          mime?: string
        }
      }
    }
    file?: {
      url?: string
      name?: string
      mime?: string
      id?: number
      documentId?: string
      data?: {
        url?: string
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 sm:pb-12 md:pb-16">
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
      <div className="md:hidden space-y-3 sm:space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow ring-1 ring-gray-200 p-3 sm:p-4 animate-pulse">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Helper function to get document URL from various Strapi structures
function getDocumentUrl(law: LawData): string {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  // Priority 1: Check for 'file' field (common in populated Strapi responses)
  // Structure 1: attributes.file.url (most common - direct file URL)
  if (law.attributes?.file?.url) {
    const url = law.attributes.file.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 2: file.url (direct structure)
  if (law.file?.url) {
    const url = law.file.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 3: attributes.file.data.attributes.url (nested populated relation)
  if (law.attributes?.file?.data?.attributes?.url) {
    const url = law.attributes.file.data.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 4: file.data.attributes.url (nested structure)
  if (law.file?.data?.attributes?.url) {
    const url = law.file.data.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Priority 2: Check for 'document' field (alternative naming)
  // Structure 5: attributes.document.data.attributes.url (populated relation)
  if (law.attributes?.document?.data?.attributes?.url) {
    const url = law.attributes.document.data.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 6: attributes.document.data.url (alternative structure)
  if (law.attributes?.document?.data?.url) {
    const url = law.attributes.document.data.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 7: document.url (direct structure)
  if (law.document?.url) {
    const url = law.document.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Structure 8: attributes.document.url (alternative)
  if (law.attributes?.document?.url) {
    const url = law.attributes.document.url
    return url.startsWith('http') ? url : `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  
  // Priority 3: Fallback to file ID from file object
  const fileId = law.attributes?.file?.id || law.file?.id || law.attributes?.file?.documentId || law.file?.documentId
  if (fileId) {
    // Use the file's documentId for upload/files endpoint
    return `${strapiUrl}/api/upload/files/${fileId}`
  }
  
  // Priority 4: Fallback to documentId
  const documentId = law.attributes?.documentId || law.documentId
  if (documentId) {
    return `${strapiUrl}/api/upload/files/${documentId}`
  }
  
  return '#'
}

// Law content component
async function LawContent() {
  const lawsData: LawData[] = await getLaws()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 sm:pb-12 md:pb-16">
      {/* Барилгын материалын үйлдвэрлэлийн хууль эрх зүйн орчин */}
      <div>
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Барилгын материалын үйлдвэрлэлийн хууль эрх зүйн орчин
              </h2>
              
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                {/* 2004-2008 оны хөгжлийн үе */}
                <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border-l-4 border-blue-500">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-blue-800">1</span>
                    </div>
                    2004-2008 оны хөгжлийн үе
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                    <p className="text-xs sm:text-sm md:text-base">
                      <strong className="text-blue-800">2004 онд</strong> Засгийн газрын 2005 оны 144 дүгээр тогтоолоор батлагдсан 
                      <span className="bg-blue-100 px-2 py-1 rounded font-semibold">"40,000 орон сууц хөтөлбөр"</span>-ийг 
                      хэрэгжүүлэх арга замыг тодорхойлсон хэсэгт:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-xs sm:text-sm md:text-base">
                      <li>Барилгын материалын жижиг дунд үйлдвэрийг хөгжүүлж, шууд болон шууд бус замаар шинэ ажлын байр бий болгох</li>
                      <li>Барилгын материалын чанарын төлөө хүлээх хариуцлагын тогтолцоог бий болгож</li>
                      <li>Барилгын материалын үйлдвэрлэл эрхлэх асуудлыг тусгай зөвшөөрөлтэй болгох</li>
                    </ul>
                    <p className="text-xs sm:text-sm md:text-base">
                      <strong className="text-blue-800">2007 онд</strong> "БМҮ-ийн салбарыг 2007-2015 он хүртэл хөгжүүлэх мастер төлөвлөгөө"-г 
                      МБМҮХолбоо санаачлан, БХБЯ-дэмжиж, ЗГ-ын 2007 оны 222 дугаар тогтоолоор батлуулж байсан.
                    </p>
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Үр дүн:</p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700">
                        2004-2008 оны хооронд <span className="font-bold text-green-600">100 гаруй үйлдвэр</span> шинээр байгуулагдаж 
                        үйлдвэрийн тоо <span className="font-bold text-green-600">250-д хүрсэн</span> юм.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2003-2010 оны бодлогын дэмжлэг */}
                <div className="bg-green-50 rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border-l-4 border-green-500">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-green-800">2</span>
                    </div>
                    2003-2010 оны бодлогын дэмжлэг
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                    <p>
                      <strong className="text-green-800">Цемент, бетон зуурмагийн үйлдвэрлэлийг</strong> хөгжүүлэхэд бодлогоор дэмжихэд:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Гаалийн татварын чөлөөлөлт</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Тоног төхөөрөмжийг гаалийн татвараас чөлөөлөх</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Импортын татварын нэмэгдүүлэлт</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Хөнгөн бетон, тоосгоны татварын хэмжээг нэмэгдүүлэх</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base">
                      <strong className="text-green-800">2005 оны 193 тоот тогтоолоор</strong> барилгын салбарт техникийн шинэчлэлт хийх 
                      зориулалттай зарим материал, тоног төхөөрөмжийг Гаалийн болон НӨАТ-аас чөлөөлөх шийдвэр гаргасан.
                    </p>
                  </div>
                </div>

                {/* 2012-2025 оны тусгай зөвшөөрлийн үе */}
                <div className="bg-purple-50 rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border-l-4 border-purple-500">
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-purple-800">3</span>
                    </div>
                    2012-2025 оны тусгай зөвшөөрлийн үе
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                    <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 sm:mb-4 text-base sm:text-lg">МБМҮХолбоо-ийн үйл ажиллагаа</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-xs sm:text-sm md:text-base">
                          <strong>2012 оны 12 дугаар сарын 28-наас</strong> эхлэн 
                          <strong>2025 оны 01-р сарын байдлаар</strong> үйлдвэр дээр эксперт групп ажиллуулан 
                          <span className="bg-purple-100 px-2 py-1 rounded font-bold text-purple-800">771 аж ахуйн нэгжид</span> 
                          Барилгын материалын үйлдвэрлэл эрхлэх тусгай зөвшөөрөл олгосон.
                        </p>
                        <div className="bg-purple-100 rounded-lg p-3 sm:p-4">
                          <p className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">Хууль эрх зүйн үндэслэл:</p>
                          <p className="text-xs sm:text-sm text-purple-800">
                            "Зөвшөөрлийн тухай хууль" (Шинэчилсэн найруулга) 8.1 дүгээр зүйл. Тусгай зөвшөөрлийн жагсаалт 3.3-т 
                            "даацын хийц, бүтээц, эдлэхүүн, материал түүний түүхий эд болон шатамхай, химийн хортой, эрчим хүчний 
                            хэмнэлттэй бүтээгдэхүүн үйлдвэрлэх" үйл ажиллагааг тусгай зөвшөөрөлтэйгөөр эрхлэхээр заасан.
                          </p>
                        </div>
                        
                        {/* Хуулийн дэлгэрэнгүй мэдээлэл */}
                        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 border-2 border-purple-200 mt-3 sm:mt-4">
                          <h5 className="font-bold text-purple-900 mb-3 sm:mb-4 text-base sm:text-lg">Засгийн Газрын 2022 оны 06 сарын 17-ны өдрийн "ЗӨВШӨӨРЛИЙН ТУХАЙ" хууль</h5>
                          
                          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-gray-700">
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-purple-400">
                              <h6 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Хуулийн зорилго:</h6>
                              <p className="text-xs sm:text-sm">
                                Үндэсний аюулгүй байдал, нийтийн ашиг сонирхол, хүн амын эрүүл мэнд, хүрээлэн байгаа орчин, 
                                санхүүгийн тогтвортой байдалд эрсдэл учруулж болзошгүй үйл ажиллагаа, эсхүл тусгай болзол, 
                                шаардлагыг хангасны үндсэн дээр хэрэгжүүлэх мэргэжлийн үйл ажиллагаа, эсхүл ашиг олох зорилгоор 
                                болон үйлдвэрлэлийн зориулалтаар байгалийн баялаг, төрийн нийтийн өмчийг хязгаартайгаар ашиглуулахад 
                                тусгай зөвшөөрөл олгоно.
                              </p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-400">
                              <h6 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">НАЙМДУГААР БҮЛЭГ. ЗӨВШӨӨРЛӨӨР ЭРХЛЭХ ҮЙЛ АЖИЛЛАГАА</h6>
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm md:text-base">8.1 дүгээр зүйл. Тусгай зөвшөөрлийн жагсаалт</p>
                                  <p className="text-xs sm:text-sm text-gray-600">
                                    Барилга, хот байгуулалт, нийтийн аж ахуйн чиглэлээр доор дурдсан үйл ажиллагааг 
                                    тусгай зөвшөөрөлтэйгөөр эрхлэх бөгөөд дараах этгээд олгоно:
                                  </p>
                                </div>
                                <div className="bg-white rounded p-2 sm:p-3 border border-blue-200">
                                  <p className="font-semibold text-blue-800 mb-1 text-xs sm:text-sm">3.3. Барилгын материалын үйлдвэрлэл</p>
                                  <p className="text-xs sm:text-sm text-gray-700">
                                    Даацын хийц, бүтээц, эдлэхүүн, материал түүний түүхий эд болон шатамхай, химийн хортой, 
                                    эрчим хүчний хэмнэлттэй бүтээгдэхүүн үйлдвэрлэх
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Түүхэн мэдээлэл */}
                    <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 border-2 border-purple-200 mt-3 sm:mt-4">
                      <h5 className="font-bold text-purple-900 mb-3 sm:mb-4 text-base sm:text-lg">Түүхэн хөгжлийн мэдээлэл</h5>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border-l-4 border-yellow-400">
                          <h6 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">2002 он - Анхны үе</h6>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Барилгын материалын үйлдвэрлэл тусгай зөвшөөрөлтэй байсан 2002 онд 
                            <span className="font-bold text-yellow-700">57 аж ахуйн нэгж</span> барилгын материалын үйлдвэрлэл эрхэлж байсан.
                          </p>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 sm:p-4 border-l-4 border-green-400">
                          <h6 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">2009-2012 он - Хөгжлийн үе</h6>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
                            Тусгай зөвшөөрлийг 2009 оноос Газрын харилцаа, барилга, геодези зураг зүйн газраас эрхлэн өгч эхэлсэн:
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                            <div className="text-center bg-white rounded p-2 border border-green-200">
                              <div className="text-lg font-bold text-green-600">2009</div>
                              <div className="text-xs text-gray-600">7 аж ахуй</div>
                            </div>
                            <div className="text-center bg-white rounded p-2 border border-green-200">
                              <div className="text-lg font-bold text-green-600">2010</div>
                              <div className="text-xs text-gray-600">43 аж ахуй</div>
                            </div>
                            <div className="text-center bg-white rounded p-2 border border-green-200">
                              <div className="text-lg font-bold text-green-600">2011</div>
                              <div className="text-xs text-gray-600">30 аж ахуй</div>
                            </div>
                            <div className="text-center bg-white rounded p-2 border border-green-200">
                              <div className="text-lg font-bold text-green-600">2012</div>
                              <div className="text-xs text-gray-600">18 аж ахуй</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 sm:p-5 md:p-6 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2 sm:mb-3 text-base sm:text-lg">Үр дүн</h4>
                      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">1,200+</div>
                          <div className="text-xs sm:text-sm text-purple-800">Аж ахуйн нэгж, хувь хүмүүс</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">771</div>
                          <div className="text-xs sm:text-sm text-blue-800">Тусгай зөвшөөрөл олгосон</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Хууль эрх зүйн актын зохицуулалт */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-gray-400">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-gray-800">4</span>
                    </div>
                    Хууль эрх зүйн актын зохицуулалт
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                    <p>
                      Барилгын материалын үйлдвэрлэлийн салбарт мөрдөх гол хууль эрх зүйн актууд:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Үндсэн хууль</h4>
                        <ul className="text-xs sm:text-sm space-y-1 text-gray-600">
                          <li>• Зөвшөөрлийн тухай хууль</li>
                          <li>• Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил, үйлчилгээ худалдан авах тухай хууль</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Тусгай зөвшөөрөл</h4>
                        <ul className="text-xs sm:text-sm space-y-1 text-gray-600">
                          <li>• Барилгын материалын үйлдвэрлэл эрхлэх тусгай зөвшөөрөл</li>
                          <li>• Эксперт группээр шалгах журам</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Хуулийн хүснэгт */}
      {lawsData && lawsData.length > 0 && (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg bg-gray-50 shadow ring-1 ring-gray-200 overflow-hidden mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-12">
            <div className="overflow-x-auto ">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
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
                    // Get document URL from Strapi structure using helper function
                    const documentUrl = getDocumentUrl(law)
                    const documentId = law.attributes?.documentId || law.documentId

                    const title = law.attributes?.title || law.title || 'Хууль эрх зүйн баримт'
                    // Strapi-ийн date талбарыг ашиглах (publishedAt биш)
                    const publishedDate = law.attributes?.date
                    
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
                            href={documentUrl !== '#' ? `/api/download?url=${encodeURIComponent(documentUrl)}` : (documentId ? `/api/download?id=${encodeURIComponent(documentId)}` : '#')}
                            download
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
          <div className="md:hidden space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {lawsData.map((law, index) => {
              // Get document URL from Strapi structure using helper function
              const documentUrl = getDocumentUrl(law)
              const documentId = law.attributes?.documentId || law.documentId

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
                <div key={law.id || index} className="bg-gray-50 rounded-lg shadow ring-1 ring-gray-200 p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 flex-1 pr-2">
                      {title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <a 
                      href={documentUrl !== '#' ? `/api/download?url=${encodeURIComponent(documentUrl)}` : (documentId ? `/api/download?id=${encodeURIComponent(documentId)}` : '#')}
                      download
                      className="inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
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
        </>
      )}

      {/* Additional Information Section */}
      <div className="mt-6 sm:mt-8 md:mt-12">
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Хууль эрх зүйн актын зохицуулалт</h2>
          <ComparisonTable />
        </div>
      </div>
    </section>
  )
}

export default function LawPage() {
  return (
    <>

      <Suspense fallback={<LawLoading />}>
        <LawContent />
      </Suspense>
    </>
  )
}
