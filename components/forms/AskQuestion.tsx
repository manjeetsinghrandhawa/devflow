"use client";

import { useEffect, useState } from "react";
import Question from "@/components/forms/Question";

interface AskQuestionPageProps {
  userId: string;
}

export default function AskQuestionPage({ userId }: AskQuestionPageProps) {
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/getUser?userId=${userId}`);
        const data = await res.json();
        setMongoUserId(data?._id);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      {mongoUserId ? (
        <div className="mt-9">
          <Question mongoUserId={mongoUserId} />
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-dark200_light800">
            You need to be signed in to ask a question.
          </p>
        </div>
      )}
    </div>
  );
}
