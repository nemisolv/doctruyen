"use server";

import { CreateStoryParams, IFullInfoStory } from "@/types";
import { connectDb } from "../connectDB";
import User from "@/database/models/user.model";
import Story, { IStory } from "@/database/models/story.model";
import { revalidatePath } from "next/cache";
import Genre from "@/database/models/genre.model";

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
            title: data.title,
            description: data.description,
            imgUrl: data.imgUrl,
            author:data.author,
            status: data.status,
            isAdult: data.isAdult || false,
            clerkId
        })
        if(!newStory) {
            throw new Error('Error creating story');
        }
        const genresParams= data.genres;
        const genres = [];
        for(const genre of genresParams) {
            const existingGenre = await Genre.findOneAndUpdate({
                name: {$regex : new RegExp(`^${genre}$`,'i')}},
                {$setOnInsert: {name: genre}, $push: {stories: newStory._id}},
                {upsert: true, new: true}
            )
            genres.push(existingGenre._id);
        }

        await Story.findByIdAndUpdate(newStory._id, {
            $push: {genres: {$each: genres}}
        });

        if(path) {
            revalidatePath(path);
        }

        return newStory.toObject();

    }catch(error) {
        console.log('Error creating question:', error);
        throw error;
    }
}

export async function findAllStories():Promise<IFullInfoStory[] | undefined> {
    try {
        connectDb();
        const stories = await Story.find({deleted: false}).populate({
            path: 'genres',
            model:Genre,
            select: "_id name"
        })
        return stories;
    }catch(error) {
        console.log('Error finding stories:', error);
        throw error;
    }
}

export async function deleteStory(_id: string) {
    try {
        connectDb();
        const story = await Story.findByIdAndUpdate(_id, {deleted: true});
        if(!story) {
            throw new Error('Story not found');
        }
        
    }catch(error) {
        console.log('Error deleting story:', error);
        throw error;
    }
}