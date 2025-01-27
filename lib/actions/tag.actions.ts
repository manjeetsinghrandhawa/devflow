"use server";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";

import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");

    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
