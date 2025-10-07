import { Suspense } from 'react'
import { getTrainings } from '@/lib/strapi'
import TrainingList from '@/components/TrainingList'

// Loading component
function TrainingLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200 animate-pulse">
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
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Сургалт</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Мэргэжлийн хөгжлийн сургалтууд, семинар, воркшопууд.
          </p>
        </div>
      </section>

      <Suspense fallback={<TrainingLoading />}>
        <TrainingContent />
      </Suspense>
    </>
  )
}
