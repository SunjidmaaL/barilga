'use client'

import { useState } from 'react'
import RegistrationForm from './RegistrationForm'

// Helper function to format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

interface Training {
  id: number
  title: string
  description: string
  date: string
  location?: string
  price?: number
  registration_url?: string
  image?: {
    url: string
    alternativeText?: string
  }
  attributes?: {
    title?: string
    description?: string
    date?: string
    location?: string
    price?: number
    registration_url?: string
    image?: {
      data?: {
        attributes?: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
}

interface TrainingListProps {
  trainings: Training[]
}

export default function TrainingList({ trainings }: TrainingListProps) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState('')

  const handleRegistrationClick = (trainingTitle: string) => {
    setSelectedTraining(trainingTitle)
    setIsRegistrationOpen(true)
  }

  if (!trainings || trainings.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Сургалт олдсонгүй</h3>
          <p className="text-gray-600">Одоогоор зохион байгуулах сургалт байхгүй байна.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training) => {
          // Get image URL from Strapi structure
          const imageUrl = training.attributes?.image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${training.attributes.image.data.attributes.url}`
            : training.image?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${training.image.url}`
            : '/img/training1.jpg' // fallback image

          return (
            <div key={training.id} className="rounded-xl bg-white shadow ring-1 ring-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
              {/* Training Image */}
              <div className="aspect-[16/10] w-full relative bg-gray-100 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  src={imageUrl}
                  alt={training.attributes?.image?.data?.attributes?.alternativeText || training.image?.alternativeText || training.attributes?.title || training.title || 'Сургалт'}
                  onError={(e) => {
                    e.currentTarget.src = '/img/training1.jpg'
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="text-sm text-gray-500">
                  {formatDate(training.attributes?.date || training.date)} • {training.attributes?.location || training.location || 'Байршил тодорхойгүй'}
                </div>
                <h4 className="mt-2 text-lg font-semibold text-gray-900">{training.attributes?.title || training.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{training.attributes?.description || training.description}</p>
                {(training.attributes?.price || training.price) && (
                  <div className="mt-3 text-sm font-medium text-indigo-600">
                    Үнэ: {(training.attributes?.price || training.price).toLocaleString()}₮
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <a 
                    href={`/training/${training.id}`}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    Дэлгэрэнгүй
                  </a>
                  <button 
                    onClick={() => handleRegistrationClick(training.attributes?.title || training.title)}
                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                  >
                    Бүртгүүлэх
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        trainingTitle={selectedTraining}
      />
    </>
  )
}
