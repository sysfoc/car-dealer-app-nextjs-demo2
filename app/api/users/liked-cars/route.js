import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import connectToMongoDB from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectToMongoDB();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { carId } = await request.json();

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user already has likedCars field and if car is already liked
    const likedCars = user.likedCars || [];
    const isAlreadyLiked = likedCars.includes(carId);
    
    let updatedUser;
    
    if (isAlreadyLiked) {
      // Remove from liked cars using $pull
      updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { $pull: { likedCars: carId } },
        { new: true }
      );
      
      console.log(`Car ${carId} removed from user ${user.username}'s liked cars`);
      return NextResponse.json({ 
        message: "Car removed from favorites", 
        isLiked: false,
        likedCars: updatedUser.likedCars || []
      });
    } else {
      // Add to liked cars using $addToSet (creates field if doesn't exist)
      updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { $addToSet: { likedCars: carId } },
        { new: true, upsert: false }
      );
      
      console.log(`Car ${carId} added to user ${user.username}'s liked cars`);
      return NextResponse.json({ 
        message: "Car added to favorites", 
        isLiked: true,
        likedCars: updatedUser.likedCars
      });
    }
  } catch (error) {
    console.error("Error updating liked cars:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}