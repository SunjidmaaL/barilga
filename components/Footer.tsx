import { getContacts } from '@/lib/strapi'

export default async function Footer() {
  const contacts = await getContacts();
  
  // Debug API response
  console.log('Footer - Contacts from API:', contacts);

  // Get first contact from API or use fallback
  const contactData = contacts && Array.isArray(contacts) && contacts.length > 0 
    ? contacts[0] 
    : {
        address: 'ЧД 6-р хороо Вояж оффис 302, 305 тоот',
        phone: '+976 99015759',
        email: 'bmat.material@gmail.com'
      };

  console.log('Footer - Using contact data:', contactData);
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h5 className="font-bold mb-2 text-white text-sm">Холбоо барих</h5>
          <p className="text-xs mb-1">📍 {contactData.address}</p>
          <p className="text-xs mb-1">📞 {contactData.phone}</p>
          <p className="text-xs">✉️ {contactData.email}</p>
        </div>
        <div>
          <h5 className="font-bold mb-2 text-white text-sm">Сошиал</h5>
          <div className="flex justify-center md:justify-start space-x-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/facebook.png" alt="Facebook" />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-2 text-white text-sm">Холбоо</h5>
          <p className="text-xs">Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо</p>
        </div>
      </div>
      <div className="text-center mt-4 text-gray-500 text-xs border-t border-gray-800 pt-4">
        © 2025 Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  )
}
