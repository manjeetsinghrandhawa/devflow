import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import EditProfile from "@/components/forms/EditProfile";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfile userId={userId} />
    </Suspense>
  );
};

export default Page;
