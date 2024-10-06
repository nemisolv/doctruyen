"use server"

import { CreateChapterParams, GetAllChapterParams } from "@/types";
import { connectDb } from "../connectDB";
import Story, { IStory } from "@/database/models/story.model";
import Chapter, { IChapter } from "@/database/models/chapter.model";
import { revalidatePath } from "next/cache";

export async function findAllChapterByStoryId(params: GetAllChapterParams): Promise<IChapter[]| undefined> {
    try {
        connectDb();
        const { storyId } = params;
        const story = await Story.findById(storyId).lean() as IStory;
        if(!story) {
            throw new Error("Story not found");
        }
        const chapters = await Chapter.find({ storyId: story._id });
        return chapters;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export  async function createChapter(params: CreateChapterParams): Promise<IChapter | undefined> {
try {
    connectDb();
    const { storyId, data, path } = params;
    const story = await Story.findById(storyId);
    if(!story) {
        throw new Error("Story not found");
    }
    const chapter = await Chapter.create({
        storyId: story._id,
        title: data.title,
        content: data.content,
        chapterNumber: data.chapterNumber,
    });
    if(!chapter) {
        throw new Error("Error creating chapter");
    }
    story.chapters.push(chapter._id);
    await story.save();
    if(path) {
        revalidatePath(path);
    }
    return chapter.toObject();
}catch(error) {
    console.log(error);
    throw error;
}
}