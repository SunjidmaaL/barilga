import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from request headers or body
    const secret = request.headers.get('x-revalidate-secret') || 
                  request.nextUrl.searchParams.get('secret')
    
    // Check if secret matches (set this in your environment variables)
    const expectedSecret = process.env.REVALIDATE_SECRET
    
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Get the path to revalidate from request body or query params
    const body = await request.json().catch(() => ({}))
    const path = body.path || request.nextUrl.searchParams.get('path')
    const tag = body.tag || request.nextUrl.searchParams.get('tag')

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      return NextResponse.json({ 
        revalidated: true, 
        path,
        now: Date.now() 
      })
    } else if (tag) {
      // Revalidate by tag
      revalidateTag(tag)
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        now: Date.now() 
      })
    } else {
      // Revalidate news pages
      revalidatePath('/news')
      revalidatePath('/')
      return NextResponse.json({ 
        revalidated: true, 
        paths: ['/news', '/'],
        now: Date.now() 
      })
    }
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Also support GET for easy testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.REVALIDATE_SECRET
  
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  const path = request.nextUrl.searchParams.get('path')
  
  if (path) {
    revalidatePath(path)
    return NextResponse.json({ 
      revalidated: true, 
      path,
      now: Date.now() 
    })
  } else {
    // Revalidate news pages
    revalidatePath('/news')
    revalidatePath('/')
    return NextResponse.json({ 
      revalidated: true, 
      paths: ['/news', '/'],
      now: Date.now() 
    })
  }
}
