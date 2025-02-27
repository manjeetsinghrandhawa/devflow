import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SavedQuestions from "@/components/saved/SavedQuestions";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SavedQuestions userId={userId} searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
