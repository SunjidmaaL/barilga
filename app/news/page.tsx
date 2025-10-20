import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import { getNews } from '@/lib/strapi'

interface NewsData {
  id: number
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  image?: {
    url: string
    alternativeText?: string
  }
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
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

// Loading component
function NewsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
            <div className="aspect-[16/10] w-full bg-gray-200"></div>
            <div className="p-5">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// News content component
async function NewsContent() {
  const newsData: NewsData[] = await getNews()

  if (!newsData || newsData.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-indigo-50 rounded-2xl p-12 sm:p-16 text-center border border-indigo-200">
          <div className="mx-auto mb-6 w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Мэдээ байхгүй байна
          </h3>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news) => {
          // Get image URL from Strapi structure
          const imageUrl = news.attributes?.image?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${news.attributes.image.data.attributes.url}`
            : news.image?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${news.image.url}`
            : '/img/background.jpg'

          return (
            <NewsCard 
              key={news.id} 
              id={news.id.toString()}
              title={news.attributes?.title || news.title || 'Мэдээ'}
              description={news.attributes?.description || news.attributes?.content || news.description || news.content || 'Мэдээлэл байхгүй байна.'}
              date={(news.attributes?.publishedAt || news.publishedAt)
                ? new Date(news.attributes?.publishedAt || news.publishedAt || '').toLocaleDateString('mn-MN')
                : 'Огноо байхгүй'
              }
              image={imageUrl}
              alt={news.attributes?.image?.data?.attributes?.alternativeText || news.image?.alternativeText || news.attributes?.title || news.title || 'Мэдээ'}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function NewsPage() {
  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Мэдээ мэдээлэл</h1>
          <p className="mt-3 text-gray-600">
            Барилгын салбарын чиг хандлага, дотоод мэдээ, үйл ажиллагааны шинэчлэл.
          </p>
        </div>
      </section>

      <Suspense fallback={<NewsLoading />}>
        <NewsContent />
      </Suspense>
    </>
  )
}
