import EditProfile from "@/components/forms/EditProfile";

export default function EditProfilePage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams.userId || "";

  if (!userId) {
    return <div>Error: Missing user ID</div>;
  }

  return <EditProfile userId={userId} />;
}
