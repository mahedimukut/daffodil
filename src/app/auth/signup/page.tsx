"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react"; // Import spinner icon

const SignupPageComponent = dynamic(
  () => import("@/app/components/SignupForm"),
  {
    ssr: false, // Disable SSR for smooth hydration
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-daffodilYellow" />
      </div>
    ), // Show a loading spinner while the component is being loaded
  }
);

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-daffodilYellow" />
      </div>
    ); // Show loading spinner
  }

  return <SignupPageComponent />;
}
