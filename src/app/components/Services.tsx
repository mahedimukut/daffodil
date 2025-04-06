import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  FaUserCheck,
  FaHome,
  FaShieldAlt,
  FaFileAlt,
  FaUsers,
  FaSearch,
  FaClipboard,
  FaLifeRing,
  FaSlidersH,
  FaCog,
  FaGavel,
  FaBroom,
  FaPlug,
  FaLock,
  FaCalendarAlt,
  FaKey,
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaBook,
  FaBalanceScale,
  FaChalkboardTeacher,
} from "react-icons/fa";

const services = [
  {
    title: "Residents Support Services",
    description: "Comprehensive support services for residents including:",
    icon: <FaUserCheck className="text-charcoalGray" size={30} />,
    subServices: [
      {
        title: "Housing Benefits Claim",
        description:
          "Guaranteed 100% Housing Benefit Payment each month with follow-up support for tenants, landlords, and local authorities.",
        icon: <FaHome className="text-charcoalGray" size={30} />,
      },
      {
        title: "Conflict Management",
        description:
          "Manage and resolve conflicts between HMO residents effectively.",
        icon: <FaCog className="text-charcoalGray" size={30} />,
      },
      {
        title: "Eviction Services",
        description:
          "Provide professional teams for hard eviction services when necessary.",
        icon: <FaGavel className="text-charcoalGray" size={30} />,
      },
    ],
    fullWidth: true,
  },
  {
    title: "Compliance",
    description: "Fully compliant supported Exempt accommodation including:",
    icon: <FaShieldAlt className="text-charcoalGray" size={30} />,
    subServices: [
      {
        title: "PACE Management",
        description:
          "Manage the Concept portal and ensure it is up to date with all necessary information.",
        icon: <FaFileAlt className="text-charcoalGray" size={30} />,
      },
      {
        title: "Pre-lease & Quarterly Inspections",
        description:
          "Ensure pre-lease inspections are carried out, resolve any issues during quarterly inspections.",
        icon: <FaLifeRing className="text-charcoalGray" size={30} />,
      },
      {
        title: "Regulatory Updates & Training",
        description:
          "Keep you informed of all legislative changes and provide staff training on compliance requirements.",
        icon: <FaBook className="text-charcoalGray" size={30} />,
      },
    ],
    fullWidth: true,
  },
  // Rest of the services remain the same
  {
    title: "Referrals & Resident Finding",
    description:
      "Excellent referrals and resident-finding arrangements with organizations like the Salvation Army, refuge centers, probation officers, hospitals, etc.",
    icon: <FaUsers className="text-charcoalGray" size={30} />,
  },
  {
    title: "BVSC (SEAQS, COR)",
    description:
      "Work closely with BVSC, landlords, and BCC to adhere to current HMO policies and procedures.",
    icon: <FaSearch className="text-charcoalGray" size={30} />,
  },
  {
    title: "BCC Contract",
    description: "Manage the BCC Local authority contract efficiently.",
    icon: <FaClipboard className="text-charcoalGray" size={30} />,
  },
  {
    title: "Property Onboarding",
    description:
      "Prepare property onboarding paperwork and submit it to the landlord for adding to the portal.",
    icon: <FaSlidersH className="text-charcoalGray" size={30} />,
  },
  {
    title: "Cleaning & House Management",
    description:
      "Provide cleaning services and ensure good housekeeping with professional cleaners.",
    icon: <FaBroom className="text-charcoalGray" size={30} />,
  },
  {
    title: "Utilities Management",
    description:
      "Find cheaper utility suppliers and set up accounts with them for better cost-efficiency.",
    icon: <FaPlug className="text-charcoalGray" size={30} />,
  },
  {
    title: "CQC Registrations",
    description:
      "Assist with preparing documents to register with CQC as a service provider or manager.",
    icon: <FaLock className="text-charcoalGray" size={30} />,
  },
  {
    title: "Maintenance Services",
    description:
      "Provide contact details for roofing, plumbing, boilers, electricity, garden cleaning, blockages, and other maintenance needs.",
    icon: <FaCalendarAlt className="text-charcoalGray" size={30} />,
  },
  {
    title: "IT Support",
    description:
      "CRM management, website design, and backup support to ensure smooth operations.",
    icon: <FaKey className="text-charcoalGray" size={30} />,
  },
  {
    title: "Insurance Assistance",
    description:
      "Help secure employee, public, building, and vehicle insurances.",
    icon: <FaEnvelope className="text-charcoalGray" size={30} />,
  },
  {
    title: "Mortgage Services",
    description:
      "Assist in obtaining business loans and mortgages for HMO properties.",
    icon: <FaBuilding className="text-charcoalGray" size={30} />,
  },
  {
    title: "Legal Support",
    description: "Provide reliable legal support for all your property needs.",
    icon: <FaBalanceScale className="text-charcoalGray" size={30} />,
  },
];

// Predefined background colors for the service boxes
const bgColors = [
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-red-100",
];

const ServiceSection = () => {
  return (
    <div className="bg-gray-50 py-12">
      <MaxWidthWrapper>
        <h2 className="text-4xl font-extrabold text-charcoalGray text-center">
          Our Professional Services
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 mb-12 max-w-3xl mx-auto">
          We provide a wide range of services tailored to meet your HMO needs.
          Our team is dedicated to offering efficient, reliable, and compliant
          solutions for property management and related services.
        </p>

        <div className="space-y-10">
          {/* Full-width services (first two) */}
          {services.slice(0, 2).map((service, index) => (
            <div
              key={index}
              className={`p-8 border rounded-lg shadow-sm transition-transform transform hover:scale-[1.01] ${
                bgColors[index % bgColors.length]
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-white text-charcoalGray rounded-full shadow">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-charcoalGray ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-4 text-lg">
                {service.description}
              </p>

              {service.subServices && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {service.subServices.map((subService, subIndex) => (
                    <div
                      key={subIndex}
                      className="p-4 bg-white bg-opacity-70 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-gray-100 text-charcoalGray rounded-full mr-3">
                          {subService.icon}
                        </div>
                        <h4 className="font-semibold text-lg text-charcoalGray">
                          {subService.title}
                        </h4>
                      </div>
                      <p className="text-gray-600">{subService.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Regular 3-column grid for remaining services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.slice(2).map((service, index) => (
              <div
                key={index + 2} // Offset index by 2
                className={`p-6 border rounded-lg shadow-sm transition-transform transform hover:scale-105 ${
                  bgColors[(index + 2) % bgColors.length] // Offset index by 2
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-white text-charcoalGray rounded-full shadow">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoalGray ml-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ServiceSection;
