"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import NoResult from "@/components/shared/NoResult";
import SearchWrapper from "@/components/shared/search/SearchWrapper";
import { TagFilters } from "@/constants/filters";

interface TagsProps {
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
}

export default function Tags({ searchParams }: TagsProps) {
  const [result, setResult] = useState<{ tags: any[]; isNext: boolean }>({
    tags: [],
    isNext: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      const queryParams = new URLSearchParams({
        q: searchParams.q || "",
        filter: searchParams.filter || "",
        page: searchParams.page || "1",
      });

      const res = await fetch(`/api/getTags?${queryParams}`);
      const data = await res.json();
      setResult(data);
      setLoading(false);
    }

    fetchTags();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchWrapper
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag: any) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <div className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </div>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
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
