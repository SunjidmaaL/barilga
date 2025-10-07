'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getNews } from '@/lib/strapi'
import Link from 'next/link'

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
  // Fallback properties for direct data structure
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

export default function NewsDetailPage() {
  const params = useParams()
  const newsId = params?.id as string
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNewsItem = async () => {
      if (!newsId) return

      try {
        setLoading(true)
        console.log('🔍 Loading news item with ID:', newsId)
        
        const allNews = await getNews()
        console.log('All news data:', allNews)
        
        // Find the specific news item by ID
        const foundNews = allNews?.find((item: NewsItem) => item.id.toString() === newsId)
        console.log('Found news item:', foundNews)
        
        if (!foundNews) {
          throw new Error('Мэдээ олдсонгүй')
        }
        
        setNewsItem(foundNews)
      } catch (err) {
        console.error('❌ Failed to load news item:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(`Мэдээллийг ачаалахад алдаа гарлаа: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    loadNewsItem()
  }, [newsId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Алдаа гарлаа</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-red-800 mb-2">Мэдээ олдсонгүй</h3>
              <p className="text-red-600">{error}</p>
            </div>
            <Link 
              href="/news" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Мэдээний жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Мэдээ олдсонгүй</h1>
            <p className="text-gray-600 mb-8">Хүссэн мэдээ олдсонгүй байна.</p>
            <Link 
              href="/news" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Мэдээний жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Safe access to news data with fallbacks
  const attributes = newsItem.attributes || newsItem
  const title = attributes?.title || 'Untitled News'
  const description = attributes?.description || ''
  const content = attributes?.content || description
  const publishedAt = attributes?.publishedAt || attributes?.createdAt || ''
  const image = attributes?.image
  const imageUrl = image?.data?.attributes?.url
  const imageAlt = image?.data?.attributes?.alternativeText || title
  
  // Format date
  const formattedDate = formatDate(publishedAt)
  
  // Fallback image URL
  const fallbackImage = 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop'

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
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
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image */}
          <div className="aspect-[16/9] w-full relative bg-gray-100 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={imageUrl 
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`
                : fallbackImage
              }
              alt={imageAlt || title}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Date */}
            <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
            
            {/* Description */}
            {description && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{description}</p>
            )}
            
            {/* Content */}
            {content && content !== description && (
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
