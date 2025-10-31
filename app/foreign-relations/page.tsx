'use client'

export default function ForeignRelationsPage() {
  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Гадаад харилцаа</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* International Partnerships */}
          <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Олон улсын хамтрагч байгууллагууд</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l-4 border-indigo-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Хөгжлийн туслалцааны байгууллагууд</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Олон улсын хөгжлийн банк, НҮБ-ын агентлагуудтай хамтран ажиллаж буй төслүүд.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Техникийн туслалцаа</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Японы JICA, Солонгосын KOICA зэрэг байгууллагуудтай хамтран хийгдэж буй төслүүд.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ази-Номхон далайн хамтын ажиллагаа</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  APEC, ASEAN+3 зэрэг бүс нутгийн хамтын ажиллагааны байгууллагуудтай хамтран ажиллах.
                </p>
              </div>
            </div>
          </div>

          {/* Current Projects */}
          <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Одоо хэрэгжиж буй төслүүд</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Байгаль орчны хамгаалалт</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Ногоон хөгжлийн сангийн дэмжлэгтэйгээр хэрэгжиж буй байгаль орчны хамгаалалтын төслүүд.
                </p>
                <span className="inline-block mt-2 text-sm text-indigo-600 font-medium">
                  Төсөл: 2024-2026
                </span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Технологийн шилжилт</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
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
        <div className="mt-6 sm:mt-8 md:mt-12">
          <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Олон улсын арга хэмжээ, уулзалт</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 sm:p-5 md:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Хөгжлийн санал асуулга</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Олон улсын хөгжлийн төлөвлөлтийн уулзалт, санал асуулгад оролцох.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-5 md:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Техникийн семинар</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Олон улсын мэргэжилтнүүдтэй хамтран зохион байгуулж буй семинарууд.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-5 md:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Хамтын ажиллагааны форум</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Бүс нутгийн хамтын ажиллагааны форум, чуулга уулзалтад оролцох.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
