"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the schema for the form using Zod
const jobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.array(
    z.string().min(1, "Responsibility cannot be empty")
  ),
  requirements: z.array(z.string().min(1, "Requirement cannot be empty")),
  benefits: z.array(z.string().min(1, "Benefit cannot be empty")),
});

// Infer the type from the schema
type JobFormData = z.infer<typeof jobFormSchema>;

const AddJobPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      responsibilities: [""],
      requirements: [""],
      benefits: [""],
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/dashboard/jobs");
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Helper functions to handle dynamic array fields
  const addArrayField = (field: keyof JobFormData) => {
    const currentValues = Array.isArray(watch(field)) ? watch(field) : [];
    setValue(field, [...currentValues, ""]);
  };

  const removeArrayField = (field: keyof JobFormData, index: number) => {
    const currentValues = (watch(field) as string[]) ?? []; // Ensure it's always an array
    const newValues = [...currentValues];
    newValues.splice(index, 1); // Remove the item at index
    setValue(field, newValues);
  };

  return (
    <div className="w-full">
      <MaxWidthWrapper className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-3/5 p-6 bg-white shadow-lg rounded-lg my-4 sm:my-8">
          <h2 className="text-xl font-bold mb-4">Add New Job</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <div>
              <Input {...register("title")} placeholder="Job Title" />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <Input {...register("location")} placeholder="Location" />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <Textarea
                {...register("description")}
                placeholder="Job Description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Dynamic Fields - Responsibilities, Requirements, Benefits */}
            {(
              [
                "responsibilities",
                "requirements",
                "benefits",
              ] as (keyof JobFormData)[]
            ).map((field) => (
              <div key={field}>
                <label className="block mb-2 capitalize">{field}</label>
                {Array.isArray(watch(field)) &&
                  (watch(field) as string[]).map((_, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Controller
                        name={`${field}.${index}` as any}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder={field.name} />
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => removeArrayField(field, index)}
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                <Button
                  type="button"
                  onClick={() => addArrayField(field)}
                  variant="outline"
                >
                  Add {field.charAt(0).toUpperCase() + field.slice(1)}
                </Button>
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field]?.message as string}
                  </p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <Button type="submit">Create Job</Button>
          </form>
        </div>

        {/* Tips and FAQs Section */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg my-4 sm:my-8">
          <h3 className="text-lg font-semibold mb-4">
            Tips for a Great Job Listing
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>📝 Write a clear and concise job title.</li>
            <li>📍 Specify the job location (or remote options).</li>
            <li>📋 List key responsibilities and requirements.</li>
            <li>💼 Highlight benefits and perks.</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Q:</strong> Can I edit a job posting later?
              </p>
              <p>
                <strong>A:</strong> Yes, you can edit job postings anytime.
              </p>
              <p>
                <strong>Q:</strong> How many jobs can I post?
              </p>
              <p>
                <strong>A:</strong> There is no limit to the number of jobs you
                can post.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AddJobPage;
