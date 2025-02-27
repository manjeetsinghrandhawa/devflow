import { Suspense } from "react";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
