'use client'

import { useEffect, useState } from 'react'
import { getNews } from '@/lib/strapi'
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
    updatedAt?: string
  }
  // Fallback properties for direct data structure
  title?: string
  description?: string
  publishedAt?: string
  image?: any
  createdAt?: string
  updatedAt?: string
}

// Loading component for news
function NewsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 animate-pulse">
          <div className="aspect-[16/10] w-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  )
}

export default function HomepageNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        const data = await getNews()
        
        // Limit to first 3 news items for homepage display
        const limitedNews = data ? data.slice(0, 3) : []
        
        setNews(limitedNews)
      } catch (err) {
       
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(`Мэдээллийг ачаалахад алдаа гарлаа: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return <NewsLoading />
  }

  if (!news || news.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all duration-300">
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-600 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Мэдээ байхгүй байна
              </h3>
              
              {/* Decorative elements */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300 delay-100"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300 delay-200"></div>
              </div>
            </div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border border-gray-400 rounded"></div>
              <div className="absolute top-8 right-8 w-4 h-4 border border-gray-400 rounded"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 border border-gray-400 rounded"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border border-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Render actual news items */}
      {news.map((newsItem) => {
        const attributes = newsItem.attributes || newsItem
        const title = attributes?.title || 'Untitled News'
        const description = attributes?.description || 'No description available'
        const publishedAt = attributes?.publishedAt || attributes?.createdAt || ''
        const image = attributes?.image
        const imageUrl = image?.data?.attributes?.url
        const imageAlt = image?.data?.attributes?.alternativeText || title
        
        // Simple date formatting
        const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('mn-MN') : ''
        
        return (
          <NewsCard 
            key={newsItem.id}
            id={newsItem.id.toString()}
            title={title}
            description={description}
            date={formattedDate}
            image={imageUrl 
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://effortless-luck-023aebe70f.strapiapp.com'}${imageUrl}`
              : 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop'}
            alt={imageAlt || title}
          />
        )
      })}
      
      {/* Render placeholder cards for remaining slots */}
      {[...Array(3 - news.length)].map((_, i) => (
        <div key={`placeholder-${i}`} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all duration-300">
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-600 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
              Мэдээ байхгүй байна
            </h3>
            
            {/* Decorative elements */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300 delay-100"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-indigo-400 transition-colors duration-300 delay-200"></div>
            </div>
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-8 h-8 border border-gray-400 rounded"></div>
            <div className="absolute top-8 right-8 w-4 h-4 border border-gray-400 rounded"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 border border-gray-400 rounded"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border border-gray-400 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
