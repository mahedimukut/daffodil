"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { CldUploadWidget } from "next-cloudinary";

// Define the schema for the form
const teamMemberSchema = z.object({
  name: z.string().min(3, "Name is required"),
  position: z.string().min(3, "Position is required"),
  image: z.string().url("Valid image URL is required"),
  description: z.string().min(10, "Description is required"),
  socials: z.object({
    twitter: z.string().url("Valid URL required").optional(),
    linkedin: z.string().url("Valid URL required").optional(),
    github: z.string().url("Valid URL required").optional(),
  }),
});

// Infer the type from the schema
type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

export default function EditTeamPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams(); // Get the `id` from the URL params
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [fetching, setFetching] = useState(true); // Loading state for fetching data
  const [resource, setResource] = useState<string | null>(null); // State for image preview

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      position: "",
      image: "",
      description: "",
      socials: {
        twitter: "",
        linkedin: "",
        github: "",
      },
    },
  });

  // Fetch the team member data based on the `id`
  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await fetch(`/api/teams/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch team member");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging: Log the fetched data
        // Set the form values with the fetched data
        reset({
          name: data.name,
          position: data.position,
          image: data.image,
          description: data.description,
          socials: data.socials || {
            twitter: "",
            linkedin: "",
            github: "",
          },
        });
        setResource(data.image); // Set the image preview
      } catch (error) {
        console.error("Error fetching team member:", error);
      } finally {
        setFetching(false); // Set fetching to false after data is loaded
      }
    };

    if (params.id) {
      fetchTeamMember();
    }
  }, [params.id, reset]);

  if (!session) {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  // Handle form submission
  const onSubmit = async (data: TeamMemberFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/teams/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: params.id, // Include the `id` in the request body
          ...data,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Log the error response
        console.error("Error response:", errorData);
        throw new Error("Failed to update team member");
      }
      router.push("/admin/dashboard/teams"); // Redirect to the teams page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching data
  if (fetching) {
    return (
      <div className="w-full">
        <MaxWidthWrapper className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading team member data...</p>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MaxWidthWrapper className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-3/5 p-6 bg-white shadow-lg rounded-lg my-4 sm:my-8">
          <h2 className="text-xl font-bold mb-4">Edit Team Member</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <Input {...register("name")} placeholder="Name" />
            {errors.name?.message && (
              <p className="text-red-500">{String(errors.name.message)}</p>
            )}

            {/* Position Field */}
            <Input {...register("position")} placeholder="Position" />
            {errors.position?.message && (
              <p className="text-red-500">{String(errors.position.message)}</p>
            )}

            {/* Image Upload Field */}
            <div>
              <label className="block mb-2">Upload an image</label>
              <CldUploadWidget
                uploadPreset="daffodilhmosolutions"
                onSuccess={(result: any) => {
                  const imageUrl = result.info.secure_url;
                  setValue("image", imageUrl); // Update form state with the image URL
                  setResource(imageUrl); // Store image preview URL
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Upload Image
                  </button>
                )}
              </CldUploadWidget>

              {/* Show uploaded image preview */}
              {resource && (
                <div className="mt-4">
                  <img
                    src={resource}
                    alt="Uploaded preview"
                    className="w-32 h-32 object-cover rounded-lg shadow"
                  />
                </div>
              )}

              {errors.image?.message && (
                <p className="text-red-500">{String(errors.image.message)}</p>
              )}
            </div>

            {/* Description Field */}
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description?.message && (
              <p className="text-red-500">
                {String(errors.description.message)}
              </p>
            )}

            {/* Social Media Links */}
            <div>
              <label className="block mb-2">Social Media Links</label>
              <Input
                {...register("socials.twitter")}
                placeholder="Twitter URL"
                className="mb-2"
              />
              <Input
                {...register("socials.linkedin")}
                placeholder="LinkedIn URL"
                className="mb-2"
              />
              <Input
                {...register("socials.github")}
                placeholder="GitHub URL"
                className="mb-2"
              />
              {errors.socials?.twitter?.message && (
                <p className="text-red-500">
                  {String(errors.socials.twitter.message)}
                </p>
              )}
              {errors.socials?.linkedin?.message && (
                <p className="text-red-500">
                  {String(errors.socials.linkedin.message)}
                </p>
              )}
              {errors.socials?.github?.message && (
                <p className="text-red-500">
                  {String(errors.socials.github.message)}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Team Member"}
            </Button>
          </form>
        </div>

        {/* Tips and FAQs Section */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg my-4 sm:my-8">
          <h3 className="text-lg font-semibold mb-4">
            Tips for a Great Team Member Listing
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>📸 Use a high-quality profile picture.</li>
            <li>📝 Write a clear and concise description of their role.</li>
            <li>🔗 Include relevant social media links.</li>
            <li>👔 Highlight their achievements and expertise.</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Q:</strong> Can I edit a team member's details later?
              </p>
              <p>
                <strong>A:</strong> Yes, you can edit their details anytime.
              </p>
              <p>
                <strong>Q:</strong> How many team members can I add?
              </p>
              <p>
                <strong>A:</strong> There is no limit to the number of team
                members.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
