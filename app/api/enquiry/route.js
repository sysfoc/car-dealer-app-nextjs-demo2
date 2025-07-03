import Car from "../../models/Car"
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import CarEnquiry from '@/app/models/CarEnquiry';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

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
    
    const enquiries = await CarEnquiry.find({})
      .sort({ createdAt: -1 });
    
    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    console.error('Error fetching car enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch car enquiries.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { enquiryId, adminReply, repliedBy } = body;
    
    if (!enquiryId || !adminReply || !repliedBy) {
      return NextResponse.json(
        { error: 'Enquiry ID, admin reply, and replied by are required.' },
        { status: 400 }
      );
    }
    
    const enquiry = await CarEnquiry.findById(enquiryId);
    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found.' },
        { status: 404 }
      );
    }
    
    // Update enquiry with admin reply
    enquiry.adminReply = adminReply;
    enquiry.repliedBy = repliedBy;
    enquiry.status = 'answered';
    enquiry.repliedAt = new Date();
    
    await enquiry.save();
    
    // Send email to customer
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: enquiry.email,
        subject: 'Response to Your Car Enquiry',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Car Dealership</h1>
              <p style="color: white; margin: 10px 0 0 0;">Response to Your Enquiry</p>
            </div>
            <div style="padding: 30px; background-color: #f8f9fa;">
              <h2 style="color: #333;">Dear ${enquiry.firstName} ${enquiry.lastName},</h2>
              <p style="color: #666; line-height: 1.6;">Thank you for your enquiry. Here's our response:</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
                <p style="color: #666; font-style: italic;">${enquiry.message}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="color: #333; margin-top: 0;">Our Response:</h3>
                <p style="color: #666; line-height: 1.6;">${adminReply}</p>
              </div>
              
              <p style="color: #666; line-height: 1.6;">If you have any further questions, please feel free to contact us.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 14px;">Best regards,<br>Car Dealership Team</p>
              </div>
            </div>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json(
      { message: 'Reply sent successfully and customer notified.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error replying to enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send reply.' },
      { status: 500 }
    );
  }
}