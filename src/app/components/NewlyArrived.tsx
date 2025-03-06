"use client";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Bed, Toilet, Square, Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Define Property Type
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
  createdAt: string;
};

const NewlyArrived = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]); // Store favorite property IDs

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setPropertyList(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

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

    fetchProperties();
    if (session) {
      fetchFavorites();
    }
  }, [session]);

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

      setFavorites(
        (prevFavorites) =>
          prevFavorites.includes(String(propertyId))
            ? prevFavorites.filter((id) => id !== String(propertyId)) // Remove if exists
            : [...prevFavorites, String(propertyId)] // Add if not exists
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
            Latest HMO Property Listings
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore newly available HMO accommodations tailored for shared
            living.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
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
            : propertyList
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                ) // Sort by newest first
                .slice(0, 6)
                .map((property) => (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all"
                  >
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
                          <Toilet size={18} className="mr-1" />
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
                ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default NewlyArrived;
