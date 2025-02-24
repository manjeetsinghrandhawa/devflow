"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface SearchParamsProps {
  children: (params: { q: string; filter: string; page: string }) => ReactNode;
}

export default function SearchParamsProvider({ children }: SearchParamsProps) {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";

  return <>{children({ q, filter, page })}</>;
}
