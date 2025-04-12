import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'sahi0045@hotmail.com';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    console.log('Attempting to send email with:', {
      to: ADMIN_EMAIL,
      from: 'Ayhro Contact <onboarding@resend.dev>',
      subject: `New Contact Form Submission from ${name}`,
      name,
      email,
      message
    });

    const data = await resend.emails.send({
      from: 'Ayhro Contact <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Detailed error sending email:', {
      error: error.message,
      stack: error.stack,
      details: error
    });
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 