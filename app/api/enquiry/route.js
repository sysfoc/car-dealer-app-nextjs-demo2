import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import CarEnquiry from '@/app/models/CarEnquiry';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { carId, firstName, lastName, email, phone, message } = body;

    if (!carId || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Create and save car enquiry
    const carEnquiry = new CarEnquiry({
      carId,
      firstName,
      lastName,
      email,
      phone,
      message: message || '',
      status: 'pending'
    });

    await carEnquiry.save();

    return NextResponse.json(
      {
        message: 'Car enquiry submitted successfully.',
        enquiryId: carEnquiry._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Car enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit car enquiry. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const enquiries = await CarEnquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    console.error('Error fetching car enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch car enquiries.' },
      { status: 500 }
    );
  }
}

