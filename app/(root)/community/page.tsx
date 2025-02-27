import { Suspense } from "react";
import Community from "@/components/community/Community";
import { SearchParamsProps } from "@/types";

const Page = ({ searchParams }: SearchParamsProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Community searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
