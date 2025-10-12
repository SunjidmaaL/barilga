'use client'

// Helper function to format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

interface Training {
  id: number
  title: string
  description: string
  date: string
  location?: string
  price?: number
  registration_url?: string
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
    registration_url?: string
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-12 sm:p-16 text-center border-2 border-dashed border-indigo-200">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            {/* Text */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Сургалт байхгүй байна
            </h3>
            
            {/* Decorative dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training) => {
          // Get attributes
          const attributes = training.attributes || training
          const title = attributes.title || training.title
          const description = attributes.description || training.description
          const date = attributes.date || training.date
          const location = attributes.location || training.location
          const price = attributes.price || training.price
          
          // Get image URL from Strapi structure
          const image = attributes.image || training.image
          let imageUrl = '/img/training1.jpg'
          let imageAlt = title || 'Сургалт'
          
          if (image && 'data' in image && image.data?.attributes?.url) {
            const url = image.data.attributes.url
            imageUrl = url.startsWith('http') 
              ? url 
              : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
            imageAlt = image.data.attributes.alternativeText || title
          } else if (image && 'url' in image && image.url) {
            const url = image.url
            imageUrl = url.startsWith('http')
              ? url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
            imageAlt = image.alternativeText || title
          }

          return (
            <a 
              key={training.id}
              href={`/training/${training.id}`}
              className="block"
            >
              <article className="group overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 hover:scale-[1.02]">
                {/* Training Image */}
                <div className="aspect-[16/10] w-full relative bg-gray-100 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
                    src={imageUrl}
                    alt={imageAlt}
                    onError={(e) => {
                      e.currentTarget.src = '/img/training1.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5 relative">
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {formatDate(date)} • {location || 'Байршил тодорхойгүй'}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">{title}</h4>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
                  {price && (
                    <div className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                      Үнэ: {price.toLocaleString()}₮
                    </div>
                  )}
                  <div className="mt-3 flex justify-end items-center text-xs">
                    <span className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300 flex items-center">
                      Дэлгэрэнгүй 
                      <svg className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>
  )
}
