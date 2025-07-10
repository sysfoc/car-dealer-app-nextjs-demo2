import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb"
import Testimonial from "../../models/Testimonial"

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function GET() {
  await dbConnect();
  const testimonials = await Testimonial.find({});
  return NextResponse.json(testimonials, { status: 200 });
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name");
    const designation = formData.get("designation");
    const content = formData.get("content");
    const image = formData.get("image");

    if (!name || !designation || !content || !image) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 },
      );
    }

    // Create Uploads Directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate Unique File Name
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert image to buffer and save it
    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Save Image Path in DB
    const imageUrl = `/uploads/${fileName}`;

    // Save Testimonial to DB
    const newTestimonial = new Testimonial({
      name,
      designation,
      content,
      image: imageUrl,
    });
    await newTestimonial.save();

    return NextResponse.json(
      {
        message: "Testimonial Added Successfully!",
        testimonial: newTestimonial,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return NextResponse.json(
      { error: "Failed to add testimonial" },
      { status: 500 },
    );
  }
}
