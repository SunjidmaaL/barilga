'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

export default function HeroSlider() {
  const swiperRef = useRef<any>(null)

  const slides = [
    {
      id: 1,
      image: '/img/background.jpg',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2069&auto=format&fit=crop',
      title: 'Барилгын бүх төрлийн материал',
      subtitle: 'Найдвартай нийлүүлэлт, өргөн сонголтыг бид танд хүргэнэ'
    }
  ]

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

      {/* Overlay text */}
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
