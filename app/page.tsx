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
      <section id="members" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Гишүүн байгууллагууд
            </h3>
          </div>
        </div>
        <MemberCategories />
      </section>

      {/* News */}
      <section id="news" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex items-end justify-between mb-10">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">Шинэ мэдээ</h3>
          <a href="/news" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors duration-200">
            Цааш үзэх →
          </a>
        </div>
        <HomepageNews />
      </section>

      {/* Trainings */}
      <section id="trainings" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">Сургалтын зар</h3>
            <a href="/training" className="hidden sm:inline text-indigo-600 hover:text-indigo-500 font-semibold transition-colors duration-200">
              Цааш үзэх →
            </a>
          </div>
          <TrainingAnnouncements />
        </div>
      </section>
    </>
  )
}
