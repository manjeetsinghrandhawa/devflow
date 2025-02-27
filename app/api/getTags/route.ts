import { getAllTags } from "@/lib/actions/tag.actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;

  const result = await getAllTags({ searchQuery, filter, page });

  return NextResponse.json(result);
}
