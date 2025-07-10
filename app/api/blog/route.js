import { NextResponse } from "next/server";

import connectDB from "../../lib/mongodb";
import { Types } from "mongoose";

import Blog from "../../models/Blog";
import Category from "../../models/Category";
import fs from "fs/promises";
import path from "path";
export const dynamic = 'force-dynamic'
const uploadDir = path.join(process.cwd(), "public/uploads");
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const slug = formData.get("slug");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const h1 = formData.get("h1");
    const content = formData.get("content");
    const categoryId = formData.get("categoryId");
    const image = formData.get("image");

    const missingFields = [];

    if (!slug) missingFields.push("slug");
    if (!metaTitle) missingFields.push("metaTitle");
    if (!metaDescription) missingFields.push("metaDescription");
    if (!h1) missingFields.push("h1");
    if (!content) missingFields.push("content");
    if (!categoryId) missingFields.push("categoryId");
    if (!image) missingFields.push("image");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: "Slug must be unique" },
        { status: 409 },
      );
    }

    if (!Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID format" },
        { status: 400 },
      );
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    const imageUrl = `/uploads/${fileName}`;

    const newBlog = new Blog({
      slug,
      metaTitle,
      metaDescription,
      h1,
      content,
      categoryId: category._id,
      image: imageUrl,
    });
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog added successfully!", blog: newBlog },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().populate("categoryId");
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
