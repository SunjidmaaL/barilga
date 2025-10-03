import { Suspense } from 'react'
import { getTrainings } from '@/lib/strapi'

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

  if (!trainingsData || trainingsData.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Сургалт олдсонгүй</h3>
          <p className="text-gray-600">Одоогоор зохион байгуулах сургалт байхгүй байна.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainingsData.map((training) => (
        <div key={training.id} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200 hover:shadow-lg transition-shadow">
          <div className="text-sm text-gray-500">
            {new Date(training.date).toLocaleDateString('mn-MN')} • {training.location || 'Байршил тодорхойгүй'}
          </div>
          <h4 className="mt-2 text-lg font-semibold text-gray-900">{training.title}</h4>
          <p className="mt-2 text-sm text-gray-600">{training.description}</p>
          {training.price && (
            <div className="mt-3 text-sm font-medium text-indigo-600">
              Үнэ: {training.price.toLocaleString()}₮
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <a 
              href={`/training/${training.id}`}
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Дэлгэрэнгүй
            </a>
            {training.registration_url && (
              <a 
                href={training.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
              >
                Бүртгүүлэх
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
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
