import dbConnect from "@/backend/config/dbConnect";
import { validateJWT } from "@/helpers/validateJwt";
import Job from "@/backend/models/Jobs";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: any) {
  try {
    await dbConnect();
    validateJWT(request);
    const job = await Job.findById(params.id).populate("user");
    console.log(`job:${job}`)
    return NextResponse.json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function PUT(request: NextRequest, { params }: any) {
  try {
    await dbConnect();
    validateJWT(request);
    const reqBody = await request.json();
    const job = await Job.findByIdAndUpdate(params.id, reqBody, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "Job updated successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await dbConnect();
    validateJWT(request);
    const job = await Job.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "Job deleted successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}