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
        console.log('🔍 Loading training announcements...')
        
        const data = await getTrainings()
        console.log('Training announcements result:', data)
        
        // Limit to first 3 trainings for homepage display
        const limitedTrainings = data ? data.slice(0, 3) : []
        console.log('Limited trainings for homepage:', limitedTrainings)
        
        setTrainings(limitedTrainings)
      } catch (err) {
        console.error('❌ Failed to load trainings:', err)
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

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Алдаа гарлаа</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (!trainings || trainings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Сургалтын зар олдсонгүй</h3>
        <p className="text-gray-600">Одоогоор зохион байгуулах сургалт байхгүй байна.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainings.map((training, index) => {
          // Debug: Log training structure
          console.log(`Training ${index + 1} structure:`, training)
          
          // Safe access to training data with fallbacks
          const attributes = training.attributes || training
          const title = attributes?.title || 'Untitled Training'
          const description = attributes?.description || 'No description available'
          const date = attributes?.date || attributes?.createdAt || ''
          const location = attributes?.location || ''
          const price = attributes?.price
          const registrationUrl = attributes?.registration_url
          
          // Get image URL from Strapi structure
          const imageUrl = attributes?.image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.image.data.attributes.url}`
            : attributes?.image?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.image.url}`
            : '/img/training1.jpg' // fallback image
          
          // Format date and location
          const formattedDate = formatDate(date)
          const dateLocation = [formattedDate, location].filter(Boolean).join(' • ')
          
          console.log(`Training ${index + 1} processed:`, { title, description, dateLocation, price })
          
          return (
            <div key={training.id || index} className="group rounded-xl bg-white shadow ring-1 ring-gray-200 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer overflow-hidden">
              {/* Training Image */}
              <div className="aspect-[16/10] w-full relative bg-gray-100 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  src={imageUrl}
                  alt={attributes?.image?.data?.attributes?.alternativeText || attributes?.image?.alternativeText || title || 'Сургалт'}
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
