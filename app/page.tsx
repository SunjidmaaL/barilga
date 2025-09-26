'use client'

import { useEffect, useRef } from 'react'
import HeroSlider from '@/components/HeroSlider'
import NewsCard from '@/components/NewsCard'

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null)

  const newsData = [
    {
      id: 'news-1',
      title: 'Барилгын материалын үнийн индекс',
      description: 'Сүүлийн улирлын үнэлгээ болон зах зээлийн чиг хандлага.',
      date: '2025-09-20',
      image: 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop',
      alt: 'news-1'
    },
    {
      id: 'news-2',
      title: 'Ногоон барилгын стандарт нэвтэрч эхэллээ',
      description: 'Эрчим хүчний хэмнэлттэй шийдлүүдийг төслүүдэд хэрэгжүүлж байна.',
      date: '2025-09-10',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
      alt: 'news-2'
    },
    {
      id: 'news-3',
      title: 'Аюулгүй ажиллагааны сарын аян',
      description: 'Талбайн аюулгүй ажиллагааг сайжруулах шинэ дүрэм, сургалт.',
      date: '2025-08-30',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2070&auto=format&fit=crop',
      alt: 'news-3'
    }
  ]

  const trainingData = [
    {
      date: '2025-10-05 • Улаанбаатар',
      title: 'Төсвийн тооцооллын практик сургалт',
      description: 'Материалын норм, хөдөлмөр зарцуулалтын тооцоо.'
    },
    {
      date: '2025-10-18 • Дархан',
      title: 'Барилгын норм дүрэм шинэчлэл',
      description: 'BNbD шинэчлэлийн өөрчлөлт, хэрэгжилтийн зөвлөмж.'
    },
    {
      date: '2025-11-02 • Онлайн',
      title: 'Төслийн удирдлагын үндэс',
      description: 'Agile/PMBOK хосолсон богино сургалт.'
    }
  ]

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
          <h3 className="text-3xl font-semibold text-gray-800">Онцлох төслүүд</h3>
          <a href="/activities" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-medium">
            Бүгдийг үзэх →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="group relative overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
            <div className="aspect-[16/10] bg-[url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">Орон сууцны цогцолбор</h4>
              <p className="mt-2 text-gray-600 text-sm">Бүтээн байгуулалтын I ээлж амжилттай дууслаа.</p>
            </div>
          </article>
          <article className="group relative overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
            <div className="aspect-[16/10] bg-[url('https://images.unsplash.com/photo-1581093588401-16e3aa3c9551?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">Аж үйлдвэрийн барилга</h4>
              <p className="mt-2 text-gray-600 text-sm">Төмөр хийц, өндөр даацын бүтээц.</p>
            </div>
          </article>
          <article className="group relative overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
            <div className="aspect-[16/10] bg-[url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">Дэд бүтцийн төсөл</h4>
              <p className="mt-2 text-gray-600 text-sm">Зам, гүүрийн ажлууд төлөвлөгөөний дагуу.</p>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative isolate overflow-hidden py-20 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h3 className="text-3xl font-semibold">Таны дараагийн төслийг хамтдаа бүтээцгээе</h3>
              <p className="mt-4 text-white/90">Техникийн зөвлөх, тооцоолол, нийлүүлэлтээс гүйцэтгэл хүртэл бид хамт байна.</p>
            </div>
            <div className="justify-self-start lg:justify-self-end">
              <a 
                href="mailto:info@barilga.mn" 
                className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow hover:bg-gray-100 transition-colors"
              >
                Санал хүсэлт илгээх
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats" ref={statsRef} className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold text-gray-900">
              <span className="counter" data-target="250">0</span>+
            </div>
            <div className="mt-2 text-sm text-gray-600">Гүйцэтгэсэн төсөл</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gray-900">
              <span className="counter" data-target="12">0</span>+
            </div>
            <div className="mt-2 text-sm text-gray-600">Жилийн туршлага</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gray-900">
              <span className="counter" data-target="80">0</span>+
            </div>
            <div className="mt-2 text-sm text-gray-600">Хамтран ажиллагч</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gray-900">
              <span className="counter" data-target="500">0</span>+
            </div>
            <div className="mt-2 text-sm text-gray-600">Сургасан мэргэжилтэн</div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex items-end justify-between mb-10">
          <h3 className="text-3xl font-semibold text-gray-800">Шинэ мэдээ</h3>
          <a href="/news" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-medium">
            Бүгдийг үзэх →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingData.map((training, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
                <div className="text-sm text-gray-500">{training.date}</div>
                <h4 className="mt-2 text-lg font-semibold text-gray-900">{training.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{training.description}</p>
                <a 
                  href="#" 
                  className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Бүртгүүлэх
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
