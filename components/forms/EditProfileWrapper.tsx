"use client";

import EditProfile from "@/components/forms/EditProfile";

interface EditProfileWrapperProps {
  userId: string;
}

export default function EditProfileWrapper({
  userId,
}: EditProfileWrapperProps) {
  return <EditProfile userId={userId} />;
}
