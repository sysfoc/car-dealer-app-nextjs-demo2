import connectToMongoDB from "../../lib/mongodb"
import { NextResponse } from "next/server";
import Homepage from "../../models/Homepage"


export async function POST(request) {
  await connectToMongoDB();
  try {
    const formData = await request.formData();
    
    const existingHomepage = await Homepage.findOne();
    
    // Build update object with only non-empty values
    const updateData = {};
    
    // SEO fields
    const seoTitle = formData.get("seoTitle");
    const seoDescription = formData.get("seoDescription");
    if (seoTitle && seoTitle.trim()) updateData.seoTitle = seoTitle;
    if (seoDescription && seoDescription.trim()) updateData.seoDescription = seoDescription;
    
    // Search section
    const searchHeading = formData.get("searchHeading");
    const searchText = formData.get("searchText");
    if (searchHeading && searchHeading.trim() || searchText && searchText.trim()) {
      updateData.searchSection = {
        ...(existingHomepage?.searchSection || {}),
        ...(searchHeading && searchHeading.trim() && { heading: searchHeading }),
        ...(searchText && searchText.trim() && { text: searchText })
      };
    }
    
    // Brand section
    const brandHeading = formData.get("brandHeading");
    const brandSubheading = formData.get("brandSubheading");
    const brandItems = formData.get("brandItems");
    const brandStatus = formData.get("brandStatus");
    if (brandHeading?.trim() || brandSubheading?.trim() || brandItems?.trim() || brandStatus?.trim()) {
      updateData.brandSection = {
        ...(existingHomepage?.brandSection || {}),
        ...(brandHeading?.trim() && { heading: brandHeading }),
        ...(brandSubheading?.trim() && { subheading: brandSubheading }),
        ...(brandItems?.trim() && { items: brandItems }),
        ...(brandStatus?.trim() && { status: brandStatus })
      };
    }
    
    // Listing section
    const listingHeading = formData.get("listingHeading");
    const listingSubheading = formData.get("listingSubheading");
    const listingItems = formData.get("listingItems");
    const listingStatus = formData.get("listingStatus");
    if (listingHeading?.trim() || listingSubheading?.trim() || listingItems?.trim() || listingStatus?.trim()) {
      updateData.listingSection = {
        ...(existingHomepage?.listingSection || {}),
        ...(listingHeading?.trim() && { heading: listingHeading }),
        ...(listingSubheading?.trim() && { subheading: listingSubheading }),
        ...(listingItems?.trim() && { items: listingItems }),
        ...(listingStatus?.trim() && { status: listingStatus })
      };
    }
    
    // Choose us section
    const chooseUsFields = [
      'chooseusHeading', 'chooseusFirstHeading', 'chooseusFirstDescription',
      'chooseusSecondHeading', 'chooseusSecondDescription', 'chooseusThirdHeading',
      'chooseusThirdDescription', 'chooseusFourthHeading', 'chooseusFourthDescription'
    ];
    
    const hasChooseUsData = chooseUsFields.some(field => {
      const value = formData.get(field);
      return value && value.trim();
    });
    
    if (hasChooseUsData) {
      updateData.chooseUs = {
        ...(existingHomepage?.chooseUs || {}),
        ...(formData.get("chooseusHeading")?.trim() && { heading: formData.get("chooseusHeading") }),
        first: {
          ...(existingHomepage?.chooseUs?.first || {}),
          ...(formData.get("chooseusFirstHeading")?.trim() && { heading: formData.get("chooseusFirstHeading") }),
          ...(formData.get("chooseusFirstDescription")?.trim() && { description: formData.get("chooseusFirstDescription") })
        },
        second: {
          ...(existingHomepage?.chooseUs?.second || {}),
          ...(formData.get("chooseusSecondHeading")?.trim() && { heading: formData.get("chooseusSecondHeading") }),
          ...(formData.get("chooseusSecondDescription")?.trim() && { description: formData.get("chooseusSecondDescription") })
        },
        third: {
          ...(existingHomepage?.chooseUs?.third || {}),
          ...(formData.get("chooseusThirdHeading")?.trim() && { heading: formData.get("chooseusThirdHeading") }),
          ...(formData.get("chooseusThirdDescription")?.trim() && { description: formData.get("chooseusThirdDescription") })
        },
        fourth: {
          ...(existingHomepage?.chooseUs?.fourth || {}),
          ...(formData.get("chooseusFourthHeading")?.trim() && { heading: formData.get("chooseusFourthHeading") }),
          ...(formData.get("chooseusFourthDescription")?.trim() && { description: formData.get("chooseusFourthDescription") })
        }
      };
    }
    
    // Footer section
    const footerFields = ['mondayHr', 'tuesdayHr', 'wednesdayHr', 'thursdayHr', 'fridayHr', 'saturdayHr'];
    const hasFooterData = footerFields.some(field => {
      const value = formData.get(field);
      return value && value.trim();
    });
    
    if (hasFooterData) {
      updateData.footer = {
        ...(existingHomepage?.footer || {}),
        ...(formData.get("mondayHr")?.trim() && { monday: formData.get("mondayHr") }),
        ...(formData.get("tuesdayHr")?.trim() && { tuesday: formData.get("tuesdayHr") }),
        ...(formData.get("wednesdayHr")?.trim() && { wednesday: formData.get("wednesdayHr") }),
        ...(formData.get("thursdayHr")?.trim() && { thursday: formData.get("thursdayHr") }),
        ...(formData.get("fridayHr")?.trim() && { friday: formData.get("fridayHr") }),
        ...(formData.get("saturdayHr")?.trim() && { saturday: formData.get("saturdayHr") })
      };
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid data provided" },
        { status: 400 }
      );
    }
    
    if (existingHomepage) {
      await Homepage.updateOne({}, { $set: updateData });
      return NextResponse.json(
        { message: "Homepage content updated successfully!", data: updateData },
        { status: 200 }
      );
    } else {
      const newHomepage = new Homepage(updateData);
      await newHomepage.save();
      return NextResponse.json(
        { message: "Homepage content saved successfully!", data: newHomepage },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error saving homepage content:", error);
    return NextResponse.json(
      { error: "Failed to save homepage data." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToMongoDB();
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


