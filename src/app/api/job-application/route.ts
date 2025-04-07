import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ThankYouEmail } from "@/app/components/email/ThankYouEmail";
import { JobApplicationEmail } from "@/app/components/email/JobApplicationEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const resume = formData.get("resume") as File;

    // Convert the resume file to a base64 string for email attachment
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString("base64");

    // Send thank-you email to the job seeker
    await resend.emails.send({
      from: "DaffodilHmoSolutions <daffodilhmosolutions@gmail.com>",
      to: email,
      subject: "Thank You for Your Application!",
      react: ThankYouEmail({ name }),
    });

    // Send job application email to yourself
    await resend.emails.send({
      from: "DaffodilHmoSolutions <daffodilhmosolutions@gmail.com>",
      to: "mokot222@gmail.com", // Replace with your email
      subject: `New Job Application for ${jobTitle}`,
      react: JobApplicationEmail({ name, email, mobile, coverLetter, jobTitle }),
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing job application:", error);
    return NextResponse.json(
      { error: "Failed to process job application" },
      { status: 500 }
    );
  }
}