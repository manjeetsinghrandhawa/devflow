import { getSavedQuestions } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery,
    filter,
    page,
  });

  return NextResponse.json(result);
}
