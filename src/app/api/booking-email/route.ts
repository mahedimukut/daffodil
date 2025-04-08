import { ContactFormSubmissionBookings } from "@/app/components/email/ContactFormSubmissionBookings";
import { ThankYouEmailBookings } from "@/app/components/email/ThankYouEmailBookings";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, name, data: emailData } = await req.json();

    const data = await resend.emails.send({
      from: "Daffodil HMO <noreply@daffodilhmosolutions.co.uk>", // Replace with your email
      to,
      subject,
      react: ThankYouEmailBookings({ name }),
    });
    // Send contact form submission email to the website provider
    await resend.emails.send({
      from: "Daffodil HMO <noreply@daffodilhmosolutions.co.uk>",
      to: 'daffodilhmosolutions@gmail.com',
      subject: "Booking information",
      react: ContactFormSubmissionBookings({ name, email: emailData.email, mobile: emailData.phoneNumber, message: emailData.additionalNotes, moveinDate: emailData.moveInDate }),
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}