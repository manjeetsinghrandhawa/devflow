import { getUserById } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const mongoUser = await getUserById({ userId });
  return NextResponse.json(mongoUser);
}
