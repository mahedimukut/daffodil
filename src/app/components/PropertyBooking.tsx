"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Bed, Heart, HomeIcon, Square, Car, Trees } from "lucide-react";
import { FaToilet } from "react-icons/fa6";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

export default function PropertyList() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    bedrooms: string;
    bathrooms: string;
    garden: string;
    parking: string;
    availableMonthYear: Date | null;
  }>({
    bedrooms: "",
    bathrooms: "",
    garden: "",
    parking: "",
    availableMonthYear: null,
  });
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleProperties, setVisibleProperties] = useState<number>(6);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/properties");
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();
        setFavorites(data.map((fav: { propertyId: string }) => fav.propertyId));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const filterProperties = useCallback(() => {
    let filtered = properties;

    if (search) {
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(search.toLowerCase()) ||
          property.details.toLowerCase().includes(search.toLowerCase()) ||
          property.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms === Number(filters.bedrooms)
      );
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) => property.toilets === Number(filters.bathrooms)
      );
    }

    if (filters.garden !== "") {
      filtered = filtered.filter(
        (property) => property.garden === (filters.garden === "true")
      );
    }

    if (filters.parking !== "") {
      filtered = filtered.filter(
        (property) => property.parking === (filters.parking === "true")
      );
    }

    if (filters.availableMonthYear) {
      const filterDate = filters.availableMonthYear.toISOString().slice(0, 7);
      filtered = filtered.filter(
        (property) => property.available.slice(0, 7) === filterDate
      );
    }

    return filtered;
  }, [search, filters, properties]);

  const filteredProperties = filterProperties();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleProperties((prev) => prev + 6);
            setLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadingMore]);

  useEffect(() => {
    if (filteredProperties.length <= visibleProperties) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [filteredProperties, visibleProperties]);

  const toggleFavorite = async (propertyId: number) => {
    if (!session) {
      toast.error("Please log in to add properties to favorites");
      return;
    }

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ propertyId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      setFavorites((prevFavorites) =>
        prevFavorites.includes(String(propertyId))
          ? prevFavorites.filter((id) => id !== String(propertyId))
          : [...prevFavorites, String(propertyId)]
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoalGray">
            Your Future Home Awaits!
          </h1>
          <p className="text-lg text-gray-600 mt-2">Find Your Dream Here</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-daffodilYellow shadow-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 text-daffodilYellow mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Refine Your Search
            </h3>
            <button
              onClick={() => {
                setSearch("");
                setFilters({
                  bedrooms: "",
                  bathrooms: "",
                  garden: "",
                  parking: "",
                  availableMonthYear: null,
                });
              }}
              className="text-sm text-gray-500 hover:text-daffodilYellow transition-colors mt-2 md:mt-0 flex items-center"
              aria-label="Reset all filters"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset All
            </button>
          </div>

          {/* Search Input - Full width */}
          <div className="mb-6">
            <label htmlFor="search" className="sr-only">
              Search Properties
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm"
                placeholder="Search by location, property name, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search properties"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:pl-12">
            {/* Bedrooms */}
            <div className="flex flex-col">
              <label htmlFor="bedrooms" className="block text-xs font-medium text-gray-500 mb-1">
                Bedrooms
              </label>
              <div className="relative flex-1">
                <select
                  id="bedrooms"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Bed className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="block text-xs font-medium text-gray-500 mb-1">
                Bathrooms
              </label>
              <div className="relative flex-1">
                <select
                  id="bathrooms"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaToilet className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Garden */}
            <div className="flex flex-col">
              <label htmlFor="garden" className="block text-xs font-medium text-gray-500 mb-1">
                Garden
              </label>
              <div className="relative flex-1">
                <select
                  id="garden"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.garden}
                  onChange={(e) => setFilters({ ...filters, garden: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Trees className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex flex-col">
              <label htmlFor="parking" className="block text-xs font-medium text-gray-500 mb-1">
                Parking
              </label>
              <div className="relative flex-1">
                <select
                  id="parking"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.parking}
                  onChange={(e) => setFilters({ ...filters, parking: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Car className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Available From */}
            <div className="flex flex-col col-span-2 md:col-span-2">
              <label htmlFor="available" className="block text-xs font-medium text-gray-500 mb-1">
                Available From
              </label>
              <div className="relative flex-1">
                <DatePicker
                  id="available"
                  selected={filters.availableMonthYear}
                  onChange={(date: Date | null) => setFilters({ ...filters, availableMonthYear: date })}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  placeholderText="Select month"
                  className="block w-full py-2.5 pl-10 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

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
          ) : filteredProperties.length > 0 ? (
            filteredProperties.slice(0, visibleProperties).map((property) => (
              <div
                key={property.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:border-daffodilYellow transition-all"
              >
                <div>
                  <Link href={`/available-rooms/${property.id}`}>
                    <div className="relative">
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-56 object-cover opacity-0 transition-opacity duration-700 ease-in-out"
                        loading="lazy"
                        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                          e.currentTarget.classList.remove("opacity-0")
                        }
                      />
                      <div
                        className="absolute top-3 right-3 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(property.id);
                        }}
                      >
                        <Heart
                          size={24}
                          className={`${
                            favorites.includes(String(property.id))
                              ? "text-daffodilYellow fill-daffodilYellow"
                              : "text-white"
                          } hover:text-daffodilYellow`}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-charcoalGray">
                      <Link href={`/available-rooms/${property.id}`}>
                        {property.name}
                      </Link>
                    </h3>
                    <p className="text-softGreen mt-2">
                      £{property.price} / month
                    </p>
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
                    </div>
                    <div className="flex justify-between mt-2 text-charcoalGray text-sm">
                      <div className="flex items-center">
                        <Car size={18} className="mr-1" />
                        {property.parking ? (
                          <span className="text-green-500">Parking</span>
                        ) : (
                          <span className="text-red-500">No Parking</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Trees size={18} className="mr-1" />
                        {property.garden ? (
                          <span className="text-green-500">Garden</span>
                        ) : (
                          <span className="text-red-500">No Garden</span>
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
                onClick={fetchProperties}
                className="mt-6 px-6 py-2 bg-daffodilYellow text-charcoalGray font-semibold rounded-lg"
              >
                Refresh
              </button>
            </div>
          )}

          {loadingMore &&
            hasMore &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
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

        <div ref={observerTarget} className="h-1"></div>

        {!hasMore && filteredProperties.length > 0 && (
          <div className="text-center mt-8">
            <div className="bg-softGreen/10 p-6 rounded-lg border border-softGreen/20">
              <h2 className="text-xl font-semibold text-charcoalGray">
                🎉 You've reached the end!
              </h2>
              <p className="text-gray-500 mt-2">
                No more properties to load. Try adjusting your filters or check
                back later for new listings.
              </p>
            </div>
          </div>
        )}
        <ToastContainer />
      </MaxWidthWrapper>
    </div>
  );
}
