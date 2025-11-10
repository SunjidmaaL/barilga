'use client'

interface Training {
  id: number
  attributes?: {
    title?: string
    description?: string
    date?: string
    location?: string
    price?: number
    createdAt?: string
    image?: {
      data?: {
        attributes?: {
          url: string
          alternativeText?: string
        }
      }
    }
  }
  title?: string
  description?: string
  date?: string
  location?: string
  price?: number
  createdAt?: string
  image?: {
    url: string
    alternativeText?: string
  }
}

interface TrainingAnnouncementsProps {
  initialTrainings?: Training[]
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

export default function TrainingAnnouncements({ initialTrainings }: TrainingAnnouncementsProps) {
  // Use server-provided data if available
  // Ensure trainings is always an array
  const trainings = (initialTrainings && Array.isArray(initialTrainings) && initialTrainings.length > 0) 
    ? initialTrainings.slice(0, 3) 
    : []


  const EmptyCard = () => (
    <div className="rounded-xl bg-blue-50 border-2 border-dashed border-blue-300 p-4 sm:p-6 md:p-8 text-center">
      <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">Сургалт байхгүй байна</h3>
    </div>
  )

  if (trainings.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(3)].map((_, i) => <EmptyCard key={i} />)}
      </div>
    )
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {trainings.map((training) => {
        // Handle both Strapi v4 structure (attributes) and direct structure
        // Support nested attributes as well as flat structure
        const attrs = training.attributes || training
        
        // Get title - check both attributes.title and training.title
        const title = attrs?.title || training.title || 'Untitled Training'
        
        // Get description - check both attributes.description and training.description
        const description = attrs?.description || training.description || 'No description available'
        
        // Get date - check multiple possible locations
        const date = attrs?.date || training.date || attrs?.createdAt || training.createdAt || ''
        
        // Get location
        const location = attrs?.location || training.location || ''
        // Only include location if it exists, otherwise just show date
        const dateLocation = location 
          ? `${formatDate(date)} • ${location}` 
          : formatDate(date)
        
        // Get price
        const price = attrs?.price || training.price
        
        // Get image - handle Strapi image structure
        const image = attrs?.image || training.image
        let imageUrl = '/img/training1.jpg'
        
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
                  alt={title}
                  onError={(e) => e.currentTarget.src = '/img/training1.jpg'}
                />
              </div>
              
              <div className="p-4 sm:p-5">
                <p className="text-xs text-gray-500">
                  {dateLocation || 'Огноо тодорхойгүй'}
                </p>
                <h4 className="mt-1 text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                  {title}
                </h4>
                <p className="mt-2 text-gray-600 text-xs sm:text-sm line-clamp-3">
                  {description}
                </p>
                {price && (
                  <div className="mt-3 text-xs sm:text-sm font-medium text-indigo-600">
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

      {[...Array(3 - trainings.length)].map((_, i) => (
        <EmptyCard key={`empty-${i}`} />
      ))}
    </div>
  )
}
