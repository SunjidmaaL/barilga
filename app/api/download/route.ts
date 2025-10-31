import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileUrl = searchParams.get('url')
  const fileId = searchParams.get('id')

  if (!fileUrl && !fileId) {
    return NextResponse.json({ error: 'File URL or ID is required' }, { status: 400 })
  }

  try {
    let resolvedUrl = fileUrl || ''

    // If only an ID is provided, resolve it via Strapi upload files API
    if (!resolvedUrl && fileId) {
      const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      const metaRes = await fetch(`${strapiBase}/api/upload/files/${encodeURIComponent(fileId)}`)
      if (!metaRes.ok) {
        return NextResponse.json({ error: 'Failed to resolve file by ID' }, { status: metaRes.status })
      }
      const meta = await metaRes.json() as any
      
      // Strapi upload files API returns metadata with 'url' field containing the file path
      // Try multiple possible paths in the response
      const urlFromMeta: string | undefined = 
        meta?.url || 
        meta?.data?.url || 
        meta?.data?.attributes?.url ||
        meta?.attributes?.url
      
      if (!urlFromMeta) {
        console.error('File metadata structure:', JSON.stringify(meta, null, 2))
        return NextResponse.json({ error: 'File URL not found for the given ID' }, { status: 404 })
      }
      
      // Construct full URL - Strapi URLs are usually relative like /uploads/file.pdf
      resolvedUrl = urlFromMeta.startsWith('http') 
        ? urlFromMeta 
        : `${strapiBase}${urlFromMeta.startsWith('/') ? '' : '/'}${urlFromMeta}`
      
      console.log('Resolved file URL:', resolvedUrl)
    }

    // Fetch the file from the resolved URL
    const response = await fetch(resolvedUrl)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status })
    }

    // Check if we got JSON instead of a file (common mistake)
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      // If we got JSON, we might have fetched the wrong endpoint
      const jsonData = await response.json()
      console.error('Received JSON instead of file. Response:', JSON.stringify(jsonData, null, 2))
      
      // Try to extract URL from this JSON if it's metadata
      const fileUrlFromJson = jsonData?.url || jsonData?.data?.url || jsonData?.data?.attributes?.url
      if (fileUrlFromJson) {
        const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const actualFileUrl = fileUrlFromJson.startsWith('http') 
          ? fileUrlFromJson 
          : `${strapiBase}${fileUrlFromJson.startsWith('/') ? '' : '/'}${fileUrlFromJson}`
        
        // Fetch the actual file
        const fileResponse = await fetch(actualFileUrl)
        if (!fileResponse.ok) {
          return NextResponse.json({ error: 'Failed to fetch actual file' }, { status: fileResponse.status })
        }
        
        const blob = await fileResponse.blob()
        const filename = jsonData?.name || jsonData?.data?.name || fileUrlFromJson.split('/').pop() || 'document.pdf'
        const fileContentType = fileResponse.headers.get('content-type') || blob.type || 'application/pdf'
        
        return new NextResponse(blob, {
          headers: {
            'Content-Type': fileContentType,
            'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
      
      return NextResponse.json({ error: 'Received JSON metadata instead of file. Please use the file URL directly.' }, { status: 400 })
    }

    // Get the file content as a blob
    const blob = await response.blob()
    
    // Extract filename from URL or use a default
    const urlParts = resolvedUrl.split('/')
    const filename = urlParts[urlParts.length - 1].split('?')[0] || 'document.pdf'
    
    // Get content type from response or blob
    const finalContentType = response.headers.get('content-type') || blob.type || 'application/octet-stream'

    // Return the file with appropriate headers for download
    return new NextResponse(blob, {
      headers: {
        'Content-Type': finalContentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
  }
}
