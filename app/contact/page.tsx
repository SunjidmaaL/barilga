'use client'

import { useState, useEffect } from 'react'
import { getContacts, submitContactForm } from '@/lib/strapi'

interface ContactInfo {
  id: number
  attributes: {
    address: string
    phone: string
    email: string
    workingHours: string
    description: string
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await getContacts()
        setContactInfo(data)
      } catch (error) {
        console.error('Error loading contact info:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchContactInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      await submitContactForm(formData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Ачааллаж байна...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Холбоо барих</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            {contactInfo?.attributes?.description || 'Бид танд туслахад үргэлж бэлэн.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Хаяг</h3>
            <p className="mt-2 text-gray-600">
              {contactInfo?.attributes?.address || 'Улаанбаатар хот, Монгол Улс'}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Холбоо барих</h3>
            <p className="mt-2 text-gray-600">
              Утас: {contactInfo?.attributes?.phone || '+976 99112233'}
            </p>
            <p className="text-gray-600">
              И-мэйл: {contactInfo?.attributes?.email || 'info@barilga.mn'}
            </p>
            {contactInfo?.attributes?.workingHours && (
              <p className="mt-2 text-gray-600">
                Ажлын цаг: {contactInfo.attributes.workingHours}
              </p>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Нэр</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Таны нэр"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">И-мэйл</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="name@example.com"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Зурвас</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Таны мессеж"
                required
                disabled={submitting}
              />
            </div>
            
            {/* Status messages */}
            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  ✅ Таны зурвас амжилттай илгээгдлээ. Бид удахгүй танд хариулах болно.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">
                  ❌ Зурвас илгээхэд алдаа гарлаа. Дахин оролдоно уу.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Илгээж байна...
                </>
              ) : (
                'Илгээх'
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
