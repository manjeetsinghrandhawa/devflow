"use client";

import { useEffect, useState } from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import SearchWrapper from "@/components/shared/search/SearchWrapper";
import { QuestionFilters } from "@/constants/filters";

interface SavedQuestionsProps {
  userId: string;
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
}

export default function SavedQuestions({
  userId,
  searchParams,
}: SavedQuestionsProps) {
  const [result, setResult] = useState<{ questions: any[]; isNext: boolean }>({
    questions: [],
    isNext: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedQuestions() {
      const queryParams = new URLSearchParams({
        userId,
        q: searchParams.q || "",
        filter: searchParams.filter || "",
        page: searchParams.page || "1",
      });

      const res = await fetch(`/api/getSavedQuestions?${queryParams}`);
      const data = await res.json();
      setResult(data);
      setLoading(false);
    }

    fetchSavedQuestions();
  }, [userId, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchWrapper
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
}
