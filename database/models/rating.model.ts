import mongoose, { models, Schema } from "mongoose";

const DOCUMENT_NAME = 'Rating';
const COLLECTION_NAME = 'ratings';

interface IRating extends Document {
    storyId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
    content: string;

}

const RatingSchema = new Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

const Rating = models[DOCUMENT_NAME] || mongoose.model<IRating>(DOCUMENT_NAME, RatingSchema);
export default Rating;