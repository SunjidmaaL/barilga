export default function TrainingPage() {
  const trainings = [
    {
      date: '2025-10-05 • Улаанбаатар',
      title: 'Төсвийн тооцооллын практик сургалт',
      description: 'Материалын норм, хөдөлмөр зарцуулалтын тооцоо.'
    },
    {
      date: '2025-10-18 • Дархан',
      title: 'Барилгын норм дүрэм шинэчлэл',
      description: 'BNbD шинэчлэлийн өөрчлөлт, хэрэгжилтийн зөвлөмж.'
    },
    {
      date: '2025-11-02 • Онлайн',
      title: 'Төслийн удирдлагын үндэс',
      description: 'Agile/PMBOK хосолсон богино сургалт.'
    }
  ]

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Сургалт</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Мэргэжлийн хөгжлийн сургалтууд, семинар, воркшопууд.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <div className="text-sm text-gray-500">{training.date}</div>
            <h4 className="mt-2 text-lg font-semibold text-gray-900">{training.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{training.description}</p>
            <a 
              href="#" 
              className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Бүртгүүлэх
            </a>
          </div>
        ))}
      </section>
    </>
  )
}
