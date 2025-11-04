import { getNews, getImageUrl } from '@/lib/strapi'
import NewsCard from './NewsCard'

interface NewsItem {
  id: number
  attributes?: {
    title?: string
    description?: string
    publishedAt?: string
    image?: {
      data?: {
        attributes?: {
          url?: string
          alternativeText?: string
        }
      }
    }
    createdAt?: string
  }
  title?: string
  description?: string
  publishedAt?: string
  image?: any
  createdAt?: string
}

export default async function HomepageNews() {
  const news = await getNews()
  const latestNews = news?.slice(0, 3) || []

  const EmptyCard = () => (
    <div className="rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 p-4 sm:p-6 md:p-8 text-center">
      <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-7 sm:w-7 md:w-8 md:h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">Мэдээ байхгүй байна</h3>
    </div>
  )

  if (latestNews.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {[...Array(3)].map((_, i) => <EmptyCard key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {latestNews.map((newsItem: NewsItem) => {
        const attrs = newsItem.attributes || newsItem
        const image = attrs?.image || newsItem.image
        const imageUrl = getImageUrl(image) || ''
        
        return (
          <NewsCard 
            key={newsItem.id}
            id={newsItem.id.toString()}
            title={attrs?.title || 'Untitled News'}
            description={attrs?.description || 'No description available'}
            date={attrs?.publishedAt || attrs?.createdAt 
              ? new Date(attrs.publishedAt || attrs.createdAt || '').toLocaleDateString('mn-MN') 
              : ''}
            image={imageUrl}
            alt={attrs?.image?.data?.attributes?.alternativeText || attrs?.title || 'News'}
          />
        )
      })}
      
      {[...Array(3 - latestNews.length)].map((_, i) => (
        <EmptyCard key={`empty-${i}`} />
      ))}
    </div>
  )
}
