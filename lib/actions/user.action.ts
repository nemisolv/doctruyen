"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectDb } from "../connectDB";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

export async function createUser(params: CreateUserParams) {
    try {
        await connectDb();
        const newUser = await User.create(params);
        return newUser.toObject();

    }catch(error) {
        console.log(error)
        throw error;
    }
}

export async function findByClerkId(clerkId: string) {
    try {
        await connectDb();
        const user = await User.findOne({ clerkId }).lean();
        return user;
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        await connectDb();
        const { clerkId, updateData, path } = params;
         await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
        if(path) {
            revalidatePath(path);
        }
    }
    catch (error) {
        console.log(error)
        throw error;
    }

}

export async function deleteUser(clerkId: string) {
    try {
        connectDb();
        const user = await User.findOneAndDelete({ clerkId });
        if(!user) {
            throw new Error("User not found");
        }
        // TODO: Delete all ratings and comments associated with this user
    }catch(error) {
        console.log(error)
        throw error;
    }
}