import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    const data = await resend.emails.send({
      from: "Daffodil HMO <onboarding@resend.dev>", // Replace with your email
      to,
      subject,
      text,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}