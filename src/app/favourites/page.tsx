"use client";
import React, { useEffect, useState } from "react";
import { Bed, Toilet, Square, Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { toast } from "react-toastify";

// Define Property Type
type Property = {
  id: number;
  name: string;
  price: string;
  bedrooms: number;
  toilets: number;
  balcony: boolean;
  sqft: number;
  images: string[];
  details: string;
  location: string;
  available: string;
  createdAt: string;
};

const FavouritePage = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;
      try {
        setIsLoading(true);
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();

        // Fetch property details for each favorite property
        const propertyResponses = await Promise.all(
          data.map((fav: { propertyId: string }) =>
            fetch(`/api/properties/${fav.propertyId}`).then((res) => res.json())
          )
        );

        setFavorites(propertyResponses);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const handleFavoriteToggle = async (propertyId: number) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId }),
      });

      if (response.ok) {
        // Update the favorites list locally after successful response
        toast.success("Property removed from your favorites!");
        setFavorites((prevFavorites) =>
          prevFavorites.filter((property) => property.id !== propertyId)
        );
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error handling favorite toggle:", error);
    }
  };

  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-charcoalGray">
          Please log in to view your favorite properties.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoalGray">
            Your Favorite Properties
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Browse the properties you have favorited.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
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
          ) : favorites.length === 0 ? (
            <p className="text-center text-gray-600">
              You have no favorite properties yet.
            </p>
          ) : (
            <>
              {favorites.map((property) => (
                <div
                  key={property.id}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:border-daffodilYellow transition-all"
                >
                  <div className="relative">
                    <Link href={`/available-rooms/${property.id}`}>
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-56 object-cover opacity-0 transition-opacity duration-700 ease-in-out"
                        loading="lazy"
                        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                          e.currentTarget.classList.remove("opacity-0")
                        }
                      />
                    </Link>
                    <div className="absolute z-30 top-3 right-3 cursor-pointer">
                      <Heart
                        size={24}
                        className="text-daffodilYellow fill-daffodilYellow"
                        onClick={() => handleFavoriteToggle(property.id)} // Call the function to handle toggle
                      />
                    </div>
                  </div>

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
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FavouritePage;
