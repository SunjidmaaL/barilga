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
          <div className="p-5">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  )
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

export default function HomepageNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        console.log('🔍 Loading news for homepage...')
        
        const data = await getNews()
        console.log('News API result:', data)
        
        // Limit to first 3 news items for homepage display
        const limitedNews = data ? data.slice(0, 3) : []
        console.log('Limited news for homepage:', limitedNews)
        
        setNews(limitedNews)
      } catch (err) {
        console.error('❌ Failed to load news:', err)
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

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Алдаа гарлаа</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Мэдээ олдсонгүй</h3>
        <p className="text-gray-600">Одоогоор харуулах мэдээ байхгүй байна.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((newsItem, index) => {
        // Debug: Log news structure
        console.log(`News ${index + 1} structure:`, newsItem)
        
        // Safe access to news data with fallbacks
        const attributes = newsItem.attributes || newsItem
        const title = attributes?.title || 'Untitled News'
        const description = attributes?.description || 'No description available'
        const publishedAt = attributes?.publishedAt || attributes?.createdAt || ''
        const image = attributes?.image
        const imageUrl = image?.data?.attributes?.url
        const imageAlt = image?.data?.attributes?.alternativeText || title
        
        // Format date
        const formattedDate = formatDate(publishedAt)
        
        console.log(`News ${index + 1} processed:`, { 
          title, 
          description, 
          formattedDate, 
          imageUrl, 
          imageAlt 
        })
        
        // Transform to NewsCard format
        const newsCardData = {
          id: newsItem.id.toString(),
          title,
          description,
          date: formattedDate,
          image: imageUrl 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`
            : 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop',
          alt: imageAlt || title
        }
        
        return (
          <NewsCard 
            key={newsItem.id} 
            {...newsCardData}
          />
        )
      })}
    </div>
  )
}
