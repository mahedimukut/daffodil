"use client"; // Add this directive since we're using hooks

import { useEffect, useState } from "react";
import Image from "next/image";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const companyImage = "/company.jpeg";

// Define the type for a team member
interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
  socials: {
    linkedin: string;
    x: string;
    facebook: string;
  };
}

export default function AboutUs() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // State to store team members
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch team members from the API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/teams");
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        setTeamMembers(data); // Set the fetched data to state
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred"); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchTeamMembers();
  }, []);

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
          {error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? // Loading skeleton for team members
                  Array.from({
                    length: teamMembers.length > 0 ? teamMembers.length : 1,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center"
                    >
                      <div className="rounded-full border-4 border-daffodilYellow w-44 h-44 bg-gray-200 animate-pulse"></div>
                      <div className="mt-4 w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="mt-2 w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="mt-2 w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                      </div>
                    </div>
                  ))
                : // Render actual team members
                  teamMembers.map((member, index) => (
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
          )}
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
