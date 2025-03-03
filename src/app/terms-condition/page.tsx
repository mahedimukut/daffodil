import MaxWidthWrapper from "../components/MaxWidthWrapper";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 py-20 px-4 md:px-12 lg:px-24 text-center">
      <MaxWidthWrapper>
        <h1 className="text-5xl font-extrabold text-charcoalGray mb-8 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
          By using our services, you agree to comply with the terms and
          conditions outlined below. Please review them carefully before
          proceeding.
        </p>

        <div className="space-y-10 max-w-4xl mx-auto text-left">
          {/* Section 1: Use of Services */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Use of Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our property booking services are provided solely for lawful
              purposes and must be used in accordance with our policies and
              applicable laws.
            </p>
          </div>

          {/* Section 2: Limitation of Liability */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for any damages, losses, or issues arising
              from the misuse of our services beyond what is legally required.
            </p>
          </div>

          {/* Section 3: Changes to Terms */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update our terms and conditions at any
              time without prior notice. Changes will be effective upon posting
              on our website.
            </p>
          </div>

          {/* Section 4: Termination of Services */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Termination of Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate access to our
              services if users violate these terms or engage in prohibited
              activities.
            </p>
          </div>

          {/* Section 5: Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-daffodilYellow">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our terms and conditions, please
              contact us via email at{" "}
              <span className="text-daffodilYellow font-semibold">
                support@daffodilhmo.com
              </span>
              .
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TermsAndConditions;
