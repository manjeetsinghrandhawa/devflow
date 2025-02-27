"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/forms/Profile";

interface EditProfileProps {
  userId: string;
}

export default function EditProfile({ userId }: EditProfileProps) {
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`/api/getUser?userId=${userId}`);
        const data = await res.json();
        setMongoUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      {mongoUser ? (
        <div className="mt-9">
          <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-dark200_light800">User not found.</p>
        </div>
      )}
    </div>
  );
}
