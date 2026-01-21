import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import { getMemberNews, getImageUrl } from '@/lib/strapi'

interface MemberNewsItem {
  id: number | string
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    createdAt?: string
    image?: any
  }
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  createdAt?: string
  image?: any
}

function MemberNewsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
            <div className="aspect-[16/10] w-full bg-gray-200"></div>
            <div className="p-5 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

async function MemberNewsContent() {
  const news = await getMemberNews()

  if (!news || !Array.isArray(news) || news.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-10 sm:p-12 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Мэдээ хараахан алга</h3>
          <p className="text-sm sm:text-base text-gray-600">Гишүүн байгууллагуудын мэдээг Strapi-д нэмээд эндээс автоматаар харна.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {news.map((item: MemberNewsItem) => {
          const attrs = item.attributes || item
          const imageUrl = getImageUrl(attrs?.image || item.image) || '/img/background.jpg'
          const dateValue = attrs?.publishedAt || attrs?.createdAt || item.publishedAt || item.createdAt || ''
          const formattedDate = dateValue
            ? new Date(dateValue).toLocaleDateString('mn-MN')
            : ''

          return (
            <NewsCard
              key={item.id}
              id={item.id.toString()}
              hrefPrefix="projects"
              title={attrs?.title || item.title || 'Гишүүн байгууллагын мэдээ'}
              description={attrs?.description || attrs?.content || item.description || item.content || 'Мэдээлэл байхгүй байна.'}
              date={formattedDate}
              image={imageUrl}
              alt={attrs?.image?.data?.attributes?.alternativeText || attrs?.title || 'Гишүүн байгууллагын мэдээ'}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function MemberProjectsNewsPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
          <p className="text-sm text-indigo-600 font-semibold mb-2">Гишүүн байгууллагууд</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Гишүүн байгууллагуудын мэдээ</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl">
            Гишүүн байгууллагуудын хүрээнд өрнөж буй мэдээ, төсөл хөтөлбөр, хамтын ажиллагааны мэдээллийг нэг дороос аваарай.
          </p>
        </div>
      </section>

      <Suspense fallback={<MemberNewsLoading />}>
        <MemberNewsContent />
      </Suspense>
    </>
  )
}
