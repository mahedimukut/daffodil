"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Bed, Toilet, Square, CalendarDays, MapPin } from "lucide-react";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

// Property Type
type Property = {
  id: number;
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

// Simulating fetching data
const propertyData: Property[] = [
  {
    id: 1,
    name: "Charming 2-Bedroom Apartment in Central London",
    price: "£1,200 / month",
    bedrooms: 2,
    toilets: 1,
    balcony: true,
    sqft: 750,
    image: "/property/property-1.jpg",
    details:
      "This charming 2-bedroom apartment in Central London offers a cozy living space, a private balcony, and a fully equipped kitchen. Perfect for small families or young professionals.",
    location: "London, UK",
    available: "2025-03",
  },
  {
    id: 2,
    name: "Stylish Studio in the Heart of Manchester",
    price: "£950 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 500,
    image: "/property/property-2.jpg",
    details:
      "This stylish studio in the heart of Manchester offers modern living with sleek interiors, ideal for individuals looking for a vibrant city lifestyle.",
    location: "Manchester, UK",
    available: "2025-04",
  },
  {
    id: 3,
    name: "Elegant 3-Bedroom Home with Spacious Interiors",
    price: "£2,500 / month",
    bedrooms: 3,
    toilets: 2,
    balcony: true,
    sqft: 1200,
    image: "/property/property-3.jpg",
    details:
      "This elegant 3-bedroom home features spacious living areas, a large balcony, and premium finishes. Perfect for families or those seeking luxurious living.",
    location: "Birmingham, UK",
    available: "2025-05",
  },
  {
    id: 4,
    name: "Modern 2-Bedroom Flat with Balcony",
    price: "£1,400 / month",
    bedrooms: 2,
    toilets: 2,
    balcony: true,
    sqft: 850,
    image: "/property/property-4.jpg",
    details:
      "This modern 2-bedroom flat offers high-end finishes, a spacious balcony, and an unbeatable location close to amenities, perfect for comfortable living.",
    location: "Liverpool, UK",
    available: "2025-06",
  },
  {
    id: 5,
    name: "Contemporary 1-Bedroom Apartment with Urban Vibe",
    price: "£1,100 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 600,
    image: "/property/property-5.jpg",
    details:
      "A contemporary 1-bedroom apartment with a cozy living space, ideal for young professionals looking for a modern city living experience.",
    location: "Leeds, UK",
    available: "2025-07",
  },
  {
    id: 6,
    name: "Luxurious Penthouse with Stunning Views",
    price: "£3,000 / month",
    bedrooms: 4,
    toilets: 3,
    balcony: true,
    sqft: 1500,
    image: "/property/property-6.jpg",
    details:
      "This luxurious penthouse offers breathtaking panoramic views, high ceilings, and top-of-the-line finishes. Experience premium urban living in the heart of the city.",
    location: "Edinburgh, UK",
    available: "2025-08",
  },
  {
    id: 7,
    name: "Affordable Studio Room with Convenient Location",
    price: "£800 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 400,
    image: "/property/property-7.jpg",
    details:
      "A compact, budget-friendly studio with essential amenities, located near transportation links and shopping centers for ultimate convenience.",
    location: "Glasgow, UK",
    available: "2025-09",
  },
  {
    id: 8,
    name: "Charming Family Home with Large Garden",
    price: "£2,200 / month",
    bedrooms: 3,
    toilets: 2,
    balcony: true,
    sqft: 1100,
    image: "/property/property-8.jpg",
    details:
      "A beautiful family home offering spacious living areas, a large garden, and a quiet neighborhood, ideal for families seeking peace and privacy.",
    location: "Bristol, UK",
    available: "2025-10",
  },
  {
    id: 9,
    name: "Modern Downtown Condo with Private Balcony",
    price: "£1,800 / month",
    bedrooms: 2,
    toilets: 2,
    balcony: true,
    sqft: 900,
    image: "/property/property-9.jpg",
    details:
      "A sleek and modern 2-bedroom condo in the heart of downtown with a private balcony, offering an ideal living space for professionals.",
    location: "Cardiff, UK",
    available: "2025-11",
  },
  {
    id: 10,
    name: "Cozy 2-Bedroom Apartment in Central London",
    price: "£1,200 / month",
    bedrooms: 2,
    toilets: 1,
    balcony: true,
    sqft: 750,
    image: "/property/property-1.jpg",
    details:
      "A cozy 2-bedroom apartment in Central London with a spacious living area, a private balcony, and easy access to all the city has to offer.",
    location: "London, UK",
    available: "2025-03",
  },
  {
    id: 11,
    name: "Charming Studio with Modern Interiors",
    price: "£950 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 500,
    image: "/property/property-2.jpg",
    details:
      "A charming studio apartment featuring modern finishes and a cozy layout. Perfect for individuals seeking a vibrant city lifestyle in Manchester.",
    location: "Manchester, UK",
    available: "2025-04",
  },
  {
    id: 12,
    name: "Luxurious 3-Bedroom House with High-End Finishes",
    price: "£2,500 / month",
    bedrooms: 3,
    toilets: 2,
    balcony: true,
    sqft: 1200,
    image: "/property/property-10.jpg",
    details:
      "This luxurious 3-bedroom house features high-end finishes, ample space, and a large balcony, located in one of Birmingham's most prestigious neighborhoods.",
    location: "Birmingham, UK",
    available: "2025-05",
  },
  {
    id: 13,
    name: "Modern Flat with Stunning Views and Balcony",
    price: "£1,400 / month",
    bedrooms: 2,
    toilets: 2,
    balcony: true,
    sqft: 850,
    image: "/property/property-4.jpg",
    details:
      "This modern 2-bedroom flat offers a spacious balcony with stunning views and high-end finishes, perfect for those who appreciate fine living.",
    location: "Liverpool, UK",
    available: "2025-06",
  },
  {
    id: 14,
    name: "Comfortable 1-Bedroom Apartment with Stylish Interior",
    price: "£1,100 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 600,
    image: "/property/property-5.jpg",
    details:
      "A comfortable 1-bedroom apartment featuring contemporary design and a cozy living space, ideal for young professionals in Leeds.",
    location: "Leeds, UK",
    available: "2025-07",
  },
  {
    id: 15,
    name: "Stunning Penthouse Suite with Premium Features",
    price: "£3,000 / month",
    bedrooms: 4,
    toilets: 3,
    balcony: true,
    sqft: 1500,
    image: "/property/property-10.jpg",
    details:
      "This stunning penthouse suite offers breathtaking views, luxurious finishes, and ample living space for the ultimate upscale living experience.",
    location: "Edinburgh, UK",
    available: "2025-08",
  },
  {
    id: 16,
    name: "Spacious 2-Bedroom Flat with City Views",
    price: "£1,400 / month",
    bedrooms: 2,
    toilets: 2,
    balcony: true,
    sqft: 850,
    image: "/property/property-4.jpg",
    details:
      "A spacious 2-bedroom flat with a private balcony and amazing city views. Perfect for professionals or families who want modern living in a central location.",
    location: "Liverpool, UK",
    available: "2025-06",
  },
  {
    id: 17,
    name: "Affordable 1-Bedroom Apartment with Contemporary Design",
    price: "£1,100 / month",
    bedrooms: 1,
    toilets: 1,
    balcony: false,
    sqft: 600,
    image: "/property/property-5.jpg",
    details:
      "An affordable 1-bedroom apartment with contemporary design, ideal for young professionals or students looking for modern city living.",
    location: "Leeds, UK",
    available: "2025-07",
  },
  {
    id: 18,
    name: "Luxury Penthouse with Exclusive Features",
    price: "£3,000 / month",
    bedrooms: 4,
    toilets: 3,
    balcony: true,
    sqft: 1500,
    image: "/property/property-10.jpg",
    details:
      "A luxury penthouse featuring exclusive features, panoramic views, and an expansive floor plan. The perfect home for those seeking ultimate comfort and style.",
    location: "Edinburgh, UK",
    available: "2025-08",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: session } = useSession(); // Get the session data
  const searchParams = useSearchParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setTimeout(() => {
      const selectedProperty = propertyData.find(
        (item) => item.id === Number(id)
      );
      setProperty(selectedProperty || null);
      setLoading(false);
    }, 1500);
  }, [id]);

  const handleBooking = () => {
    if (!session) {
      toast.error("You must be logged in to book a property.");
      return;
    }
    // Proceed with booking logic
    toast.success("Booking confirmed!");
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
                {property.price}
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
                onClick={handleBooking}
                disabled={!session}
                className={`mt-6 w-full py-3 rounded-md font-semibold transition-all ${
                  session
                    ? "bg-daffodilYellow text-charcoalGray hover:bg-softGreen"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Book Now
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
