import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";

const DOCUMENT_NAME = 'Comment';
const COLLECTION_NAME = 'comments';

interface IComment extends Document {
    chapterId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
}

const CommentSchema = new Schema({
    chapterId: {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const Comment = models[DOCUMENT_NAME] || mongoose.model<IComment>(DOCUMENT_NAME, CommentSchema);

export default Comment;