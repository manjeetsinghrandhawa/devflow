"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import SearchWrapper from "@/components/shared/search/SearchWrapper";
import { UserFilters } from "@/constants/filters";
import Link from "next/link";

interface CommunityProps {
  searchParams: {
    q?: string;
    filter?: string;
    page?: string;
  };
}

export default function Community({ searchParams }: CommunityProps) {
  const [result, setResult] = useState<{ users: any[]; isNext: boolean }>({
    users: [],
    isNext: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const queryParams = new URLSearchParams({
        q: searchParams.q || "",
        filter: searchParams.filter || "",
        page: searchParams.page || "1",
      });

      const res = await fetch(`/api/getallUsers?${queryParams}`);
      const data = await res.json();
      setResult(data);
      setLoading(false);
    }

    fetchUsers();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchWrapper
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
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
