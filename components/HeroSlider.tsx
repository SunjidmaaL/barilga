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
    <section className="relative h-[80vh]">
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
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Барилгын бүх төрлийн материал
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl">
          Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ
        </p>
        <div className="mt-8 flex gap-4">
          <a 
            href="#projects" 
            className="pointer-events-auto inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Төслүүд харах
          </a>
          <a 
            href="#contact" 
            className="pointer-events-auto inline-flex items-center rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors"
          >
            Холбоо барих
          </a>
        </div>
      </div>
    </section>
  )
}