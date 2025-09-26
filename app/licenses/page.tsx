export default function LicensesPage() {
  const licenses = [
    {
      type: 'Барилгын үйл ажиллагааны тусгай зөвшөөрөл',
      number: 'БЗ-2023-001234',
      issuedDate: '2023-03-15',
      validUntil: '2026-03-15',
      issuedBy: 'Хөдөлмөр, нийгмийн хамгааллын яам'
    },
    {
      type: 'Материал нийлүүлэлтийн лиценз',
      number: 'МН-2023-005678',
      issuedDate: '2023-06-20',
      validUntil: '2028-06-20',
      issuedBy: 'Худалдаа аж үйлдвэрийн яам'
    },
    {
      type: 'Аюулгүй ажиллагааны гэрчилгээ',
      number: 'ААГ-2024-000123',
      issuedDate: '2024-01-10',
      validUntil: '2025-01-10',
      issuedBy: 'Хөдөлмөр, нийгмийн хамгааллын яам'
    },
    {
      type: 'Орчны хамгааллын зөвшөөрөл',
      number: 'ОХЗ-2023-009876',
      issuedDate: '2023-09-05',
      validUntil: '2026-09-05',
      issuedBy: 'Байгаль орчин, аялал жуулчлалын яам'
    },
    {
      type: 'Тээвэрлэлтийн зөвшөөрөл',
      number: 'ТЗ-2024-000456',
      issuedDate: '2024-02-28',
      validUntil: '2027-02-28',
      issuedBy: 'Зам тээврийн хөгжлийн яам'
    }
  ]

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Тусгай зөвшөөрөл</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Манай компанийн эрх бүхий тусгай зөвшөөрөл, лиценз, гэрчилгээ.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Зөвшөөрлийн төрөл
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дугаар
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Олгосон огноо
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Хүчинтэй хугацаа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Олгосон байгууллага
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {licenses.map((license, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {license.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {license.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {license.issuedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {license.validUntil}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {license.issuedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Зөвшөөрлийн мэдээлэл</h3>
          <p className="text-sm text-blue-800">
            Дээрх бүх зөвшөөрөл, лиценз, гэрчилгээ нь хууль ёсны дагуу олгогдсон бөгөөд хүчинтэй байна. 
            Дэлгэрэнгүй мэдээлэл авахыг хүсвэл манай компанитай холбоо барина уу.
          </p>
        </div>
      </section>
    </>
  )
}
