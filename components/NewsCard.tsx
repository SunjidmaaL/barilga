'use client'

import { useEffect, useState } from 'react'

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

  useEffect(() => {
    // Load view count from localStorage
    const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
    setViewCount(counts[id] || 0)
  }, [id])

  const handleClick = () => {
    // Increment view count
    const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
    counts[id] = (counts[id] || 0) + 1
    localStorage.setItem('newsViewCounts', JSON.stringify(counts))
    setViewCount(counts[id])
  }

  return (
    <article 
      className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 news-card cursor-pointer"
      onClick={handleClick}
    >
      <img 
        className="aspect-[16/10] w-full object-cover" 
        src={image} 
        alt={alt}
      />
      <div className="p-5">
        <p className="text-xs text-gray-500">{date}</p>
        <h4 className="mt-1 text-lg font-semibold text-gray-900">{title}</h4>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <div className="mt-3 text-xs text-gray-500">
          <span>Үзсэн:</span> <span className="view-count">{viewCount}</span>
        </div>
      </div>
    </article>
  )
}
