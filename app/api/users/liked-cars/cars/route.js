import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await client.connect();
    const db = client.db("cardealor");

    // Verify user token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // Get user's liked cars
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { likedCars: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user has no liked cars, return empty array
    if (!user.likedCars || user.likedCars.length === 0) {
      return NextResponse.json({ likedCars: [] });
    }

    // Convert liked car IDs to ObjectIds
    const likedCarIds = user.likedCars.map(id => new ObjectId(id));

    // Fetch the actual car documents
    const cars = await db.collection("cars").find({
      _id: { $in: likedCarIds }
    }).toArray();

    // Format car data - no need for additional lookups
    const likedCars = cars.map(car => ({
      ...car,
      _id: car._id.toString(),
      makeName: car.make,
      modelName: car.model, 
      price: car.price,
      year: car.modelYear,
      images: car.imageUrls || [],
      mileage: car.mileage,
      fuelType: car.fuelType,
    }));

    return NextResponse.json({ likedCars });

  } catch (error) {
    console.error("Error fetching liked cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked cars", details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}