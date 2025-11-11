'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface GalleryImage {
  url: string
  alt: string
  title: string
}

interface ForeignRelationsGalleryProps {
  images: GalleryImage[]
}

export default function ForeignRelationsGallery({ images }: ForeignRelationsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Debug: Log when selectedImage changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Selected image changed:', selectedImage)
    }
  }, [selectedImage])

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <>
      <div className="mt-8 sm:mt-10 md:mt-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Үйлдвэрийн зурагнууд</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {images.length > 0 ? images.map((image, index) => {
            if (!image.url) return null
            
            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Image clicked:', image.url)
                  setSelectedImage(image.url)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedImage(image.url)
                  }
                }}
              >
                <div className="relative w-full h-64 sm:h-80 bg-gray-200">
                  <Image
                    src={image.url}
                    alt={image.alt || image.title}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={() => {
                      if (process.env.NODE_ENV === 'development') {
                        console.error('Image load error:', image.url)
                      }
                    }}
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-600">{image.title}</p>
                </div>
              </div>
            )
          }) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">Зураг олдсонгүй</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            console.log('Modal overlay clicked, closing modal')
            setSelectedImage(null)
          }}
        >
          <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Хаах"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[90vh]">
              <Image
                src={selectedImage}
                alt={images.find(img => img.url === selectedImage)?.alt || 'Зураг'}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
