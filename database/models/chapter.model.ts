import mongoose, { models, Schema } from "mongoose";

const DOCUMENT_NAME = 'Chapter';
const COLLECTION_NAME = 'chapters';

export interface IChapter extends Document {
    _id: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    chapterNumber: number;
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ChapterSchema = new Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    chapterNumber: {
        type: Number,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

const Chapter = models[DOCUMENT_NAME] || mongoose.model<IChapter>(DOCUMENT_NAME, ChapterSchema);
export default Chapter;