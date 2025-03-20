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

export default function AddTeamPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState<string | null>(null); // State for image preview

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  if (!session) {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  // Handle form submission
  const onSubmit = async (data: TeamMemberFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add team member");
      router.push("/admin/dashboard/teams");
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
          <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
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
                    className="bg-black text-white px-4 py-2 rounded"
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
              {loading ? "Adding..." : "Add Team Member"}
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
