'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NewsCardProps {
  id: string
  title: string
  description: string
  date: string
  image: string
  alt: string
}

export default function NewsCard({ id, title, description, date, image, alt }: NewsCardProps) {
  const [viewCount, setViewCount] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Load view count from localStorage
    try {
      const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
      setViewCount(counts[id] || 0)
    } catch (error) {
      console.error('Error loading view counts:', error)
      setViewCount(0)
    }
  }, [id])

  const handleClick = () => {
    try {
      // Increment view count
      const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
      counts[id] = (counts[id] || 0) + 1
      localStorage.setItem('newsViewCounts', JSON.stringify(counts))
      setViewCount(counts[id])
    } catch (error) {
      console.error('Error updating view count:', error)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Fallback image URL
  const fallbackImage = '/img/background.jpg'

  return (
    <Link href={`/news/${id}`} className="block">
      <article 
        className="group overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 hover:scale-[1.02]"
        onClick={handleClick}
      >
      <div className="aspect-[16/10] w-full relative bg-gray-100 overflow-hidden">
        {imageError ? (
          <img 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
            src={fallbackImage}
            alt={alt || title}
          />
        ) : (
          <img 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
            src={image || fallbackImage}
            alt={alt || title}
            onError={handleImageError}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 relative">
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{date}</p>
        <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">{title}</h4>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <span className="group-hover:text-gray-600 transition-colors duration-300">Үзсэн: <span className="view-count font-medium">{viewCount}</span></span>
          <span className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300 flex items-center">
            Дэлгэрэнгүй 
            <svg className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
      </article>
    </Link>
  )
}
