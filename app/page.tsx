import HeroSlider from '@/components/HeroSlider'
import HomepageNews from '@/components/HomepageNews'
import MemberCategories from '@/components/MemberCategories'
import TrainingAnnouncements from '@/components/TrainingAnnouncements'
import { getSlides, getTrainings } from '@/lib/strapi'

export default async function HomePage() {
  // Fetch data server-side to reduce client-side API calls
  // Use Promise.allSettled to handle errors gracefully
  const results = await Promise.allSettled([
    getSlides(),
    getTrainings()
  ])
  
  // Extract data from results, handling errors gracefully
  const slides = results[0].status === 'fulfilled' 
    ? (Array.isArray(results[0].value) ? results[0].value : [])
    : [];
  const trainings = results[1].status === 'fulfilled' 
    ? (Array.isArray(results[1].value) ? results[1].value : [])
    : [];

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider initialSlides={slides} />

      {/* Member Categories */}
      <section id="members" className="max-w-7xl mx-auto py-6 sm:py-8 md:py-16 lg:py-20 px-4 sm:px-6">
        <div className="flex items-end justify-between mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Гишүүн байгууллагууд
            </h3>
          </div>
        </div>
        <MemberCategories />
      </section>

      {/* News */}
      <section id="news" className="max-w-7xl mx-auto py-6 sm:py-8 md:py-16 lg:py-20 px-4 sm:px-6">
        <div className="flex items-end justify-between mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Шинэ мэдээ</h3>
          <a href="/news" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-sm md:text-base">
            Цааш үзэх →
          </a>
        </div>
        <HomepageNews />
      </section>

      {/* Trainings */}
      <section id="trainings" className="bg-gray-50 py-6 sm:py-8 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Сургалт</h3>
            <a href="/training" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-sm md:text-base">
              Цааш үзэх →
            </a>
          </div>
          <TrainingAnnouncements initialTrainings={trainings} />
        </div>
      </section>
    </>
  )
}
