import { NextResponse } from "next/server";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";

export const dynamic = "force-dynamic"; // ✅ This prevents static rendering issues

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "";
    const page = Number(searchParams.get("page")) || 1;
    const userId = searchParams.get("userId") || "";

    let data;
    if (filter === "recommended" && userId) {
      data = await getRecommendedQuestions({
        userId,
        searchQuery: query,
        page,
      });
    } else {
      data = await getQuestions({ searchQuery: query, filter, page });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
