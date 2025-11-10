import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Server-side API route for license tables to reduce client-side API calls
export async function GET(request: NextRequest) {
  try {
    // Cache on server - shorter in dev, longer in production
    const revalidateTime = process.env.NODE_ENV === 'development' ? 300 : 7200;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
      const res = await fetch(`${API_URL}/api/license-tables?populate=*&sort=year:asc`, {
        next: { revalidate: revalidateTime },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        // For 403/401, return empty data instead of error (permission issue)
        // For 500+, return empty data (server error)
        // Always return 200 with empty data to prevent client errors
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[API Route] License tables: ${res.status} ${res.statusText}`);
        }
        return NextResponse.json({ data: [] }, { status: 200 });
      }
      
      const data = await res.json();
      
      if (!data || !data.data) {
        return NextResponse.json({ data: [] }, { status: 200 });
      }
      
      return NextResponse.json({ data: data.data }, { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    // Network errors, timeouts, etc. - return empty data
    if (process.env.NODE_ENV === 'development') {
      console.warn('[API Route] License tables error:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ data: [] }, { status: 200 });
  }
}
