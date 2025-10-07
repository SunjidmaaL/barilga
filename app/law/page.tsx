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
      <div className="divide-y divide-gray-200 rounded-xl bg-white shadow ring-1 ring-gray-200">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
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
        <div className="divide-y divide-gray-200 rounded-xl bg-white shadow ring-1 ring-gray-200">
          {lawsData.map((law, index) => {
            // Get document URL from Strapi structure
            const documentUrl = law.attributes?.document?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.attributes.document.data.attributes.url}`
              : law.document?.url 
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${law.document.url}`
              : '#'

            const title = law.attributes?.title || law.title || 'Хууль эрх зүйн баримт'
            const description = law.attributes?.description || law.content || law.description || 'Тайлбар байхгүй байна.'
            const documentName = law.attributes?.document?.data?.attributes?.name || law.document?.name || 'Баримт бичиг'
            
            return (
              <div key={law.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
                <a 
                  href={documentUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-indigo-600 hover:text-indigo-500 text-sm transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {documentName}
                </a>
              </div>
            )
          })}
        </div>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Хууль эрх зүй</h1>
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
