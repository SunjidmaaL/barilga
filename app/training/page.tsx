import { Suspense } from 'react'
import { getTrainings } from '@/lib/strapi'
import TrainingList from '@/components/TrainingList'

// Loading component
function TrainingLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </section>
  )
}

// Training content component
async function TrainingContent() {
  const trainingsData = await getTrainings()

  return <TrainingList trainings={trainingsData || []} />
}

export default function TrainingPage() {
  return (
    <>
      {/* BMUS Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10">
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" />
              </svg>
            </div>
            МБМҮХолбооны дэргэдэх сургалтын "БМҮС" ХХК
          </h2>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700 text-justify leading-relaxed">
            <p>
              МБМҮХолбооны дэргэдэх сургалтын "БМҮС" ХХК нь 2010 оноос эхлэн барилгын материалын үйлдвэрийн
              мэргэжилтэй ажилчин бэлтгэх сургалтыг зохион байгуулж байна. Тус сургалтын төв нь хот, хөдөөгийн
              ажил олгогч байгууллага, хөдөлмөрийн хэлтэсүүдтэй хамтран <span className="font-medium text-gray-900">чадамжинд суурилсан сургалтын хөтөлбөрийг</span>
              Барилгын материалын үйлдвэрлэлийн мэргэжлийн чиглэлээр боловсруулан хэрэгжүүлж байна.
            </p>

            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-blue-500">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Үндсэн мэргэжлүүд</h3>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-700">
                <li>БМҮ-ийн тоног төхөөрөмжийн оператор</li>
                <li>БМҮ-ийн тоног төхөөрөмжийн засварчин</li>
                <li>БМҮ-ийн техник лаборант</li>
                <li>Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн сургалт</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<TrainingLoading />}>
        <TrainingContent />
      </Suspense>
    </>
  )
}
