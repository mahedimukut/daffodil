"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Mail, Phone, FileText } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  resume: z.instanceof(File, { message: "Resume is required" }), // Validate file upload
  coverLetter: z.string().min(1, "Cover letter is required"),
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string; // Pass the job title to the modal
}

const JobApplicationModal = ({
  isOpen,
  onClose,
  jobTitle,
}: JobApplicationModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched", // Validate on blur
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Create a FormData object for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("resume", data.resume); // Append the resume file
      formData.append("coverLetter", data.coverLetter);
      formData.append("jobTitle", jobTitle); // Include the job title

      // Send the form data to the API route
      const response = await fetch("/api/job-application", {
        method: "POST",
        body: formData, // Send FormData for file upload
      });

      // Handle the response
      if (response.ok) {
        toast.success("Application submitted successfully!");
        reset(); // Reset the form fields and errors
        onClose(); // Close the modal
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  // Reset form fields and errors when the modal is closed
  const handleClose = () => {
    reset({
      name: "",
      email: "",
      mobile: "",
      resume: undefined,
      coverLetter: "",
    }); // Reset form values and clear errors
    onClose(); // Close the modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
            <FileText className="w-8 h-8 text-daffodilYellow" />
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-10"
              {...register("name")}
            />
            {touchedFields.name && errors.name && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email Address"
              className="pl-10"
              {...register("email")}
            />
            {touchedFields.email && errors.email && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              placeholder="Mobile Number"
              className="pl-10"
              {...register("mobile")}
            />
            {touchedFields.mobile && errors.mobile && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Resume Upload Field */}
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="pl-10"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("resume", file); // Set the file value
                }
              }}
            />
            {touchedFields.resume && errors.resume && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.resume.message}
              </p>
            )}
          </div>

          {/* Cover Letter Field */}
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Textarea
              placeholder="Cover Letter"
              className="pl-10"
              {...register("coverLetter")}
            />
            {touchedFields.coverLetter && errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.coverLetter.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-daffodilYellow text-charcoalGray hover:bg-daffodilYellow/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default JobApplicationModal;
