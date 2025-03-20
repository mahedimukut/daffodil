"use client";

import React, { useEffect, useState } from "react";
import {
  Edit,
  PlusIcon,
  Search,
  Trash,
  Users,
  Home,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the Room type
interface Room {
  id: number;
  name: string;
  details: string;
  images: string[];
  createdAt: string;
}

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

// Define the Job type
interface Job {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const DashboardClient = ({ user }: { user: any }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ name: string; rooms: number }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsResponse = await fetch("/api/properties");
        if (!roomsResponse.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const roomsData: Room[] = await roomsResponse.json();
        setRooms(roomsData);

        const teamResponse = await fetch("/api/teams");
        if (!teamResponse.ok) {
          throw new Error("Failed to fetch team members");
        }
        const teamData: TeamMember[] = await teamResponse.json();
        setTeamMembers(teamData);

        const jobsResponse = await fetch("/api/jobs");
        if (!jobsResponse.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData: Job[] = await jobsResponse.json();
        setJobs(jobsData);

        const chartData = calculateChartData(roomsData);
        setChartData(chartData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateChartData = (rooms: Room[]) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const roomsPerMonth: { [key: string]: number } = {};
    monthNames.forEach((month) => {
      roomsPerMonth[month] = 0;
    });
    rooms.forEach((room) => {
      const createdAt = new Date(room.createdAt);
      const month = monthNames[createdAt.getMonth()];
      roomsPerMonth[month] += 1;
    });
    return monthNames.map((month) => ({
      name: month,
      rooms: roomsPerMonth[month],
    }));
  };

  return (
    <>
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to Your Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold">{rooms.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600">Total Team Members</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Briefcase className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-600">Total Jobs Available</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rooms Added Over Time
          </h2>
          <div className="h-64">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-full bg-gray-200 rounded"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rooms" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500">
          Developed by{" "}
          <Link
            href="https://www.antstudio.agency"
            className="text-blue-500 hover:underline"
          >
            antStudio
          </Link>
        </footer>
      </div>
    </>
  );
};

export default DashboardClient;
