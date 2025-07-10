import connectToMongoDB from "../../lib/mongodb.js"
import { NextResponse } from "next/server";
import Homepage from "../../models/Homepage.js"

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
  await connectToMongoDB();
  try {
    const homepageData = await Homepage.findOne();
    return NextResponse.json(homepageData || {});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch homepage data." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
 await connectToMongoDB();
  try {
    const formData = await request.formData();
    const update = {};

    // Build update object from form data
    for (const [key, value] of formData.entries()) {
      const path = fieldMappings[key];
      if (path) {
        path.split(".").reduce((acc, part, index, parts) => {
          if (index === parts.length - 1) {
            acc[part] = value;
          } else {
            acc[part] = acc[part] || {};
          }
          return acc[part];
        }, update);
      }
    }

    const options = { new: true, upsert: true };
    const homepageData = await Homepage.findOneAndUpdate(
      {},
      { $set: update },
      options,
    );

    return NextResponse.json(
      { message: "Homepage content saved successfully!", data: homepageData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving homepage content:", error);
    return NextResponse.json(
      { error: "Failed to save homepage data." },
      { status: 500 },
    );
  }
}
