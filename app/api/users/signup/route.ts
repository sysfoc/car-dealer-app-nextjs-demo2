export const dynamic = 'force-dynamic'
import connectToMongoDB from "../../../lib/mongodb"
import User from "../../../models/User"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  await connectToMongoDB();
  try {
    const contentType = request.headers.get('content-type');
    let email, password, role, pin, profilePicture;
     const token = request.cookies.get("token")?.value;
    const user = verifyToken(token as string) as jwt.JwtPayload;

     if (user?.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }


    if (contentType && contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      email = formData.get('email') as string;
      password = formData.get('password') as string;
      role = formData.get('role') as string;
      pin = formData.get('pin') as string;
      profilePicture = formData.get('profilePicture') as File | null;
    } else {
      const reqBody = await request.json();
      ({ email, password, role, pin, profilePicture } = reqBody);
    }

    if (!email || !password || !role || !pin) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!["user", "superadmin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const pinRegex = /^\d{4,6}$/;
    if (!pinRegex.test(pin)) {
      return NextResponse.json(
        { error: "PIN must be 4-6 digits" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const passwordSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, passwordSalt);

    const pinSalt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(pin, pinSalt);

    let profilePictureData;

if (profilePicture && typeof (profilePicture as any).arrayBuffer === 'function') {
  const bytes = await profilePicture.arrayBuffer();
  const buffer = Buffer.from(bytes);
  profilePictureData = `data:${profilePicture.type};base64,${buffer.toString('base64')}`;
} else {
  profilePictureData = "/userPicture.jpg";
}


    const newUser = new User({
      email,
      username: email.split("@")[0], 
      password: hashedPassword,
      role,
      pin: hashedPin,
      profilePicture: profilePictureData
    });

    const savedUser = await newUser.save();

    const { password: _, pin: __, ...userResponse } = savedUser.toObject();

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      const key = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'Field';
      return NextResponse.json(
        { error: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists` },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}