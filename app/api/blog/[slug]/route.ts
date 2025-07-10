import { NextResponse } from "next/server";
import Blog from import Blog from "../../models/Blog";
import path from "path";
import fs from "fs/promises";
import connectDB from "../../../lib/mongodb"


const uploadDir = path.join(process.cwd(), "public/uploads");
export const dynamic = 'force-dynamic'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Error fetching blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const formData = await request.formData();

    const newSlug = formData.get("slug") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const h1 = formData.get("h1") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    const updatedData: Record<string, any> = {
      slug: newSlug,
      metaTitle,
      metaDescription,
      h1,
      content,
      categoryId,
    };

    if (image && image.size > 0) {
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await image.arrayBuffer());

      await fs.writeFile(filePath, buffer);
      updatedData.image = `/uploads/${fileName}`;
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: params.slug },
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully!", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const deletedBlog = await Blog.findOneAndDelete({ slug: params.slug });

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
