import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="bg-white py-12 text-center">
      <MaxWidthWrapper>
        <div className="w-full mx-auto p-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-charcoalGray">
            Get Started with Daffodil
          </h2>
          <p className="text-charcoalGray mt-4 text-lg font-inter">
            Contact us today for expert HMO solutions tailored to your needs and
            schedule a consultation.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-daffodilYellow text-charcoalGray font-semibold rounded-md shadow hover:bg-softGreen transition-all">
              <Link href={"/auth/login"}>Get Started</Link>
            </button>
            <button className="px-6 py-3 border-2 border-[#FFD700] text-charcoalGray font-semibold rounded-md hover:bg-softGreen transition-all hover:border-softGreen">
              <Link href={"/contact-us"}>Contact Us</Link>
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CallToAction;
