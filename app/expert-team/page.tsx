export default function ExpertTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 mb-8 tracking-tight leading-tight">
            Экспертийн багийн
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ажил
            </span>
          </h1>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-4"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Process Control Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 px-4 sm:px-6 md:px-8 py-4 md:py-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-wide text-center">
                ПРОЦЕССИЙН ХЯНАЛТ
              </h2>
            </div>
            
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-gray-900 mb-8 md:mb-12">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">МБМҮХолбоо</span> нь 
                  <span className="font-semibold"> 2012 оноос хойш</span> барилгын материалын үйлдвэрлэлд 
                  тусгай зөвшөөрөл олгох эс олгох ажлын хүрээнд хамгийн үр дүнтэй зохион байгуулалтанд 
                  оруулж үйлдвэрүүдээр <span className="font-semibold text-gray-900">"ЗӨВЛӨХ МЭРГЭЖЛИЙН БАГ"</span> 
                  ажиллуулж эхлэсэн болно.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="group">
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                      📜
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                        Ажиллах журам
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        "Экспертийн мэргэжлийн баг"-ийн ажиллах журмыг дотоодоо батлуулан 
                        мэргэжлийн инженер, зөвлөхүүдийг ажиллуулдаг.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                      🤝
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                        Хамтын ажиллагаа
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Тус мэргэжлийн баг нь үйлдвэрүүдэд мэргэжлийн зөвлөгөө өгөх, 
                        зөвлөмж өгч хамтын ажиллагаа эргэх холбоог бий болгодог болно.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3 sm:mb-4">Багийн бүрэлдэхүүн</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500">Мэргэжлийн инженер, зөвлөхүүд</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="group text-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-200">
                ⚙️
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                Технологич инженер
              </h3>
            </div>
            
            <div className="group text-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-200">
                🔧
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                Механик инженер
              </h3>
            </div>
            
            <div className="group text-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-200">
                ⚡
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                Цахилгааны инженер
              </h3>
            </div>
            
            <div className="group text-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-200">
                👥
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                Мэргэжлийн холбооны төлөөлөл
              </h3>
            </div>
            
            <div className="group text-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-200">
                💻
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                Цахим мэдээлэлийн инженер
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3 sm:mb-4">Үйл ажиллагаа</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500">Багийн гүйцэтгэдэг үндсэн чиг үүрэг</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-white rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                  💼
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                    Мэргэжлийн зөвлөгөө
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Үйлдвэрүүдэд мэргэжлийн болон технологийн зөвлөгөө өгөх
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                  🔬
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                    Технологийн дэмжлэг
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Тоног төхөөрөмжийн үйл ажиллагаанд зөвлөмж өгөх
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                  📋
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                    Төрийн бодлого
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Төрийн бодлогын хэрэгжилтийг хангуулах
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                  🔍
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                    Лабораторийн хяналт
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Лабораторийн хяналтын ажлыг эрчимжүүлэх
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}