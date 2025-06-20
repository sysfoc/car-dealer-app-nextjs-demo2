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
    const likedCarIds = user.likedCars.map(id => new ObjectId(String(id)));

    // Fetch the actual car documents
    const cars = await db.collection("cars").find({
      _id: { $in: likedCarIds }
    }).toArray();

    // Format car data
    const formattedCars = cars.map((car) => ({
      ...car,
      _id: car._id.toString(),
      make: car.make?.toString(),
      model: car.model?.toString(),
      userId: car.userId?.toString(),
      dealerId: car.dealerId?.toString(),
    }));

    // Get make and model information
    const makeIds = [
      ...new Set(formattedCars.map((c) => c.make).filter(Boolean)),
    ];
    const modelIds = [
      ...new Set(formattedCars.map((c) => c.model).filter(Boolean)),
    ];

    const [makes, models] = await Promise.all([
      db
        .collection("makes")
        .find({ _id: { $in: makeIds.map((id) => new ObjectId(id)) } })
        .toArray(),
      db
        .collection("carmodels")
        .find({ _id: { $in: modelIds.map((id) => new ObjectId(id)) } })
        .toArray(),
    ]);

    // Create lookup maps
    const makeMap = makes.reduce((acc, make) => {
      acc[make._id.toString()] = make.name;
      return acc;
    }, {});

    const modelMap = models.reduce((acc, model) => {
      acc[model._id.toString()] = {
        name: model.name,
        makeId: model.makeId.toString(),
      };
      return acc;
    }, {});

    // Enrich car data with make and model names
    const enrichedCars = formattedCars.map((car) => {
      const modelInfo = modelMap[car.model?.toString()] || {};
      return {
        ...car,
        makeName: makeMap[car.make?.toString()] || "Unknown Make",
        modelName: modelInfo.name || "Unknown Model",
        makeId: car.make,
        modelId: car.model,
      };
    });

    return NextResponse.json({ likedCars: enrichedCars });

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