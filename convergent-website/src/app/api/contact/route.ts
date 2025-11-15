import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';
import { ContactSubmission } from '@/lib/sanity/types';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create the contact submission document
    const submission: Omit<ContactSubmission, '_id'> = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    // Store in Sanity
    const result = await client.create({
      _type: 'contactSubmission',
      ...submission,
    });

    return NextResponse.json(
      {
        success: true,
        id: result._id,
        message: 'Thank you for contacting us! We will get back to you soon.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests to check API health
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is running',
  });
}
