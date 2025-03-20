"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bed, Toilet, Square, Calendar } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { toast } from "react-toastify";

// Define the Booking Type
type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  property: {
    id: number;
    name: string;
    price: string;
    bedrooms: number;
    toilets: number;
    sqft: number;
    images: string[];
    location: string;
  };
};

// Fetch bookings for the logged-in user
const fetchBookings = async () => {
  const res = await fetch("/api/bookings");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

const Booking = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [cancelingBookingId, setCancelingBookingId] = useState<number | null>(
    null
  );
  // Fetch bookings only if the user is logged in
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", session?.user?.email ?? ""],
    queryFn: fetchBookings,
    enabled: !!session?.user,
  });

  // Mutation for canceling a booking
  const cancelBookingMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      if (!res.ok) throw new Error("Failed to cancel booking");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", session?.user?.email ?? ""],
      });
      toast.success("Property removed from your bookings!");
      setCancelingBookingId(null); // Reset the canceling state after success
    },
    onError: () => {
      toast.error("Failed to remove booking. Please try again.");
      setCancelingBookingId(null); // Reset the canceling state after error
    },
  });

  if (!session) {
    return (
      <div className="text-center text-lg font-semibold">
        Please log in to view your bookings.
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoalGray">My Bookings</h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your property reservations.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div className="mt-4 h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            Error fetching bookings.
          </div>
        ) : bookings?.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No bookings found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:border-daffodilYellow transition-all"
              >
                <Link href={`/available-rooms/${booking.property.id}`}>
                  <div className="relative">
                    <img
                      src={booking.property.images[0] || "/placeholder.jpg"}
                      alt={booking.property.name || "Property"}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-charcoalGray">
                    {booking.property.name}
                  </h3>
                  <p className="text-softGreen mt-2">
                    £{booking.property.price} / month
                  </p>

                  <div className="flex justify-between mt-4 text-charcoalGray text-sm">
                    <div className="flex items-center">
                      <Bed size={18} className="mr-1" />{" "}
                      {booking.property.bedrooms} Bed
                    </div>
                    <div className="flex items-center">
                      <Toilet size={18} className="mr-1" />{" "}
                      {booking.property.toilets} Bath
                    </div>
                    <div className="flex items-center">
                      <Square size={18} className="mr-1" />{" "}
                      {booking.property.sqft} sqft
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 text-charcoalGray text-sm">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-1" /> Start:{" "}
                      {new Date(booking.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-1" /> End:{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="mt-2 text-gray-500">
                    Location: {booking.property.location}
                  </p>

                  <button
                    onClick={() => {
                      setCancelingBookingId(booking.id);
                      cancelBookingMutation.mutate(booking.property.id);
                    }}
                    className="mt-4 w-full border border-red-500 text-charcoalGray font-semibold py-2 rounded-md hover:bg-red-500 hover:text-white transition-all"
                    disabled={
                      cancelingBookingId === booking.id &&
                      cancelBookingMutation.isPending
                    }
                  >
                    {cancelingBookingId === booking.id &&
                    cancelBookingMutation.isPending
                      ? "Canceling..."
                      : "Cancel Booking"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default Booking;
