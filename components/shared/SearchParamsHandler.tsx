"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsHandler() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";

  return (
    <div className="hidden">
      <p>Query: {query}</p>
      <p>Filter: {filter}</p>
      <p>Page: {page}</p>
    </div>
  );
}
