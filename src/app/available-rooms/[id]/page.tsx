"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Bed, Toilet, Square, CalendarDays, MapPin } from "lucide-react";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type Property = {
  id: string;
  name: string;
  price: string;
  bedrooms: number;
  toilets: number;
  balcony: boolean;
  sqft: number;
  image: string;
  details: string;
  location: string;
  available: string;
};

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching property details.");
      } finally {
        setLoading(false);
      }
    };

    const checkBookingStatus = async () => {
      if (!session) {
        setBookingLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const bookings = await response.json();
        setIsBooked(bookings.some((booking: any) => booking.propertyId === id));
      } catch (error) {
        console.error(error);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchProperty();
    checkBookingStatus();
  }, [id, session]);

  const handleBooking = async () => {
    if (!session) {
      toast.error("You must be logged in to book a property.");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property?.id,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().setDate(new Date().getDate() + 30)
          ).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed.");
      }

      toast.success("Booking successful!");
      setIsBooked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property?.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cancellation failed.");
      }

      toast.success("Booking canceled successfully!");
      setIsBooked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginRedirect = () => {
    router.push(`/auth/login?callbackUrl=/available-rooms/${id}`);
  };

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        {loading ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 animate-pulse">
            <div className="w-full lg:w-1/2 h-[250px] lg:h-[600px] bg-gray-300 rounded-lg"></div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : property ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            <div className="w-full lg:w-1/2 h-[250px] lg:h-[600px]">
              <Image
                src={property.image}
                alt={property.name}
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg opacity-0 transition-opacity duration-700 ease-in-out"
                loading="lazy"
                onLoad={(e) =>
                  (e.target as HTMLImageElement).classList.remove("opacity-0")
                }
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl lg:text-4xl font-bold text-charcoalGray">
                {property.name}
              </h1>
              <p className="text-softGreen text-lg mt-2 lg:mt-4">
                £{property.price} / month
              </p>

              <div className="mt-4 lg:mt-6 text-charcoalGray space-y-3 lg:space-y-4">
                <p>{property.details}</p>
                <div className="flex items-center gap-3">
                  <Bed size={20} className="mr-1" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Toilet size={20} className="mr-1" />
                  <span>{property.toilets} Bathrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Square size={20} className="mr-1" />
                  <span>{property.sqft} sqft</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="mr-1" />
                  <span>Available from: {property.available}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="mr-1" />
                  <span>{property.location}</span>
                </div>
                <div>
                  <span>
                    Balcony:{" "}
                    {property.balcony ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={isBooked ? handleCancelBooking : handleBooking}
                disabled={!session || bookingLoading}
                className={`mt-6 w-full py-3 rounded-md font-semibold transition-all ${
                  session
                    ? bookingLoading
                      ? "bg-gray-400 text-white cursor-not-allowed" // Show disabled state while checking
                      : isBooked
                      ? "bg-red-500 text-white hover:bg-red-700"
                      : "bg-daffodilYellow text-charcoalGray hover:bg-softGreen"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {bookingLoading
                  ? "Checking..."
                  : isBooked
                  ? "Cancel Booking"
                  : "Book Now"}
              </button>

              {!session && (
                <p className="mt-3 text-red-600 text-sm">
                  You must be logged in to book a property.{" "}
                  <button
                    onClick={handleLoginRedirect}
                    className="underline text-blue-600 hover:text-blue-900"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-charcoalGray text-lg">Property not found.</p>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default PropertyDetails;
