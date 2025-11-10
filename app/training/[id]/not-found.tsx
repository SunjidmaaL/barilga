import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Сургалт олдсонгүй</h1>
          <p className="text-gray-600 mb-8">Хүссэн сургалт олдсонгүй байна.</p>
          <Link 
            href="/training" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Сургалтын жагсаалт руу буцах
          </Link>
        </div>
      </div>
    </div>
  )
}
