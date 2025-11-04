import { getNewsById, getNews, getImageUrl } from '@/lib/strapi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface NewsItem {
  id: number
  attributes?: {
    title?: string
    description?: string
    content?: string
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
    updatedAt?: string
  }
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  image?: any
  createdAt?: string
  updatedAt?: string
}

// Helper function to format date consistently
function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

export async function generateStaticParams() {
  try {
    const news = await getNews()
    return news?.map((item: NewsItem) => ({
      id: item.id.toString(),
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const newsItem = await getNewsById(params.id)
  
  if (!newsItem) {
    return {
      title: 'Мэдээ олдсонгүй',
    }
  }

  const attributes = newsItem.attributes || newsItem
  const title = attributes?.title || 'Мэдээ'
  const description = attributes?.description || attributes?.content || ''

  return {
    title,
    description,
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await getNewsById(params.id)

  if (!newsItem) {
    notFound()
  }

  // Safe access to news data with fallbacks
  const attributes = newsItem.attributes || newsItem
  const title = attributes?.title || newsItem.title || 'Untitled News'
  const description = attributes?.description || newsItem.description || ''
  
  // Get content from multiple possible locations
  // Strapi Rich Text field might return HTML string or JSON structure
  let content = attributes?.content || newsItem.content || ''
  
  // If content is a string but might be HTML, check if it contains HTML tags
  const hasHtmlTags = typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content)
  
  const publishedAt = attributes?.publishedAt || attributes?.createdAt || newsItem.publishedAt || newsItem.createdAt || ''
  const image = attributes?.image || newsItem.image
  const imageUrl = getImageUrl(image)
  const imageAlt = image?.data?.attributes?.alternativeText || image?.alternativeText || title
  
  // Format date
  const formattedDate = formatDate(publishedAt)

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link 
            href="/news" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Мэдээний жагсаалт руу буцах
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image */}
          {imageUrl && (
            <div className="aspect-[16/9] w-full relative bg-gray-100 overflow-hidden">
              <Image 
                className="object-cover" 
                src={imageUrl}
                alt={imageAlt || title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Date */}
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{formattedDate}</p>
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h1>
            
            {/* Description */}
            {description && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">{description}</p>
            )}
            
            {/* Content */}
            {content && content.trim() && (
              <div 
                className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4 sm:mt-6 prose prose-sm sm:prose-base max-w-none"
                {...(hasHtmlTags ? { dangerouslySetInnerHTML: { __html: content } } : {})}
              >
                {!hasHtmlTags && content}
              </div>
            )}
            
            {/* Fallback message if no content */}
            {!content && !description && (
              <div className="text-gray-500 text-center py-8">
                <p>Мэдээлэл байхгүй байна.</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
