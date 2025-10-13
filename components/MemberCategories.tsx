'use client'

import Link from 'next/link'

interface Category {
  id: number
  title: string
  icon: JSX.Element
  color: string
  gradient: string
  href: string
}

export default function MemberCategories() {
  const categories: Category[] = [
    {
      id: 1,
      title: 'Гишүүнчлэл',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      href: '/members',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Төслүүд',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-50 to-pink-50',
      href: '/projects',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Мэргэжлийн баг',
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-50 to-red-50',
      href: '/expert-team',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={category.href}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          
          {/* Animated Background Shape */}
          <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${category.color} rounded-full opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}></div>
          
          {/* Content */}
          <div className="relative p-8 z-10">
            {/* Icon Container */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6`}>
              {category.icon}
            </div>

            {/* Title */}
            <div className="mb-6">
              <h4 className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 leading-tight">
                {category.title}
              </h4>
            </div>

            {/* Button/Link */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center text-indigo-600 text-sm font-semibold group-hover:text-indigo-700 transition-colors duration-300">
                Дэлгэрэнгүй
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              {/* Decorative Line */}
              <div className="h-px flex-1 ml-4 bg-gradient-to-r from-gray-300 to-transparent group-hover:from-indigo-400 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Bottom Accent Border */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
        </Link>
      ))}
    </div>
  )
}
