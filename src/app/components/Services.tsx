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
  FaAmbulance,
} from "react-icons/fa";

const services = [
  {
    title: "Residents Support Services",
    description:
      "Work as a support worker, managing resident's files and weekly support notes, and carry out a mock support audit before the final audit.",
    icon: <FaUserCheck className="text-charcoalGray" size={30} />,
  },
  {
    title: "Housing Benefits Claim",
    description:
      "Guaranteed 100% Housing Benefit Payment each month with follow-up support for tenants, landlords, and local authorities.",
    icon: <FaHome className="text-charcoalGray" size={30} />,
  },
  {
    title: "Compliance",
    description: "Fully compliant supported Exempt accommodation.",
    icon: <FaShieldAlt className="text-charcoalGray" size={30} />,
  },
  {
    title: "PACE Management",
    description:
      "Manage the Concept portal and ensure it is up to date with all necessary information.",
    icon: <FaFileAlt className="text-charcoalGray" size={30} />,
  },
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
    title: "Pre-lease & Quarterly Inspections",
    description:
      "Ensure pre-lease inspections are carried out, resolve any issues during quarterly inspections.",
    icon: <FaLifeRing className="text-charcoalGray" size={30} />,
  },
  {
    title: "Property Onboarding",
    description:
      "Prepare property onboarding paperwork and submit it to the landlord for adding to the portal.",
    icon: <FaSlidersH className="text-charcoalGray" size={30} />,
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
  {
    title: "Training & Workshops",
    description:
      "Providing training sessions and workshops to keep property managers informed of new regulations and best practices.",
    icon: <FaChalkboardTeacher className="text-charcoalGray" size={30} />,
  },
  {
    title: "Emergency Support Services",
    description:
      "Offering 24/7 emergency support to handle urgent property management issues and maintenance requests.",
    icon: <FaAmbulance className="text-charcoalGray" size={30} />,
  },
];

const ServiceSection = () => {
  return (
    <div className="bg-gray-50 py-20">
      <MaxWidthWrapper>
        <h2 className="text-4xl font-extrabold text-charcoalGray text-center">
          Our Professional Services
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 mb-12 max-w-3xl mx-auto">
          We provide a wide range of services tailored to meet your HMO needs.
          Our team is dedicated to offering efficient, reliable, and compliant
          solutions for property management and related services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-daffodilYellow rounded-lg shadow-sm transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-daffodilYellow text-white rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-charcoalGray ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ServiceSection;
