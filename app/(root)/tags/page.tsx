import Tags from "@/components/tags/Tags";
import { SearchParamsProps } from "@/types";

const Page = ({ searchParams }: SearchParamsProps) => {
  return <Tags searchParams={searchParams} />;
};

export default Page;
