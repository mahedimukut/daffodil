import { ContactFormSubmissionEmail } from "@/app/components/email/ContactFormSubmissionEmail";
import { ThankYouEmail } from "@/app/components/email/ThankYouEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, mobile, message } = await req.json();

    // Send thank you email to the user
    await resend.emails.send({
      from: "Daffodil HMO <onboarding@resend.dev>",
      to: email,
      subject: "Thank You for Contacting Us!",
      react: ThankYouEmail({ name }),
    });

    // Send contact form submission email to the website provider
    await resend.emails.send({
      from: "Daffodil HMO <onboarding@resend.dev>",
      to: "mokot222@gmail.com",
      subject: "New Contact Form Submission",
      react: ContactFormSubmissionEmail({ name, email, mobile, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}