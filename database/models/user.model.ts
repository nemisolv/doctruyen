import mongoose, { Document, models, Schema } from 'mongoose';
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

interface IUser extends Document {
    clerkId: string;
    name: string;
    email: string;
    imgUrl: string;
    // favouriteStories: mongoose.Types.ObjectId[];
    ratings: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>( {
    clerkId: String,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imgUrl: String,
    // favouriteStories: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Story',
    // }],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})
const User = models[DOCUMENT_NAME] || mongoose.model<IUser>(DOCUMENT_NAME, UserSchema);
export default User;