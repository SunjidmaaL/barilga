import { getContacts, getContactsHrs } from '@/lib/strapi'

interface ContactItem {
  id?: string | number
  label: string
  value: string
  icon: 'location' | 'phone' | 'email' | 'fax' | 'clock'
  iconBgColor?: string
  iconColor?: string
}

export default async function ContactPage() {
  // Add a small delay to show loading state (remove in production)
  // await new Promise(resolve => setTimeout(resolve, 1000))
  
  const contacts = await getContacts()
  const contactsHrs = await getContactsHrs()
  

  // Transform API data to expected structure
  const transformedContacts: ContactItem[] = contacts && Array.isArray(contacts) ? contacts.map((contact: any) => {
    const contactItems: ContactItem[] = []
    
    if (contact.address) {
      contactItems.push({
        id: `${contact.id}-address`,
        label: 'Хаяг',
        value: contact.address,
        icon: 'location',
        iconBgColor: 'bg-indigo-100',
        iconColor: 'text-indigo-600'
      })
    }
    
    if (contact.phone) {
      contactItems.push({
        id: `${contact.id}-phone`,
        label: 'Утас',
        value: contact.phone,
        icon: 'phone',
        iconBgColor: 'bg-blue-100',
        iconColor: 'text-blue-600'
      })
    }
    
    if (contact.email) {
      contactItems.push({
        id: `${contact.id}-email`,
        label: 'И-мэйл',
        value: contact.email,
        icon: 'email',
        iconBgColor: 'bg-green-100',
        iconColor: 'text-green-600'
      })
    }
    
    return contactItems
  }).flat() : []

  // Show message when no contact data is available
  const hasContactData = transformedContacts.length > 0

  return (
    <>
      {/* Contact Information & Map Section */}
      <section className="bg-white pt-0 pb-8 sm:pt-0 sm:pb-12 lg:pt-0 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12 lg:mb-16">     
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                {hasContactData ? (
                  <div className="space-y-2 sm:space-y-3">
                    {transformedContacts.map((contact: ContactItem, index: number) => (
                      <div key={contact.id || index} className="flex items-start space-x-2 sm:space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 ${contact.iconBgColor || 'bg-indigo-100'} rounded-full flex items-center justify-center`}>
                            {contact.icon === 'location' && (
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.iconColor || 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                            {contact.icon === 'phone' && (
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.iconColor || 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            )}
                            {contact.icon === 'email' && (
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.iconColor || 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {contact.icon === 'fax' && (
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.iconColor || 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {contact.icon === 'clock' && (
                              <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${contact.iconColor || 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{contact.label}</h4>
                          <p className="text-sm text-gray-600">{contact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Одоогоор холбоо барих мэдээлэл бэлэн болоогүй байна. 
                      <br />
                    </p>
                  </div>
                )}
              </div>

              {/* Team Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {contactsHrs && Array.isArray(contactsHrs) && contactsHrs.length > 0 && contactsHrs
                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    .map((contactHr: any, index: number) => (
                    <div key={contactHr.id || index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">
                            {contactHr.name || 'Нэр олдоогүй'}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {contactHr.position || 'Албан тушаал олдоогүй'}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {contactHr.phone && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <span className="text-xs text-gray-600">
                              <span className="font-medium text-gray-700">УТАС:</span> {contactHr.phone}
                            </span>
                          </div>
                        )}
                        {contactHr.fax && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-xs text-gray-600">
                              <span className="font-medium text-gray-700">ФАКС:</span> {contactHr.fax}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[550px] sm:h-[650px] lg:h-[880px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.666352511148!2d106.90693059211164!3d47.92658319163034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930012bdd359%3A0x707c29cf12cab3f4!2z0JLQvtGP0LYg0L7RhNGE0LjRgQ!5e1!3m2!1sen!2sus!4v1760319969441!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
