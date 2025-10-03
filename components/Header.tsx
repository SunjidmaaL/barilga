'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Нүүр', href: '/' },
    { name: 'Үйл ажиллагаа', href: '/activities' },
    { name: 'Мэдээ мэдээлэл', href: '/news' },
    { name: 'Сургалт', href: '/training' },
    { name: 'Хууль эрх зүй', href: '/law' },
    { name: 'Тусгай зөвшөөрөл', href: '/licenses' },
    { name: 'Холбоо барих', href: '/contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Нүүр хуудас</span>
            <img 
              src="/img/logo.jpg" 
              alt="Лого" 
              className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-indigo-100" 
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-16">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className="size-6"
            >
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay with strong blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xl transition-all duration-300" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-900">Цэс</h2>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md p-2 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Цэс хаах</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation items */}
              <nav className="flex-1 px-5 py-6 bg-white/90 backdrop-blur-sm">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
