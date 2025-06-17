import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import SocialMedia from "../../models/SocialMedia";
export async function GET() {
  await connectDB();
  const data = await SocialMedia.find().sort({ order: 1 });
  return NextResponse.json({ data });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { url, icon, order } = body;

  if (!url || !icon || order === undefined) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const existing = await SocialMedia.findOne({ icon });

  let saved;
  if (existing) {
    existing.url = url;
    existing.order = order;
    saved = await existing.save();
  } else {
    saved = await SocialMedia.create({ url, icon, order });
  }

  return NextResponse.json({ message: "Saved", data: saved });
}
