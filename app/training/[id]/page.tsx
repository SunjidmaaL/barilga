import { getTrainingById, getTrainings, getImageUrl } from '@/lib/strapi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface TrainingItem {
  id: number
  attributes?: {
    title?: string
    description?: string
    content?: string
    date?: string
    location?: string
    price?: number
    registration_url?: string
    publishedAt?: string
    image?: {
      data?: {
        attributes?: {
          url?: string
          alternativeText?: string
        }
      }
    }
    createdAt?: string
    updatedAt?: string
  }
  title?: string
  description?: string
  content?: string
  date?: string
  location?: string
  price?: number
  registration_url?: string
  image?: any
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

// Helper function to format date consistently
function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function generateStaticParams() {
  try {
    const trainings = await getTrainings()
    return trainings?.map((item: TrainingItem) => ({
      id: item.id.toString(),
    })) || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error generating static params:', error)
    }
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const trainingItem = await getTrainingById(params.id)
  
  if (!trainingItem) {
    return {
      title: 'Сургалт олдсонгүй',
    }
  }

  const attributes = trainingItem.attributes || trainingItem
  const title = attributes?.title || 'Сургалт'
  const description = attributes?.description || attributes?.content || ''

  return {
    title,
    description,
  }
}

// Helper function to render Strapi Rich Text content
function renderStrapiContent(content: any): string {
  if (!content) return ''
  
  // If content is already a string (HTML or plain text), return it
  if (typeof content === 'string') {
    // Trim whitespace
    const trimmed = content.trim()
    if (!trimmed) return ''
    
    // If it's plain text without HTML tags, wrap in paragraph and preserve line breaks
    if (!/<[a-z][\s\S]*>/i.test(trimmed)) {
      // Split by newlines and wrap each line in paragraph
      const lines = trimmed.split(/\n+/).filter(line => line.trim())
      if (lines.length === 0) return ''
      if (lines.length === 1) {
        return `<p>${escapeHtml(lines[0])}</p>`
      }
      return lines.map(line => `<p>${escapeHtml(line.trim())}</p>`).join('')
    }
    // It's HTML, return as is
    return trimmed
  }
  
  // If content is a Strapi Rich Text JSON structure (array of blocks)
  if (typeof content === 'object' && Array.isArray(content)) {
    const rendered = renderRichTextBlocks(content)
    if (rendered) return rendered
  }
  
  // If content has a blocks property (Strapi v4 Rich Text structure)
  if (content && typeof content === 'object' && content.blocks) {
    const rendered = renderRichTextBlocks(content.blocks)
    if (rendered) return rendered
  }
  
  // If content is an object but not a recognized structure, try to extract text
  if (typeof content === 'object' && content !== null) {
    // Try to extract text from common properties
    if (content.text) {
      return `<p>${escapeHtml(String(content.text))}</p>`
    }
    if (content.content) {
      return renderStrapiContent(content.content)
    }
    // Try to stringify and extract meaningful content
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Training Detail] Unknown content structure, trying to extract:', Object.keys(content))
    }
  }
  
  return ''
}

// Helper function to render Strapi Rich Text blocks to HTML
function renderRichTextBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''
  
  return blocks.map((block) => {
    if (!block || typeof block !== 'object') return ''
    
    switch (block.type) {
      case 'paragraph':
        const paraContent = renderInlineNodes(block.children || [])
        return paraContent ? `<p>${paraContent}</p>` : ''
      case 'heading':
        const level = block.level || 1
        const headingTag = `h${Math.min(Math.max(level, 1), 6)}`
        const headingContent = renderInlineNodes(block.children || [])
        return headingContent ? `<${headingTag}>${headingContent}</${headingTag}>` : ''
      case 'list':
        const listTag = block.format === 'ordered' ? 'ol' : 'ul'
        const items = (block.children || [])
          .filter((item: any) => item && item.children)
          .map((item: any) => {
            const itemContent = renderInlineNodes(item.children || [])
            return itemContent ? `<li>${itemContent}</li>` : ''
          })
          .filter(Boolean)
          .join('')
        return items ? `<${listTag}>${items}</${listTag}>` : ''
      case 'quote':
        const quoteContent = renderInlineNodes(block.children || [])
        return quoteContent ? `<blockquote>${quoteContent}</blockquote>` : ''
      case 'code':
        const codeContent = renderInlineNodes(block.children || [])
        return codeContent ? `<pre><code>${escapeHtml(codeContent)}</code></pre>` : ''
      case 'link':
        const url = block.url || block.href || '#'
        const linkContent = renderInlineNodes(block.children || [])
        return linkContent ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${linkContent}</a>` : ''
      case 'image':
        // Handle Strapi image structure
        let imageUrl = ''
        let imageAlt = block.alt || ''
        
        // Try different image URL locations
        if (block.url) {
          imageUrl = block.url
        } else if (block.src) {
          imageUrl = block.src
        } else if (block.image?.url) {
          imageUrl = block.image.url
        } else if (block.image?.data?.attributes?.url) {
          imageUrl = block.image.data.attributes.url
        } else if (block.image?.data?.url) {
          imageUrl = block.image.data.url
        }
        
        // Get alt text
        if (!imageAlt) {
          imageAlt = block.image?.alternativeText || block.image?.data?.attributes?.alternativeText || ''
        }
        
        // If image URL is relative, prepend Strapi API URL
        const fullImageUrl = imageUrl && !imageUrl.startsWith('http') 
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
          : imageUrl
        
        return fullImageUrl ? `<img src="${escapeHtml(fullImageUrl)}" alt="${escapeHtml(imageAlt)}" class="max-w-full h-auto my-4 rounded-lg" />` : ''
      default:
        // For unknown block types, try to render children
        if (block.children && Array.isArray(block.children)) {
          return renderInlineNodes(block.children)
        }
        return ''
    }
  }).filter(Boolean).join('')
}

// Helper function to render inline nodes (text, bold, italic, etc.)
function renderInlineNodes(nodes: any[]): string {
  if (!Array.isArray(nodes)) return ''
  
  return nodes.map((node) => {
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '')
      // Apply formatting in correct order (nested formatting support)
      const formats = []
      if (node.bold) formats.push(['strong', '</strong>'])
      if (node.italic) formats.push(['em', '</em>'])
      if (node.underline) formats.push(['u', '</u>'])
      if (node.strikethrough) formats.push(['s', '</s>'])
      if (node.code) formats.push(['code', '</code>'])
      
      // Apply formats
      formats.forEach(([openTag, closeTag]) => {
        text = `<${openTag}>${text}</${openTag}>`
      })
      
      return text
    }
    if (node.type === 'link') {
      const url = node.url || '#'
      const linkText = renderInlineNodes(node.children || [])
      return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
    }
    return ''
  }).join('')
}

export default async function TrainingDetailPage({ params }: { params: { id: string } }) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Training Detail Page] Loading training with ID: ${params.id}`);
  }
  
  const trainingItem = await getTrainingById(params.id)

  if (!trainingItem) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Training Detail Page] Training item with ID ${params.id} not found`);
      console.error(`[Training Detail Page] This means getTrainingById() returned null`);
    }
    notFound()
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Training Detail Page] Training item loaded successfully:`, {
      id: trainingItem.id,
      hasAttributes: !!trainingItem.attributes,
      title: trainingItem.attributes?.title || trainingItem.title
    });
  }

  // Safe access to training data with fallbacks
  const attributes = trainingItem.attributes || trainingItem
  const title = attributes?.title || trainingItem.title || 'Untitled Training'
  const description = attributes?.description || trainingItem.description || ''
  
  // Get content from multiple possible locations
  // Strapi Rich Text field might return HTML string or JSON structure
  const rawContent = attributes?.content || trainingItem.content || ''
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Training Detail Debug] Raw content:', {
      hasContent: !!rawContent,
      contentType: typeof rawContent,
      contentLength: rawContent ? String(rawContent).length : 0,
      isString: typeof rawContent === 'string',
      isArray: Array.isArray(rawContent),
      isObject: typeof rawContent === 'object' && rawContent !== null,
      contentPreview: typeof rawContent === 'string' 
        ? rawContent.substring(0, 100) 
        : JSON.stringify(rawContent).substring(0, 100),
      hasDescription: !!description,
      descriptionLength: description ? description.length : 0
    });
  }
  
  // Render content (handles both HTML strings and Strapi Rich Text JSON)
  // If content is empty, try to use description as fallback
  const contentToRender = rawContent || description || ''
  const content = renderStrapiContent(contentToRender)
  
  // Check if description is the same as content (to avoid showing duplicate)
  const isDescriptionSameAsContent = description && rawContent && 
    description.trim() === (typeof rawContent === 'string' ? rawContent.trim() : '')
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Training Detail Debug] Rendered content:', {
      hasRenderedContent: !!content,
      contentLength: content ? content.length : 0,
      contentPreview: content ? content.substring(0, 200) : '',
      isDescriptionSameAsContent,
      usedDescriptionAsFallback: !rawContent && !!description
    });
  }
  
  const date = attributes?.date || attributes?.publishedAt || attributes?.createdAt || trainingItem.date || trainingItem.publishedAt || trainingItem.createdAt || ''
  const location = attributes?.location || trainingItem.location || ''
  const price = attributes?.price || trainingItem.price
  const registration_url = attributes?.registration_url || trainingItem.registration_url || ''
  const image = attributes?.image || trainingItem.image
  const imageUrl = getImageUrl(image) || '/img/training1.jpg'
  const imageAlt = image?.data?.attributes?.alternativeText || image?.alternativeText || attributes?.image?.data?.attributes?.alternativeText || title
  
  // Format date
  const formattedDate = formatDate(date)

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link 
            href="/training" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Сургалтын жагсаалт руу буцах
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image */}
          {imageUrl && (
            <div className="aspect-[16/9] w-full relative bg-gray-100 overflow-hidden">
              <Image 
                className="object-cover" 
                src={imageUrl}
                alt={imageAlt || title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Meta info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              {formattedDate && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>
              )}
              {location && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </div>
              )}
              {price && (
                <div className="flex items-center text-indigo-600 font-semibold">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {price.toLocaleString()}₮
                </div>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h1>
            
            {/* Description - Only show if it's different from content */}
            {description && !isDescriptionSameAsContent && rawContent && content && content.trim() && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed italic">
                {description}
              </p>
            )}
            
            {/* Content */}
            {content && content.trim() ? (
              <div 
                className="training-content text-sm sm:text-base text-gray-700 leading-relaxed mt-4 sm:mt-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>Мэдээлэл байхгүй байна.</p>
              </div>
            )}

            {/* Registration Button */}
            {registration_url && (
              <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
                <a
                  href={registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Бүртгүүлэх
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
