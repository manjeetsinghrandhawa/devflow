"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import SearchWrapper from "@/components/shared/search/SearchWrapper";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [result, setResult] = useState<{ questions: any[]; isNext: boolean }>({
    questions: [],
    isNext: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // ✅ Prevent memory leaks

    async function fetchQuestions() {
      try {
        setLoading(true);
        let data;

        if (filter === "recommended") {
          data = await getRecommendedQuestions({
            userId: "user123",
            searchQuery: query,
            page,
          });
        } else {
          data = await getQuestions({ searchQuery: query, filter, page });
        }

        if (isMounted) {
          setResult(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        if (isMounted) setLoading(false);
      }
    }

    fetchQuestions();

    return () => {
      isMounted = false; // ✅ Cleanup function
    };
  }, [filter, query, page]); // ✅ Ensure dependencies change only when needed

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
