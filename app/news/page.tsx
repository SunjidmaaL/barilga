import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import { getNews } from '@/lib/strapi'

// Loading component
function NewsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 animate-pulse">
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
  const newsData = await getNews()

  if (!newsData || newsData.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Мэдээ олдсонгүй</h3>
          <p className="text-gray-600">Одоогоор харуулах мэдээ байхгүй байна.</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>API URL: {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}</p>
            <p>Endpoint: /api/news2</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news) => (
          <NewsCard 
            key={news.id} 
            id={news.id.toString()}
            title={news.title}
            description={news.description || news.content}
            date={new Date(news.publishedAt).toLocaleDateString('mn-MN')}
            image={news.image?.url 
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${news.image.url}`
              : 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop'
            }
            alt={news.image?.alternativeText || news.title}
          />
        ))}
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
          <p className="mt-3 text-gray-600 max-w-3xl">
            Салбарын чиг хандлага, дотоод мэдээ, үйл ажиллагааны шинэчлэл.
          </p>
        </div>
      </section>

      <Suspense fallback={<NewsLoading />}>
        <NewsContent />
      </Suspense>
    </>
  )
}
