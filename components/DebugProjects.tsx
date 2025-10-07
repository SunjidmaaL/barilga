'use client'

import { useEffect, useState } from 'react'
import { getFeaturedProjects, getFeaturedNews, getProjects } from '@/lib/strapi'

export default function DebugProjects() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const debugData = async () => {
      try {
        setLoading(true)
        
        // Test all API endpoints
        const [featuredProjects, featuredNews, allProjects] = await Promise.all([
          getFeaturedProjects(),
          getFeaturedNews(), 
          getProjects()
        ])

        setDebugInfo({
          featuredProjects,
          featuredNews,
          allProjects,
          apiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        console.error('Debug error:', error)
        setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' })
      } finally {
        setLoading(false)
      }
    }

    debugData()
  }, [])

  if (loading) {
    return <div className="p-4 bg-yellow-100 rounded">Loading debug info...</div>
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Debug Information:</h3>
      <div className="space-y-2">
        <div><strong>API URL:</strong> {debugInfo.apiUrl}</div>
        <div><strong>Featured Projects Count:</strong> {debugInfo.featuredProjects?.length || 0}</div>
        <div><strong>Featured News Count:</strong> {debugInfo.featuredNews?.length || 0}</div>
        <div><strong>All Projects Count:</strong> {debugInfo.allProjects?.length || 0}</div>
        <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
        
        {debugInfo.featuredProjects && debugInfo.featuredProjects.length > 0 && (
          <div>
            <strong>Featured Projects Data:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-40">
              {JSON.stringify(debugInfo.featuredProjects, null, 2)}
            </pre>
          </div>
        )}
        
        {debugInfo.featuredNews && debugInfo.featuredNews.length > 0 && (
          <div>
            <strong>Featured News Data:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-40">
              {JSON.stringify(debugInfo.featuredNews, null, 2)}
            </pre>
          </div>
        )}

        {debugInfo.error && (
          <div className="text-red-600">
            <strong>Error:</strong> {debugInfo.error}
          </div>
        )}
      </div>
    </div>
  )
}
