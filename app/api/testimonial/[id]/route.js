import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Testimonial from "../../../models/Testimonial";

const uploadDir = path.join(process.cwd(), "public/uploads");
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const formData = await req.formData();

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required!" },
        { status: 400 },
      );
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found!" },
        { status: 404 },
      );
    }

    const name = formData.get("name");
    const designation = formData.get("designation");
    const content = formData.get("content");
    const image = formData.get("image");

    let imageUrl = testimonial.image;

    if (image && image.name) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      if (testimonial.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          testimonial.image,
        );
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.warn("Old image not found or already deleted:", err);
        }
      }

      imageUrl = `/uploads/${fileName}`;
    }

    testimonial.name = name || testimonial.name;
    testimonial.designation = designation || testimonial.designation;
    testimonial.content = content || testimonial.content;
    testimonial.image = imageUrl;
    await testimonial.save();

    return NextResponse.json(
      { message: "Testimonial Updated Successfully!", testimonial },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted Successfully!" },
    { status: 200 },
  );
}
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required!" }, { status: 400 });
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found!" },
        { status: 404 },
      );
    }

    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
