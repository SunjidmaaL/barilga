export default function MembersPage() {
  
  const memberServices = [
    {
      title: 'Эрх зүйн хамгаалалт',
      description: 'МБМҮХ-ны гишүүдийн болон тухайн салбарын эрх ашгийг хохироосон эрх зүйн акт, бусад бичиг баримт шийдвэрийг хянан үзэх, өөрчлөх, хүчингүй болгох талаар санал бэлтгэж холбогдох байгууллагад тавих, шийдвэрлэх',
      icon: '⚖️',
      color: 'blue',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Мэдээлэл үйлчилгээ',
      description: 'Байгууллага, гишүүдийг барилгын материал үйлдвэрлэлийн техник, технологи, эдийн засаг-санхүү, зах зээл үнийн тухай болон холбогдох хууль тогтоомж ба бусад мэдээллээр хангах, үйлчлэх',
      icon: '📊',
      color: 'purple',
      borderColor: 'border-purple-500'
    },
    {
      title: 'Хөрөнгө оруулалтын дэмжлэг',
      description: 'Үйлдвэрээ байгуулах, өргөтгөх, шинэчлэх төсөлдөө хөрөнгө оруулагч ба таатай нөхцөл бүхий зээл олгоход нь бодитой үр дүнд хүртэл туслах',
      icon: '💰',
      color: 'green',
      borderColor: 'border-green-500'
    },
    {
      title: 'Олон улсын хамтын ажиллагаа',
      description: 'Гишүүдийг үйлдвэрлэлийн үр ашгаа нэмэгдүүлэх, гадаад зах зээлд гарч ажиллах, гадаадын болон олон улсын байгууллагуудтай үйлдвэрлэл, худалдааны болон шинжлэх ухаан техникийн шууд хамтын ажиллагаа тогтоох, хамтын үйлдвэр, олон улсын аж ахуйн нэгж байгуулах, энэ салбарт хамтын ажиллагааны шинэ хэлбэрүүдийг эзэмших зэрэг асуудлаар аж ахуйн нэгж байгууллагад туслалцаа үзүүлэх олон хэлбэрийн арга хэмжээ зохион байгуулах',
      icon: '🌏',
      color: 'indigo',
      borderColor: 'border-indigo-500'
    },
    {
      title: 'Хууль эрх зүйн зөвлөгөө',
      description: 'Гишүүд хоорондын маргаан, гишүүд ба бусад хуулийн этгээд, хувь хүмүүсийн хооронд гарсан маргааны асуудлаар гишүүдэд хууль эрх зүйн талаар зөвлөгөө өгөх',
      icon: '📋',
      color: 'amber',
      borderColor: 'border-amber-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Membership Description */}
        <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            Гишүүнчлэлийн тухай
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">
              МБМҮХ нь гишүүд, дэмжигчидтэй байна. МБМҮХ-ны дүрмийг зөвшөөрч, МБМҮХ-оос явуулах үйл ажиллагааг дэмжиж буй <span className="font-semibold text-blue-700">дотоод, гадаадын байгууллага</span>, <span className="font-semibold text-indigo-700">хувь хүмүүс</span> МБМҮХ-ны гишүүнээр элсэх болно.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="rounded-xl bg-white p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            Гишүүдэд үзүүлэх үйлчилгээ
          </h2>

          <div className="space-y-6">
            {memberServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-gray-50 rounded-xl p-6 border-l-4 ${service.borderColor}`}
              >
                <div className="flex items-start gap-4">

                  <div className="flex-1">

                    <p className="text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
