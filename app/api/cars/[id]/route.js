import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("cardealor");

    const existingCar = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    if (!existingCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const formData = await req.formData();

    // Parse features
    let features = existingCar.features || [];
    if (formData.has("features")) {
      try {
        features = JSON.parse(formData.get("features"));
      } catch (error) {
        console.error("Failed to parse features:", error);
        return NextResponse.json(
          { error: "Invalid features format" },
          { status: 400 },
        );
      }
    }
    let imageUrls = Array.isArray(existingCar.imageUrls) ? existingCar.imageUrls : [];
    const newImages = formData.getAll("images");
    if (newImages.length > 0) {
      for (const image of newImages) {
        if (image.name) {
          const fileName = `${Date.now()}-${image.name}`;
          const filePath = path.join(uploadDir, fileName);
          const buffer = Buffer.from(await image.arrayBuffer());
          await fs.promises.writeFile(filePath, buffer);
          imageUrls.push(`/uploads/${fileName}`);
        }
      }
    }
    let videoUrl = existingCar.video || null;
    const newVideo = formData.get("video");
    if (newVideo && newVideo.name) {
      const fileName = `${Date.now()}-${newVideo.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await newVideo.arrayBuffer());
      await fs.promises.writeFile(filePath, buffer);
      videoUrl = `/uploads/${fileName}`;
    }
    const formEntries = {};
    for (const [key, value] of formData.entries()) {
      if (!["images", "video", "features"].includes(key)) {
        formEntries[key] = value;
      }
    }

    if (formEntries.isLease !== undefined) {
  formEntries.isLease = formEntries.isLease === 'true';
}

   let slug = existingCar.slug;

if (
  formData.has("makeName") &&
  formData.get("makeName").toLowerCase() !== existingCar.makeName?.toLowerCase()
) {
  const userId = existingCar.userId?.toString() || existingCar._id.toString();
  slug = `${formData.get("makeName").toLowerCase()}-${userId}`;
}
    const updatedData = {
      ...formEntries,
      features,
      imageUrls,
      video: videoUrl,
      slug,
      status: existingCar.status,
      description: formEntries.description || existingCar.description,
      isLease: formEntries.isLease
    };

    delete updatedData._id;

    const result = await db.collection("cars").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made or car not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Car updated successfully", updatedData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to update car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("cardealor");

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    await db.collection("cars").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to delete car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
export async function GET(req, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("cardealor");

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const [makeDoc, modelDoc] = await Promise.all([
      car.make ? db.collection("makes").findOne({ _id: new ObjectId(car.make) }) : null,
      car.model ? db.collection("carmodels").findOne({ _id: new ObjectId(car.model) }) : null,
    ]);

    const enrichedCar = {
      ...car,
      _id: car._id.toString(),
      make: car.make?.toString(),
      model: car.model?.toString(),
      userId: car.userId?.toString(),
      dealerId: car.dealerId?.toString(),
      makeName: makeDoc?.name || "Unknown Make",
      modelName: modelDoc?.name || "Unknown Model",
      isLease: car.isLease
    };

    return NextResponse.json({ car: enrichedCar }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to fetch car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
