import HeroSlider from '@/components/HeroSlider'
import HomepageNews from '@/components/HomepageNews'
import MemberCategories from '@/components/MemberCategories'
import TrainingAnnouncements from '@/components/TrainingAnnouncements'

export default function HomePage() {

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Member Categories */}
      <section id="members" className="max-w-7xl mx-auto py-8 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="flex items-end justify-between mb-6 md:mb-8 lg:mb-10">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Гишүүн байгууллагууд
            </h3>
          </div>
        </div>
        <MemberCategories />
      </section>

      {/* News */}
      <section id="news" className="max-w-7xl mx-auto py-8 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="flex items-end justify-between mb-6 md:mb-8 lg:mb-10">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Шинэ мэдээ</h3>
          <a href="/news" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-sm md:text-base">
            Цааш үзэх →
          </a>
        </div>
        <HomepageNews />
      </section>

      {/* Trainings */}
      <section id="trainings" className="bg-gray-50 py-8 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-6 md:mb-8 lg:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Сургалтын зар</h3>
            <a href="/training" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-sm md:text-base">
              Цааш үзэх →
            </a>
          </div>
          <TrainingAnnouncements />
        </div>
      </section>
    </>
  )
}
