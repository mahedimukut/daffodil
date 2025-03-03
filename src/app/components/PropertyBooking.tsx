"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { Bed, Heart, HomeIcon, Square } from "lucide-react";
import { FaToilet } from "react-icons/fa6";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { RiHomeFill } from "react-icons/ri";
import { TfiHome } from "react-icons/tfi";

const propertiesData = [
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

export default function PropertyList() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    bedrooms: string;
    bathrooms: string;
    balcony: string;
    availableMonthYear: Date | null; // Explicitly set the type
  }>({
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    availableMonthYear: null,
  });

  const [visibleProperties, setVisibleProperties] = useState(
    propertiesData.slice(0, 6)
  );
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  const filterProperties = useCallback(() => {
    let filtered = propertiesData;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(search.toLowerCase()) ||
          property.details.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms === Number(filters.bedrooms)
      );
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) => property.toilets === Number(filters.bathrooms)
      );
    }

    // Balcony filter
    if (filters.balcony !== "") {
      filtered = filtered.filter(
        (property) => property.balcony === (filters.balcony === "true")
      );
    }

    // Available Month-Year filter
    if (filters.availableMonthYear) {
      const filterDate = filters.availableMonthYear.toISOString().slice(0, 7); // Get YYYY-MM
      filtered = filtered.filter(
        (property) => property.available.slice(0, 7) === filterDate
      );
    }

    return filtered;
  }, [search, filters]);

  useEffect(() => {
    setLoading(true); // Show loading state
    const timeout = setTimeout(() => {
      setVisibleProperties(filterProperties().slice(0, 6)); // Set visible properties after a delay
      setLoading(false); // Hide loading state after a delay
    }, 1000); // Delay for 1 second

    return () => clearTimeout(timeout); // Cleanup timeout if effect is re-run
  }, [search, filters, filterProperties]);

  useEffect(() => {
    if (inView && visibleProperties.length < filterProperties().length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleProperties((prev) => [
          ...prev,
          ...filterProperties().slice(prev.length, prev.length + 6),
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [inView, filterProperties, visibleProperties]);

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoalGray">
            Your Future Home Awaits!
          </h1>
          <p className="text-lg text-gray-600 mt-2">Find Your Dream Here</p>
        </div>
        <div className="bg-daffodilYellow p-6 rounded-lg shadow-lg flex flex-wrap gap-4 items-center">
          <Input
            className="flex-1 min-w-[220px] p-3 h-12 rounded-lg border border-gray-300 bg-white text-charcoalGray focus:outline-none focus:ring-2 focus:ring-charcoalGray"
            placeholder="🔍 Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Input
            className="flex-1 min-w-[120px] p-3 h-12 rounded-lg border border-gray-300 bg-white text-charcoalGray focus:outline-none focus:ring-2 focus:ring-charcoalGray"
            type="number"
            placeholder="🛏 Bedrooms"
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters({ ...filters, bedrooms: e.target.value })
            }
            min={1}
          />

          <Input
            className="flex-1 min-w-[120px] p-3 h-12 rounded-lg border border-gray-300 bg-white text-charcoalGray focus:outline-none focus:ring-2 focus:ring-charcoalGray"
            type="number"
            placeholder="🛁 Bathrooms"
            value={filters.bathrooms}
            onChange={(e) =>
              setFilters({ ...filters, bathrooms: e.target.value })
            }
            min={1}
          />

          <select
            className="flex-1 min-w-[120px] p-3 h-12 rounded-lg border border-gray-300 bg-white text-charcoalGray/50 focus:outline-none focus:ring-2 focus:ring-charcoalGray"
            value={filters.balcony}
            onChange={(e) =>
              setFilters({ ...filters, balcony: e.target.value })
            }
          >
            <option value="">🌇 Balcony</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Datepicker for Available Month-Year */}
          <DatePicker
            selected={filters.availableMonthYear}
            onChange={(date) =>
              setFilters({ ...filters, availableMonthYear: date })
            }
            dateFormat="MM-yyyy"
            showMonthYearPicker
            className="flex-1 p-3 h-12 rounded-lg border border-gray-300 bg-white text-charcoalGray focus:outline-none focus:ring-2 focus:ring-charcoalGray"
            placeholderText="📅 Available Month"
          />

          <button
            onClick={() => {
              setSearch("");
              setFilters({
                bedrooms: "",
                bathrooms: "",
                balcony: "",
                availableMonthYear: null, // reset datepicker
              });
            }}
            className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
          >
            Reset
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
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
            ))
          ) : visibleProperties.length > 0 ? ( // ✅ Correct condition check
            visibleProperties.map((property) => (
              <div
                key={property.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div>
                  <Link href={`/available-rooms/${property.id}`}>
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-56 object-cover opacity-0 transition-opacity duration-700 ease-in-out"
                        loading="lazy"
                        onLoad={(e) =>
                          (e.target as HTMLImageElement).classList.remove(
                            "opacity-0"
                          )
                        }
                      />
                      <div className="absolute top-3 right-3 text-white">
                        <Heart
                          size={24}
                          className="cursor-pointer hover:text-daffodilYellow"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-charcoalGray">
                      {property.name}
                    </h3>
                    <p className="text-softGreen mt-2">{property.price}</p>
                    <div className="flex justify-between mt-4 text-charcoalGray text-sm">
                      <div className="flex items-center">
                        <Bed size={18} className="mr-1" />
                        {property.bedrooms} Bed
                      </div>
                      <div className="flex items-center">
                        <FaToilet size={18} className="mr-1" />
                        {property.toilets} Bath
                      </div>
                      <div className="flex items-center">
                        <Square size={18} className="mr-1" />
                        {property.sqft} sqft
                      </div>
                      <div className="flex items-center">
                        {property.balcony ? (
                          <span className="text-green-500">Balcony</span>
                        ) : (
                          <span className="text-red-500">No Balcony</span>
                        )}
                      </div>
                    </div>
                    <Link href={`/available-rooms/${property.id}`}>
                      <button className="mt-4 w-full border border-daffodilYellow text-charcoalGray font-semibold py-2 rounded-md hover:bg-daffodilYellow transition-all">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-6 mt-8">
              <HomeIcon size={48} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-charcoalGray">
                No properties found
              </h2>
              <p className="text-gray-500 mt-2 text-center">
                Try adjusting your search filters or check back later for new
                listings.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilters({
                    bedrooms: "",
                    bathrooms: "",
                    balcony: "",
                    availableMonthYear: null, // reset datepicker
                  });
                }}
                className="mt-4 px-6 py-2 bg-daffodilYellow text-charcoalGray font-semibold rounded-lg hover:bg-yellow-500 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        <div ref={ref} className="mt-4 flex justify-center">
          {loading && (
            <div className="flex flex-col items-center justify-center h-[20vh] space-y-3">
              <Skeleton className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <TfiHome size={32} className="text-gray-400 animate-pulse" />
              </Skeleton>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
