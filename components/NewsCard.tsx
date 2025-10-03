'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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
  const fallbackImage = 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop'

  return (
    <article 
      className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 news-card cursor-pointer transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="aspect-[16/10] w-full relative bg-gray-100">
        {imageError ? (
          <img 
            className="w-full h-full object-cover" 
            src={fallbackImage}
            alt={alt || title}
          />
        ) : (
          <img 
            className="w-full h-full object-cover" 
            src={image || fallbackImage}
            alt={alt || title}
            onError={handleImageError}
          />
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-gray-500">{date}</p>
        <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">{title}</h4>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <span>Үзсэн: <span className="view-count font-medium">{viewCount}</span></span>
          <span className="text-indigo-600 font-medium">Дэлгэрэнгүй →</span>
        </div>
      </div>
    </article>
  )
}
