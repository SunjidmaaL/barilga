'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    FB: any
    fbAsyncInit: () => void
  }
}

export default function FacebookChat() {
  useEffect(() => {
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

    return () => {
      // Cleanup
      const existingScript = document.getElementById('facebook-jssdk')
      if (existingScript) {
        existingScript.remove()
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
      ></div>
    </>
  )
}
