import { NextResponse } from "next/server"
import PageContent from "../../../models/PageContent.js"
import dbconnect from "../../../lib/mongodb.js"

export async function GET(req, { params }) {
  try {
    const { type } = params
    console.log("Page content GET request - Type:", type)
    if (!type) {
      return NextResponse.json({ error: "Type parameter is required" }, { status: 400 })
    }
    await dbconnect()
    console.log("Database connected for page content fetch")
    const pageData = await PageContent.findOne({ type })
    console.log("Page content found:", pageData)
    if (!pageData) {
      console.log("No page content found for type:", type)
      return NextResponse.json(
        {
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Page`,
          content: `<p>Content for ${type} page is being updated. Please check back later.</p>`,
          metaTitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Page`,
          metaDescription: `Default description for ${type} page.`,
        },
        { status: 200 },
      )
    }
    return NextResponse.json(
      {
        name: pageData.name,
        content: pageData.content,
        metaTitle: pageData.metaTitle || `${type.charAt(0).toUpperCase() + type.slice(1)} Page`, // Return metaTitle
        metaDescription: pageData.metaDescription || `Default description for ${type} page.`, // Return metaDescription
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Page content GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch page content", details: error.message }, { status: 500 })
  }
}