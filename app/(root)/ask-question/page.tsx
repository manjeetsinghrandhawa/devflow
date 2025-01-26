import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask-question | Dev Overflow",
  description: "Ask quesiton page of Dev Overflow",
};

const AskQuestion = async () => {
  const userId = "123456789";
  // const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question
          mongoUserId={JSON.stringify(mongoUser?._id)}
          key={mongoUser}
        />
      </div>
    </div>
  );
};
export default AskQuestion;
