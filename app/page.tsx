'use client'

import { useEffect, useRef } from 'react'
import HeroSlider from '@/components/HeroSlider'
import HomepageNews from '@/components/HomepageNews'
import FeaturedProjects from '@/components/FeaturedProjects'
import TrainingAnnouncements from '@/components/TrainingAnnouncements'

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll('.counter')
    if (!('IntersectionObserver' in window) || counters.length === 0) return

    let animated = false
    const animate = (el: Element, target: number) => {
      const duration = 1200
      const start = performance.now()
      const startVal = 0
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const value = Math.floor(startVal + (target - startVal) * progress)
        el.textContent = value.toString()
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          counters.forEach((c) => {
            const target = Number(c.getAttribute('data-target') || '0')
            animate(c, target)
          })
          io.disconnect()
        }
      })
    }, { threshold: 0.3 })

    if (statsRef.current) {
      io.observe(statsRef.current)
    }

    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Projects */}
      <section id="projects" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex items-end justify-between mb-10">
          <h3 className="text-3xl font-semibold text-gray-800">Гишүүн байгууллагууд</h3>
        </div>
        <FeaturedProjects />
      </section>

      {/* News */}
      <section id="news" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex items-end justify-between mb-10">
          <h3 className="text-3xl font-semibold text-gray-800">Шинэ мэдээ</h3>
          <a href="/news" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-medium">
            Бүгдийг үзэх →
          </a>
        </div>
        <HomepageNews />
      </section>

      {/* Trainings */}
      <section id="trainings" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-3xl font-semibold text-gray-800">Сургалтын зар</h3>
            <a href="/training" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-medium">
              Цааш үзэх →
            </a>
          </div>
          <TrainingAnnouncements />
        </div>
      </section>
    </>
  )
}
