import mongoose, { Document, models, Schema } from 'mongoose';
const DOCUMENT_NAME = 'Story';
const COLLECTION_NAME = 'stories';

interface IStory extends Document {
    title: string;
    author: string;
    description: string;
    genres: string[];
    status: "Ongoing" | "Completed" | "Hiatus";
    imgUrl: string;
    chapters: mongoose.Types.ObjectId[];
    averageRating: number; 
}

const StorySchema = new Schema({
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
        type: String,
        required: true,
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


}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})
const Story = models[DOCUMENT_NAME] || mongoose.model<IStory>(DOCUMENT_NAME, StorySchema);
export default Story;

