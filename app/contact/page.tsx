'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section className="bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Холбоо барих</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Бид танд туслахад үргэлж бэлэн.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Хаяг</h3>
            <p className="mt-2 text-gray-600">Улаанбаатар хот, Монгол Улс</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Холбоо барих</h3>
            <p className="mt-2 text-gray-600">Утас: +976 99112233</p>
            <p className="text-gray-600">И-мэйл: info@barilga.mn</p>
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
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Илгээх
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
