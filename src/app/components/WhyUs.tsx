import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image"; // If you're using Next.js

const WhyChooseUsSection = () => {
  return (
    <div className="bg-white py-20">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column (Text) */}
          <div>
            <h2 className="text-4xl font-extrabold text-charcoalGray mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">
              At Daffodil HMO Solution, we pride ourselves on delivering
              exceptional property management services. Here are the key reasons
              why clients choose us for their property needs:
            </p>
            <ul className="space-y-4 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="text-daffodilYellow text-2xl mr-4">✔</span>
                <p>
                  Comprehensive support services for both tenants and landlords.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-daffodilYellow text-2xl mr-4">✔</span>
                <p>
                  Expert management of HMO properties with a focus on compliance
                  and best practices.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-daffodilYellow text-2xl mr-4">✔</span>
                <p>
                  Strong partnerships with referral organizations and a robust
                  network for finding the right tenants.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-daffodilYellow text-2xl mr-4">✔</span>
                <p>
                  Efficient maintenance and cleaning services to ensure
                  well-maintained properties.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-daffodilYellow text-2xl mr-4">✔</span>
                <p>
                  Streamlined processes for housing benefits, compliance, and
                  legal support.
                </p>
              </li>
            </ul>
            {/* Button */}
            <a
              href="/available-rooms" // Link to the page for available rooms
              className="inline-block px-6 py-3 bg-daffodilYellow text-charcoalGray font-semibold rounded-lg shadow-md hover:bg-softGreen"
            >
              Find Available Rooms
            </a>
          </div>

          {/* Right Column (Image) */}
          <div className="relative w-full h-full">
            <Image
              src="/home-daffodil.jpg" // Replace with your image path
              alt="Why choose us"
              layout="fill" // This makes the image fill the container
              objectFit="cover" // Ensures the image covers the entire container
              className="rounded-lg "
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default WhyChooseUsSection;
