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

const propertySchema = z.object({
  name: z.string().min(3, "Property name is required"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.number().min(1, "At least 1 bedroom required"),
  toilets: z.number().min(1, "At least 1 toilet required"),
  balcony: z.boolean(),
  sqft: z.number().min(100, "Minimum size is 100 sqft"),
  images: z
    .array(z.string().url("Valid image URL required"))
    .min(1, "At least 1 image is required"),
  details: z.string().min(10, "Property details required"),
  location: z.string().min(3, "Location is required"),
  available: z.string().min(4, "Availability date required"),
});

export default function AddPropertyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store multiple image URLs
  const [newImageUrl, setNewImageUrl] = useState(""); // State for the current image URL input

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(propertySchema) });

  if (!session) {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  // Function to add a new image URL to the list
  const addImageUrl = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls([...imageUrls, newImageUrl]);
      setValue("images", [...imageUrls, newImageUrl]); // Update form value
      setNewImageUrl(""); // Clear the input
    }
  };

  // Function to remove an image URL from the list
  const removeImageUrl = (url: string) => {
    const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(updatedUrls);
    setValue("images", updatedUrls); // Update form value
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add property");
      router.push("/available-rooms");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-4 sm:my-8">
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

          {/* Image URLs input */}
          <div>
            <label className="block mb-2">Image URLs</label>
            <div className="flex space-x-2">
              <Input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button type="button" onClick={addImageUrl}>
                Add
              </Button>
            </div>
            {errors.images?.message && (
              <p className="text-red-500">{String(errors.images.message)}</p>
            )}
            <div className="mt-2 space-y-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="truncate">{url}</span>
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

          <Input {...register("available")} placeholder="Available Date" />
          {errors.available?.message && (
            <p className="text-red-500">{String(errors.available.message)}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Property"}
          </Button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
