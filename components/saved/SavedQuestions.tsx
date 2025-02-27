"use client";

import { useEffect, useState } from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import SearchWrapper from "@/components/shared/search/SearchWrapper";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";

interface SavedQuestionsProps {
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
  userId: string;
}

export default function SavedQuestions({
  searchParams,
  userId,
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

      try {
        const res = await fetch(`/api/getSavedQuestions?${queryParams}`);
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching saved questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedQuestions();
  }, [searchParams, userId]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchWrapper
          route="/saved-questions"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search your saved questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard key={question._id} {...question} />
          ))
        ) : (
          <NoResult
            title="No Saved Questions"
            description="You haven't saved any questions yet. Browse through interesting discussions and save what matters!"
            link="/"
            linkTitle="Browse Questions"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
}
