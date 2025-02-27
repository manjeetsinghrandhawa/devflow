"use client";

import Profile from "@/components/forms/Profile";
import { useEffect, useState } from "react";

interface EditProfileProps {
  userId: string;
}

export default function EditProfile({ userId }: EditProfileProps) {
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/getUser?userId=${userId}`);
      const data = await res.json();
      setMongoUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
}
