export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'Цементийн үйлдвэрлэлийн хөгжүүлэлт',
      description: 'Монгол улсад цементийн үйлдвэрлэлийг хөгжүүлэх, импортыг бууруулах зорилгоор хэрэгжүүлсэн томоохон төсөл.',
      status: 'Хэрэгжиж байна',
      year: '2015-2020',
      budget: '500 тэрбум төгрөг',
      image: '/img/training1.jpg',
      category: 'Үйлдвэрлэл'
    },
    {
      id: 2,
      title: 'Барилгын материалын стандартчилал',
      description: 'Барилгын материалын чанарын стандартыг тогтоож, үйлдвэрлэгчдэд мэргэжлийн зөвлөгөө өгөх төсөл.',
      status: 'Дууссан',
      year: '2012-2015',
      budget: '50 тэрбум төгрөг',
      image: '/img/training2.jpg',
      category: 'Стандартчилал'
    },
    {
      id: 3,
      title: 'Жижиг дунд үйлдвэрлэгчдийг дэмжих',
      description: 'Жижиг дунд үйлдвэрлэгчдэд санхүүжилт, мэргэжлийн зөвлөгөө, технологийн дэмжлэг үзүүлэх хөтөлбөр.',
      status: 'Хэрэгжиж байна',
      year: '2013-2025',
      budget: '200 тэрбум төгрөг',
      image: '/img/background.jpg',
      category: 'Хөгжүүлэлт'
    },
    {
      id: 4,
      title: 'Экспортын боломжийн судалгаа',
      description: 'Барилгын материалын экспортын боломжийг судалж, зах зээлд нэвтрэх стратеги боловсруулах төсөл.',
      status: 'Төлөвлөгдөж байна',
      year: '2024-2026',
      budget: '30 тэрбум төгрөг',
      image: '/img/background1.jpg',
      category: 'Судалгаа'
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-100 border-y border-gray-200 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              Төслүүд
            </h1>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Дууссан' 
                        ? 'bg-green-100 text-green-800' 
                        : project.status === 'Хэрэгжиж байна'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-700 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">Хугацаа:</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{project.year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">Төсөв:</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{project.budget}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gray-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-700 transition-all duration-300">
                    Дэлгэрэнгүй мэдээлэл
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Төслийн үр дүн
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Холбооны хэрэгжүүлсэн төслүүдийн статистик мэдээлэл
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { number: '50+', label: 'Хэрэгжүүлсэн төсөл', icon: '📊' },
              { number: '500+', label: 'Тэрбум төгрөг', icon: '💰' },
              { number: '250+', label: 'Дэмжсэн үйлдвэр', icon: '🏭' },
              { number: '20+', label: 'Жилийн туршлага', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 sm:p-4 md:p-5 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4">{stat.icon}</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
