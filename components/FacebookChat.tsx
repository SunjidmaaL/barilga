'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    FB?: any
    fbAsyncInit?: () => void
  }
}

export default function FacebookChat() {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Check if Facebook SDK is already loaded
    if (window.FB) {
      return
    }

    // Facebook SDK initialization
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v20.0'
      })
    }

    // Load Facebook SDK
    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.src = 'https://connect.facebook.net/mn_MN/sdk/xfbml.customerchat.js'
    script.async = true
    document.body.appendChild(script)

    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      // Cleanup
      const existingScript = document.getElementById('facebook-jssdk')
      if (existingScript) {
        existingScript.remove()
      }
      // Clean up global variables
      if (window.FB) {
        delete window.FB
      }
      if (window.fbAsyncInit) {
        delete window.fbAsyncInit
      }
    }
  }, [])

  return (
    <>
      <div id="fb-root"></div>
      <div 
        id="fb-customer-chat" 
        className="fb-customerchat"
        data-page_id="YOUR_PAGE_ID"
        data-attribution="biz_inbox"
      />
      
      {/* Facebook Chat Notification */}
      {showNotification && (
        <div className="fixed bottom-24 right-6 z-50 animate-slide-up">
          <div className="relative flex items-center justify-center">
            <div className="rounded-full bg-white p-3 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
              <img 
                className="size-16 rounded-full" 
                src="/img/chatbot.png" 
                alt="БХБЯ Logo" 
              />
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="absolute -top-1 -right-1 flex items-center justify-center size-6 rounded-full bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md"
              aria-label="Close"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
