"use client";

import { useState } from "react";
import { FaBuilding, FaUser, FaChartLine } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ContactModal from "./ContactModal"; // Import the modal component

const services = [
  {
    title: "Landlords",
    description:
      "Guaranteed rental income, hassle-free property management, and full compliance support to protect your investment.",
    icon: (
      <FaBuilding className="text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
  },
  {
    title: "Tenants",
    description:
      "Comfortable, affordable, and fully compliant homes with 24/7 resident support to ensure your well-being.",
    icon: (
      <FaUser className="text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
  },
  {
    title: "Investors",
    description:
      "High-yield, ethical property investments with expert insights into HMO strategies and risk management.",
    icon: (
      <FaChartLine className="text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
  },
];

const bgColors = ["bg-green-100", "bg-pink-100", "bg-blue-100"];

const SolutionsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <MaxWidthWrapper>
        {/* Section Heading */}
        <div className="mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoalGray mb-4 leading-tight">
            Smart Housing Solutions for Landlords, Tenants & Investors
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer flex flex-col items-center text-center max-w-sm ${
                bgColors[index % bgColors.length]
              }`}
              onClick={openModal} // Open modal on card click
            >
              <div className="mb-5 text-daffodilYellow group-hover:text-charcoalGray transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-charcoalGray mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="text-charcoalGray font-semibold text-lg flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                Get connected
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default SolutionsSection;
