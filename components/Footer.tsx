import { getContacts } from '@/lib/strapi';
import { FaFacebook } from "react-icons/fa";

export default async function Footer() {
  const contacts = await getContacts()
  const contactData = contacts?.[0] || {
    address: 'ЧД 6-р хороо Вояж оффис 302, 305 тоот',
    phone: '+976 99015759',
    email: 'bmat.material@gmail.com'
  }
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <h5 className="font-bold mb-2 sm:mb-3 text-white text-base sm:text-lg">Холбоо барих</h5>
            <p className="text-xs sm:text-sm mb-1">📍 {contactData.address}</p>
            <p className="text-xs sm:text-sm mb-1">📞 {contactData.phone}</p>
            <p className="text-xs sm:text-sm">✉️ {contactData.email}</p>
          </div>
          <div className="text-center sm:text-left">
            <h5 className="font-bold mb-2 sm:mb-3 text-white text-base sm:text-lg">Сошиал</h5>
            <a 
              href="https://www.facebook.com/profile.php?id=100063558767319" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h5 className="font-bold mb-2 sm:mb-3 text-white text-base sm:text-lg">Холбоо</h5>
            <p className="text-xs sm:text-sm">Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm border-t border-gray-800 pt-4 px-4">
        © 2025 Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  )
}
