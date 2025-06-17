import { NextResponse } from "next/server";
import PageContent from "../../../models/PageContent.js";
import dbconnect from "../../../lib/mongodb.js"

export async function GET(req, { params }) {
  const { type } = params;

  try {
    await dbconnect(); 

    const pageData = await PageContent.findOne({ type });

    if (!pageData) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(pageData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}
