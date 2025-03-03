"use client";

import Link from "next/link";
import { FaBuilding, FaUser, FaChartLine } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";

const services = [
  {
    title: "Landlords",
    description:
      "Guaranteed rental income, hassle-free property management, and full compliance support to protect your investment.",
    icon: (
      <FaBuilding className="text-daffodilYellow text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
    link: "/contact-us",
  },
  {
    title: "Tenants",
    description:
      "Comfortable, affordable, and fully compliant homes with 24/7 resident support to ensure your well-being.",
    icon: (
      <FaUser className="text-daffodilYellow text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
    link: "/contact-us",
  },
  {
    title: "Investors",
    description:
      "High-yield, ethical property investments with expert insights into HMO strategies and risk management.",
    icon: (
      <FaChartLine className="text-daffodilYellow text-5xl transition-transform duration-300 group-hover:scale-110" />
    ),
    link: "/contact-us",
  },
];

const SolutionsSection = () => {
  return (
    <section className="bg-yellow-50 py-20 px-6 md:px-12">
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
            <Link key={index} href={service.link}>
              <div className="group bg-white p-8 rounded-3xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-3 hover:border-daffodilYellow max-w-sm flex flex-col items-center text-center cursor-pointer">
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-charcoalGray mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-daffodilYellow font-semibold text-lg transition-colors duration-300 group-hover:text-charcoalGray">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SolutionsSection;
