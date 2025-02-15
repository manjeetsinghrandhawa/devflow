import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";
// import { getTopQuestions } from '@/lib/actions/question.action';
// import { getTopPopularTags } from '@/lib/actions/tag.action';

const hotqustions = [
  { _id: "1", title: "Hello how are you" },
  { _id: "2", title: "Hello how are you" },
  { _id: "3", title: "Hello how are you" },
  { _id: "4", title: "Hello how are you" },
  { _id: "5", title: "Hello how are you" },
];

const popularTags = [
  { _id: "1", name: "javascript", totalQuestions: 5 },
  { _id: "2", name: "javascript", totalQuestions: 5 },
  { _id: "3", name: "javascript", totalQuestions: 5 },
  { _id: "4", name: "javascript", totalQuestions: 5 },
  { _id: "5", name: "javascript", totalQuestions: 5 },
];

const RightSidebar = async () => {
  //   const topQuestions = await getTopQuestions();
  //   const popularTags = await getTopPopularTags();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex flex-col gap-[30px]">
          {hotqustions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
        <div className="mt-16">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className="mt-7 flex flex-col gap-[30px]">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
