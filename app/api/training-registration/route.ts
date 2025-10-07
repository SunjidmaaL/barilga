import { NextRequest, NextResponse } from 'next/server'
import { submitTrainingRegistration } from '@/lib/strapi'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    const result = await submitTrainingRegistration(formData)
    
    return NextResponse.json({ 
      success: true, 
      data: result 
    })
  } catch (error) {
    console.error('Training registration API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Алдаа гарлаа. Дахин оролдоно уу.' 
      },
      { status: 500 }
    )
  }
}
