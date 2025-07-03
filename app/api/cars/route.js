import { MongoClient, ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { verifyUserToken } from "../../lib/auth";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Enhanced upload directory handling
const uploadDir = path.join(process.cwd(), "public", "uploads");

// Ensure directory exists with proper error handling
async function ensureUploadDir() {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
      console.log("Upload directory created:", uploadDir);
    }

    // Test write permissions
    const testFile = path.join(uploadDir, "test-write.tmp");
    await fs.promises.writeFile(testFile, "test");
    await fs.promises.unlink(testFile);
    console.log("Upload directory is writable");

    return true;
  } catch (error) {
    console.error("Upload directory setup failed:", error);
    return false;
  }
}

export async function PATCH(req) {
  try {
    await client.connect();
    const db = client.db("cardealor");

    const userData = await verifyUserToken(req);
    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (userData.role !== "superadmin") {
      return NextResponse.json(
        { error: "Access Denied: Only superadmin can update status" },
        { status: 403 },
      );
    }

    const { carId, status } = await req.json();
    if (!carId || (status !== 0 && status !== 1)) {
      return NextResponse.json(
        { error: "Invalid request: carId and valid status (0 or 1) required" },
        { status: 400 },
      );
    }

    const objectId = new ObjectId(String(carId));

    const result = await db
      .collection("cars")
      .updateOne({ _id: objectId }, { $set: { status } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Car ${status === 1 ? "approved" : "unapproved"} successfully`,
    });
  } catch (error) {
    console.error("Error updating car status:", error);
    return NextResponse.json(
      { error: "Failed to update car status", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

async function generateUniqueSlug(db, makeName, userIdString) {
  let slug = makeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let uniqueSlug = `${slug}-${userIdString}`;
  let count = 1;

  while (await db.collection("cars").findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${userIdString}-${count}`;
    count++;
  }

  return uniqueSlug;
}

export async function POST(req) {
  try {
    // Check upload directory first
    const uploadReady = await ensureUploadDir();
    if (!uploadReady) {
      return NextResponse.json(
        {
          error: "Server configuration error: Upload directory not accessible",
        },
        { status: 500 },
      );
    }

    const userData = await verifyUserToken(req);
    const userIdString = userData.id?.toString?.() || null;

    if (!userIdString) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 },
      );
    }

    if ("error" in userData) {
      return NextResponse.json(
        { error: userData.error },
        { status: userData.status },
      );
    }

    if (!userData.id) {
      return NextResponse.json(
        { error: "Invalid user data: No user ID" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const images = formData.getAll("image");
    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    const imageUrls = [];

    // Process images
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!image || !image.name || image.size === 0) continue;

      if (image.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `Image ${image.name} is too large. Maximum size is 10MB.` },
          { status: 400 },
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type for ${image.name}. Only JPEG, PNG, and WebP are allowed.`,
          },
          { status: 400 },
        );
      }

      try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileExtension = path.extname(image.name);
        const fileName = `${timestamp}-${randomString}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await fs.promises.writeFile(filePath, buffer);
        imageUrls.push(`/uploads/${fileName}`);
      } catch (fileError) {
        console.error(`Error saving image ${image.name}:`, fileError);
        return NextResponse.json(
          { error: `Failed to save image ${image.name}: ${fileError.message}` },
          { status: 500 },
        );
      }
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: "No valid images were processed" },
        { status: 400 },
      );
    }

    await client.connect();
    const db = client.db("cardealor");

    // Generate slug using make name
    const makeName = formEntries.make;
    const slug = await generateUniqueSlug(db, makeName, userIdString);

    const carData = {
      ...formEntries,
      features: JSON.parse(formEntries.features || "[]"),
      imageUrls,
      userId: new ObjectId(userIdString),
      slug,
      status: userData.role === "superadmin" ? 1 : 0,
      createdAt: new Date(),
    };

    const result = await db.collection("cars").insertOne(carData);

    return NextResponse.json(
      {
        message: "Car added successfully",
        data: {
          ...carData,
          _id: result.insertedId,
          imageUrls: carData.imageUrls,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error occurred in POST /api/cars:", error);
    return NextResponse.json(
      { error: "Failed to add car", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("cardealor");

    const cars = await db.collection("cars").find().toArray();

    const formattedCars = cars.map((car) => ({
      ...car,
      _id: car._id.toString(),
      userId: car.userId?.toString(),
      dealerId: car.dealerId?.toString(),
    }));

    return NextResponse.json({ cars: formattedCars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}