'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTrainings } from '@/lib/strapi'
import Link from 'next/link'
import TrainingRegistrationModal from '@/components/TrainingRegistrationModal'

interface Training {
  id: number
  attributes?: {
    title?: string
    description?: string
    content?: string
    date?: string
    location?: string
    price?: number
    registration_url?: string
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
  date?: string
  location?: string
  price?: number
  registration_url?: string
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

export default function TrainingDetailPage() {
  const params = useParams()
  const trainingId = params?.id as string
  const [training, setTraining] = useState<Training | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadTraining = async () => {
      if (!trainingId) return

      try {
        setLoading(true)
        
        const allTrainings = await getTrainings()
        
        // Find the specific training by ID
        const foundTraining = allTrainings?.find((item: Training) => item.id.toString() === trainingId)
        
        if (!foundTraining) {
          throw new Error('Сургалт олдсонгүй')
        }
        
        setTraining(foundTraining)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(`Мэдээллийг ачаалахад алдаа гарлаа: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    loadTraining()
  }, [trainingId])

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
              <h3 className="text-lg font-medium text-red-800 mb-2">Сургалт олдсонгүй</h3>
              <p className="text-red-600">{error}</p>
            </div>
            <Link 
              href="/training" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Сургалтын жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!training) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Сургалт олдсонгүй</h1>
            <p className="text-gray-600 mb-8">Хүссэн сургалт олдсонгүй байна.</p>
            <Link 
              href="/training" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Сургалтын жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Safe access to training data with fallbacks
  const attributes = training.attributes || training
  const title = attributes?.title || 'Untitled Training'
  const description = attributes?.description || ''
  const content = attributes?.content || description
  const date = attributes?.date || ''
  const location = attributes?.location || ''
  const price = attributes?.price
  const image = attributes?.image
  
  // Get image URL from Strapi structure
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  let imageUrl = '/img/training1.jpg'
  let imageAlt = title
  
  if (image && 'data' in image && image.data?.attributes?.url) {
    const url = image.data.attributes.url
    imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`
    imageAlt = image.data.attributes.alternativeText || title
  } else if (image && 'url' in image && image.url) {
    const url = image.url
    imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`
    imageAlt = image.alternativeText || title
  }
  
  // Format date
  const formattedDate = formatDate(date)

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link 
            href="/training" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Сургалтын жагсаалт руу буцах
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image */}
          <div className="aspect-[16/9] w-full relative bg-gray-100 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={imageUrl}
              alt={imageAlt}
              onError={(e) => {
                e.currentTarget.src = '/img/training1.jpg'
              }}
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Meta info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              {formattedDate && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>
              )}
              {location && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </div>
              )}
              {price && (
                <div className="flex items-center text-indigo-600 font-semibold">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {price.toLocaleString()}₮
                </div>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h1>
            
            {/* Description */}
            {description && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">{description}</p>
            )}
            
            {/* Content */}
            {content && content !== description && (
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
