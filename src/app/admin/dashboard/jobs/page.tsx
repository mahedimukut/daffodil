"use client";

import React, { useEffect, useState } from "react";
import { Edit, PlusIcon, Search, Trash } from "lucide-react";
import Link from "next/link";

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

const JobDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // State to store jobs
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch jobs from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs
        const jobResponse = await fetch("/api/jobs");
        if (!jobResponse.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobData: Job[] = await jobResponse.json();
        setJobs(jobData);
      } catch (error) {
        // Handle the error safely
        if (error instanceof Error) {
          setError(error.message); // Set error message
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  // Reverse the jobs array to show the most recent first
  const reversedJobs = [...jobs].reverse();

  // Filter jobs based on search query
  const filteredJobs = reversedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toString().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle delete job
  const handleDeleteJob = async (id: number) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      // Remove the deleted job from the state
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          View, Edit, and Delete Job Postings
        </h1>

        {/* Jobs Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Job Title or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Jobs</h2>
            <Link href={"/admin/dashboard/add-jobs"}>
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Add New Job</span>
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Title</th>
                  <th className="py-2 px-4 border-b text-left">Location</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Skeleton Loading
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="py-2 px-4 border-b text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-2 px-4 border-b text-center">
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="py-2 px-4 border-b">{job.id}</td>
                      <td className="py-2 px-4 border-b">{job.title}</td>
                      <td className="py-2 px-4 border-b">{job.location}</td>
                      <td className="py-2 px-4 border-b">
                        {job.description.substring(0, 50)}...
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/admin/dashboard/edit-job/${job.id}`}>
                          <button className="text-orange-500 hover:text-orange-600 mr-2">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-orange-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredJobs.length}
              className="px-4 py-2 mx-1 bg-orange-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDashboard;
