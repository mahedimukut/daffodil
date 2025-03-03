import MaxWidthWrapper from "../components/MaxWidthWrapper";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-20 px-4 md:px-12 lg:px-24 text-center">
      <MaxWidthWrapper>
        <h1 className="text-5xl font-extrabold text-charcoalGray mb-8 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
          At Daffodil HMO Solutions, we are committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          safeguard your personal information when you use our services.
        </p>

        <div className="space-y-10 max-w-4xl mx-auto text-left">
          {/* Section 1: Information We Collect */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect personal details such as your name, email address,
              phone number, and property details when you interact with our
              website or services.
            </p>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use your information to provide and enhance our services,
              communicate with you, and fulfill legal obligations. Your data
              helps us offer personalized experiences and improve our offerings.
            </p>
          </div>

          {/* Section 3: Data Security */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement strict security measures to protect your personal
              information from unauthorized access, alteration, or destruction.
              Our team follows industry-standard security protocols to safeguard
              your data.
            </p>
          </div>

          {/* Section 4: Your Rights */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or request deletion of your
              personal data. If you have any concerns about how we handle your
              information, please contact us.
            </p>
          </div>

          {/* Section 5: Changes to Privacy Policy */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our privacy policy from time to time. Any
              significant changes will be communicated via our website. Please
              review this page periodically to stay informed.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PrivacyPolicy;
