export default function MembersPage() {
  
  const memberServices = [
    {
      description: 'МБМҮХ-ны гишүүдийн болон тухайн салбарын эрх ашгийг хохироосон эрх зүйн акт, бусад бичиг баримт шийдвэрийг хянан үзэх, өөрчлөх, хүчингүй болгох талаар санал бэлтгэж холбогдох байгууллагад тавих, шийдвэрлэх',
      borderColor: 'border-blue-500'
    },
    {
      description: 'Байгууллага, гишүүдийг барилгын материал үйлдвэрлэлийн техник, технологи, эдийн засаг-санхүү, зах зээл үнийн тухай болон холбогдох хууль тогтоомж ба бусад мэдээллээр хангах, үйлчлэх',
      borderColor: 'border-purple-500'
    },
    {
      description: 'Үйлдвэрээ байгуулах, өргөтгөх, шинэчлэх төсөлдөө хөрөнгө оруулагч ба таатай нөхцөл бүхий зээл олгоход нь бодитой үр дүнд хүртэл туслах',
      borderColor: 'border-green-500'
    },
    {   
      description: 'Гишүүдийг үйлдвэрлэлийн үр ашгаа нэмэгдүүлэх, гадаад зах зээлд гарч ажиллах, гадаадын болон олон улсын байгууллагуудтай үйлдвэрлэл, худалдааны болон шинжлэх ухаан техникийн шууд хамтын ажиллагаа тогтоох, хамтын үйлдвэр, олон улсын аж ахуйн нэгж байгуулах, энэ салбарт хамтын ажиллагааны шинэ хэлбэрүүдийг эзэмших зэрэг асуудлаар аж ахуйн нэгж байгууллагад туслалцаа үзүүлэх олон хэлбэрийн арга хэмжээ зохион байгуулах',
      borderColor: 'border-indigo-500'
    },
    {
      description: 'Гишүүд хоорондын маргаан, гишүүд ба бусад хуулийн этгээд, хувь хүмүүсийн хооронд гарсан маргааны асуудлаар гишүүдэд хууль эрх зүйн талаар зөвлөгөө өгөх',
      borderColor: 'border-amber-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Membership Description */}
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200 mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            Гишүүнчлэлийн тухай
          </h2>
          
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-blue-500">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
              МБМҮХ нь гишүүд, дэмжигчидтэй байна. МБМҮХ-ны дүрмийг зөвшөөрч, МБМҮХ-оос явуулах үйл ажиллагааг дэмжиж буй <span className="font-semibold text-blue-700">дотоод, гадаадын байгууллага</span>, <span className="font-semibold text-indigo-700">хувь хүмүүс</span> МБМҮХ-ны гишүүнээр элсэх болно.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="rounded-xl bg-white p-4 sm:p-6 md:p-8 shadow ring-1 ring-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            Гишүүдэд үзүүлэх үйлчилгээ
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {memberServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 ${service.borderColor}`}
              >
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
