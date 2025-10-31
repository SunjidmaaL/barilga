export default function AboutPage() {

  const timeline = [
    {
      year: '2003',
      title: 'Холбоо байгуулагдав',
      description: '26 томоохон үйлдвэр, олон жижиг үйлдвэрүүд хувьчлагдаж, барилгын салбар сэргэлт эхэлж байсан үе.',
      color: 'blue'
    },
    {
      year: '2007',
      title: 'Мастер төлөвлөгөө',
      description: 'Барилгын материалын үйлдвэрийн салбарыг 2007-2015 он хүртэл хөгжүүлэх "Мастер төлөвлөгөө"-г Засгийн газрын 222 дугаар тогтоолоор баталсан.',
      color: 'purple'
    },
    {
      year: '2012',
      title: 'Дэмжих хөтөлбөр',
      description: 'Барилгын материалын үйлдвэрийг дэмжих хөтөлбөр батлагдаж, амжилттай хэрэгжиж эхэлсэн.',
      color: 'green'
    },
    {
      year: '2013',
      title: 'Санхүүжилт',
      description: '478.52 тэрбум төгрөгийн зээл, хөрөнгө оруулалт барилгын материалын үйлдвэрүүдэд олгогдов.',
      color: 'orange'
    },
    {
      year: '2015',
      title: 'Хөгжлийн оргил',
      description: '250 орчим жижиг дунд үйлдвэр, 4 том цементийн үйлдвэр шинээр ашиглалтанд орж, салбар эрчимтэй хөгжив.',
      color: 'pink'
    }
  ];

  const goals = [
    {
      text: 'Барилгын материалын үйлдвэрлэлийг хөгжүүлэхэд мэргэжлийн зөвлөгөө өгөх',
      icon: '💡'
    },
    {
      text: 'Төр хувийн хэвшлийн хамтын ажиллагааг хөгжүүлэх',
      icon: '🤝'
    },
    {
      text: 'Барилгын материалын салбарын ТББ-уудыг нэгтгэн бодлого чиглэлээр хангах',
      icon: '🎯'
    },
    {
      text: 'Салбарын инженер техникийн ажилтныг мэргэжүүлэх',
      icon: '👨‍🎓'
    },
    {
      text: 'Импортыг бууруулж, экспортыг нэмэгдүүлэх үндэсний үйлдвэрлэлийг хөгжүүлэх',
      icon: '📈'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

      {/* About & Goals Combined Section */}
      <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* About */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="text-2xl sm:text-3xl md:text-4xl">📖</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Бидний тухай
              </h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8 md:mb-10 text-justify">
              <p className="bg-blue-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 text-xs sm:text-sm md:text-base">
                Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо нь 2003 онд байгуулагдсан, 
                барилгын материалын чиглэлээр үйл ажиллагаа эрхэлдэг мэргэжлийн төрийн бус байгууллага болно. 
                2003 он бол Монгол улс зах зээлийн эдийн засгийн тогтолцоонд аажмаар шилжиж байсан 
                бөгөөд Барилгын салбарын уналт зогсч, сэргэлт дөнгөж эхэлж байсан үе юм. Тухайн үед 
                Улаанбаатар, Дархан, Чойбалсан хотууд, Өвөрхангай, Говь-Алтай аймгуудад ажиллаж байсан 
                бие даасан томоохон 26 үйлдвэрээс гадна бусад аймгуудад ажиллаж байсан барилга үйлдвэрлэлийн 
                баазууд, тоосгоны жижиг үйлдвэрүүд, галт уулын шаарган гулдмайн үйлдвэрүүд үндсэндээ 
                хувьчлагдаж дууссан байв.
              </p>
              <p className="bg-purple-50 p-3 sm:p-4 rounded-lg border-l-4 border-purple-500 text-xs sm:text-sm md:text-base">
                Тус холбоо нь Монгол Улсад барилгын материалын үйлдвэрлэлийг хөгжүүлэхэд мэргэжлийн зөвлөгөө өгөх, 
                төр хувийн хэвшлийн хамтын ажиллагааг хөгжүүлэх, барилгын материалын салбарын төрийн бус 
                байгууллагуудыг нэгтгэн бодлого чиглэлээр хангах, барилгын материал үйлдвэрлэлийн салбарын 
                инженер техникийн ажилтанг мэргэжүүлэх, мэргэжилтэй ажилтан бэлтгэх зэрэг зорилтын хүрээнд 
                ажиллаж байна.
              </p>
              <p className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500 text-xs sm:text-sm md:text-base">
                Өнгөрсөн 20 гаран жилийн хугацаанд Барилгын Материал Үйлдвэрлэгчдийн Холбоо нь 
                барилгын салбарт барилгын материал үйлдвэрлэл тэргүүн эгнээнд хөгжүүлэх, 
                импортыг бууруулж, экспортыг нэмэгдүүлэх үндэсний үйлдвэрлэлийг хөгжүүлэх, 
                төрийн хувийн хэвшлийн үйл ажиллагааг уялдуулах олон ажлыг хийж ирлээ.
              </p>
              <p className="bg-amber-50 p-3 sm:p-4 rounded-lg border-l-4 border-amber-500 text-xs sm:text-sm md:text-base">
                Барилгын материалын үйлдвэрийн салбарыг 2007-2015 он хүртэл хөгжүүлэх "Мастер төлөвлөгөөг" 
                боловсруулах санаачлагыг тус холбоо гаргасныг Барилга хот байгуулалтын яам дэмжиж, 
                Германы техникийн хамтын ажиллагааны нийгэмлэг санхүүжүүлэн Засгийн газрын 2007 оны 
                222 дугаар тогтоолоор батлуулсан нь тус холбооны салбартаа хийсэн томоохон ажлуудын нэг болсон.
              </p>
              <p className="bg-teal-50 p-3 sm:p-4 rounded-lg border-l-4 border-teal-500 text-xs sm:text-sm md:text-base">
                Монгол банкны Ерөнхийлөгч, Барилга, хот байгуулалтын сайдын хамтарсан тушаалаар 2013 онд 
                "Барилгын салбарыг дэмжих, улмаар орон сууцны үнийг тогтворжуулах" дэд хөтөлбөрийн хүрээнд 
                Эргэлтийн хөрөнгийн 112.8 тэрбум төгрөгийн зээлийг 57 ААН-д, Хөгжлийн банкнаас 56.72 тэрбум 
                төгрөгийн хөрөнгө оруулалтын зээлийг 15 ААН-д, Чингис бондын 888 төслөөс 64 ААН-д 285.2 тэрбум, 
                ЖДҮ-ийг хөгжүүлэх сангаас 34 ААН-д 23.8 тэрбум төгрөгийн зээлийг тус тус олгосон гэсэн судалгаа байна.
              </p>
              <p className="bg-rose-50 p-3 sm:p-4 rounded-lg border-l-4 border-rose-500 text-xs sm:text-sm md:text-base">
                Барилга, Хот, Байгуулалтын яамтай барилгын салбарт хийх шинэчлэл, түүний дотор барилгын 
                материалын үйлдвэрлэлийг хөгжүүлэх бодлогын асуудалд хамтран ажилласны үр дүнд "Барилгын 
                материалын үйлдвэрийг дэмжих" хөтөлбөрийг хамтран боловсруулж Засгийн газрын 2012 оны 
                171 дүгээр тогтоолоор батлуулан амьдралд амжилттай хэрэгжүүлсэн байна. Уг хөтөлбөрийг 
                хэрэгжүүлэх арга хэмжээний хүрээнд 250 орчим жижиг дунд үйлдвэр болон Цементийн хамгийн 
                орчин үеийн технологи бүхий хуурай аргын 4 том үйлдвэр шинээр ашиглалтанд орсон. Мөн 
                БМҮ-ийн үнэ тогтворжуулах хөтөлбөрийг хэрэгжүүлэн Цемент арматурын үнийг 2 жил дараалан 
                тогтвортой барьж чадсан.
              </p>
            </div>

            {/* Goals */}
            <div className="border-t-2 border-gray-200 pt-4 sm:pt-6 md:pt-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl">🎯</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Зорилго, зорилт
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl hover:shadow-md transition-shadow duration-300 border border-purple-100">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">{goal.icon}</div>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed pt-0.5 sm:pt-1">
                      {goal.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}