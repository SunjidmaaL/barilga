'use client'

import { useEffect, useState } from 'react'
import { getTrainings } from '@/lib/strapi'

interface Training {
  id: number
  attributes?: {
    title?: string
    description?: string
    date?: string
    location?: string
    price?: number
    createdAt?: string
    image?: {
      data?: {
        attributes?: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
  title?: string
  description?: string
  date?: string
  location?: string
  price?: number
  createdAt?: string
  image?: {
    url: string
    alternativeText?: string
  }
}

function TrainingLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

export default function TrainingAnnouncements() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrainings()
      .then(data => setTrainings(data?.slice(0, 3) || []))
      .catch(() => setTrainings([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <TrainingLoading />
  }


  const EmptyCard = () => (
    <div className="rounded-xl bg-blue-50 border-2 border-dashed border-blue-300 p-8 text-center">
      <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-600">Сургалт байхгүй байна</h3>
    </div>
  )

  if (trainings.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => <EmptyCard key={i} />)}
      </div>
    )
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trainings.map((training) => {
        const attrs = training.attributes || training
        const date = attrs?.date || attrs?.createdAt || ''
        const location = attrs?.location || ''
        const dateLocation = [formatDate(date), location].filter(Boolean).join(' • ')
        
        const image = attrs?.image
        let imageUrl = '/img/training1.jpg'
        
        if (image && 'data' in image && image.data?.attributes?.url) {
          imageUrl = `${strapiUrl}${image.data.attributes.url}`
        } else if (image && 'url' in image && image.url) {
          imageUrl = `${strapiUrl}${image.url}`
        }
        
        return (
          <a key={training.id} href={`/training/${training.id}`}>
            <article className="group rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
              <div className="aspect-[16/10] w-full bg-gray-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src={imageUrl}
                  alt={attrs?.title || 'Training'}
                  onError={(e) => e.currentTarget.src = '/img/training1.jpg'}
                />
              </div>
              
              <div className="p-5">
                <p className="text-xs text-gray-500">
                  {dateLocation || 'Огноо тодорхойгүй'}
                </p>
                <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">
                  {attrs?.title || 'Untitled Training'}
                </h4>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                  {attrs?.description || 'No description available'}
                </p>
                {attrs?.price && (
                  <div className="mt-3 text-sm font-medium text-indigo-600">
                    Үнэ: {attrs.price.toLocaleString()}₮
                  </div>
                )}
                <div className="mt-3 flex justify-end items-center text-xs">
                  <span className="text-indigo-600 font-medium flex items-center">
                    Дэлгэрэнгүй 
                    <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </a>
        )
      })}

      {[...Array(3 - trainings.length)].map((_, i) => (
        <EmptyCard key={`empty-${i}`} />
      ))}
    </div>
  )
}
