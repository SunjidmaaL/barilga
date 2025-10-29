'use client'

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

interface Training {
  id: number
  title: string
  description: string
  date: string
  location?: string
  price?: number
  image?: {
    url: string
    alternativeText?: string
  }
  attributes?: {
    title?: string
    description?: string
    date?: string
    location?: string
    price?: number
    image?: {
      data?: {
        attributes?: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
}

interface TrainingListProps {
  trainings: Training[]
}

export default function TrainingList({ trainings }: TrainingListProps) {
  if (!trainings || trainings.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-xl bg-blue-50 border-2 border-dashed border-blue-300 p-12 text-center">
          <div className="mx-auto mb-6 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Сургалт байхгүй байна</h3>
        </div>
      </section>
    )
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings.map((training) => {
        // Handle both Strapi v4 structure (attributes) and direct structure
        const attrs = training.attributes || training
        
        // Get all fields with fallbacks for both structures
        const title = attrs?.title || training.title || 'Untitled Training'
        const description = attrs?.description || training.description || 'No description available'
        const date = attrs?.date || training.date || ''
        const location = attrs?.location || training.location || ''
        const price = attrs?.price || training.price
        
        // Get image - handle Strapi image structure
        const image = attrs?.image || training.image
        let imageUrl = '/img/background.jpg'
        
        if (image && 'data' in image && image.data?.attributes?.url) {
          const url = image.data.attributes.url
          imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`
        } else if (image && 'url' in image && image.url) {
          const url = image.url
          imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`
        }

        return (
          <a key={training.id} href={`/training/${training.id}`}>
            <article className="group rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
              <div className="aspect-[16/10] w-full bg-gray-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src={imageUrl}
                  alt={title || 'Сургалт'}
                  onError={(e) => e.currentTarget.src = '/img/background1.jpg'}
                />
              </div>
              
              <div className="p-5">
                <p className="text-xs text-gray-500">
                  {formatDate(date)} • {location || 'Байршил тодорхойгүй'}
                </p>
                <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">{title}</h4>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
                {price && (
                  <div className="mt-3 text-sm font-medium text-indigo-600">
                    Үнэ: {price.toLocaleString()}₮
                  </div>
                )}
                <div className="mt-3 flex justify-end items-center text-xs">
                  <span className="text-indigo-600 font-medium flex items-center">
                    Дэлгэрэнгүй 
                    <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </a>
        )
      })}
    </section>
  )
}
