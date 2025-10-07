'use client'

export default function ForeignRelationsPage() {
  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Гадаад харилцаа</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Олон улсын хамтын ажиллагаа, гадаад харилцааны чиглэлээр хийгдэж буй ажлууд, төслүүд болон хамтрагч байгууллагуудтай хамтран ажиллах талаар мэдээлэл.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* International Partnerships */}
          <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Олон улсын хамтрагч байгууллагууд</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Хөгжлийн туслалцааны байгууллагууд</h3>
                <p className="text-gray-600 mt-1">
                  Олон улсын хөгжлийн банк, НҮБ-ын агентлагуудтай хамтран ажиллаж буй төслүүд.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Техникийн туслалцаа</h3>
                <p className="text-gray-600 mt-1">
                  Японы JICA, Солонгосын KOICA зэрэг байгууллагуудтай хамтран хийгдэж буй төслүүд.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Ази-Номхон далайн хамтын ажиллагаа</h3>
                <p className="text-gray-600 mt-1">
                  APEC, ASEAN+3 зэрэг бүс нутгийн хамтын ажиллагааны байгууллагуудтай хамтран ажиллах.
                </p>
              </div>
            </div>
          </div>

          {/* Current Projects */}
          <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Одоо хэрэгжиж буй төслүүд</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Байгаль орчны хамгаалалт</h3>
                <p className="text-gray-600 mt-1">
                  Ногоон хөгжлийн сангийн дэмжлэгтэйгээр хэрэгжиж буй байгаль орчны хамгаалалтын төслүүд.
                </p>
                <span className="inline-block mt-2 text-sm text-indigo-600 font-medium">
                  Төсөл: 2024-2026
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Технологийн шилжилт</h3>
                <p className="text-gray-600 mt-1">
                  Олон улсын технологийн шилжилтийн төслүүд, сургалт, мэргэжлийн бэлтгэл.
                </p>
                <span className="inline-block mt-2 text-sm text-indigo-600 font-medium">
                  Төсөл: 2023-2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* International Events */}
        <div className="mt-12">
          <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Олон улсын арга хэмжээ, уулзалт</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Хөгжлийн санал асуулга</h3>
                <p className="text-gray-600 text-sm">
                  Олон улсын хөгжлийн төлөвлөлтийн уулзалт, санал асуулгад оролцох.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Техникийн семинар</h3>
                <p className="text-gray-600 text-sm">
                  Олон улсын мэргэжилтнүүдтэй хамтран зохион байгуулж буй семинарууд.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Хамтын ажиллагааны форум</h3>
                <p className="text-gray-600 text-sm">
                  Бүс нутгийн хамтын ажиллагааны форум, чуулга уулзалтад оролцох.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information for Foreign Relations */}
        <div className="mt-12">
          <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Гадаад харилцааны хэлтэс</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Хариуцлагатай хүн</h3>
                <p className="text-indigo-100">
                  Гадаад харилцааны хэлтсийн дарга
                </p>
                <p className="text-indigo-100 mt-1">
                  Утас: +976 99112233
                </p>
                <p className="text-indigo-100">
                  И-мэйл: foreign@barilga.mn
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Хамтрагч байгууллагууд</h3>
                <p className="text-indigo-100">
                  Олон улсын хөгжлийн байгууллагуудтай хамтран ажиллах хүсэлт, санал илгээх.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
