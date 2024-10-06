import mongoose, { Document, models, Schema } from 'mongoose';
const DOCUMENT_NAME = 'Story';
const COLLECTION_NAME = 'stories';

export interface IStory extends Document {
    _id: mongoose.Types.ObjectId;
    clerkId: string;
    title: string;
    author: string;
    description: string;
    genres: mongoose.Types.ObjectId[];
    status: "Ongoing" | "Completed" | "Hiatus";
    imgUrl: string;
    chapters: mongoose.Types.ObjectId[];
    averageRating: number; 
    isAdult: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const StorySchema = new Schema({
    clerkId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        default: 'Unknown',
    },
    description: String,
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre',
    }],
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Hiatus'],
        default: 'Ongoing',
    },
    imgUrl: String,
    chapters: [{
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
    }],
    averageRating: {
        type: Number,
        default: 0,
        set: (value: number) => Math.round(value * 10) / 10,
    },
    isAdult: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    }


}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})
const Story = models[DOCUMENT_NAME] || mongoose.model<IStory>(DOCUMENT_NAME, StorySchema);
export default Story;

