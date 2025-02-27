import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AskQuestion from "@/components/forms/AskQuestion";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AskQuestion userId={userId} />
    </Suspense>
  );
};

export default Page;
