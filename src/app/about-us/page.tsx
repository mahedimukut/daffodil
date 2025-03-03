import Image from "next/image";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MdSupportAgent,
  MdAttachMoney,
  MdChecklist,
  MdHomeWork,
  MdGavel,
  MdComputer,
} from "react-icons/md";

const companyImage = "/company.jpg";

const teamMembers = [
  {
    name: "John Doe",
    position: "Founder & CEO",
    image: "/team/team1.jpg",
    description:
      "With years of experience in the property sector, John leads our vision to revolutionize HMO solutions.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
  {
    name: "Michael Johnson",
    position: "Head of Compliance",
    image: "/team/team3.jpg",
    description:
      "Michael is dedicated to maintaining top-tier compliance and regulatory adherence in the industry.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
  {
    name: "Jane Smith",
    position: "Operations Manager",
    image: "/team/team2.jpg",
    description:
      "Jane ensures seamless operations and exceptional service delivery for landlords and tenants alike.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
  {
    name: "Sophia Brown",
    position: "Marketing Director",
    image: "/team/team3.jpg",
    description:
      "Sophia drives our marketing strategy, promoting our services and connecting with new clients.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
  {
    name: "Ethan Green",
    position: "Financial Officer",
    image: "/team/team2.jpg",
    description:
      "Ethan manages our financial operations, ensuring the business stays profitable and financially healthy.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
  {
    name: "Isabella White",
    position: "Client Relations Manager",
    image: "/team/team1.jpg",
    description:
      "Isabella is the bridge between our clients and services, ensuring the best experience and satisfaction.",
    socials: {
      linkedin: "#",
      x: "#",
      facebook: "#",
    },
  },
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50 py-16">
      <MaxWidthWrapper>
        {/* Company Image */}
        <div className="relative w-full h-80 mb-12">
          <Image
            src={companyImage}
            alt="Company Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* About Us Section */}
        <section className="text-center">
          <h2 className="text-5xl font-bold text-charcoalGray">Who We Are</h2>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            Established in 2024,{" "}
            <span className="font-semibold text-daffodilYellow">
              Daffodil Solutions
            </span>{" "}
            specializes in profitable HMO business operations. Based in
            Birmingham, UK, we provide expert property management solutions,
            ensuring landlords and supported living businesses thrive.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mt-16 bg-white p-10 rounded-lg shadow-sm text-center">
          <h3 className="text-4xl font-bold text-charcoalGray">Our Mission</h3>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our mission is to streamline property management for landlords and
            businesses by ensuring seamless operations, full compliance, and a
            stress-free experience. We provide tailored solutions that maximize
            efficiency, profitability, and tenant satisfaction.
          </p>
        </section>

        {/* Team Section */}
        <section className="mt-16">
          <h3 className="text-3xl font-bold text-charcoalGray text-center">
            Meet the Team
          </h3>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Our dedicated team of experts is committed to delivering excellence
            in property management.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full border-4 object-cover border-daffodilYellow w-44 h-44"
                />
                <h4 className="mt-4 text-xl font-semibold text-charcoalGray">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.position}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {member.description}
                </p>
                <div className="mt-4 flex justify-center space-x-4 text-gray-600">
                  <a
                    href={member.socials.linkedin}
                    className="hover:text-daffodilYellow"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                  <a
                    href={member.socials.x}
                    className="hover:text-daffodilYellow"
                  >
                    <FaXTwitter size={20} />
                  </a>
                  <a
                    href={member.socials.facebook}
                    className="hover:text-daffodilYellow"
                  >
                    <FaFacebookF size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
