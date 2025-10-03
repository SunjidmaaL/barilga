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
          <p>📍 ЧД 6-р хороо Вояж оффис 302, 305 тоот Ulaanbaatar, Mongolia </p>
          <p>📞 +976 99015759 </p>
          <p>✉️ bmat.material@gmail.com </p>
        </div>
        <div>
          <h5 className="font-bold mb-3 text-white">Сошиал</h5>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2025 Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  )
}
