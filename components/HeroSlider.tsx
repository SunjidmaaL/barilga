'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getSlides } from '@/lib/strapi'

interface Slide {
  id: number
  name?: string
  image?: Array<{
    url: string
    alternativeText?: string
  }>
}

const defaultSlides = [
  { id: 1, image: '/img/background.jpg' },
  { id: 2, image: '/img/background1.jpg' },
  { id: 3, image: '/img/background2.jpg' }
]

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSlides()
      .then(data => {
        setSlides(data || [])
        setLoading(false)
      })
      .catch(() => {
        setSlides([])
        setLoading(false)
      })
  }, [])

  const displaySlides = slides.length > 0 ? slides : defaultSlides
  const hasMultiple = displaySlides.length > 1


  const getImageUrl = (slide: any) => {
    if (typeof slide.image === 'string') {
      return slide.image
    }
    
    const imageData = slide.image?.[0]
    if (!imageData?.url) return '/img/background.jpg'
    
    return imageData.url.startsWith('http') 
      ? imageData.url 
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageData.url}`
  }

  if (loading) {
    return (
      <section className="relative h-[60vh] md:h-[80vh]">
        {/* Loading Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-pulse">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Ачааллаж байна...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[60vh] md:h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={hasMultiple}
        autoplay={hasMultiple ? {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        speed={800}
        pagination={hasMultiple ? { clickable: true } : false}
        navigation={hasMultiple}
        className="h-full w-full"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div 
              className="relative w-full h-full min-h-[60vh] md:min-h-[80vh] bg-cover bg-center transition-opacity duration-500"
              style={{ backgroundImage: `url(${getImageUrl(slide)})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="max-w-7xl text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide">
          Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо
        </h1>
        
        <a 
          href="#members" 
          className="pointer-events-auto mt-8 inline-flex items-center rounded-full px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: 'oklch(70.7% 0.165 254.624)' }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Гишүүн байгууллагууд
        </a>
      </div>
    </section>
  )
}
