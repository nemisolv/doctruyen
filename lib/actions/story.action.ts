"use server";

import { CreateStoryParams } from "@/types";
import { connectDb } from "../connectDB";
import User from "@/database/models/user.model";
import Story, { IStory } from "@/database/models/story.model";
import { revalidatePath } from "next/cache";

export async function createStory(params: CreateStoryParams): Promise<IStory | undefined> {
    try {
        connectDb();
        const {clerkId, data,path} = params;
        if(!clerkId) {
            throw new Error('Clerk ID is required');
        }
        
        const user = await User.findOne({clerkId});
        if(!user) {
            throw new Error('User not found');
        }
        const newStory = await Story.create({
            ...data,
            clerkId
        })
        if(!newStory) {
            throw new Error('Error creating story');
        }
        if(path) {
            revalidatePath(path);
        }

        return newStory.toObject();

    }catch(error) {
        console.log('Error creating question:', error);
        throw error;
    }
}

export async function findAllStories():Promise<IStory[] | undefined> {
    try {
        connectDb();
        const stories = await Story.find({deleted: false});
        return stories;
    }catch(error) {
        console.log('Error finding stories:', error);
        throw error;
    }
}