import { getLicenses } from '@/lib/strapi'
import CertificateCard from '@/components/CertificateCard'

interface LicenseData {
  id: number
  title?: string
  licenseNumber?: string
  issueDate?: string
  expiryDate?: string
  issuedBy?: string
  receivedDate?: string
  document?: {
    url: string
    name?: string
    mime?: string
  }
  attributes?: {
    title?: string
    licenseNumber?: string
    issueDate?: string
    expiryDate?: string
    issuedBy?: string
    receivedDate?: string
    pdfFile?: {
      data?: {
        attributes?: {
          url: string
        }
      }
    }
  }
}

export default async function LicensesPage() {
  let licenses: LicenseData[] = []
  let error: string | null = null

  try {
    licenses = await getLicenses()
    console.log('Licenses data received:', licenses)
  } catch (err) {
    console.error('Error loading licenses:', err)
    error = 'Зөвшөөрлийн мэдээлэл ачааллахад алдаа гарлаа. Дахин оролдоно уу.'
  }


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
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-red-500 mb-4 text-4xl">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Алдаа гарлаа</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Certificate Cards Grid */}
            <div className="mb-12">
             
              
              {/* Strapi API Certificates */}
              {licenses && licenses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {licenses.map((license, index) => {
                      // Get PDF URL from Strapi document
                      const pdfUrl = license.document?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${license.document.url}`
                        : undefined

                      return (
                        <CertificateCard
                          key={license.id || index}
                          title={license.attributes?.title || license.title || 'Зөвшөөрөл'}
                          certificateNumber={license.attributes?.licenseNumber || license.licenseNumber}
                          issueDate={license.attributes?.issueDate || license.issueDate}
                          expiryDate={license.attributes?.expiryDate || license.expiryDate}
                          issuedBy={license.attributes?.issuedBy || license.issuedBy}
                          pdfUrl={pdfUrl}
                          receivedDate={license.attributes?.receivedDate || license.receivedDate}
                          status="received"
                        />
                      )
                    })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4 text-6xl">📄</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Зөвшөөрөл байхгүй байна</h3>
                  <p className="text-gray-600">Одоогоор зөвшөөрлийн мэдээлэл байхгүй байна.</p>
                </div>
              )}
            </div>

            {/* Information Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Зөвшөөрлийн мэдээлэл</h3>
                  <p className="text-sm text-blue-800 leading-relaxed mb-4">
                    Дээрх бүх зөвшөөрөл, лиценз, гэрчилгээ нь хууль ёсны дагуу олгогдсон бөгөөд хүчинтэй байна. 
                    PDF файлыг дарж дэлгэрэнгүй мэдээлэл үзэх боломжтой.
                  </p>
                 
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
