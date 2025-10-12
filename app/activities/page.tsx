import React from 'react';

export default function AboutPage() {
  const stats = [
    { value: '2003', label: 'Байгуулагдсан он' },
    { value: '20+', label: 'Жилийн туршлага' },
    { value: '250+', label: 'Дэмжсэн үйлдвэр' },
  ];

  const timeline = [
    {
      year: '2003',
      title: 'Холбоо байгуулагдав',
      description: '26 томоохон үйлдвэр, олон жижиг үйлдвэрүүд хувьчлагдаж, барилгын салбар сэргэлт эхэлж байсан үе.'
    },
    {
      year: '2007',
      title: 'Мастер төлөвлөгөө',
      description: 'Барилгын материалын үйлдвэрийн салбарыг 2007-2015 он хүртэл хөгжүүлэх "Мастер төлөвлөгөө"-г Засгийн газрын 222 дугаар тогтоолоор баталсан.'
    },
    {
      year: '2012',
      title: 'Дэмжих хөтөлбөр',
      description: 'Барилгын материалын үйлдвэрийг дэмжих хөтөлбөр батлагдаж, амжилттай хэрэгжиж эхэлсэн.'
    },
    {
      year: '2013',
      title: 'Санхүүжилт',
      description: '478.52 тэрбум төгрөгийн зээл, хөрөнгө оруулалт барилгын материалын үйлдвэрүүдэд олгогдов.'
    },
    {
      year: '2015',
      title: 'Хөгжлийн оргил',
      description: '250 орчим жижиг дунд үйлдвэр, 4 том цементийн үйлдвэр шинээр ашиглалтанд орж, салбар эрчимтэй хөгжив.'
    }
  ];

  const goals = [
    'Барилгын материалын үйлдвэрлэлийг хөгжүүлэхэд мэргэжлийн зөвлөгөө өгөх',
    'Төр хувийн хэвшлийн хамтын ажиллагааг хөгжүүлэх',
    'Барилгын материалын салбарын ТББ-уудыг нэгтгэн бодлого чиглэлээр хангах',
    'Салбарын инженер техникийн ажилтныг мэргэжүүлэх',
    'Импортыг бууруулж, экспортыг нэмэгдүүлэх үндэсний үйлдвэрлэлийг хөгжүүлэх'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Stats Section */}
      <section className="py-10 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 text-center border border-blue-100">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 md:mb-3">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-700 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Goals Combined Section */}
      <section className="py-10 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-6">
                <div className="w-8 md:w-12 h-1 bg-blue-600 rounded"></div>
                <h2 className="text-xl md:text-2xl font-light text-gray-900">Бидний тухай</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо нь 2003 онд байгуулагдсан, 
                  барилгын материалын чиглэлээр үйл ажиллагаа эрхэлдэг мэргэжлийн төрийн бус байгууллага юм.
                </p>
                <p>
                  2003 он бол Монгол улс зах зээлийн эдийн засгийн тогтолцоонд аажмаар шилжиж байсан 
                  бөгөөд Барилгын салбарын уналт зогсч, сэргэлт дөнгөж эхэлж байсан үе юм.
                </p>
                <p>
                  Өнгөрсөн 20 гаран жилийн хугацаанд Барилгын Материал Үйлдвэрлэгчдийн Холбоо нь 
                  барилгын салбарт барилгын материал үйлдвэрлэл тэргүүн эгнээнд хөгжүүлэх, 
                  импортыг бууруулж, экспортыг нэмэгдүүлэх үндэсний үйлдвэрлэлийг хөгжүүлэх, 
                  төрийн хувийн хэвшлийн үйл ажиллагааг уялдуулах олон ажлыг хийж ирлээ.
                </p>
              </div>
            </div>

            {/* Goals */}
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-6">
                <div className="w-8 md:w-12 h-1 bg-blue-600 rounded"></div>
                <h2 className="text-xl md:text-2xl font-light text-gray-900">Зорилго, зорилт</h2>
              </div>
              <ul className="list-disc list-inside space-y-4 text-gray-700 text-sm md:text-base leading-relaxed pl-1">
                {goals.map((goal, index) => (
                  <li key={index}>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-10 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-12 justify-center">
            <div className="w-6 md:w-12 h-1 bg-blue-600 rounded"></div>
            <h2 className="text-xl md:text-3xl font-light text-gray-900">Түүхэн замнал</h2>
            <div className="w-6 md:w-12 h-1 bg-blue-600 rounded"></div>
          </div>
          <div className="space-y-4 md:space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 md:gap-8 group">
                <div className="flex-shrink-0 md:w-32">
                  <div className="text-2xl md:text-3xl font-light text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-6 border-l-2 md:border-l-4 border-blue-600">
                  <h3 className="text-base md:text-xl font-medium text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}