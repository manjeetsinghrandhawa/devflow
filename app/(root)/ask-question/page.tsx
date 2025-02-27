import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AskQuestionWrapper from "@/components/forms/AskQuestionWrapper";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AskQuestionWrapper userId={userId} />
    </Suspense>
  );
}
