'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { getFeaturedCategories, getCategories } from '@/lib/strapi'

interface Category {
  id: number
  attributes: {
    title: string
    description: string
    image?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
  }
}

export default function HeroSlider() {
  const swiperRef = useRef<any>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Default slides as fallback
  const defaultSlides = [
    {
      id: 1,
      image: '/img/background.jpg',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    },
    {
      id: 2,
      image: '/img/background1.jpg',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    },
    {
      id: 3,
      image: '/img/background2.jpg',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    }
  ]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // First try to get featured categories
        let data = await getFeaturedCategories()
        
        // If no featured categories, try to get all categories
        if (!data || data.length === 0) {
          data = await getCategories()
        }
        
        setCategories(data || [])
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  // Convert categories to slides format
  const slides = categories.length > 0 
    ? categories.map(category => ({
        id: category.id,
        image: category.attributes.image?.data?.attributes?.url || '/img/background.jpg',
        title: category.attributes.title || 'Барилгын материал',
        subtitle: category.attributes.description || 'Найдвартай нийлүүлэлт'
      }))
    : defaultSlides

  // Loading state
  if (loading) {
    return (
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ачааллаж байна...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[60vh] md:h-[80vh]">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic overlay text - will be updated by Swiper */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <p className="uppercase text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight tracking-wide break-words">
            Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо
          </p>
        </div>
        
          <div className="mt-6 sm:mt-8 flex justify-center">
            <a 
              href="#projects" 
              className="pointer-events-auto inline-flex items-center rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-bold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 transform hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: 'oklch(70.7% 0.165 254.624)' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Гишүүн байгууллагууд
            </a>
          </div>
      </div>
    </section>
  )
}