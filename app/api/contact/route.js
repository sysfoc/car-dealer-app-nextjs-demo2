import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb"
import Contact from "../../models/Contact"

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { heading, content, name, address, phone, map } = body;

    if (!heading || !content || !name || !address || !phone || !map) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Check if a Contact document already exists
    const existing = await Contact.findOne();

    let updatedEntry;
    if (existing) {
      // Update existing entry
      existing.heading = heading;
      existing.content = content;
      existing.name = name;
      existing.address = address;
      existing.phone = phone;
      existing.map = map;

      updatedEntry = await existing.save();
    } else {
      // Create a new one
      updatedEntry = await Contact.create({
        heading,
        content,
        name,
        address,
        phone,
        map,
      });
    }

    return NextResponse.json({
      message: "Contact data saved successfully",
      entry: updatedEntry,
    });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();

    const contactData = await Contact.findOne();
    return NextResponse.json({ contact: contactData });
  } catch (error) {
    console.error("GET contact error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact data" },
      { status: 500 },
    );
  }
}
