'use client'

import React, { useState, useEffect } from 'react'

interface CertificateCardProps {
  title: string
  certificateNumber?: string
  issueDate?: string
  expiryDate?: string
  issuedBy?: string
  imageUrl?: string
  pdfUrl?: string
  status?: 'received' | 'pending' | 'expired'
  receivedDate?: string
}

export default function CertificateCard({
  title,
  certificateNumber,
  issueDate,
  expiryDate,
  issuedBy,
  imageUrl,
  pdfUrl,
  status = 'received',
  receivedDate
}: CertificateCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) {
      const now = new Date()
      return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
    }
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  const getStatusText = () => {
    switch (status) {
      case 'received':
        return 'гардаж авлаа.'
      case 'pending':
        return 'хүлээгдэж байна.'
      case 'expired':
        return 'хугацаа дууссан.'
      default:
        return 'гардаж авлаа.'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'received':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'expired':
        return 'text-red-600'
      default:
        return 'text-green-600'
    }
  }

  const handlePdfClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          {/* Certificate Thumbnail - Small Design */}
          <div className="flex-shrink-0">
            <div 
              className={`w-20 h-28 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm relative overflow-hidden cursor-pointer ${
                pdfUrl ? 'hover:border-blue-400 hover:shadow-md' : ''
              }`}
              onClick={handlePdfClick}
            >
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-2">
                  {/* Certificate-like design - Mini version */}
                  {/* Golden emblem at top */}
                  <div className="w-6 h-6 bg-yellow-400 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  
                  {/* Title lines */}
                  <div className="w-full h-0.5 bg-yellow-400 mb-1"></div>
                  <div className="w-full h-0.5 bg-yellow-400 mb-1"></div>
                  <div className="w-full h-0.5 bg-yellow-400 mb-2"></div>
                  
                  {/* Red stamp */}
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">印</span>
                  </div>
                  
                  {/* Blue elements at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 pb-0.5">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              )}
              
              {/* PDF indicator */}
              {pdfUrl && (
                <div className="absolute top-1 right-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PDF</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Info */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {title}
              </p>
              <p className="text-xs text-gray-500">
                {isClient ? (receivedDate ? formatDateTime(receivedDate) : formatDateTime(new Date().toISOString())) : '...'}
              </p>
            </div>

            {/* Additional Details - Compact */}
            <div className="mt-2 space-y-0.5">
              {certificateNumber && (
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Дугаар:</span> {certificateNumber}
                </div>
              )}
              {issueDate && (
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Олгосон:</span> {formatDate(issueDate)}
                </div>
              )}
              {expiryDate && (
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Хүчинтэй:</span> {formatDate(expiryDate)}
                </div>
              )}
              {issuedBy && (
                <div className="text-xs text-gray-600 truncate">
                  <span className="font-medium">Байгууллага:</span> {issuedBy}
                </div>
              )}
            </div>

            {/* PDF Download Button */}
            {pdfUrl && (
              <div className="mt-3">
                <button
                  onClick={handlePdfClick}
                  className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded hover:bg-red-100 transition-colors"
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  PDF татах
                </button>
              </div>
            )}
          </div>

          {/* Status Badge - Compact */}
          <div className="flex-shrink-0">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === 'received' ? 'bg-green-100 text-green-800' :
              status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status === 'received' ? '✓' :
               status === 'pending' ? '⏳' :
               '⚠️'}
            </span>
          </div>
        </div>
      </div>
  )
}
