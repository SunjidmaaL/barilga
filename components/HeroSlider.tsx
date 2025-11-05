'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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

interface HeroSliderProps {
  initialSlides?: Slide[]
}

export default function HeroSlider({ initialSlides }: HeroSliderProps) {
  // Use server-provided data if available, otherwise use defaults
  const slides = initialSlides || []

  const displaySlides = slides.length > 0 ? slides : defaultSlides
  const hasMultiple = displaySlides.length > 1

  const getImageUrl = (slide: any) => {
    // Handle default slides (string image)
    if (typeof slide.image === 'string') {
      return slide.image
    }
    
    // Handle Strapi v4 structure with attributes
    const attrs = slide.attributes || slide
    const image = attrs?.image || slide.image
    
    // Handle Strapi media structure
    if (image?.data) {
      const imageData = Array.isArray(image.data) ? image.data[0] : image.data
      const url = imageData?.attributes?.url || imageData?.url
      if (url) {
        return url.startsWith('http') 
          ? url 
          : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
      }
    }
    
    // Handle array of images
    if (Array.isArray(image) && image[0]) {
      const url = image[0]?.url || image[0]?.attributes?.url
      if (url) {
        return url.startsWith('http') 
          ? url 
          : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
      }
    }
    
    return '/img/background.jpg'
  }

  return (
    <section className="relative h-screen w-full -mt-20">
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
              className="relative w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
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
