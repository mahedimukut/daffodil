"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { CldUploadWidget } from "next-cloudinary";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Define the schema for the form
const propertySchema = z.object({
  name: z.string().min(3, "Property name is required"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.number().min(1, "At least 1 bedroom required"),
  toilets: z.number().min(1, "At least 1 toilet required"),
  balcony: z.boolean(),
  sqft: z.number().min(100, "Minimum size is 100 sqft"),
  images: z.array(z.string().url("Valid image URL required")), // No min/max limit
  details: z.string().min(10, "Property details required"),
  location: z.string().min(3, "Location is required"),
  available: z.string().min(4, "Availability date required"),
});

export default function AddPropertyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store uploaded image URLs
  const [availableDate, setAvailableDate] = useState<Date | null>(null); // State for the date picker

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(propertySchema) });

  if (!session) {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  // Handle image upload from Cloudinary
  const handleImageUpload = (result: any) => {
    if (result.event === "success") {
      const url = result.info.secure_url; // Get the uploaded image URL
      setImageUrls((prev) => [...prev, url]); // Add the URL to the state
      setValue("images", [...imageUrls, url]); // Update the form value
    }
  };

  // Remove an image URL from the list
  const removeImageUrl = (url: string) => {
    const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(updatedUrls);
    setValue("images", updatedUrls); // Update the form value
  };

  // Handle date change for the date picker
  const handleDateChange = (date: Date | null) => {
    setAvailableDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM"); // Format the date as YYYY-MM
      setValue("available", formattedDate); // Update the form value
    } else {
      setValue("available", ""); // Clear the form value if no date is selected
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add property");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <MaxWidthWrapper className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-3/5 p-6 bg-white shadow-lg rounded-lg my-4 sm:my-8">
          <h2 className="text-xl font-bold mb-4">Add Property</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Existing fields (name, price, bedrooms, etc.) */}
            <Input {...register("name")} placeholder="Property Name" />
            {errors.name?.message && (
              <p className="text-red-500">{String(errors.name.message)}</p>
            )}

            <Input {...register("price")} placeholder="Price" />
            {errors.price?.message && (
              <p className="text-red-500">{String(errors.price.message)}</p>
            )}

            <Input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
              placeholder="Bedrooms"
            />
            {errors.bedrooms?.message && (
              <p className="text-red-500">{String(errors.bedrooms.message)}</p>
            )}

            <Input
              type="number"
              {...register("toilets", { valueAsNumber: true })}
              placeholder="Toilets"
            />
            {errors.toilets?.message && (
              <p className="text-red-500">{String(errors.toilets.message)}</p>
            )}

            <div className="flex items-center space-x-2">
              <input type="checkbox" {...register("balcony")} id="balcony" />
              <label htmlFor="balcony">Balcony</label>
            </div>

            <Input
              type="number"
              {...register("sqft", { valueAsNumber: true })}
              placeholder="Sqft"
            />
            {errors.sqft?.message && (
              <p className="text-red-500">{String(errors.sqft.message)}</p>
            )}

            {/* Cloudinary Image Upload */}
            <div>
              <label className="block mb-2">Upload Images</label>
              <CldUploadWidget
                uploadPreset="daffodilhmosolutions" // Use your upload preset name
                onUpload={handleImageUpload}
                options={{
                  multiple: true, // Allow multiple files
                }}
              >
                {({ open }) => {
                  return (
                    <Button type="button" onClick={() => open()}>
                      Upload Images
                    </Button>
                  );
                }}
              </CldUploadWidget>
              {errors.images?.message && (
                <p className="text-red-500">{String(errors.images.message)}</p>
              )}
              <div className="mt-2 space-y-2">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImageUrl(url)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Textarea {...register("details")} placeholder="Property Details" />
            {errors.details?.message && (
              <p className="text-red-500">{String(errors.details.message)}</p>
            )}

            <Input {...register("location")} placeholder="Location" />
            {errors.location?.message && (
              <p className="text-red-500">{String(errors.location.message)}</p>
            )}

            {/* Date Picker for Available Date */}
            <div>
              <label className="block mb-2">Available Date</label>
              <DatePicker
                selected={availableDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                placeholderText="Select year and month"
                className="w-full p-2 border rounded"
              />
              {errors.available?.message && (
                <p className="text-red-500">
                  {String(errors.available.message)}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Property"}
            </Button>
          </form>
        </div>

        {/* Tips and FAQs Section */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg my-4 sm:my-8">
          <h3 className="text-lg font-semibold mb-4">
            Tips for a Great Listing
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>📸 Use high-quality images to attract more buyers.</li>
            <li>
              📝 Provide detailed descriptions to highlight unique features.
            </li>
            <li>💰 Set a competitive price based on market trends.</li>
            <li>📍 Be accurate with the location to avoid confusion.</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Q:</strong> How long does it take to list a property?
              </p>
              <p>
                <strong>A:</strong> It usually takes less than 5 minutes!
              </p>
              <p>
                <strong>Q:</strong> Can I edit my listing after submitting?
              </p>
              <p>
                <strong>A:</strong> Yes, you can edit your listing anytime.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
