"use client";

import React, { useEffect, useState } from "react";
import { Edit, PlusIcon, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the Room type
interface Room {
  id: number;
  name: string;
  details: string;
  images: string[]; // Array of image URLs
  // Add other properties as needed
}

const DashboardClient = () => {
  const [rooms, setRooms] = useState<Room[]>([]); // State to store rooms with explicit type
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const router = useRouter(); // Initialize the router

  // Fetch rooms from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data: Room[] = await response.json(); // Explicitly type the response data
        setRooms(data); // Set the fetched rooms to state
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

    fetchRooms();
  }, []);

  // Reverse the rooms array to show the most recent first
  const reversedRooms = [...rooms].reverse();

  // Filter rooms based on search query
  const filteredRooms = reversedRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.toString().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle delete room
  const handleDeleteRoom = async (id: number) => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete room");
      // Remove the deleted room from the state
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          View, Edit and Delete Rooms
        </h1>

        {/* Rooms Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Rooms</h2>
            <Link href={"/admin/dashboard/add-rooms"}>
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Add New Room</span>
              </button>
            </Link>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Room Name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Room ID</th>
                  <th className="py-2 px-4 border-b text-left">Room Name</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
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
                ) : currentRooms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-2 px-4 border-b text-center">
                      No rooms found.
                    </td>
                  </tr>
                ) : (
                  currentRooms.map((room) => (
                    <tr key={room.id}>
                      <td className="py-2 px-4 border-b">{room.id}</td>
                      <td className="py-2 px-4 border-b">{room.name}</td>
                      <td className="py-2 px-4 border-b">{room.details}</td>
                      <td className="py-2 px-4 border-b">
                        {room.images && room.images.length > 0 ? (
                          <img
                            src={room.images[0]} // Display the first image
                            alt={room.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {/* Edit Button */}
                        <Link href={`/admin/dashboard/edit-room/${room.id}`}>
                          <button className="text-orange-500 hover:text-orange-600 mr-2">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
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
              disabled={indexOfLastItem >= filteredRooms.length}
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
