'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsCardProps {
  id: string
  title: string
  description: string
  date: string
  image: string
  alt: string
  hrefPrefix?: string
}

export default function NewsCard({ id, title, description, date, image, alt, hrefPrefix = 'news' }: NewsCardProps) {
  const [viewCount, setViewCount] = useState(0)
  const storageKey = `${hrefPrefix}-${id}`

  useEffect(() => {
    try {
      const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
      setViewCount(counts[storageKey] || 0)
    } catch {
      setViewCount(0)
    }
  }, [storageKey])

  const handleClick = () => {
    try {
      const counts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}')
      counts[storageKey] = (counts[storageKey] || 0) + 1
      localStorage.setItem('newsViewCounts', JSON.stringify(counts))
      setViewCount(counts[storageKey])
    } catch {
      // Ignore errors
    }
  }

  return (
    <Link href={`/${hrefPrefix}/${id}`} onClick={handleClick}>
      <article className="group rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
        <div className="aspect-[16/10] w-full bg-gray-100">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            src={image || '/img/background.jpg'}
            alt={alt || title}
          />
        </div>
        
        <div className="p-5">
          <p className="text-xs text-gray-500">{date}</p>
          <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">{title}</h4>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
          
          <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
            <span>Үзсэн: <span className="font-medium">{viewCount}</span></span>
            <span className="text-indigo-600 font-medium flex items-center">
              Дэлгэрэнгүй 
              <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
