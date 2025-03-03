"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const LoginPageComponent = dynamic(() => import("@/app/components/LoginPage"), {
  ssr: false, // Disables server-side rendering for this component
});

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    } else if (status === "unauthenticated") {
      setIsLoading(false); // Stop loading when session is checked
    }
  }, [status, router]);

  // Show spinner while checking session
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-daffodilYellow" />
      </div>
    );
  }

  return <LoginPageComponent />;
}
