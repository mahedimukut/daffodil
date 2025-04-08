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

export const ThankYouEmail = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Logo Section */}
          <Section style={logoSectionStyle}>
            <Img
              src="https://www.daffodilhmosolutions.co.uk/daffodil-logo.png" // Replace with your logo URL
              alt="Daffodil HMO Logo"
              width="120"
              height="auto"
              style={logoStyle}
            />
          </Section>

          {/* Header Section */}
          <Text style={headerStyle}>Thank You, {name}!</Text>
          <Text style={paragraphStyle}>
            We have received your message and will get back to you shortly. In
            the meantime, feel free to explore our website for more information.
          </Text>

          {/* Call-to-Action Button */}
          <Section style={ctaSectionStyle}>
            <Link href="https://yourwebsite.com" style={ctaButtonStyle}>
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
  color: "#f59e0b",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center" as const,
  borderColor: "#f59e0b",
  borderWidth: "2px",
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
