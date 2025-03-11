import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Img,
} from "@react-email/components";

export const ContactFormSubmissionEmailClient = ({
  name,
  email,
  mobile,
  message,
}: {
  name: string;
  email: string;
  mobile: string;
  message: string;
}) => {
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
          <Text style={headerStyle}>
            Landlord, Tenants or Investors information
          </Text>

          {/* Details Section */}
          <table style={detailsTableStyle}>
            <tbody>
              {/* Name */}
              <tr style={detailRowStyle}>
                <td style={labelStyle}>Name:</td>
                <td style={valueStyle}>{name}</td>
              </tr>

              {/* Email */}
              <tr style={detailRowStyle}>
                <td style={labelStyle}>Email:</td>
                <td style={valueStyle}>{email}</td>
              </tr>

              {/* Mobile */}
              <tr style={detailRowStyle}>
                <td style={labelStyle}>Mobile:</td>
                <td style={valueStyle}>{mobile}</td>
              </tr>

              {/* Message */}
              <tr style={detailRowStyle}>
                <td style={labelStyle}>Message:</td>
                <td style={valueStyle}>{message}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer Section */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              This email was sent from your website's contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const bodyStyle: React.CSSProperties = {
  fontFamily: "'Arial', sans-serif",
  backgroundColor: "#f9fafb",
  padding: "20px",
  margin: 0,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const logoSectionStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const logoStyle: React.CSSProperties = {
  width: "120px",
  height: "auto",
};

const headerStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1f2937",
  marginBottom: "24px",
  textAlign: "center",
};

const detailsTableStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "32px",
  borderCollapse: "collapse" as const, // Explicitly set as "collapse"
};

const detailRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "12px 0",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: "bold",
  padding: "8px 0",
  width: "30%", // Fixed width for labels
};

const valueStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#1f2937",
  padding: "8px 0",
  width: "70%", // Fixed width for values
};

const footerStyle: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  paddingTop: "24px",
  textAlign: "center",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
};
