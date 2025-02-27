"use client";

import AskQuestionPage from "@/components/forms/AskQuestion";

interface AskQuestionWrapperProps {
  userId: string;
}

export default function AskQuestionWrapper({
  userId,
}: AskQuestionWrapperProps) {
  return <AskQuestionPage userId={userId} />;
}
