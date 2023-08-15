import dbConnect from "@/backend/config/dbConnect";

import { validateJWT } from "@/helpers/validateJwt";
import User from "@/backend/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const userId = await validateJWT(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("No user found");
    }
    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
      await validateJWT(request);
      const reqBody = await request.json();
      const updateUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
        new: true,
      }).select("-password");
      if (!updateUser) {
        throw new Error("No user found");
      }
  
      return NextResponse.json({
        message: "User data updated successfully",
        data: updateUser,
      });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
}