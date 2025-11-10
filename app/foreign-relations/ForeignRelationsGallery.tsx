'use client'

import Image from 'next/image'
import { useState } from 'react'

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
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="relative w-full h-64 sm:h-80 bg-gray-200">
                  <Image
                    src={image.url}
                    alt={image.alt || image.title}
                    fill
                    className="object-cover"
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
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
