import { getAllUsers } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;

  const result = await getAllUsers({ searchQuery, filter, page });

  return NextResponse.json(result);
}
