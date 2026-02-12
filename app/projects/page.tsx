import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import { getMemberNews, getImageUrl } from '@/lib/strapi'

interface MemberNewsItem {
  id: number | string
  documentId?: number | string
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    createdAt?: string
    image?: any
  }
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  createdAt?: string
  image?: any
}

function MemberNewsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
            <div className="aspect-[16/10] w-full bg-gray-200"></div>
            <div className="p-5 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

async function MemberNewsContent() {
  let news: MemberNewsItem[] = []
 
  try {
    const result = await getMemberNews()
    news = (Array.isArray(result) ? result : []) as MemberNewsItem[]
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_STRAPI === 'true') {
      console.log('[Projects Page] Member news fetched:', {
        count: news?.length || 0,
        isArray: Array.isArray(news),
        firstItem: news?.[0] ? {
          id: news[0].id,
          hasAttributes: !!news[0].attributes,
          title: news[0].attributes?.title || news[0].title
        } : null
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_STRAPI === 'true') {
      console.error('[Projects Page] Error fetching member news:', error);
    }
    news = [];
  }

  if (!news || !Array.isArray(news) || news.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-10 sm:p-12 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Мэдээ хараахан алга</h3>
          <p className="text-sm sm:text-base text-gray-600">Гишүүн байгууллагуудын мэдээг Strapi-д нэмээд эндээс автоматаар харна.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {news.map((item: MemberNewsItem, index: number) => {
          // Handle different Strapi data structures
          const attrs = item.attributes || item
          const itemId = item.id || item.documentId || index
          
          // Get image URL with fallback
          const imageData = attrs?.image || item.image
          const imageUrl = getImageUrl(imageData) || '/img/background.jpg'
          
          // Get date with fallback
          const dateValue = attrs?.publishedAt || attrs?.createdAt || item.publishedAt || item.createdAt || ''
          const formattedDate = dateValue
            ? new Date(dateValue).toLocaleDateString('mn-MN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })
            : ''

          // Get title and description with fallbacks
          const title = attrs?.title || item.title || 'Гишүүн байгууллагын мэдээ'
          const description = attrs?.description || attrs?.content || item.description || item.content || 'Мэдээлэл байхгүй байна.'
          
          // Get alt text for image
          const imageAlt = attrs?.image?.data?.attributes?.alternativeText 
            || attrs?.image?.alternativeText
            || imageData?.data?.attributes?.alternativeText
            || imageData?.alternativeText
            || title

          // Debug logging for first item
          if (process.env.NODE_ENV === 'development' && index === 0) {
            console.log('[Projects Page] First news item:', {
              id: itemId,
              title,
              hasImage: !!imageData,
              imageUrl,
              dateValue,
              formattedDate
            });
          }

          return (
            <NewsCard
              key={itemId}
              id={itemId.toString()}
              hrefPrefix="projects"
              title={title}
              description={description}
              date={formattedDate}
              image={imageUrl}
              alt={imageAlt}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function MemberProjectsNewsPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 text-center sm:text-left">
            Гишүүн байгууллагууд
          </h1>
        </div>
      </section>

      <Suspense fallback={<MemberNewsLoading />}>
        <MemberNewsContent />
      </Suspense>
    </>
  )
}
