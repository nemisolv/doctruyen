"use server";

import { CreateCommentParams, GetCommentsChapterParams, ICommentInfo } from "@/types";
import { connectDb } from "../connectDB";
import Commentfrom "@/database/models/comment.model";
import Chapter from "@/database/models/chapter.model";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

export async function findCommentsByChapterId(
  params: GetCommentsChapterParams
): Promise<ICommentInfo[] | undefined> 
{
  const { chapterId } = params;
  if (!chapterId) {
    throw new Error("ChapterId is required");
  }
  try {
    connectDb();
    const comments = await Comment.find({ chapterId })
    .populate({
        path: 'userId' ,
        model: User,
        select: "name imgUrl _id"
    })
    ;
    console.log(comments);
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createComment(params: CreateCommentParams) {
  const { chapterId, storyId, clerkId, content, path } = params;
  console.log(params);
  if (!chapterId || !storyId || !clerkId || !content) {
    throw new Error("ChapterId, storyId, clerkId and content are required");
  }
  const chapter = await Chapter.findOne({ _id: chapterId, storyId }).lean();
  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new Error("User not found");
  }

  if (!chapter) {
    throw new Error("Chapter not found");
  }


  try {
    connectDb();
    await Comment.create({
      chapterId,
      userId: user._id,
      content,
    });
    if(path) {
        revalidatePath(path,);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
