import connectToMongoDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
import Homepage from "../../models/Homepage.js";

connectToMongoDB();

export async function POST(request) {
  try {
    await connectToMongoDB();
    const formData = await request.formData();

    console.log("Received form data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

     const seoTitle = formData.get("seoTitle");
     const seoDescription = formData.get("seoDescription");

    // const seoTitle = formData.get("title");
    // const seoDescription = formData.get("metaDescription");

    const searchHeading = formData.get("searchHeading");
    const searchText = formData.get("searchText");

    const brandHeading = formData.get("brandHeading");
    const brandSubheading = formData.get("brandSubheading");
    const brandItems = formData.get("brandItems");
    const brandStatus = formData.get("brandStatus");

    const listingHeading = formData.get("listingHeading");
    const listingSubheading = formData.get("listingSubheading");
    const listingItems = formData.get("listingItems");
    const listingStatus = formData.get("listingStatus");

    const chooseUsData = {
      heading: formData.get("chooseusHeading"),
      first: {
        heading: formData.get("chooseusFirstHeading"),
        description: formData.get("chooseusFirstDescription"),
      },
      second: {
        heading: formData.get("chooseusSecondHeading"),
        description: formData.get("chooseusSecondDescription"),
      },
      third: {
        heading: formData.get("chooseusThirdHeading"),
        description: formData.get("chooseusThirdDescription"),
      },
      fourth: {
        heading: formData.get("chooseusFourthHeading"),
        description: formData.get("chooseusFourthDescription"),
      },
    };

    const footer = {
      monday: formData.get("mondayHr"),
      tuesday: formData.get("tuesdayHr"),
      wednesday: formData.get("wednesdayHr"),
      thursday: formData.get("thursdayHr"),
      friday: formData.get("fridayHr"),
      saturday: formData.get("saturdayHr"),
    };

    const existingHomepage = await Homepage.findOne();

    const homepageData = {
      seoTitle,
      seoDescription,
      searchSection: {
        heading: searchHeading,
        text: searchText,
      },
      brandSection: {
        heading: brandHeading,
        subheading: brandSubheading,
        items: brandItems,
        status: brandStatus,
      },
      listingSection: {
        heading: listingHeading,
        subheading: listingSubheading,
        items: listingItems,
        status: listingStatus,
      },
      chooseUs: chooseUsData,
      footer,
    };

    const hasData = Object.values(homepageData).some(
      (value) => value && (typeof value === "string" ? value.trim() : true),
    );

    if (!hasData) {
      return NextResponse.json(
        { error: "No valid data provided" },
        { status: 400 },
      );
    }

    if (existingHomepage) {
      await Homepage.updateOne({}, homepageData);
      return NextResponse.json(
        {
          message: "Homepage content updated successfully!",
          data: homepageData,
        },
        { status: 200 },
      );
    } else {
      const newHomepage = new Homepage(homepageData);
      await newHomepage.save();
      return NextResponse.json(
        { message: "Homepage content saved successfully!", data: newHomepage },
        { status: 201 },
      );
    }
  } catch (error) {
    console.error("Error saving homepage content:", error);
    return NextResponse.json(
      { error: "Failed to save homepage data." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const homepageData = await Homepage.findOne();
    if (homepageData) {
      return NextResponse.json({ data: homepageData }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No homepage data found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json(
      { error: "Failed to fetch homepage data." },
      { status: 500 },
    );
  }
}


