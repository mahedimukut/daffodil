"use client"; // Mark this as a client-side component

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPageComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Suspense
      fallback={
        <Loader2 className="h-10 w-10 animate-spin text-daffodilYellow" />
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-charcoalGray mb-6">
            Welcome Back!
          </h2>

          <button
            onClick={() =>
              signIn("google", { callbackUrl: callbackUrl || "/" })
            }
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-charcoalGray font-medium">
                Email
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-softGreen"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-charcoalGray font-medium">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  {...register("password")}
                  className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-softGreen"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-daffodilYellow text-charcoalGray font-semibold py-3 rounded-md hover:bg-softGreen transition-all"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-charcoalGray">
            Don't have an account?{" "}
            <a
              href={`/auth/signup?callbackUrl=${encodeURIComponent(
                callbackUrl
              )}`}
              className="text-charcoalGray font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPageComponent;
