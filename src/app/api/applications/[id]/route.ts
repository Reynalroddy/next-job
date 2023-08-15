
// import { sendEmail } from "@/helpers/sendEmail";
import Application from "@/backend/models/Applications";
import dbConnect from "@/backend/config/dbConnect";
import { validateJWT } from "@/helpers/validateJwt";
// import User from "@/backend/models/User";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest, { params }: any) {
  try {
    await dbConnect();
   await  validateJWT(request);
   console.log(params)
    const reqBody = await request.json();
    const application: any = await Application.findByIdAndUpdate(
      params.id,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

    // await sendEmail({
    //   to: application.user.email,
    //   subject: "Your application status has been updated",
    //   text: `Your application status has been updated to ${application.status}`,
    //   html: `<div>
    //   <p>Your application status has been updated to ${application.status}</p>
     
    //   <p>
    //    Company: ${application.job.user.name}
    //   </p>
    
    //   <p>
    //     Job Title: ${application.job.title}
    //   </p>
   
    //   <p>
    //     Applied On: ${moment(application.createdAt).format("DD/MM/YYYY")}
    //   </p>
   
    //   <p>Thank you for using SheyJobs</p>
    //   </div>`,
    // });

    return NextResponse.json({
      message: "Application updated successfully",
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}