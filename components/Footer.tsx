export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h5 className="font-bold mb-3 text-white">Барилгын Нийлүүлэлт ХХК</h5>
          <p className="text-sm">Найдвартай түнш, чанартай бүтээгдэхүүн</p>
        </div>
        <div>
          <h5 className="font-bold mb-3 text-white">Холбоо барих</h5>
          <p>📍 Улаанбаатар, Монгол</p>
          <p>📞 +976 99112233</p>
          <p>✉️ info@barilga.mn</p>
        </div>
        <div>
          <h5 className="font-bold mb-3 text-white">Сошиал</h5>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2025 Барилгын Нийлүүлэлт ХХК. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  )
}
