"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ✅ Define Schema with Move-in Date as Required
const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  moveInDate: z.date().refine((date) => date !== null, {
    message: "Move-in date is required", // ✅ Custom error message
  }),
  additionalNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

type BookingFormProps = {
  formStep: number;
  setFormStep: (step: number) => void;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
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
    control,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const moveInDate = watch("moveInDate");

  // ✅ Prevent auto-submit by requiring explicit validation before step change
  const handleNextStep = async () => {
    const isStepValid = await trigger(["fullName", "email", "phoneNumber"]);
    if (isStepValid) {
      setFormStep(2);
    }
  };

  const handleFormSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Validate all fields (including moveInDate) on form submission
      const isFormValid = await trigger();
      if (isFormValid) {
        await onSubmit(data);
        reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
      reset();
      setFormStep(1);
    }
  };

  const handleCancel = () => {
    reset();
    setFormStep(1);
    onCancel();
  };

  useEffect(() => {
    if (formStep === 1) {
      reset({ moveInDate: undefined, additionalNotes: "" });
    }
  }, [formStep, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {formStep === 1 ? (
        <>
          <div className="space-y-4">
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address" },
              { name: "phoneNumber", placeholder: "Phone Number" },
            ].map(({ name, placeholder }) => (
              <div key={name} className="relative">
                <Input
                  type={name === "email" ? "email" : "text"}
                  placeholder={placeholder}
                  {...register(name as keyof BookingFormData)}
                  className={`w-full p-4 rounded-lg border ${
                    errors[name as keyof BookingFormData]
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-daffodilYellow h-12`}
                />
                {errors[name as keyof BookingFormData] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[name as keyof BookingFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white hover:bg-gray-600 h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNextStep}
              className="w-full bg-daffodilYellow text-charcoalGray hover:bg-softGreen h-12"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div className="relative">
              <Controller
                name="moveInDate"
                control={control}
                render={({ field }) => (
                  <Popover
                    open={isDatePickerOpen}
                    onOpenChange={setIsDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className={cn(
                          "w-full p-4 text-left font-normal rounded-lg border h-12",
                          !field.value && "text-gray-400",
                          errors.moveInDate && isSubmitted
                            ? "border-red-500"
                            : "border-gray-300"
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a move-in date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsDatePickerOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {/* ✅ Only show error after form submission */}
              {isSubmitted && errors.moveInDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.moveInDate.message}
                </p>
              )}
            </div>
            <Textarea
              placeholder="Additional Notes (Optional)"
              {...register("additionalNotes")}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-daffodilYellow h-24"
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white hover:bg-gray-600 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-daffodilYellow text-charcoalGray hover:bg-softGreen h-12 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
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
