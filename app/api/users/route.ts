export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/User";
import connectToMongoDB from "../../lib/mongodb";
import jwt from "jsonwebtoken";

connectToMongoDB();

export async function GET(request: NextRequest) {
  try {
    console.log("Incoming Request to /api/users");

    const token = request.cookies.get("token")?.value;
    console.log("Token from cookies:", token);

    if (!token) {
      console.log("Unauthorized access - Missing token");
      return NextResponse.json(
        { error: "Unauthorized access, token missing" },
        { status: 403 },
      );
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("Decoded Token:", decoded);

    if (!decoded) {
      console.log("Invalid Token");
      return NextResponse.json(
        { error: "Invalid token, authorization denied" },
        { status: 403 },
      );
    }

    const users = await User.find({}, "username email role");
    console.log("Fetched Users:", users);

    return NextResponse.json({ users, totalPages: 1 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    } else {
      console.error("API Error:", error);
    }
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
