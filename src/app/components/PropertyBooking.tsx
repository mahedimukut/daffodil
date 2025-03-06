"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Bed, Heart, HomeIcon, Square } from "lucide-react";
import { FaToilet } from "react-icons/fa6";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useSession } from "next-auth/react";

export default function PropertyList() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    bedrooms: string;
    bathrooms: string;
    balcony: string;
    availableMonthYear: Date | null;
  }>({
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    availableMonthYear: null,
  });
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // New state for loading more properties
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleProperties, setVisibleProperties] = useState<number>(6); // Number of properties to show
  const [hasMore, setHasMore] = useState<boolean>(true); // To check if there are more properties to load
  const observerTarget = useRef<HTMLDivElement | null>(null); // Ref for the observer target

  // Function to fetch properties
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/properties");
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties(); // Fetch properties on mount
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

  // Filter properties based on filters and search
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

    if (filters.balcony !== "") {
      filtered = filtered.filter(
        (property) => property.balcony === (filters.balcony === "true")
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

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true); // Show loading skeleton
          setTimeout(() => {
            setVisibleProperties((prev) => prev + 6); // Load 6 more properties
            setLoadingMore(false); // Hide loading skeleton
          }, 1000); // Simulate a delay for loading
        }
      },
      { threshold: 1.0 } // Trigger when the target is fully visible
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

  // Update hasMore state
  useEffect(() => {
    if (filteredProperties.length <= visibleProperties) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [filteredProperties, visibleProperties]);

  const toggleFavorite = async (propertyId: number) => {
    if (!session) {
      alert("You must be logged in to favorite properties.");
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
                availableMonthYear: null,
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
          ) : filteredProperties.length > 0 ? (
            filteredProperties.slice(0, visibleProperties).map((property) => (
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
                      {property.name}
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
                onClick={fetchProperties}
                className="mt-6 px-6 py-2 bg-daffodilYellow text-white font-semibold rounded-lg"
              >
                Refresh
              </button>
            </div>
          )}

          {/* Show loading skeleton when loading more properties */}
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

        {/* Observer target for infinite scrolling */}
        <div ref={observerTarget} className="h-1"></div>

        {/* Show "No more properties" message when there are no more properties to load */}
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
      </MaxWidthWrapper>
    </div>
  );
}
