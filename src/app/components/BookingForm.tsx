"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn Input
import { Button } from "@/components/ui/button"; // shadcn Button
import { Textarea } from "@/components/ui/textarea"; // shadcn Textarea
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"; // Import Loader2 for spinner
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"; // shadcn Calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // shadcn Popover

// Define the schema for form validation using Zod
const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  moveInDate: z.date({ required_error: "Move-in date is required" }),
  additionalNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

type BookingFormProps = {
  formStep: number;
  setFormStep: (step: number) => void;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void; // Add onCancel prop
};

const BookingForm = ({
  formStep,
  setFormStep,
  onSubmit,
  onCancel,
}: BookingFormProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const moveInDate = watch("moveInDate");

  const handleNextStep = async () => {
    const isStepValid = await trigger(["fullName", "email", "phoneNumber"]);
    if (isStepValid) {
      setFormStep(2);
    }
  };

  const handleFormSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsLoading(true); // Start loading
    try {
      await onSubmit(data); // Call the onSubmit function
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleCancel = () => {
    reset(); // Reset form fields
    setFormStep(1); // Reset to the first step
    onCancel(); // Call the onCancel callback
  };

  useEffect(() => {
    if (formStep === 1) {
      reset({ moveInDate: undefined, additionalNotes: "" }); // Reset step 2 fields
    }
  }, [formStep, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {formStep === 1 ? (
        <>
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className={`w-full p-4 rounded-lg border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-daffodilYellow`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className={`w-full p-4 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-daffodilYellow`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className={`w-full p-4 rounded-lg border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-daffodilYellow`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white hover:bg-gray-600 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-daffodilYellow text-charcoalGray hover:bg-softGreen transition-all"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full p-4 justify-start text-left font-normal rounded-lg border",
                      !moveInDate && "text-gray-400",
                      errors.moveInDate ? "border-red-500" : "border-gray-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {moveInDate ? (
                      format(moveInDate, "PPP")
                    ) : (
                      <span>Pick a move-in date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={moveInDate}
                    onSelect={(date) => {
                      if (date) setValue("moveInDate", date); // Ensure date is defined
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.moveInDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.moveInDate.message}
                </p>
              )}
            </div>
            <div>
              <Textarea
                placeholder="Additional Notes (Optional)"
                {...register("additionalNotes")}
                className={`w-full p-4 rounded-lg border ${
                  errors.additionalNotes ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-daffodilYellow`}
              />
              {errors.additionalNotes && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.additionalNotes.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white hover:bg-gray-600 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className="w-full bg-daffodilYellow text-charcoalGray hover:bg-softGreen transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" /> // Show spinner when loading
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default BookingForm;
