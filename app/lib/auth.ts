import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function verifyUserToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("Received Token:", token);

    if (!token) {
      console.error("❌ No token found in request");
      return { error: "Unauthorized: No token provided", status: 401 };
    }

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    interface JwtPayload {
      id: string;
      role: string;
      [key: string]: any;
    }

    console.log("Decoded Payload:", payload);
    return payload as JwtPayload;
  } catch (error: any) {
    console.error("JWT Verification Error:", error);

    if (error.name === "JWTExpired") {
      return { error: "Session expired, please login again", status: 401 };
    }

    return { error: "Invalid token", status: 403 };
  }
}
