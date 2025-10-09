'use client'

import { useEffect, useState } from 'react'
import { getTrainings } from '@/lib/strapi'
import RegistrationForm from './RegistrationForm'

interface Training {
  id: number
  attributes?: {
    title?: string
    description?: string
    date?: string
    location?: string
    price?: number
    registration_url?: string
    createdAt?: string
    updatedAt?: string
    image?: {
      data?: {
        attributes?: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
  // Fallback properties for direct data structure
  title?: string
  description?: string
  date?: string
  location?: string
  price?: number
  registration_url?: string
  createdAt?: string
  updatedAt?: string
  image?: {
    url: string
    alternativeText?: string
  }
}

// Loading component for trainings
function TrainingLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
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

export default function TrainingAnnouncements() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState('')

  const handleRegistrationClick = (trainingTitle: string) => {
    setSelectedTraining(trainingTitle)
    setIsRegistrationOpen(true)
  }

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        setLoading(true)
        const data = await getTrainings()
        
        // Limit to first 3 trainings for homepage display
        const limitedTrainings = data ? data.slice(0, 3) : []
        
        setTrainings(limitedTrainings)
      } catch (err) {
      
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(`Сургалтын мэдээллийг ачаалахад алдаа гарлаа: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    loadTrainings()
  }, [])

  if (loading) {
    return <TrainingLoading />
  }


  if (!trainings || trainings.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 hover:border-indigo-400 transition-all duration-300">
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-600 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Сургалт байхгүй байна
              </h3>
              
              {/* Decorative elements */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors duration-300 delay-100"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors duration-300 delay-200"></div>
              </div>
            </div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border border-blue-400 rounded"></div>
              <div className="absolute top-8 right-8 w-4 h-4 border border-blue-400 rounded"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 border border-blue-400 rounded"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border border-blue-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainings.map((training) => {
          const attributes = training.attributes || training
          const title = attributes?.title || 'Untitled Training'
          const description = attributes?.description || 'No description available'
          const date = attributes?.date || attributes?.createdAt || ''
          const location = attributes?.location || ''
          const price = attributes?.price
          
          // Get image URL from Strapi structure
          const image = attributes?.image
          let imageUrl = '/img/training1.jpg'
          let imageAlt = title
          
          if (image && 'data' in image && image.data?.attributes?.url) {
            imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.data.attributes.url}`
            imageAlt = image.data.attributes.alternativeText || title
          } else if (image && 'url' in image && image.url) {
            imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.url}`
            imageAlt = image.alternativeText || title
          }
          
          const formattedDate = formatDate(date)
          const dateLocation = [formattedDate, location].filter(Boolean).join(' • ')
          
          return (
            <div key={training.id} className="group rounded-xl bg-white shadow ring-1 ring-gray-200 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer overflow-hidden">
              {/* Training Image */}
              <div className="aspect-[16/10] w-full relative bg-gray-100 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  src={imageUrl}
                  alt={imageAlt}
                  onError={(e) => {
                    e.currentTarget.src = '/img/training1.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {dateLocation || 'Огноо тодорхойгүй'}
                </div>
                <h4 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {description}
                </p>
                {price && (
                  <div className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                    Үнэ: {price.toLocaleString()}₮
                  </div>
                )}
                <button 
                  onClick={() => handleRegistrationClick(title)}
                  className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors duration-300"
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        trainingTitle={selectedTraining}
      />
    </>
  )
}
