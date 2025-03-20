"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { ChevronDown } from "lucide-react";
import JobApplicationModal from "../components/JobApplicationModal"; // Import the modal

// Define the Job type
interface Job {
  id: number;
  title: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const CareersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedJobTitle, setSelectedJobTitle] = useState(""); // State to store the selected job title
  const [jobs, setJobs] = useState<Job[]>([]); // State to store jobs fetched from the API
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to handle the "Apply Now" button click
  const handleApplyNow = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle); // Set the selected job title
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedJobTitle(""); // Clear the selected job title
  };

  // Display loading state
  if (loading) {
    return (
      <div className="bg-gray-100 py-12">
        <MaxWidthWrapper>
          <h2 className="text-4xl font-extrabold text-charcoalGray text-center mb-12">
            Join Our Team
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border-l-4 border-daffodilYellow shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-gray-100 py-12">
        <MaxWidthWrapper>
          <h2 className="text-4xl font-extrabold text-charcoalGray text-center mb-12">
            Join Our Team
          </h2>
          <div className="max-w-3xl mx-auto text-center text-red-500">
            Error: {error}
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <MaxWidthWrapper>
        <h2 className="text-4xl font-extrabold text-charcoalGray text-center mb-12">
          Join Our Team
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {jobs.map((job) => (
            <details
              key={job.id}
              className="bg-white p-5 rounded-lg border-l-4 border-daffodilYellow shadow-sm group"
            >
              <summary className="flex justify-between items-center font-semibold text-charcoalGray cursor-pointer">
                <div>
                  <h3 className="text-xl">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
                <ChevronDown className="text-daffodilYellow group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-charcoalGray">
                    Responsibilities:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoalGray">
                    Requirements:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoalGray">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                {/* Apply Now Button */}
                <button
                  onClick={() => handleApplyNow(job.title)}
                  className="bg-daffodilYellow text-charcoalGray px-6 py-2 rounded-md hover:bg-softGreen transition-all"
                >
                  Apply Now
                </button>
              </div>
            </details>
          ))}
        </div>
      </MaxWidthWrapper>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobTitle={selectedJobTitle}
      />
    </div>
  );
};

export default CareersPage;
