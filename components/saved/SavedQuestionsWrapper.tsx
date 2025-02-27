"use client";

import { Suspense } from "react";
import SavedQuestions from "./SavedQuestions";

interface SavedQuestionsWrapperProps {
  userId: string;
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
}

export default function SavedQuestionsWrapper({
  userId,
  searchParams,
}: SavedQuestionsWrapperProps) {
  return (
    <Suspense fallback={<div>Loading saved questions...</div>}>
      <SavedQuestions userId={userId} searchParams={searchParams} />
    </Suspense>
  );
}
