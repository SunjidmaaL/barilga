export default function ExpertTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-indigo-100 bg-indigo-50 border-y">
        <div className="px-6 mx-auto max-w-7xl py-14">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Экспертийн багийн ажил</h1>
          <p className="max-w-3xl mt-3 text-gray-600">
          Багийн гүйцэтгэдэг үндсэн чиг үүрэг болон үйл ажиллагааг танилцуулна.
          </p>
        </div>
      </section>


      {/* Process Control Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-lg bg-white/90 backdrop-blur-md rounded-2xl ">
            {/* Header */}
            <div className="relative py-6 text-center bg-gradient-to-r to-indigo-400 via-blue-400 from-indigo-400 md:py-8">
              <h2 className="text-2xl font-light tracking-wide text-white md:text-3xl lg:text-4xl drop-shadow-md">
                ПРОЦЕССИЙН ХЯНАЛТ
              </h2>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400"></div>
            </div>

            {/* Main content */}
            <div className="p-6 sm:p-8 md:p-12">
              {/* Intro paragraph */}
              <div className="p-6 mb-12 transition-transform duration-300 border-l-4 border-indigo-700 shadow-sm bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl md:p-8 ">
                <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                  <span className="font-semibold text-gray-900">МБМҮХолбоо</span> нь
                  <span className="font-semibold"> 2012 оноос хойш</span> барилгын материалын үйлдвэрлэлд
                  тусгай зөвшөөрөл олгох эс олгох ажлын хүрээнд хамгийн үр дүнтэй зохион байгуулалтанд
                  оруулж үйлдвэрүүдээр{" "}
                  <span className="font-semibold text-indigo-700">"ЗӨВЛӨХ МЭРГЭЖЛИЙН БАГ"</span>
                  ажиллуулж эхлэсэн болно.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {[
                  {
                    title: "Ажиллах журам",
                    desc: `"Экспертийн мэргэжлийн баг"-ийн ажиллах журмыг дотооддоо батлуулан
              мэргэжлийн инженер, зөвлөхүүдийг ажиллуулдаг.`,
                  },
                  {
                    title: "Хамтын ажиллагаа",
                    desc: `Тус мэргэжлийн баг нь үйлдвэрүүдэд мэргэжлийн зөвлөгөө өгөх,
              зөвлөмж өгч хамтын ажиллагаа, эргэх холбоог бий болгодог болно.`,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl md:p-8 group hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-blue-400/10 to-purple-400/10 group-hover:opacity-100"></div>

                    {/* Border glow ring */}
                    <div className="absolute inset-0 transition duration-300 rounded-2xl ring-1 ring-gray-200 group-hover:ring-indigo-400/40"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 transition-colors duration-300 md:text-xl group-hover:text-indigo-700">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team Members Section */}
      <section className="py-12 bg-white md:py-16 lg:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-3 text-2xl font-light text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">Багийн бүрэлдэхүүн</h2>
            <p className="text-sm text-gray-500 sm:text-base md:text-lg">Мэргэжлийн инженер, зөвлөхүүд</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {[
              "Технологич инженер",
              "Механик инженер",
              "Цахилгааны инженер",
              "Мэргэжлийн холбооны төлөөлөл",
              "Цахим мэдээлэлийн инженер",
            ].map((title, i) => (
              <div
                key={i}
                className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm md:p-8 rounded-2xl group hover:shadow-xl hover:-translate-y-1"
              >
                {/* Gradient border animation */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-blue-400/10 to-purple-400/10 group-hover:opacity-100"></div>

                {/* Subtle glow ring */}
                <div className="absolute inset-0 transition duration-300 rounded-2xl ring-1 ring-gray-200 group-hover:ring-indigo-400/40"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-lg font-semibold tracking-wide text-gray-900 transition-colors duration-300 md:text-xl group-hover:text-indigo-700">
                    {title}
                  </h3>
                  <div className="w-12 h-1 mx-auto mt-3 transition-all duration-500 rounded-full opacity-0 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="mb-3 text-3xl font-light text-gray-900 md:text-4xl lg:text-5xl">
              Үйл ажиллагаа
            </h2>
            <p className="text-base text-gray-500 md:text-lg">
              Багийн гүйцэтгэдэг үндсэн чиг үүрэг
            </p>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {[
              {
                title: "Мэргэжлийн зөвлөгөө",
                desc: "Үйлдвэрүүдэд мэргэжлийн болон технологийн зөвлөгөө өгөх",
              },
              {
                title: "Технологийн дэмжлэг",
                desc: "Тоног төхөөрөмжийн үйл ажиллагаанд зөвлөмж өгөх",
              },
              {
                title: "Төрийн бодлого",
                desc: "Төрийн бодлогын хэрэгжилтийг хангуулах",
              },
              {
                title: "Лабораторийн хяналт",
                desc: "Лабораторийн хяналтын ажлыг эрчимжүүлэх",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl md:p-8 group hover:shadow-xl hover:-translate-y-1"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-blue-400/10 to-purple-400/10 group-hover:opacity-100"></div>

                {/* Border glow ring */}
                <div className="absolute inset-0 transition duration-300 rounded-2xl ring-1 ring-gray-200 group-hover:ring-indigo-400/40"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 transition-colors duration-300 md:text-xl group-hover:text-indigo-700">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}