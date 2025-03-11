"use client";

import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const ContactForm = () => {
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
      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset(); // Reset the form fields
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 py-24 px-6 md:px-12 lg:px-24">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section: Contact Info */}
          <div>
            <h2 className="text-5xl font-extrabold text-charcoalGray mb-8 leading-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Got questions or need assistance? Feel free to reach out through
              our contact form or using the details below. We're here to help
              you!
            </p>

            <div className="space-y-8 text-gray-700">
              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <MapPin className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Our Office
                  </span>
                  Birmingham, UK
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <Phone className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Call Us
                  </span>
                  <a
                    href="tel:+4407568353414"
                    className="text-daffodilYellow font-medium"
                  >
                    +44 7568 353414
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <Mail className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Email Us
                  </span>
                  <a
                    href="mailto:info@daffodilhmo.com"
                    className="text-daffodilYellow font-medium"
                  >
                    info@daffodilhmosolutions.co.uk daffodil4hmo@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-charcoalGray mb-8 text-center">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full p-4 border ${
                    touchedFields.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none`}
                  {...register("name")}
                />
                {touchedFields.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full p-4 border ${
                    touchedFields.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none`}
                  {...register("email")}
                />
                {touchedFields.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className={`w-full p-4 border ${
                    touchedFields.mobile && errors.mobile
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none`}
                  {...register("mobile")}
                />
                {touchedFields.mobile && errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your message here..."
                  className={`w-full p-4 border ${
                    touchedFields.message && errors.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none`}
                  {...register("message")}
                ></textarea>
                {touchedFields.message && errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-daffodilYellow text-charcoalGray py-4 rounded-lg text-lg font-bold shadow-md hover:bg-daffodilYellow/80 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
