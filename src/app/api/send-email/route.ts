import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY!;

  if (!resendApiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  try {
    const { email } = await req.json();
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href='http://localhost:3000/verify?email=${email}'>here</a> to verify your email.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
