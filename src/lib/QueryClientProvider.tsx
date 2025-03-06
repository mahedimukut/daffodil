"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function CustomQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a QueryClient instance (persisted across re-renders)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
