import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Img,
  Link,
} from "@react-email/components";

export const ThankYouEmailBookings = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Logo Section */}
          <Section style={logoSectionStyle}>
            <Img
              src="https://kalerbiborton.com/wp-content/uploads/2019/12/kaler-biborton-logo-1.png" // Replace with your logo URL
              alt="Daffodil HMO Logo"
              width="120"
              height="auto"
              style={logoStyle}
            />
          </Section>

          {/* Header Section */}
          <Text style={headerStyle}>Thank You, {name}!</Text>
          <Text style={paragraphStyle}>
            Thank you for your booking inquiry! We’ll get back to you shortly.
            Feel free to explore our website for more details. We are looking
            forward to making your stay exceptional!
          </Text>

          {/* Call-to-Action Button */}
          <Section style={ctaSectionStyle}>
            <Link
              href="https://daffodilhmosolutions.co.uk"
              style={ctaButtonStyle}
            >
              Visit Our Website
            </Link>
          </Section>

          {/* Footer Section */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Best regards,
              <br />
              The Daffodil HMO Team
            </Text>
            <Text style={footerNoteStyle}>
              If you have any urgent inquiries, please contact us at{" "}
              <Link href="mailto:support@daffodilhmo.com" style={linkStyle}>
                support@daffodilhmo.com
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const bodyStyle = {
  fontFamily: "'Arial', sans-serif",
  backgroundColor: "#f9fafb",
  padding: "20px",
  margin: 0,
};

const containerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const logoSectionStyle = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logoStyle = {
  width: "120px",
  height: "auto",
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#f59e0b",
  textAlign: "center" as const,
};

const paragraphStyle = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: "1.6",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const ctaSectionStyle = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const ctaButtonStyle = {
  display: "inline-block",
  padding: "10px 24px", // DaffodilYellow
  color: "#000000",
  fontSize: "16px",
  fontWeight: "normal",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center" as const,
  borderColor: "#f59e0b", // DaffodilYellow
  borderWidth: "1px",
  borderStyle: "solid",
};

const footerStyle = {
  borderTop: "1px solid #e5e7eb",
  paddingTop: "24px",
  textAlign: "center" as const,
};

const footerTextStyle = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "8px",
};

const footerNoteStyle = {
  fontSize: "12px",
  color: "#9ca3af",
  marginTop: "16px",
};

const linkStyle = {
  color: "#f59e0b", // DaffodilYellow
  textDecoration: "none",
};
