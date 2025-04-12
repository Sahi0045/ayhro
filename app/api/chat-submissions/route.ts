import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'sahi0045@hotmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, project_details } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields', details: { name, email, phone } },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone format (allows +, spaces, and hyphens)
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    // Insert into Supabase
    const { error: dbError, data } = await supabase
      .from('chat_submissions')
      .insert([
        {
          name,
          email,
          phone,
          service,
          project_details,
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save submission', details: dbError.message },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      console.log('Attempting to send email with Resend API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing')
      
      const emailResult = await resend.emails.send({
        from: 'Ayhro AI <onboarding@resend.dev>', // Using Resend's default sender
        to: ADMIN_EMAIL,
        subject: `🚀 New Project Inquiry from ${name}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #0A1621; color: #00FF85; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">New Project Inquiry</h1>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h2 style="color: #0A1621; margin-top: 0;">Client Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>
              
              <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h2 style="color: #0A1621;">Project Details</h2>
                <p><strong>Requested Service:</strong> ${service || 'Not specified'}</p>
                <p><strong>Project Description:</strong></p>
                <p style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${project_details || 'No details provided'}</p>
              </div>

              <div>
                <h2 style="color: #0A1621;">Action Required</h2>
                <p>Please respond to this inquiry within 24 hours.</p>
                <a href="mailto:${email}" 
                   style="display: inline-block; padding: 10px 20px; background-color: #00FF85; color: #0A1621; text-decoration: none; border-radius: 5px; margin-top: 15px;">
                  Reply to Client
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
              <p>This is an automated notification from Ayhro AI Assistant</p>
              <p>© ${new Date().getFullYear()} Ayhro. All rights reserved.</p>
            </div>
          </div>
        `
      })

      console.log('Email sent successfully:', emailResult)
    } catch (emailError) {
      console.error('Email notification error:', emailError)
      // Don't return error response as the submission was successful
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Submission saved successfully',
      data: data[0]
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 