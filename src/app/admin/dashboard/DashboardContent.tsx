// app/dashboard/DashboardContent.tsx
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { auth } from "../../../../auth"; // Import NextAuth authentication
import DashboardClient from "./DashboardClient"; // Import the Client Component

const DashboardContent = async () => {
  const session = await auth(); // Fetch session on the server
  const user = session?.user;

  return (
    <div className="flex min-h-screen">
      <DashboardClient user={user} />{" "}
      {/* Pass user data to the Client Component */}
    </div>
  );
};

export default DashboardContent;
