import { ContactFormSubmissionEmailClient } from "@/app/components/email/ContactFormSubmissionEmailClient";
import { ThankYouEmail } from "@/app/components/email/ThankYouEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, mobile, message } = await req.json();

    // Send thank you email to the user
    await resend.emails.send({
      from: "Daffodil HMO <noreply@daffodilhmosolutions.co.uk>",
      to: email,
      subject: "Thank You for Contacting Us!",
      react: ThankYouEmail({ name }),
    });

    // Send contact form submission email to the website provider
    await resend.emails.send({
      from: "Daffodil HMO <noreply@daffodilhmosolutions.co.uk>",
      to: email,
      subject: "Landlords, Tenants or Investors Contact Form Submission",
      react: ContactFormSubmissionEmailClient({ name, email, mobile, message }),
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