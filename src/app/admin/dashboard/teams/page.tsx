"use client";

import React, { useEffect, useState } from "react";
import { Edit, PlusIcon, Search, Trash } from "lucide-react";
import Link from "next/link";

// Define the Team Member type
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const DashboardClient = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // State to store team members
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch team members from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team members
        const teamResponse = await fetch("/api/teams");
        if (!teamResponse.ok) {
          throw new Error("Failed to fetch team members");
        }
        const teamData: TeamMember[] = await teamResponse.json();
        setTeamMembers(teamData);
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

  // Reverse the team members array to show the most recent first
  const reversedTeamMembers = [...teamMembers].reverse();

  // Filter team members based on search query
  const filteredTeamMembers = reversedTeamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toString().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeamMembers = filteredTeamMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle delete team member
  const handleDeleteTeamMember = async (id: number) => {
    try {
      const response = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }
      // Remove the deleted team member from the state
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          View, Edit, and Delete Team Members
        </h1>

        {/* Teams Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Team Members Name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Team Members
            </h2>
            <Link href={"/admin/dashboard/add-teams"}>
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Add New Team Member</span>
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Position</th>
                  <th className="py-2 px-4 border-b text-left">Image</th>
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
                ) : currentTeamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-2 px-4 border-b text-center">
                      No team members found.
                    </td>
                  </tr>
                ) : (
                  currentTeamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="py-2 px-4 border-b">{member.id}</td>
                      <td className="py-2 px-4 border-b">{member.name}</td>
                      <td className="py-2 px-4 border-b">{member.position}</td>
                      <td className="py-2 px-4 border-b">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/admin/dashboard/edit-team/${member.id}`}>
                          <button className="text-orange-500 hover:text-orange-600 mr-2">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteTeamMember(member.id)}
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
              disabled={indexOfLastItem >= filteredTeamMembers.length}
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

export default DashboardClient;
