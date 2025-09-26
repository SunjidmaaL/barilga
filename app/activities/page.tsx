export default function ActivitiesPage() {
  const activities = [
    {
      title: 'Материал нийлүүлэлт',
      description: 'Цемент, арматур, бетон, дулаалгын материал, өнгөлгөө, инженерийн шугам сүлжээний материал.'
    },
    {
      title: 'Гүйцэтгэл',
      description: 'Барилга угсралт, заслын ажил, төмөр хийц, инженерийн шугам сүлжээ.'
    },
    {
      title: 'Техникийн зөвлөх',
      description: 'Төсөв тооцоо, зураг төслийн туслалцаа, чанарын хяналт, аюулгүй ажиллагаа.'
    },
    {
      title: 'Төхөөрөмжийн түрээс',
      description: 'Кран, авто механизм, тусгай тоног төхөөрөмжийн түрээсийн үйлчилгээ.'
    }
  ]

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Манай үйл ажиллагаа</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Материал нийлүүлэлт, барилгын гүйцэтгэл, техникийн зөвлөх үйлчилгээ, тоног төхөөрөмжийн түрээс зэрэг цогц шийдлүүдийг нэг дороос.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {activities.map((activity, index) => (
          <div key={index} className="rounded-2xl bg-white p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{activity.title}</h2>
            <p className="mt-3 text-gray-600">{activity.description}</p>
          </div>
        ))}
      </section>
    </>
  )
}
