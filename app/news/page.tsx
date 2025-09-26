import NewsCard from '@/components/NewsCard'

export default function NewsPage() {
  const newsData = [
    {
      id: 'news-1',
      title: 'Барилгын материалын үнийн индекс',
      description: 'Сүүлийн улирлын үнэлгээ болон зах зээлийн чиг хандлага.',
      date: '2025-09-20',
      image: 'https://images.unsplash.com/photo-1529236183275-caea742b3443?q=80&w=2066&auto=format&fit=crop',
      alt: 'news-1'
    },
    {
      id: 'news-2',
      title: 'Ногоон барилгын стандарт нэвтэрч эхэллээ',
      description: 'Эрчим хүчний хэмнэлттэй шийдлүүдийг төслүүдэд хэрэгжүүлж байна.',
      date: '2025-09-10',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
      alt: 'news-2'
    },
    {
      id: 'news-3',
      title: 'Аюулгүй ажиллагааны сарын аян',
      description: 'Талбайн аюулгүй ажиллагааг сайжруулах шинэ дүрэм, сургалт.',
      date: '2025-08-30',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2070&auto=format&fit=crop',
      alt: 'news-3'
    }
  ]

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

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </section>
    </>
  )
}
