import { NextResponse } from "next/server"
import dbConnect from "../../lib/mongodb"
import Valuation from "../../models/Valuation"
import nodemailer from "nodemailer"

// GET - Fetch all valuations (for admin)
export async function GET() {
  try {
    await dbConnect()
    const valuations = await Valuation.find({}).sort({ createdAt: -1 })
    return NextResponse.json(valuations)
  } catch (error) {
    console.error("Error fetching valuations:", error)
    return NextResponse.json({ error: "Failed to fetch valuations" }, { status: 500 })
  }
}

// POST - Create new valuation request
export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()

    const { name, email, make, model, valuationType } = body

    // Validation
    if (!name || !email || !make || !model || !valuationType) {
      return NextResponse.json({ error: "Name, email, make, model, and valuation type are required" }, { status: 400 })
    }

    const newValuation = await Valuation.create({
      name,
      email,
      make,
      model,
      valuationType,
    })

    // Send confirmation email to customer
    try {
      console.log("Attempting to send confirmation email to:", email)
      console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set")
      console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "Set" : "Not set") // Corrected env var name

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD, // Corrected env var name
        },
      })

      // Test the connection
      await transporter.verify()
      console.log("Email transporter verified successfully for POST")

      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Car Valuation Request Received",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for your valuation request!</h2>
            <p>Dear ${name},</p>
            <p>We have received your car valuation request for your <strong>${make} ${model}</strong>.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Request Details:</h3>
              <p><strong>Vehicle:</strong> ${make} ${model}</p>
              <p><strong>Valuation Type:</strong> ${valuationType}</p>
              <p><strong>Request ID:</strong> ${newValuation._id}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>Our team will review your request and get back to you within 24-48 hours with a detailed valuation.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            The Car Valuation Team</p>
          </div>
        `,
      }

      const result = await transporter.sendMail(customerMailOptions)
      console.log("Confirmation email sent successfully:", result.messageId)

      // Send notification email to admin for new request
      const adminNotificationMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to admin's email
        subject: `New Car Valuation Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Car Valuation Request</h2>
            <p>A new car valuation request has been submitted:</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Vehicle:</strong> ${make} ${model}</p>
              <p><strong>Valuation Type:</strong> ${valuationType}</p>
              <p><strong>Request ID:</strong> ${newValuation._id}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Please log in to the admin panel to review and respond to this request.</p>
            
            <p>Best regards,<br>
            Your System Admin</p>
          </div>
        `,
      }
      await transporter.sendMail(adminNotificationMailOptions)
      console.log("Admin notification email sent for new request.")
    } catch (emailError) {
      console.error("Detailed email error (POST):", emailError)
      console.error("Error code:", emailError.code)
      console.error("Error message:", emailError.message)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Valuation request submitted successfully",
      valuation: newValuation,
    })
  } catch (error) {
    console.error("Error creating valuation:", error)
    return NextResponse.json({ error: "Failed to submit valuation request" }, { status: 500 })
  }
}

// PUT - Update valuation (admin reply)
export async function PUT(request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { valuationId, adminReply, estimatedValue, repliedBy } = body

    if (!valuationId || !adminReply) {
      return NextResponse.json({ error: "Valuation ID and admin reply are required" }, { status: 400 })
    }

    const updatedValuation = await Valuation.findByIdAndUpdate(
      valuationId,
      {
        adminReply,
        estimatedValue: estimatedValue || "",
        repliedBy: repliedBy || "Admin",
        status: "responded",
        repliedAt: new Date(),
      },
      { new: true },
    )

    if (!updatedValuation) {
      return NextResponse.json({ error: "Valuation not found" }, { status: 404 })
    }

    // Send reply email to customer
    try {
      console.log("Attempting to send reply email to:", updatedValuation.email)
      console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set")
      console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "Set" : "Not set") // Corrected env var name

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD, // Corrected env var name
        },
      })

      // Test the connection
      await transporter.verify()
      console.log("Email transporter verified successfully for PUT")

      const replyMailOptions = {
        from: process.env.EMAIL_USER,
        to: updatedValuation.email,
        subject: "Your Car Valuation is Ready!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Your Car Valuation Response</h2>
            <p>Dear ${updatedValuation.name},</p>
            <p>Thank you for your patience. We have completed the valuation for your <strong>${updatedValuation.make} ${updatedValuation.model}</strong>.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Vehicle Details:</h3>
              <p><strong>Vehicle:</strong> ${updatedValuation.make} ${updatedValuation.model}</p>
              <p><strong>Valuation Type:</strong> ${updatedValuation.valuationType}</p>
              ${estimatedValue ? `<p><strong>Estimated Value:</strong> ${estimatedValue}</p>` : ""}
            </div>
            
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #065f46;">Our Response:</h3>
              <p style="white-space: pre-wrap; color: #374151;">${adminReply}</p>
            </div>
            
            <p>If you have any questions about this valuation or would like to discuss next steps, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            ${repliedBy || "The Car Valuation Team"}</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="font-size: 12px; color: #6b7280;">
              Request ID: ${updatedValuation._id}<br>
              Response Date: ${new Date().toLocaleDateString()}
            </p>
          </div>
        `,
      }

      const result = await transporter.sendMail(replyMailOptions)
      console.log("Reply email sent successfully:", result.messageId)

      // Send notification email to admin that a reply was sent
      const adminReplyNotificationMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to admin's email
        subject: `Reply Sent for Valuation - ${updatedValuation.make} ${updatedValuation.model}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Valuation Reply Sent</h2>
            <p>A reply has been sent for the following valuation request:</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Customer Name:</strong> ${updatedValuation.name}</p>
              <p><strong>Customer Email:</strong> ${updatedValuation.email}</p>
              <p><strong>Vehicle:</strong> ${updatedValuation.make} ${updatedValuation.model}</p>
              <p><strong>Valuation Type:</strong> ${updatedValuation.valuationType}</p>
              ${estimatedValue ? `<p><strong>Estimated Value:</strong> ${estimatedValue}</p>` : ""}
            </div>
            
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #065f46;">Reply Sent:</h3>
              <p style="white-space: pre-wrap; color: #374151;">${adminReply}</p>
            </div>
            
            <p>Reply sent by: ${repliedBy || "Admin"}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
        `,
      }
      await transporter.sendMail(adminReplyNotificationMailOptions)
      console.log("Admin notification email sent for reply.")
    } catch (emailError) {
      console.error("Detailed reply email error (PUT):", emailError)
      console.error("Error code:", emailError.code)
      console.error("Error message:", emailError.message)
      // Don't fail the request if email fails, but log the error
    }

    return NextResponse.json({
      success: true,
      message: "Reply sent successfully and customer notified via email",
      valuation: updatedValuation,
    })
  } catch (error) {
    console.error("Error updating valuation:", error)
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 })
  }
}

// DELETE - Delete valuation
export async function DELETE(request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { valuationId } = body

    if (!valuationId) {
      return NextResponse.json({ error: "Valuation ID is required" }, { status: 400 })
    }

    const deletedValuation = await Valuation.findByIdAndDelete(valuationId)

    if (!deletedValuation) {
      return NextResponse.json({ error: "Valuation not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Valuation deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting valuation:", error)
    return NextResponse.json({ error: "Failed to delete valuation" }, { status: 500 })
  }
}
