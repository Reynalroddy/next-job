// import User from "@/models/User";
// import User from "@/backend/models/User";
// import connect from "@/utils/db";
// import dbConnect from "@/backend/config/dbConnect";
import dbConnect from "@/backend/config/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/backend/models/User";
import { NextResponse } from "next/server";


export const POST = async (request:Request) => {
    try {
  const reqBody = await request.json();
  await dbConnect();
  const user = await User.findOne({ email: reqBody.email });
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(reqBody.password, 5);
  reqBody.password = hashedPassword;
    await User.create(reqBody);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
    });
  }
};