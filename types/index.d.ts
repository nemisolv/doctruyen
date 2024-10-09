import { IStory } from "@/database/models/story.model";

export interface CreateUserParams {
    clerkId: string;
    name: string;
    email: string;
    imgUrl: string;
}

export interface UpdateUserParams {
    clerkId: string;
    updateData: Partial<IUser>;
    path?: string;
}

export interface CreateStoryParams {
    clerkId: string;
    data: {
        title: string;
        author: string;
        description?: string;
        genres: string[];
        status: "Ongoing" | "Completed" | "Hiatus",
        imgUrl: string;
        isAdult?: boolean;
    },
    path?:string

}

export interface IFullInfoStory extends IStory {
    genres: IGenre[];
    chapters: IChapter[];
}

export interface GetAllChapterParams {
    storyId: string;
}

export interface CreateChapterParams {
    storyId: string;
    data: {
        
        title: string;
        content?: string;
        chapterNumber: number;
        imgsUrl?: string[];
    },
    path?: string;
}