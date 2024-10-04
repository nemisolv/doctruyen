import mongoose, { Document, models, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Genre';
const COLLECTION_NAME = 'genres';

export interface IGenre extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
}, { timestamps: true, collection: COLLECTION_NAME });

const Genre = models[DOCUMENT_NAME] || mongoose.model<IGenre>(DOCUMENT_NAME, GenreSchema);
export default Genre