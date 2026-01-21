import { getMemberNewsById, getMemberNews, getImageUrl } from '@/lib/strapi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface MemberNewsItem {
  id: number | string
  attributes?: {
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    createdAt?: string
    image?: any
  }
  title?: string
  description?: string
  content?: string
  publishedAt?: string
  createdAt?: string
  image?: any
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

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

function renderInlineNodes(nodes: any[]): string {
  if (!Array.isArray(nodes)) return ''
  
  return nodes.map((node) => {
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '')
      const formats = []
      if (node.bold) formats.push(['strong', '</strong>'])
      if (node.italic) formats.push(['em', '</em>'])
      if (node.underline) formats.push(['u', '</u>'])
      if (node.strikethrough) formats.push(['s', '</s>'])
      if (node.code) formats.push(['code', '</code>'])
      
      formats.forEach(([openTag, closeTag]) => {
        text = `<${openTag}>${text}${closeTag}`
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
      default:
        if (block.children && Array.isArray(block.children)) {
          return renderInlineNodes(block.children)
        }
        return ''
    }
  }).filter(Boolean).join('')
}

function renderStrapiContent(content: any): string {
  if (!content) return ''
  
  if (typeof content === 'string') {
    const trimmed = content.trim()
    if (!trimmed) return ''
    if (!/<[a-z][\s\S]*>/i.test(trimmed)) {
      const lines = trimmed.split(/\n+/).filter(line => line.trim())
      if (lines.length === 0) return ''
      if (lines.length === 1) return `<p>${escapeHtml(lines[0])}</p>`
      return lines.map(line => `<p>${escapeHtml(line.trim())}</p>`).join('')
    }
    return trimmed
  }
  
  if (typeof content === 'object' && Array.isArray(content)) {
    const rendered = renderRichTextBlocks(content)
    if (rendered) return rendered
  }
  
  if (content && typeof content === 'object' && content.blocks) {
    const rendered = renderRichTextBlocks(content.blocks)
    if (rendered) return rendered
  }
  
  if (typeof content === 'object' && content !== null) {
    if (content.text) {
      return `<p>${escapeHtml(String(content.text))}</p>`
    }
    if (content.content) {
      return renderStrapiContent(content.content)
    }
  }
  
  return ''
}

export async function generateStaticParams() {
  try {
    const news = await getMemberNews()
    return news?.map((item: MemberNewsItem) => ({
      id: item.id.toString(),
    })) || []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Member News] Error generating static params:', error)
    }
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const newsItem = await getMemberNewsById(params.id)
  
  if (!newsItem) {
    return {
      title: 'Мэдээ олдсонгүй',
    }
  }

  const attributes = (newsItem as any).attributes || newsItem
  const title = attributes?.title || 'Гишүүн байгууллагын мэдээ'
  const description = attributes?.description || attributes?.content || ''

  return {
    title,
    description,
  }
}

export default async function MemberNewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await getMemberNewsById(params.id)

  if (!newsItem) {
    notFound()
  }

  const attributes = (newsItem as any).attributes || newsItem
  const title = attributes?.title || (newsItem as any).title || 'Гишүүн байгууллагын мэдээ'
  const description = attributes?.description || (newsItem as any).description || ''
  const rawContent = attributes?.content || (newsItem as any).content || ''
  const publishedAt = attributes?.publishedAt || attributes?.createdAt || (newsItem as any).publishedAt || (newsItem as any).createdAt || ''
  const image = attributes?.image || (newsItem as any).image
  const imageUrl = getImageUrl(image)
  const imageAlt = image?.data?.attributes?.alternativeText || image?.alternativeText || attributes?.title || 'Member news'

  const content = renderStrapiContent(rawContent || description)
  const formattedDate = formatDate(publishedAt)

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Буцах
          </Link>
        </div>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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

          <div className="p-4 sm:p-6 md:p-8">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{formattedDate}</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h1>

            {description && rawContent && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed italic">
                {description}
              </p>
            )}

            {content ? (
              <div 
                className="news-content text-sm sm:text-base text-gray-700 leading-relaxed mt-4 sm:mt-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>Мэдээлэл байхгүй байна.</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
