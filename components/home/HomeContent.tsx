"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import SearchWrapper from "@/components/shared/search/SearchWrapper";
import { useAuth } from "@clerk/nextjs";

interface HomeContentProps {
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
}

export default function HomeContent({ searchParams }: HomeContentProps) {
  const { userId } = useAuth(); // Get logged-in user ID
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ questions: any[]; isNext: boolean }>({
    questions: [],
    isNext: false,
  });

  const filter = searchParams.filter || "";
  const query = searchParams.q || "";
  const page = Number(searchParams.page) || 1;

  useEffect(() => {
    async function fetchQuestions() {
      if (!userId) return; // Prevent fetching if no userId

      setLoading(true);
      try {
        const res = await fetch(
          `/api/questions?q=${query}&filter=${filter}&page=${page}&userId=${userId}`
        );
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [query, filter, page, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchWrapper
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard key={question._id} {...question} />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={page} isNext={result.isNext} />
      </div>
    </div>
  );
}
