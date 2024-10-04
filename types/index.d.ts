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