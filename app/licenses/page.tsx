import { getLicenses } from '@/lib/strapi'

interface License {
  id: number | string
  type: string
  number: string
  issuedDate: string
  validUntil: string
  issuedBy: string
}

export default async function LicensesPage() {
  let licenses: License[] = []
  let error: string | null = null

  try {
    const licensesData = await getLicenses()
    
    if (licensesData && Array.isArray(licensesData)) {
      licenses = licensesData.map(license => ({
        id: license.id,
        type: license.title || 'Тодорхойгүй',
        number: license.licenseNumber || '',
        issuedDate: license.issueDate || '',
        validUntil: license.expiryDate || '',
        issuedBy: license.issuer || 'Тодорхойгүй'
      }))
    }
  } catch (err) {
    console.error('Error fetching licenses:', err)
    error = 'Лицензийн мэдээлэл татахад алдаа гарлаа'
    
    // Fallback data
    licenses = [
      {
        id: 1,
        type: 'Барилгын үйл ажиллагааны тусгай зөвшөөрөл',
        number: 'БЗ-2023-001234',
        issuedDate: '2023-03-15',
        validUntil: '2026-03-15',
        issuedBy: 'Хөдөлмөр, нийгмийн хамгааллын яам'
      },
      {
        id: 2,
        type: 'Материал нийлүүлэлтийн лиценз',
        number: 'МН-2023-005678',
        issuedDate: '2023-06-20',
        validUntil: '2028-06-20',
        issuedBy: 'Худалдаа аж үйлдвэрийн яам'
      }
    ] as License[]
  }

  return (
    <>
      {/* Information Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-indigo-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-indigo-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Тусгай зөвшөөрөл олгох тухай
            </h2>
          </div>
          
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
            <div className="prose max-w-none">
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-indigo-600">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  Монгол Улсын Засгийн газрын <span className="font-semibold text-indigo-700">2010 оны 325 дугаар тогтоолоор</span> батлагдсан төрийн зарим чиг үүргийг мэргэжлийн холбоодоор гэрээгээр гүйцэтгэх шийдвэрийг хэрэгжүүлэх зорилтын хүрээнд БХБСайдын <span className="font-semibold text-indigo-700">2012 оны 49, 2016 оны 11, 2019 оны 19, 2020 оны 23 тоот тушаалуудаар</span> "Барилгын материалын үйлдвэрлэл эрхлэх тусгай зөвшөөрөл олгох" ажлыг БХБЯ-тай гэрээ байгуулан <span className="font-semibold text-indigo-700">12 дэх жилдээ</span> тасралтгүй гүйцэтгэж байна.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-indigo-100 rounded-lg p-2 sm:p-3 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Цахим систем</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                        2021 оны 06 сарын 25-ны өдрийн БХБСайдын <span className="font-semibold">147 тоот тушаалаар</span> "Барилга, байгууламжийн зураг төсөл боловсруулах, барилгын ажил гүйцэтгэх, барилгын материал үйлдвэрлэл, өргөх байгууламж, түүний эд ангийн үйлдвэрлэл, угсралт, засвар үйлчилгээ эрхлэх хуулийн эдгээдийн тусгай зөвшөөрөл олгох" үйл ажиллагааг цахимаар олгох шинэчилсэн журам батлагдсан.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-green-100 rounded-lg p-2 sm:p-3 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Үйлчилгээний төв</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                        Хуулийн этгээдэд тусгай зөвшөөрөл олгох ажлыг Барилгын тухай хуулийн 34.1.14-т заасан чиг үүргийг гэрээний үндсэн дээр гүйцэтгэж байгаа байгууллага нэг цэгийн үйлчилгээ болон <a href="https://www.mcis.gov.mn" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold underline">WWW.MCIS.GOV.MN</a> цахим системээр зохион байгуулж байна.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-amber-500 mt-4 sm:mt-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-amber-900 mb-1">Шинэчлэгдсэн журам</h4>
                    <p className="text-xs sm:text-sm text-amber-800">
                      2025 оны 02 сарын өдрийн БОСХБСайдын <span className="font-semibold">36 тоот тушаалаар</span> Тусгай зөвшөөрөл олгох суурь нөхцөл, шаардлагад өөрчлөлт оруулсан.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-0 pb-8 sm:pb-12 lg:pb-16">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Тусгай зөвшөөрөл олгосон байдал</h2>
        </div>

        {/* Statistics Table */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg border border-gray-200 mb-6 sm:mb-8">
          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="min-w-[650px] sm:min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Он
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                    Хурлын тоо
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Нийт тоо
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Шинээр олгосон
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                    Сунгасан
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                    Цуцалсан
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { year: '2013', meetings: '15', total: '177', new: '146', extended: '31', cancelled: '1' },
                  { year: '2014', meetings: '16', total: '258', new: '229', extended: '29', cancelled: '1' },
                  { year: '2015', meetings: '15', total: '166', new: '145', extended: '21', cancelled: '' },
                  { year: '2016', meetings: '10', total: '130', new: '67', extended: '63', cancelled: '' },
                  { year: '2017', meetings: '6', total: '188', new: '63', extended: '125', cancelled: '' },
                  { year: '2018', meetings: '6', total: '108', new: '39', extended: '69', cancelled: '1' },
                  { year: '2019', meetings: '8', total: '73', new: '39', extended: '34', cancelled: '2' },
                  { year: '2020', meetings: '9', total: '101', new: '56', extended: '45', cancelled: '2' },
                  { year: '2021', meetings: 'цахим', total: '113', new: '46', extended: '68', cancelled: '' },
                  { year: '2022', meetings: 'цахим', total: '53', new: '16', extended: '37', cancelled: '' },
                  { year: '2023', meetings: 'цахим', total: '118', new: '109', extended: '9', cancelled: '-' },
                  { year: '2024', meetings: 'цахим', total: '104', new: '102', extended: '2', cancelled: '-' },
                  { year: 'Нийт', meetings: '89', total: '1589', new: '1057', extended: '533', cancelled: '7' }
                ].map((row, index) => (
                  <tr key={index} className={`hover:bg-gray-50 transition-colors ${row.year === 'Нийт' ? 'bg-blue-50 font-semibold' : ''}`}>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm font-medium ${row.year === 'Нийт' ? 'text-blue-900' : 'text-gray-900'}`}>
                      {row.year}
                    </td>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm ${row.year === 'Нийт' ? 'text-blue-800' : 'text-gray-600'} hidden sm:table-cell`}>
                      {row.meetings}
                    </td>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm ${row.year === 'Нийт' ? 'text-blue-800' : 'text-gray-600'}`}>
                      {row.total}
                    </td>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm ${row.year === 'Нийт' ? 'text-blue-800' : 'text-gray-600'}`}>
                      <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                        row.year === 'Нийт' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.new}
                      </span>
                    </td>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm ${row.year === 'Нийт' ? 'text-blue-800' : 'text-gray-600'} hidden md:table-cell`}>
                      <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                        row.year === 'Нийт' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {row.extended}
                      </span>
                    </td>
                    <td className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm ${row.year === 'Нийт' ? 'text-blue-800' : 'text-gray-600'} hidden md:table-cell`}>
                      <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                        row.year === 'Нийт' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {row.cancelled}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Манай зөвшөөрлүүд</h2>
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm text-yellow-800">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Licenses Table */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg border border-gray-200">
          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="min-w-[600px] sm:min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Зөвшөөрлийн төрөл
                </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                  Дугаар
                </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                  Олгосон огноо
                </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Хүчинтэй хугацаа
                </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                  Олгосон байгууллага
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {licenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 sm:px-4 lg:px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm">Лицензийн мэдээлэл олдсонгүй</p>
                    </div>
                  </td>
                </tr>
              ) : (
                licenses.map((license, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="truncate">{license.type}</span>
                      </div>
                      <div className="sm:hidden mt-1 text-xs text-gray-500">
                        <div>Дугаар: {license.number}</div>
                        <div>Огноо: {license.issuedDate}</div>
                        <div className="mt-1">Байгууллага: {license.issuedBy}</div>
                      </div>
                  </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-600 font-mono hidden sm:table-cell">
                    {license.number}
                  </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                    {license.issuedDate}
                  </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {license.validUntil}
                      </span>
                  </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {license.issuedBy}
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </section>
    </>
  )
}
