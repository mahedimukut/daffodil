"use client"; // Mark this as a client-side component

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the Zod schema for email validation
const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type EmailFormInputs = z.infer<typeof emailSchema>;

const LoginPageComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>({
    resolver: zodResolver(emailSchema),
  });

  const handleMagicLinkLogin = async (data: EmailFormInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("resend", {
        email: data.email,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Failed to send magic link. Please try again.");
        toast.error("Failed to send magic link. Please try again."); // Show error toast
      } else {
        toast.success("Magic link sent successfully. Please check your email."); // Show success toast
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again."); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-charcoalGray mb-6">
          Welcome Back!
        </h2>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-charcoalGray font-semibold py-3 rounded-md mb-6 shadow-md hover:bg-gray-100 transition-all"
        >
          <FcGoogle className="h-5 w-5 text-red-500" />
          Continue with Google
        </button>

        <div className="flex items-center justify-between mb-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <form
          onSubmit={handleSubmit(handleMagicLinkLogin)}
          className="space-y-5"
        >
          <div>
            <label className="block text-charcoalGray font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-softGreen"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-daffodilYellow text-charcoalGray font-semibold py-3 rounded-md hover:bg-softGreen transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Send Magic Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPageComponent;
