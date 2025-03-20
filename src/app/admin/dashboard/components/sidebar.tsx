"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Building,
  UserPlus,
  Edit,
  Trash,
  Users,
  Briefcase,
  ChevronDown,
  LogOut,
  PlusIcon,
  BriefcaseBusiness,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Add a tooltip component
import { TooltipProvider } from "@/components/ui/tooltip";

interface SidebarProps {
  user: any; // Define the user type properly if possible
}

export function Sidebar({ user }: SidebarProps) {
  const { data: session } = useSession(); // Use the useSession hook to access the session

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  // Use the session user if available, otherwise fall back to the passed user prop
  const currentUser = session?.user || user;

  // Truncate the email if it's too long
  const truncateEmail = (email: string, maxLength: number = 20) => {
    if (email.length <= maxLength) return email;
    return `${email.slice(0, maxLength)}...`;
  };

  return (
    <TooltipProvider>
      <div className="max-h-screen min-h-screen sticky top-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                >
                  <Home className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Rooms Collapsible Menu */}
              <li>
                <details className="group" open>
                  <summary className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all cursor-pointer">
                    <Building className="w-5 h-5 mr-3" />
                    <span>Rooms</span>
                    <ChevronDown className="w-4 h-4 ml-auto transform group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/admin/dashboard/rooms"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <Building className="w-5 h-5 mr-3" />
                        <span>All Rooms</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/admin/dashboard/add-rooms"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <PlusIcon className="w-5 h-5 mr-3" />
                        <span>Add Rooms</span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              {/* Teams Collapsible Menu */}
              <li>
                <details className="group">
                  <summary className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all cursor-pointer">
                    <Users className="w-5 h-5 mr-3" />
                    <span>Teams</span>
                    <ChevronDown className="w-4 h-4 ml-auto transform group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/admin/dashboard/teams"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <Users className="w-5 h-5 mr-3" />
                        <span>Show Teams</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/dashboard/add-teams"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <UserPlus className="w-5 h-5 mr-3" />
                        <span>Add Team Member</span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              {/* Careers Menu */}
              <li>
                <details className="group">
                  <summary className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all cursor-pointer">
                    <Briefcase className="w-5 h-5 mr-3" />
                    <span>Job Vacancy</span>
                    <ChevronDown className="w-4 h-4 ml-auto transform group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/admin/dashboard/jobs"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <BriefcaseBusiness className="w-5 h-5 mr-3" />
                        <span>Show Jobs</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/dashboard/add-jobs"
                        className="flex items-center p-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
                      >
                        <PlusIcon className="w-5 h-5 mr-3" />
                        <span>Add Jobs</span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>

        {/* User Avatar and Sign-Out */}
        <div className="mt-8">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={currentUser?.image || ""} />
              <AvatarFallback>
                {currentUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-semibold text-gray-800 truncate max-w-[120px]">
                    {truncateEmail(currentUser?.email || "")}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentUser?.email}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full flex items-center p-2 mt-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-all"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}
