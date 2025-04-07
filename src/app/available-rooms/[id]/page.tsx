"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  Toilet,
  Square,
  CalendarDays,
  MapPin,
  Share2,
  Plus,
  Trees,
  Car,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "@/app/components/BookingForm";

type Property = {
  id: string;
  name: string;
  price: string;
  bedrooms: number;
  toilets: number;
  garden: boolean;
  parking: boolean;
  sqft: number;
  images: string[];
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);

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

    const fetchFavorites = async () => {
      if (!session) return;
      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        setFavorites(data.map((fav: { propertyId: string }) => fav.propertyId));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchProperty();
    checkBookingStatus();
    fetchFavorites();
  }, [id, session]);

  const handleBookingFormSubmit = async (data: any) => {
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
            new Date().setDate(new Date().getDate() + 1)
          ).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed.");
      }

      const resendResponse = await fetch("/api/booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: `${data.email}`,
          subject: `New Booking Inquiry for ${property?.name}`,
          text: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phoneNumber}\nMove-In Date: ${data.moveInDate}\nAdditional Notes: ${data.additionalNotes}`,
          name: data.fullName,
          data: data,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error("Failed to send booking email.");
      }

      toast.success("Booking successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsBooked(true);
      setIsBookingFormOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking inquiry. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

      toast.success("Booking canceled successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsBooked(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLoginRedirect = () => {
    router.push(`/auth/login?callbackUrl=/available-rooms/${id}`);
  };

  const openModal = (index: number) => {
    setPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsBookingFormOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property?.name,
          text: `Check out this property: ${property?.name}`,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => toast.error("Error sharing."));
    } else {
      toast.info("Sharing is not supported in your browser.");
    }
  };

  const toggleFavorite = async (propertyId: string) => {
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
        prevFavorites.includes(propertyId)
          ? prevFavorites.filter((id) => id !== propertyId)
          : [...prevFavorites, propertyId]
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="bg-white py-12">
      <MaxWidthWrapper>
        {loading ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 animate-pulse">
            <div className="w-full lg:w-1/2 h-[250px] lg:h-[400px] bg-gray-300 rounded-lg"></div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
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
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 gap-2">
                <div
                  key={0}
                  className="cursor-pointer"
                  onClick={() => openModal(0)}
                >
                  <Image
                    src={property.images[0]}
                    alt={`Property Image 1`}
                    width={800}
                    height={420}
                    className="w-full h-[420px] object-cover rounded-lg opacity-0 transition-opacity duration-700 ease-in-out"
                    loading="lazy"
                    onLoad={(e) =>
                      (e.target as HTMLImageElement).classList.remove(
                        "opacity-0"
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {property.images.slice(1, 3).map((image, index) => (
                    <div
                      key={index + 1}
                      className="cursor-pointer"
                      onClick={() => openModal(index + 1)}
                    >
                      <Image
                        src={image}
                        alt={`Property Image ${index + 2}`}
                        width={400}
                        height={200}
                        className="w-full h-[200px] object-cover rounded-lg opacity-0 transition-opacity duration-700 ease-in-out"
                        loading="lazy"
                        onLoad={(e) =>
                          (e.target as HTMLImageElement).classList.remove(
                            "opacity-0"
                          )
                        }
                      />
                    </div>
                  ))}
                  {property.images.length > 3 && (
                    <div
                      className="relative cursor-pointer"
                      onClick={() => openModal(3)}
                    >
                      <Image
                        src={property.images[3]}
                        alt={`Property Image 5`}
                        width={400}
                        height={200}
                        className="w-full h-[200px] object-cover rounded-lg opacity-0 transition-opacity duration-700 ease-in-out"
                        loading="lazy"
                        onLoad={(e) =>
                          (e.target as HTMLImageElement).classList.remove(
                            "opacity-0"
                          )
                        }
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <Plus size={32} className="text-daffodilYellow" />
                        <span className="text-daffodilYellow text-xl ml-2">
                          +{property.images.length - 4}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isModalOpen && (
                <Lightbox
                  open={isModalOpen}
                  close={closeModal}
                  slides={property.images.map((image) => ({ src: image }))}
                  index={photoIndex}
                  on={{
                    view: ({ index }) => setPhotoIndex(index),
                  }}
                />
              )}
            </div>

            {/* Property Details */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl lg:text-4xl font-bold text-charcoalGray">
                {property.name}
              </h1>
              <p className="text-softGreen text-lg mt-2 lg:mt-4">
                £{property.price} / month
              </p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                  >
                    <FaFacebook size={18} />
                  </a>
                  <a
                    href={`https://x.com/intent/post?url=${window.location.href}&text=Check out this property: ${property.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                  >
                    <FaXTwitter size={18} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${property.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                  >
                    <FaLinkedin size={18} />
                  </a>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(property.id);
                  }}
                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                >
                  <FaHeart
                    size={18}
                    className={`${
                      favorites.includes(property.id)
                        ? "text-daffodilYellow fill-daffodilYellow"
                        : "text-gray-500"
                    } hover:text-daffodilYellow`}
                  />
                </button>
              </div>

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
                {/* Garden and Parking Information */}
                <div className="flex items-center gap-3">
                  <Trees size={20} className="mr-1" />
                  <span>
                    Garden:{" "}
                    {property.garden ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Car size={20} className="mr-1" />
                  <span>
                    Parking:{" "}
                    {property.parking ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </span>
                </div>
              </div>

              {!isBooked ? (
                <button
                  onClick={() => setIsBookingFormOpen(true)}
                  disabled={!session || bookingLoading}
                  className={`mt-6 w-full py-3 rounded-md font-semibold transition-all ${
                    session
                      ? bookingLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-daffodilYellow text-charcoalGray hover:bg-softGreen"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  {bookingLoading ? "Checking..." : "Book Now"}
                </button>
              ) : (
                <button
                  onClick={handleCancelBooking}
                  disabled={!session || bookingLoading}
                  className="mt-6 w-full py-3 rounded-md font-semibold bg-red-500 text-white hover:bg-red-700 transition-all"
                >
                  Cancel Booking
                </button>
              )}

              {!session && (
                <p className="mt-3 text-red-600 text-sm">
                  You must be logged in to book a property.{" "}
                  <button
                    onClick={handleLoginRedirect}
                    className="underline text-softGreen hover:text-daffodilYellow"
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

      <Dialog open={isBookingFormOpen} onOpenChange={setIsBookingFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book Now</DialogTitle>
          </DialogHeader>
          <BookingForm
            formStep={formStep}
            setFormStep={setFormStep}
            onSubmit={handleBookingFormSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PropertyDetails;
