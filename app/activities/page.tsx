export default function ActivitiesPage() {
  const introSections = [
    {
      title: 'Бидний тухай',
      description: 'Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо нь 2010 онд байгуулагдсан, барилгын салбарын хөгжлийг дэмжих зорилготой төрийн бус байгууллага юм.'
    },
    {
      title: 'Зорилго',
      description: 'Барилгын материал үйлдвэрлэгчдийн эрх ашгийг хамгаалах, салбарын чанарыг сайжруулах, олон улсын стандартад нийцүүлэх ажлыг зохион байгуулах.'
    },
    {
      title: 'Үнэт зүйлс',
      description: 'Чанар, найдвартай байдал, нээлттэй байдал, хамтын ажиллагаа, инноваци, байгаль орчны хамгаалалт зэрэг үнэт зүйлсээр удирдуулна.'
    },
    {
      title: 'Үйл ажиллагаа',
      description: 'Гишүүн байгууллагуудын эрх ашгийг хамгаалах, сургалт зохион байгуулах, олон улсын хамтын ажиллагаатай ажиллах, салбарын бодлого боловсруулах.'
    }
  ]

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Танилцуулга</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбооны зорилго, үнэт зүйлс, үйл ажиллагааны талаар мэдээлэл.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {introSections.map((section, index) => (
          <div key={index} className="rounded-2xl bg-white p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            <p className="mt-3 text-gray-600">{section.description}</p>
          </div>
        ))}
      </section>
    </>
  )
}
