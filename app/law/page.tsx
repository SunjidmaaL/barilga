export default function LawPage() {
  const documents = [
    {
      title: 'Барилгын тухай хууль',
      description: 'Албан ёсны эх сурвалж: ebarimt, legalinfo гэх мэт холбоос байрлана.',
      link: '#',
      linkText: 'Татаж авах (PDF)'
    },
    {
      title: 'Барилгын норм ба дүрэм (BNbD)',
      description: 'Сүүлд шинэчлэгдсэн хувилбарууд, мөрдөх заавар.',
      link: '#',
      linkText: 'Холбоос үзэх'
    },
    {
      title: 'Аюулгүй ажиллагааны журам',
      description: 'Ажлын байрны ХАБЭА шаардлагууд.',
      link: '#',
      linkText: 'Татаж авах (DOCX)'
    }
  ]

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Хууль эрх зүй</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Барилгын салбарт мөрдөх хууль, журам, стандарт, дүрэм.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="divide-y divide-gray-200 rounded-xl bg-white shadow ring-1 ring-gray-200">
          {documents.map((doc, index) => (
            <div key={index} className="p-6">
              <h4 className="text-lg font-semibold text-gray-900">{doc.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
              <a 
                href={doc.link} 
                className="mt-3 inline-block text-indigo-600 hover:text-indigo-500 text-sm transition-colors"
              >
                {doc.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
