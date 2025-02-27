import EditProfile from "@/components/forms/EditProfile";

export default function EditProfilePage({
  searchParams,
}: {
  searchParams: any;
}) {
  return <EditProfile searchParams={searchParams} />;
}
