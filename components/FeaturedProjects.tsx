'use client'

import { useEffect, useState } from 'react'
import { getFeaturedProjects, getFeaturedNews, testProjectsAPI } from '@/lib/strapi'

interface Project {
  id: number
  attributes?: {
    title?: string
    description?: string
    image?: {
      data?: {
        attributes?: {
          url?: string
          alternativeText?: string
        }
      }
    }
    featured?: boolean
    createdAt?: string
    updatedAt?: string
  }
  // Fallback properties for direct data structure
  title?: string
  description?: string
  image?: any
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

// Loading component for projects
function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <article key={i} className="group relative overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 animate-pulse">
          <div className="aspect-[16/10] bg-gray-200"></div>
          <div className="p-5">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        console.log('🔍 Starting to load featured projects...')
        
        // First, test API connectivity
        console.log('🧪 Testing API connectivity...')
        const testResult = await testProjectsAPI()
        console.log('API test result:', testResult)
        
        if (!testResult.success) {
          throw new Error(`API connectivity test failed: ${testResult.error}`)
        }
        
        // Try to load featured projects
        console.log('📡 Loading featured projects...')
        let data = await getFeaturedProjects()
        console.log('Featured projects result:', data)
        
        // If no featured projects, try to load featured news as fallback
        if (!data || data.length === 0) {
          console.log('⚠️ No featured projects found, trying featured news as fallback...')
          const newsData = await getFeaturedNews()
          console.log('Featured news data:', newsData)
          
          // Transform news data to match project structure if needed
          if (newsData && newsData.length > 0) {
            data = newsData.map((news: any) => ({
              id: news.id,
              attributes: {
                title: news.attributes?.title || news.title,
                description: news.attributes?.description || news.description,
                image: news.attributes?.image || news.image,
                featured: true,
                createdAt: news.attributes?.createdAt || news.createdAt,
                updatedAt: news.attributes?.updatedAt || news.updatedAt
              }
            }))
            console.log('✅ Transformed news data to projects:', data)
          }
        }
        
        console.log('🎯 Final projects data:', data)
        setProjects(data || [])
      } catch (err) {
        console.error('❌ Failed to load projects:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(`Төслүүдийг ачаалахад алдаа гарлаа: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return <ProjectsLoading />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Алдаа гарлаа</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Онцлох төсөл олдсонгүй</h3>
        <p className="text-gray-600">Одоогоор онцолж харуулах төсөл байхгүй байна.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => {
        // Debug: Log project structure
        console.log(`Project ${index + 1} structure:`, project)
        
        // Safe access to project data with fallbacks
        const attributes = project.attributes || project
        const imageUrl = attributes?.image?.data?.attributes?.url
        const imageAlt = attributes?.image?.data?.attributes?.alternativeText || attributes?.title || 'Project image'
        const title = attributes?.title || 'Untitled Project'
        const description = attributes?.description || ''
        
        console.log(`Project ${index + 1} processed:`, { title, description, imageUrl, imageAlt })

        const imageUrl2 = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
        console.log(`Project ${index + 1} image URL:`, imageUrl2)
        
        return (
          <article 
            key={project.id} 
            className="group relative overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
          >
            <div 
              className="aspect-[16/10] bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
              style={{
                backgroundImage: imageUrl 
                  ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl})`
                  : ''
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="p-5 relative z-10">
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {title}
              </h4>
              {description && (
                <p className="mt-2 text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {description}
                </p>
              )}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center text-indigo-600 text-sm font-medium">
                  Дэлгэрэнгүй үзэх
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
