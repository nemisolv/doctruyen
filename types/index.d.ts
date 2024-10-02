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