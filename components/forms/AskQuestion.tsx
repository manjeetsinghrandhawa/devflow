"use client";

import Question from "@/components/forms/Question";
import { useEffect, useState } from "react";

interface AskQuestionProps {
  userId: string;
}

export default function AskQuestion({ userId }: AskQuestionProps) {
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/getUser?userId=${userId}`);
      const data = await res.json();
      setMongoUserId(data?._id);
      setLoading(false);
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUserId)} />
      </div>
    </div>
  );
}
