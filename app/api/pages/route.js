import connectToMongoDB from "../../lib/mongodb.js";
import { NextResponse } from "next/server";
import Homepage from "../../models/Homepage.js";

const fieldMappings = {
  seoTitle: "seoTitle",
  seoDescription: "seoDescription",
  searchHeading: "searchSection.heading",
  searchText: "searchSection.text",
  brandHeading: "brandSection.heading",
  brandSubheading: "brandSection.subheading",
  brandItems: "brandSection.items",
  brandStatus: "brandSection.status",
  listingHeading: "listingSection.heading",
  listingSubheading: "listingSection.subheading",
  listingItems: "listingSection.items",
  listingStatus: "listingSection.status",
  chooseusHeading: "chooseUs.heading",
  chooseusFirstHeading: "chooseUs.first.heading",
  chooseusFirstDescription: "chooseUs.first.description",
  chooseusSecondHeading: "chooseUs.second.heading",
  chooseusSecondDescription: "chooseUs.second.description",
  chooseusThirdHeading: "chooseUs.third.heading",
  chooseusThirdDescription: "chooseUs.third.description",
  chooseusFourthHeading: "chooseUs.fourth.heading",
  chooseusFourthDescription: "chooseUs.fourth.description",
  mondayHr: "footer.monday",
  tuesdayHr: "footer.tuesday",
  wednesdayHr: "footer.wednesday",
  thursdayHr: "footer.thursday",
  fridayHr: "footer.friday",
  saturdayHr: "footer.saturday",
};

export async function GET() {
  try {
    await connectToMongoDB();
    
    const homepageData = await Homepage.findOne();
    
    return NextResponse.json(homepageData || {});
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json(
      { error: "Failed to fetch homepage data." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Check if request exists
    if (!request) {
      return NextResponse.json(
        { error: "Request is required." },
        { status: 400 }
      );
    }

    // Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToMongoDB();

    // Parse JSON data with error handling
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // Validate data exists
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Request body must be a valid object." },
        { status: 400 }
      );
    }

    // Build update object from JSON data
    const update = {};
    let hasValidFields = false;

    for (const [key, value] of Object.entries(data)) {
      const path = fieldMappings[key];
      if (path) {
        // Only process non-null, non-undefined values
        if (value !== null && value !== undefined) {
          path.split(".").reduce((acc, part, index, parts) => {
            if (index === parts.length - 1) {
              acc[part] = value;
              hasValidFields = true;
            } else {
              acc[part] = acc[part] || {};
            }
            return acc[part];
          }, update);
        }
      }
    }

    // Check if at least one valid field was provided
    if (!hasValidFields) {
      return NextResponse.json(
        { error: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    // Database operation with proper error handling
    const options = { new: true, upsert: true };
    const homepageData = await Homepage.findOneAndUpdate(
      {},
      { $set: update },
      options
    );

    // Verify the operation was successful
    if (!homepageData) {
      return NextResponse.json(
        { error: "Failed to save homepage data." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Homepage content saved successfully!", data: homepageData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving homepage content:", error);
    
    // Handle specific MongoDB errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Data validation failed." },
        { status: 400 }
      );
    }
    
    if (error.name === "MongoError" || error.name === "MongooseError") {
      return NextResponse.json(
        { error: "Database operation failed." },
        { status: 500 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { error: "Failed to save homepage data." },
      { status: 500 }
    );
  }
}