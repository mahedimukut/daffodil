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
import { User, Mail, Phone, MessageCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  message: z.string().min(1, "Message is required"),
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched", // Validate on blur
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/client-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Successful! We will get back to you soon.");
        reset(); // Reset the form fields and errors
        onClose(); // Close the modal
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Reset form fields and errors when the modal is closed
  const handleClose = () => {
    reset({
      name: "",
      email: "",
      mobile: "",
      message: "",
    }); // Reset form values and clear errors
    onClose(); // Close the modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-daffodilYellow" />
            Connect with Experts!
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {["name", "email", "mobile", "message"].map((field, index) => (
            <div key={index} className="relative">
              {field === "name" && (
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              {field === "email" && (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              {field === "mobile" && (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              {field === "message" && (
                <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
              )}
              {field !== "message" ? (
                <Input
                  type={
                    field === "email"
                      ? "email"
                      : field === "mobile"
                        ? "tel"
                        : "text"
                  }
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "email"
                        ? "Email Address"
                        : "Mobile Number"
                  }
                  className="pl-10"
                  {...register(field as keyof FormData)}
                />
              ) : (
                <Textarea
                  placeholder="Your Message"
                  className="pl-10"
                  {...register(field as keyof FormData)}
                />
              )}
              {/* Show errors only if the field has been touched */}
              {touchedFields[field as keyof FormData] &&
                errors[field as keyof FormData] && (
                  <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                    {errors[field as keyof FormData]?.message}
                  </p>
                )}
            </div>
          ))}
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-daffodilYellow text-charcoalGray hover:bg-daffodilYellow/90"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
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

export default ContactModal;
