import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SavedQuestionsWrapper from "@/components/saved/SavedQuestionsWrapper";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return <SavedQuestionsWrapper userId={userId} searchParams={searchParams} />;
};

export default Page;
