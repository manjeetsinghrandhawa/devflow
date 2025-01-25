"use server";

import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import Question from "@/database/question.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import path from "path";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectToDatabase();
    // const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // calculate the no of posts to skip based on page number and page size
    // pagination: skip = (page - 1) * pageSize

    // const skipAmount = (page - 1) * pageSize;

    // const query: FilterQuery<typeof Question> = {};

    // if (searchQuery) {
    //   query.$or = [
    //     { title: { $regex: new RegExp(searchQuery, 'i') } },
    //     { content: { $regex: new RegExp(searchQuery, 'i') } }
    //   ];
    // }

    // let sortOptions = {};

    // switch (filter) {
    //   case 'newest':
    //     sortOptions = { createdAt: -1 };
    //     break;

    //   case 'frequent':
    //     sortOptions = { views: -1 };
    //     break;

    //   case 'unanswered':
    //     query.answers = { $size: 0 };
    //     break;

    //   default:
    //     break;
    // }

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    // .skip(skipAmount)
    // .limit(pageSize)
    // .sort(sortOptions);

    // const totalQuestions = await Question.countDocuments(query);

    // const isNext = totalQuestions > skipAmount + questions.length;

    return {
      questions,
      //  isNext
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  // eslint-disable-next-line no-empty
  try {
    // connect to DATABASE
    console.log("Connecting to db");
    connectToDatabase();
    console.log("taking params");
    const { title, content, tags, author, path } = params;

    // create a new question
    console.log("start to create a question");
    const question = await Question.create({
      title,
      content,
      author,
    });
    console.log("Question created");

    // tag documents array
    const tagDocuments = [];

    // create tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // todo: create a interaction record for the user's ask question action
    revalidatePath(path);
  } catch (error) {
    console.log("error while creating a question");
    throw error;
  }
};
