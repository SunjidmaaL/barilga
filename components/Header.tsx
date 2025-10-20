'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Нүүр', href: '/' },
    { name: 'Танилцуулга', href: '/activities' },
    { name: 'Мэдээ мэдээлэл', href: '/news' },
    { name: 'Сургалт', href: '/training' },
    { name: 'Хууль эрх зүй', href: '/law' },
    { name: 'Тусгай зөвшөөрөл', href: '/licenses' },
    { name: 'Гадаад харилцаа', href: '/foreign-relations' },
    { name: 'Холбоо барих', href: '/contact' },
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <img 
              src="/img/logo.jpg" 
              alt="МБМҮХ Лого" 
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shadow-md border-2 border-indigo-100" 
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu - Outside header */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100]">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Цэс</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
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
    </>
  )
}