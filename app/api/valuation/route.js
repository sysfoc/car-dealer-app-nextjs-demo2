import connectDB from "../../lib/mongodb";
import Valuation from "../../models/Valuation";

export async function POST(req) {
  try {
    await connectDB(); // Connect to MongoDB
    const data = await req.json(); // Parse incoming data

    const newValuation = new Valuation(data); // Create new document
    await newValuation.save(); // Save to MongoDB

    return new Response(JSON.stringify({ message: "Valuation saved!" }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error saving data" }), {
      status: 500,
    });
  }
}
