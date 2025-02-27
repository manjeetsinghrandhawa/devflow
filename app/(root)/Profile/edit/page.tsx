import { Suspense } from "react";
import EditProfileWrapper from "@/components/forms/EditProfileWrapper";

export default function EditProfilePage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams.userId || "";

  if (!userId) {
    return <div>Error: Missing user ID</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfileWrapper userId={userId} />
    </Suspense>
  );
}
